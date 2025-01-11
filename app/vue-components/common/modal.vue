<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">X</button>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isVisible() {
      return this.show;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%; /* Ensure it takes 90% of the screen width */
  height: 90vh; /* Ensure it takes 90% of the viewport height */
  overflow-y: auto; /* Allows scrolling if the content exceeds the max height */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers the content vertically */
  align-items: center; /* Centers the content horizontally */
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 20px;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  width: 100%;
}
</style>
