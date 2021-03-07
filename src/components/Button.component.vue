<template>
  <div class="btn-container">
    <button class="btn btn-primary" :type="type">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: ["type"],
};
</script>

<style lang="scss">
@import "@/scss/_variables";
.btn-container {
  text-align: center;
  margin-top: 16px;
  .btn {
    border: none;
    box-shadow: none;
    cursor: pointer;
    transition: 0.5s all ease-in;
    &.btn-primary {
      background: $primary;
      border-radius: 50px;
      color: $white;
      font-size: 15px;
      padding: 16px 30px;
    }
    &:active {
      transform: scale(0.6);
    }
  }
}
</style>
