<template>
  <li class="d-flex align-items-center">
    <span class="title text-capitalize">{{ band }}</span>
    <div
      class="progress"
      role="progressbar"
      aria-label="Success example"
      aria-valuenow="59"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-bar" style="width: 0"></div>
    </div>
    <span class="percentage light_gray">{{ precentage }}</span>
  </li>
</template>

<script>
export default {
  name: "RatingBand",
  props: {
    band: {
      type: String,
      required: true,
    },
    precentage: {
      type: String,
      default: "0",
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.progress {
  --bs-progress-height: 1rem;
  --bs-progress-font-size: 0.75rem;
  --bs-progress-bg: #e9ecef;
  --bs-progress-border-radius: 0.375rem;
  --bs-progress-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
  --bs-progress-bar-color: #fff;
  --bs-progress-bar-bg: #0d6efd;
  --bs-progress-bar-transition: width 0.6s ease;
  display: flex;
  height: var(--bs-progress-height);
  overflow: hidden;
  font-size: var(--bs-progress-font-size);
  background-color: var(--bs-progress-bg);
  border-radius: var(--bs-progress-border-radius);
}
.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: var(--bs-progress-bar-color);
  text-align: center;
  white-space: nowrap;
  background-color: var(--bs-progress-bar-bg);
  transition: var(--bs-progress-bar-transition);
}
li .title {
  flex-basis: 35%;
}
li .title,
li .percentage {
  font-size: 23px;
}
li .progress {
  background-color: #e6e8eb;
  flex-basis: 50%;
  margin-right: 10px;
}
li .progress .progress-bar {
  border-radius: 10px;
}
li .percentage {
  font-weight: 500;
}
</style>
