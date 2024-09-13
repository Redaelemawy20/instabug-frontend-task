<template>
  <div class="overall_wrapper">
    <RatingHeader :rate="overAllRating" :reviews_number="totalReviews" />
    <div class="rating_details">
      <ul class="list-unstyled">
        <RatingBand band="excellent" :percentage="percentages.excellent" />
        <RatingBand band="good" :percentage="percentages.good" />
        <RatingBand band="fair" :percentage="percentages.fair" />
        <RatingBand band="poor" :percentage="percentages.poor" />
        <RatingBand
          band="unacceptable"
          :percentage="percentages.unacceptable"
        />
      </ul>
    </div>
    <button>Rating overtime</button>
  </div>
</template>

<script>
import RatingHeader from "./rating-header.vue";
import RatingBand from "./rating-band.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("reviews");

export default {
  name: "OverAllRating",
  components: {
    RatingHeader,
    RatingBand,
  },
  data() {
    return {
      totalReviews: 0,
      overAllRating: 0,
      summary: this.getInitialSummary(),
      percentages: this.getInitialSummary(),
    };
  },
  computed: {
    ...mapState(["recentReviews", "isError"]),
  },
  watch: {
    recentReviews(newReviews) {
      if (newReviews && newReviews.length) {
        this.totalReviews += newReviews.length;
        this.calculateSummary();
        this.calculateOverAllRating();
        this.calculatePercentages();
      }
    },
    isError(error) {
      if (error) this.reset();
    },
  },
  methods: {
    reset() {
      this.overAllRating = 0;
      this.totalReviews = 0;
      this.summary = this.getInitialSummary();
      this.percentages = this.getInitialSummary();
    },

    calculateSummary() {
      const previousSummary = { ...this.summary };
      const recentSummary = this.collectBandsRatings(this.recentReviews);
      this.summary = {
        excellent: previousSummary.excellent + recentSummary.excellent,
        good: previousSummary.good + recentSummary.good,
        fair: previousSummary.fair + recentSummary.fair,
        poor: previousSummary.poor + recentSummary.poor,
        unacceptable: previousSummary.unacceptable + recentSummary.unacceptable,
      };
    },
    calculatePercentages() {
      if (this.totalReviews === 0) return 0;
      // Calculate the exact percentage for each category without rounding
      const exactPercentages = {
        excellent: (this.summary.excellent / this.totalReviews) * 100,
        good: (this.summary.good / this.totalReviews) * 100,
        fair: (this.summary.fair / this.totalReviews) * 100,
        poor: (this.summary.poor / this.totalReviews) * 100,
        unacceptable: (this.summary.unacceptable / this.totalReviews) * 100,
      };
      // Round each percentage but keep track of the original fractional parts
      const roundedPercentages = {
        excellent: Math.floor(exactPercentages.excellent),
        good: Math.floor(exactPercentages.good),
        fair: Math.floor(exactPercentages.fair),
        poor: Math.floor(exactPercentages.poor),
        unacceptable: Math.floor(exactPercentages.unacceptable),
      };
      // Calculate sum of  rounded percentages to check
      let roundedTotal = Object.values(roundedPercentages).reduce(
        (sum, val) => sum + val,
        0
      );
      // check if the sum of all percentages is equal to 100
      let difference = 100 - roundedTotal;

      if (difference === 0) {
        this.percentages = roundedPercentages;
        return;
      }

      //  get the fractions of each percentage from exactPercentages

      const fractions = Object.entries(exactPercentages).map(
        ([key, value]) => ({ key, fraction: value % 1 })
      );

      // sort the fractions to know which percentage has largest fraction
      fractions.sort((a, b) => b.fraction - a.fraction);

      // Add 1 to the largest fractional values until the total is 100
      for (let i = 0; i < difference; i++) {
        roundedPercentages[fractions[i].key]++;
      }
      this.percentages = roundedPercentages;
    },
    calculateOverAllRating() {
      if (this.totalReviews === 0) return 0;
      const sumOfAllRatings =
        this.summary.excellent * 5 +
        this.summary.good * 4 +
        this.summary.fair * 3 +
        this.summary.poor * 2 +
        this.summary.unacceptable * 1;
      const overage = sumOfAllRatings / this.totalReviews;
      this.overAllRating = Number(overage.toFixed(1));
    },
    collectBandsRatings(reviews) {
      const summaries = this.getInitialSummary();
      reviews.forEach((review) => {
        const rating = review.rating;
        if (rating === 5) {
          summaries.excellent++;
        } else if (rating === 4) {
          summaries.good++;
        } else if (rating === 3) {
          summaries.fair++;
        } else if (rating === 2) {
          summaries.poor++;
        } else if (rating === 1 || rating === 0) {
          summaries.unacceptable++;
        }
      });
      return summaries;
    },
    getInitialSummary() {
      return {
        excellent: 0,
        good: 0,
        fair: 0,
        poor: 0,
        unacceptable: 0,
      };
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
