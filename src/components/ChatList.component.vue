<template>
  <section class="chat__list">
    <div class="chat__list-icon">
      <profile-icon-component :username="item?.username" />
      <div v-if="item.isOnline" class="is__online" />
      <div v-else class="is__offline" />
    </div>
    <div class="chat__list-content">
      <p class="chat__list-title">{{ item.username }}</p>
      <p v-if="item.isOnline">online</p>
      <p v-else>{{ chat.timer }}</p>
    </div>
  </section>
</template>

<script>
import { reactive, watch } from "vue";
import moment from "moment";
import ProfileIconComponent from "./ProfileIcon.component.vue";

export default {
  name: "ChatListComponent",
  props: ["item"],
  components: {
    ProfileIconComponent,
  },
  setup(props) {
    const chat = reactive({ timer: null });

    setInterval(() => {
      chat.timer = `Last seen - ${moment(
        props.item?.createdAt.toDate()
      ).fromNow()}`;
    }, 1000);

    return { chat };
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables";

.chat__list {
  background: $white;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 50px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  .chat__list-icon {
    background: $info;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 3px solid $white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    position: relative;
    .is__online {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $success;
      position: absolute;
      bottom: 0;
      right: 0;
      border: 2px solid $white;
    }
    .is__offline {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $warning;
      position: absolute;
      bottom: 0;
      right: 0;
      border: 2px solid $white;
    }
  }
  .chat__list-content {
    .chat__list-title {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 2.5px;
      color: $text;
      letter-spacing: 0.03em;
    }
    p {
      font-size: 0.8rem;
      font-weight: 400;
      color: $lightSilver;
      letter-spacing: 0.03em;
      text-transform: capitalize;
    }
  }
  &.active {
    border-left: 3px solid $secondary;
    margin-left: 14px;
    .chat__list-icon {
      margin-left: 10px;
    }
  }
  &:hover {
    margin-left: 14px;
  }
}
</style>
