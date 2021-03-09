<template>
  <section class="home">
    <!-- chatlist -->
    <chat-list-slot :clicked="onLogout">
      <!-- chat user comes here -->
      <chat-list-component
        v-for="(item, index) in $store.state?.users"
        :key="index"
        :item="item"
      />
    </chat-list-slot>
  </section>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

import ChatListSlot from "@/slots/ChatList.slot.vue";
import ChatListComponent from "../components/ChatList.component.vue";

export default {
  name: "Home",
  components: {
    ChatListSlot,
    ChatListComponent,
  },
  setup() {
    const store = useStore();
    const uid = store.state.user?.uid;

    const onLogout = () => {
      store.dispatch("logOut", {
        uid: uid,
      });
    };

    onMounted(() => {
      store.dispatch("getRealTimeUsers", uid);
    });

    return { onLogout };
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables";

.home {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
