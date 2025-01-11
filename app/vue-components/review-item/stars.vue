<template>
  <div class="stars">
    <img
      v-for="index in maxRating"
      :key="index"
      :src="getStarSrc(index)"
      :alt="getStarAlt(index)"
      class="star-image"
    />
  </div>
</template>

<script>
import FilledStar from "../../assets/filled-star.svg";
import UnFillStar from "../../assets/unfill-star.svg";
export default {
  name: "Stars",
  props: {
    rating: {
      type: Number,
      default: 0,
    },
    maxRating: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    getStarSrc(index) {
      return index <= this.rating ? FilledStar : UnFillStar;
    },
    getStarAlt(index) {
      return index <= this.rating ? "filled star" : "empty star";
    },
  },
};
</script>

<style scoped>
.stars {
  margin-top: 4px;
  font-size: 0.9rem;
}

.star {
  max-width: 100%;
  height: auto;
}

/* . */
</style>
