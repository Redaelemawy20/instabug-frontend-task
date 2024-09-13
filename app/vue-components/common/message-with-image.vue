<template>
  <div class="error_msg">
    <div class="img">
      <img
        src="../../assets/error.png"
        alt="loading error"
        v-if="type === 'error'"
      />
      <img
        src="../../assets/empty.png"
        alt="no reviews found"
        v-if="type === 'empty'"
      />
    </div>
    <p class="mb-0" v-if="type == 'error'">Something went wrong!</p>
    <p class="mb-0" v-if="type == 'empty'">No reviews found</p>
    <p v-if="type === 'empty'" style="font-size: smaller">
      Try another search or wait new reviews
    </p>
    <a href="" v-if="type == 'error'">Reload</a>
  </div>
</template>

<script>
export default {
  name: "MessageWithImage",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.row {
  align-items: center;
}
.row > div {
  flex-basis: 45%;
}
.error_msg {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding-top: 20px;
}
.error_msg .img {
  border-radius: 50%;
  box-shadow: 1px 1px 50px -23px #000;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error_msg p {
  color: var(--dark_blue);
  font-size: 31px;
  font-weight: 500;
}
.error_msg a {
  font-size: 19px;
  color: var(--blue);
}
</style>
