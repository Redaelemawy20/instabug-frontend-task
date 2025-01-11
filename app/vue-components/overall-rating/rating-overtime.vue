<template>
  <div>
    <button @click="openModal">Rating overtime</button>
    <Modal v-if="showModal" :show="showModal" @close="closeModal">
      <ReviewsOvertimeChart style="height: 80%; width: 90%" />
    </Modal>
  </div>
</template>

<script>
import Modal from "../common/modal.vue";
export default {
  name: "RatingOverTimeButton",
  components: {
    ReviewsOvertimeChart: () => import("../reviews-overtime-chart.vue"),
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
