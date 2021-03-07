<template>
  <section class="auth">
    <div class="container">
      <i class="fab fa-facebook-messenger"></i>
      <p>Connect with your favourite people</p>
      <slot></slot>
      <p class="link">
        {{ content }}
        <span>
          <router-link :to="link">{{ value }}</router-link>
        </span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "AuthHeader",
  props: ["content", "link", "value"],
};
</script>

<style lang="scss">
@import "@/scss/_variables";
.auth {
  width: 100%;
  height: 100vh;
  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    i {
      font-size: 3rem;
      margin-bottom: 1.2rem;
      color: $secondary;
    }
    p {
      font-size: 2.2rem;
      font-weight: 500;
      color: $black;
      margin-bottom: 36px;
      &.link {
        margin-top: 24px;
        font-size: 0.8rem;
        span {
          a {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
