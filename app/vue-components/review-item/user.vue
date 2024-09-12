<template>
  <div class="user_header">
    <div :class="['avatar ', { 'has-image': avatar }]" :style="avatarStyle">
      <img v-if="avatar" :src="avatar" alt="Profile Picture" />
      <span v-else class="avatar-text">{{ initials }}</span>
    </div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    avatar: {
      type: String,
      default: "",
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  computed: {
    name() {
      return this.fullname.split("-").join(" ");
    },
    initials() {
      if (this.fullname) {
        const names = this.fullname.split("-");
        const firstName = names[0] || "";
        const lastName = names[1] || "";
        return (firstName[0] || "") + (lastName[0] || "");
      }
      return "";
    },
    avatarStyle() {
      return {
        backgroundColor: this.avatar ? "" : this.getRandomColor(),
      };
    },
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>

<style scoped>
.user_header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.1rem;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  overflow: hidden;
  font-size: 15px;
  color: white;
  text-align: center;
}

.avatar.has-image {
  background-color: transparent;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
