<template>
  <div>
    <Filtration />
    <section class="wrapper py-4">
      <div class="container">
        <div class="row">
          <OverallRating class="item" />
          <Error v-if="isError" class="item" />
          <ReviewsList v-else class="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("reviews");
import store from "../store";
import Error from "./error.vue";
import ReviewsList from "./reviews-list.vue";
import OverallRating from "./overall-rating/overall-rating.vue";
import Filtration from "./filtration/filtration.vue";
if (!store.state.reviews) {
  store.registerModule("reviews", reviews);
}
export default {
  name: "ReviewsComponent",
  components: {
    ReviewsList,
    Error,
    OverallRating,
    Filtration,
  },
  computed: {
    ...mapState(["isError"]),
  },
};
</script>
