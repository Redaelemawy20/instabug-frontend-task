<template>
  <h1>Hello world! Write your content here.</h1>
</template>

<script>
// Store
import { createNamespacedHelpers } from "vuex";
import { GET_REVIEWS } from "../store/utils/action-types";
import store from "../store";
if (!store.state.reviews) {
  store.registerModule("reviews", reviews);
}
const { mapState, mapActions } = createNamespacedHelpers("reviews");

export default {
  name: "HelloWorldComponent",

  computed: {
    ...mapState(["reviewsData"]),
  },

  methods: {
    ...mapActions({
      getReviews: GET_REVIEWS,
    }),
  },
};
</script>
