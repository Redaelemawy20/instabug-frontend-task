<template>
  <!-- Skeleton Review  -->
  <div class="review skeleton mb-3 p-2">
    <!-- User Info -->
    <div class="info mb-3">
      <!-- user_info -->
      <div class="user_info d-flex align-items-start justify-content-between">
        <div>
          <div class="d-flex align-items-center gap-2">
            <span class="img_skeleton"></span>
            <div class="name text-capitalize"></div>
          </div>
          <!-- Stars -->
          <Stars />
        </div>
        <!-- Date -->
        <span class="date"></span>
      </div>
      <!-- user_info -->
    </div>
    <!-- User Info -->
    <p class="d-flex align-items-start flex-column gap-2">
      <span></span>
      <span></span>
      <span></span>
    </p>
  </div>
</template>
<script>
import Stars from "./stars.vue";

export default {
  name: "Review-Skeleton",
  components: {
    Stars,
  },
};
</script>

<style scoped>
/* Skeleton */
.review.skeleton .img_skeleton,
.review.skeleton .name,
.review.skeleton .date,
.review.skeleton .stars,
.review p span {
  animation: opacity 1.5s linear infinite alternate;
}
.review.skeleton .img_skeleton,
.review.skeleton .name,
.review.skeleton .date,
.review p span {
  background-color: var(--gray);
}
.review.skeleton .name,
.review.skeleton .date,
.review p span {
  border-radius: 16px;
}

.review.skeleton .img_skeleton {
  width: 36px;
  height: 36px;
  border-radius: 50px;
}
.review.skeleton .name {
  width: 105px;
  height: 18px;
}
.review.skeleton .date {
  width: 76px;
  height: 18px;
}
.review p span:nth-child(1),
.review p span:nth-child(2) {
  width: 100%;
  height: 12px;
}
.review p span:nth-child(3) {
  width: 50%;
  height: 12px;
}
/* Animation */
@keyframes opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
