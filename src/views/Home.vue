<template>
  <h1>Home page</h1>
  <button @click="onLogout">Logout</button>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const store = useStore();

    const onLogout = () => {
      store.dispatch("logOut", {
        uid: store.state.user?.uid,
      });
    };
    return { onLogout };
  },
};
</script>

<style></style>
