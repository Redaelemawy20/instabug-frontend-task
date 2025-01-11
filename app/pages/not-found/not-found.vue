<template>
  <section class="not_found">
    <div class="stats">404</div>
    <div class="title">Page not found</div>
    <p>Tha page you are looking for does not exist.</p>
    <a href="">Go back home</a>
  </section>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
section.not_found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
section.not_found .stats {
  color: var(--blue);
  font-size: 40px;
  font-weight: 500;
}
section.not_found .title {
  color: var(--dark_blue);
  font-size: 50px;
  font-weight: 500;
}
section.not_found p {
  color: #8894a6;
  font-size: 19px;
}
section.not_found a {
  text-decoration: none;
  background-color: var(--blue);
  color: #fff;
  width: 180px;
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
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
</style>
