<template>
  <div>
    <ReviewSkeleton />
    <ReviewSkeleton />
    <ReviewSkeleton />
  </div>
</template>

<script>
import ReviewSkeleton from "./review-item/review-skeleton.vue";

export default {
  name: "IntialLoad",
  components: {
    ReviewSkeleton,
  },
};
</script>
