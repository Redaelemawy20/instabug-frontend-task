<template>
  <div class="head mb-4">
    <div class="title mb-2">Overall Rating</div>
    <div class="rating_wrapper d-flex align-items-center gap-2">
      <span class="rate_count">{{ rate }}</span>
      <Stars :rating="rate" />
      <span class="light_gray">Based on {{ reviews_number }} reviews</span>
    </div>
  </div>
</template>

<script>
import Stars from "../review-item/stars.vue";

export default {
  name: "RatingHeader",
  components: {
    Stars,
  },
  props: {
    rate: {
      type: Number,
      default: 0,
    },
    reviews_number: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.overall_wrapper .head .title {
  color: #0d0c22;
  size: 32px;
  font-weight: 500;
}
.overall_wrapper .head .rating_wrapper .rate_count {
  font-size: 23px;
  font-weight: 500;
}
.overall_wrapper .head .rating_wrapper span:not(.rate_count) {
  font-size: 14px;
}
</style>
