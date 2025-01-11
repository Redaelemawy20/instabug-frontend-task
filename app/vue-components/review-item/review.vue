<template>
  <div class="review">
    <div class="info">
      <div class="user_info">
        <div class="user_details">
          <User :fullname="review.user_id" :avatar="review.user_avatar" />
          <Stars :rating="review.rating" />
        </div>
        <span class="date">{{ formatDate(review.created_at) }}</span>
      </div>
    </div>
    <p class="review-text">{{ review.content }}</p>
  </div>
</template>

<script scoped>
import User from "./user.vue";
import Stars from "./stars.vue";

export default {
  name: "Review",
  components: {
    Stars,
    User,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = formatter.format(date);

      return formattedDate;
    },
  },
};
</script>
<style scoped>
.review {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.info {
  margin-bottom: 1rem;
}

.user_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user_details {
  display: flex;
  flex-direction: column;
}

.date {
  font-size: 0.85rem;
  color: #999;
}

.review-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}
</style>
