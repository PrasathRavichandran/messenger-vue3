<template>
  <p>{{username}}</p>
</template>

<script>
export default {
  name: "ProfileIconComponent",
  props: ["username"],
  setup(props) {
    let username = props.username?.split("")[0];

    return { username };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
p {
  font-size: 1rem;
  font-weight: 500;
  color: $white;
  text-transform: uppercase;
}
</style>