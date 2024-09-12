<template>
  <div class="overall_wrapper">
    <RatingHeader :rate="0" :reviews_number="0" />
    <div class="rating_details">
      <ul class="list-unstyled">
        <RatingBand band="Excellent" color="sucesss" percentage="23%" />
        <RatingBand band="Good" color="sucesss" percentage="23%" />
        <RatingBand band="Fair" color="sucesss" percentage="23%" />
        <RatingBand band="Poor" color="sucesss" percentage="23%" />
        <RatingBand band="Unacceptable" color="sucesss" percentage="23%" />
      </ul>
    </div>
    <button>Rating overtime</button>
  </div>
</template>

<script>
import RatingHeader from "./rating-header.vue";
import Stars from "../review-item/stars.vue";
import RatingBand from "./rating-band.vue";

export default {
  name: "OverAllRating",
  components: {
    RatingHeader,

    RatingBand,
  },
  computed: {
    summary() {
      const initailSummary = {
        Excellent: 0,
        Good: 0,
        Fair: 0,
        Poor: 0,
        Unacceptable: 0,
      };

      return initailSummary;
    },
  },
};
</script>

<style scoped>
.overall_wrapper button {
  background-color: var(--blue);
  color: #fff;
  width: 193px;
  height: 62px;
  padding: 10px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 500;
  border-color: transparent;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 40px;
}
</style>
