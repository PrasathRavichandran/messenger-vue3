<template>
  <div class="form-control">
    <input
      :type="type"
      :placeholder="placeholder"
      class="form-input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: ["type", "placeholder", "modelValue"],
};
</script>

<style lang="scss">
@import "@/scss/_variables";
.form-control {
  .form-input {
    width: 300px;
    height: 42px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    padding: 0 1rem;
    &::placeholder {
      letter-spacing: 0.03em;
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
  margin-bottom: 10px;
}
</style>
