<template>
  <div class="clients_reviews" ref="reviewsListContainer">
    <div v-if="intialLoad">
      <IntialLoad />
    </div>
    <!-- virtual scroller  -->
    <RecycleScroller
      class="scroller"
      :items="items"
      :item-size="5"
      v-slot="{ item, index }"
      key-field="id"
      v-if="isSearching !== 'searching'"
    >
      <Review :key="item.id" :review="item" />
      <ReviewSkeleton
        v-if="
          index == items.length - 1 && hasNext && isSearching !== 'searching'
        "
      />
    </RecycleScroller>
    <!-- if searching -->
    <div v-if="isSearching === 'searching'">
      <Review v-for="item in items" :key="item.id" :review="item" />
      <NoReviews v-if="items.length === 0" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("reviews");
import VueVirtualScroller from "vue-virtual-scroller";
import Vue from "vue";
Vue.use(VueVirtualScroller);
import Review from "./review-item/review.vue";
import ReviewSkeleton from "./review-item/review-skeleton.vue";
import { GET_REVIEWS } from "../store/utils/action-types";
import { debounce } from "../utils/debounce";
import IntialLoad from "./intial-load.vue";
import NoReviews from "./no-reviews.vue";
export default {
  name: "ReviewsList",
  components: {
    Review,
    ReviewSkeleton,
    IntialLoad,
    NoReviews,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.debouncedScrollHandler = debounce(this.handleScroll, 200);
    this.registerScrollListner();
  },
  computed: {
    ...mapState([
      "reviews",
      "recentReviews",
      "filteredReviews",
      "hasNext",
      "isLoading",
      "currentPage",
      "isSearching",
    ]),
    intialLoad() {
      return this.isLoading && this.currentPage == 1;
    },
  },
  watch: {
    recentReviews(newReviews) {
      if (newReviews && newReviews.length) {
        this.items.push(...newReviews);
      }
    },
    isSearching(status) {
      if (status === "searching") {
        this.items = [];
        this.unRegisterScrollListner();
      } else if (status == "reset") {
        this.items = this.reviews;
        this.registerScrollListner();
      }
    },
    filteredReviews(newReviews) {
      if (this.isSearching == "searching") {
        this.items = newReviews;
      }
    },
  },
  methods: {
    ...mapActions({
      getReviews: GET_REVIEWS,
    }),
    registerScrollListner() {
      this.$refs.reviewsListContainer.addEventListener(
        "scroll",
        this.debouncedScrollHandler
      );
    },
    unRegisterScrollListner() {
      this.$refs.reviewsListContainer.removeEventListener(
        "scroll",
        this.debouncedScrollHandler
      );
    },
    handleScroll(event) {
      const container = event.target;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.getMoreReviews();
      }
    },
    getMoreReviews() {
      if (!this.isLoading && this.hasNext && this.isSearching !== "searching")
        this.getReviews();
    },
  },
  created() {
    this.getReviews();
  },
  beforeDestroy() {
    this.unRegisterScrollListner();
  },
};
</script>

<style scoped>
.clients_reviews {
  overflow-y: auto;
  height: 500px;
  width: 100%;
  will-change: transform;
}
</style>
