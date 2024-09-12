<template>
  <div class="clients_reviews" ref="reviewsListContainer">
    <div v-if="intialLoad">
      <IntialLoad />
    </div>
    <!-- virtual scroller  -->
    <RecycleScroller
      class="scroller"
      :items="reviews"
      :item-size="10"
      v-slot="{ item, index }"
      key-field="id"
    >
      <Review :key="item.id" :review="item" />
      <ReviewSkeleton v-if="index == reviews.length - 1 && hasNext" />
    </RecycleScroller>
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
export default {
  name: "ReviewsList",
  components: {
    Review,
    ReviewSkeleton,
    IntialLoad,
  },
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    this.debouncedScrollHandler = debounce(this.handleScroll, 200);
    this.$refs.reviewsListContainer.addEventListener(
      "scroll",
      this.debouncedScrollHandler
    );
  },
  computed: {
    ...mapState(["recentReviews", "hasNext", "isLoading", "currentPage"]),
    intialLoad() {
      return this.isLoading && this.currentPage == 1;
    },
  },
  watch: {
    recentReviews(newReviews) {
      if (newReviews && newReviews.length) {
        this.reviews.push(...newReviews);
      }
    },
  },
  methods: {
    ...mapActions({
      getReviews: GET_REVIEWS,
    }),
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
      if (!this.isLoading && this.hasNext) this.getReviews();
    },
  },
  created() {
    this.getReviews();
  },
  beforeDestroy() {
    this.$refs.reviewsListContainer.removeEventListener(
      "scroll",
      this.debouncedScrollHandler
    );
  },
};
</script>

<style scoped>
.clients_reviews {
  overflow-y: scroll;
  height: 550px;
  width: 100%;
  will-change: transform;
}
</style>
