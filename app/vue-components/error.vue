<template>
  <MessageWithImage type="error" />
</template>

<script>
import MessageWithImage from "./common/message-with-image.vue";
import ErrorImage from "../assets/error.png";
export default {
  name: "Error",
  components: {
    MessageWithImage,
    ErrorImage,
    computed: {
      img() {
        return ErrorImage;
      },
    },
  },
};
</script>
