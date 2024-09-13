<template>
  <div class="overall_wrapper">
    <RatingHeader
      :rate="current.overAllRating"
      :reviews_number="current.totalReviews"
    />
    <div class="rating_details">
      <ul class="list-unstyled">
        <RatingBand
          band="excellent"
          :percentage="current.percentages.excellent"
        />
        <RatingBand band="good" :percentage="current.percentages.good" />
        <RatingBand band="fair" :percentage="current.percentages.fair" />
        <RatingBand band="poor" :percentage="current.percentages.poor" />
        <RatingBand
          band="unacceptable"
          :percentage="current.percentages.unacceptable"
        />
      </ul>
    </div>
    <RatingOverTimeButton />
  </div>
</template>

<script>
import RatingHeader from "./rating-header.vue";
import RatingBand from "./rating-band.vue";
import { createNamespacedHelpers } from "vuex";
import RatingOverTimeButton from "./rating-overtime.vue";
const { mapState } = createNamespacedHelpers("reviews");

export default {
  name: "OverAllRating",
  components: {
    RatingHeader,
    RatingBand,
    RatingOverTimeButton,
  },
  data() {
    return {
      current: {
        totalReviews: 0,
        overAllRating: 0,
        summary: this.getInitialSummary(),
        percentages: this.getInitialSummary(),
      },
      beforeFilters: {},
    };
  },
  computed: {
    ...mapState(["recentReviews", "isError", "isSearching", "filteredReviews"]),
  },
  watch: {
    recentReviews(newReviews) {
      if (newReviews && newReviews.length) {
        this.onReviewsChanged(newReviews);
      }
    },
    isError(error) {
      if (error) this.reset();
    },
    isSearching(status) {
      if (status === "searching") {
        this.saveCurrentState();
      } else {
        this.updateToPreviousState();
      }
    },
    filteredReviews(newReviews) {
      if (this.isSearching === "searching") {
        this.reset();
        this.onReviewsChanged(newReviews);
      }
    },
  },
  methods: {
    onReviewsChanged(newReviews) {
      this.current.totalReviews += newReviews.length;
      this.calculateSummary(newReviews);
      this.calculateOverAllRating();
      this.calculatePercentages();
    },
    saveCurrentState() {
      this.beforeFilters = { ...this.current };
      this.reset();
    },
    updateToPreviousState() {
      this.current = { ...this.beforeFilters };
    },
    reset() {
      this.current.overAllRating = 0;
      this.current.totalReviews = 0;
      this.current.summary = this.getInitialSummary();
      this.current.percentages = this.getInitialSummary();
    },

    calculateSummary(newReviews) {
      const previousSummary = { ...this.current.summary };
      const recentSummary = this.collectBandsRatings(newReviews);
      this.current.summary = {
        excellent: previousSummary.excellent + recentSummary.excellent,
        good: previousSummary.good + recentSummary.good,
        fair: previousSummary.fair + recentSummary.fair,
        poor: previousSummary.poor + recentSummary.poor,
        unacceptable: previousSummary.unacceptable + recentSummary.unacceptable,
      };
    },
    calculatePercentages() {
      if (this.current.totalReviews === 0) return 0;
      // Calculate the exact percentage for each category without rounding
      const exactPercentages = {
        excellent:
          (this.current.summary.excellent / this.current.totalReviews) * 100,
        good: (this.current.summary.good / this.current.totalReviews) * 100,
        fair: (this.current.summary.fair / this.current.totalReviews) * 100,
        poor: (this.current.summary.poor / this.current.totalReviews) * 100,
        unacceptable:
          (this.current.summary.unacceptable / this.current.totalReviews) * 100,
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
        this.current.percentages = roundedPercentages;
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
      this.current.percentages = roundedPercentages;
    },
    calculateOverAllRating() {
      if (this.current.totalReviews === 0) return 0;
      const sumOfAllRatings =
        this.current.summary.excellent * 5 +
        this.current.summary.good * 4 +
        this.current.summary.fair * 3 +
        this.current.summary.poor * 2 +
        this.current.summary.unacceptable * 1;
      const overage = sumOfAllRatings / this.current.totalReviews;
      this.current.overAllRating = Number(overage.toFixed(1));
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
