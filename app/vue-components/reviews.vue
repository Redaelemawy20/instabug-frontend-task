<template>
  <section class="wrapper py-4">
    <div class="container">
      <div class="row">
        <OverallRating class="item" />
        <Error v-if="isError" class="item" />
        <ReviewsList v-else class="item" />
      </div>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("reviews");
import store from "../store";
import Error from "./error.vue";
import ReviewsList from "./reviews-list.vue";
import OverallRating from "./overall-rating/overall-rating.vue";
if (!store.state.reviews) {
  store.registerModule("reviews", reviews);
}
export default {
  name: "ReviewsComponent",
  components: {
    ReviewsList,
    Error,
    OverallRating,
  },
  computed: {
    ...mapState(["isError"]),
  },
};
</script>
