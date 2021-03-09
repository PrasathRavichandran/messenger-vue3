<template>
  <div class="chatRoom">
    <!-- navbar -->
    <div class="chatRoom__navbar">
      <div class="chatRoom__container">
        <div class="chat__list-icon">
          <profile-icon-component :username="userDetails.username" />
          <div v-if="userDetails.isOnline" class="is__online" />
          <div v-else class="is__offline" />
        </div>
        <div class="chat__list-content">
          <p class="chat__list-title">{{ userDetails.username }}</p>
          <p v-if="userDetails.isOnline">online</p>
          <p v-else>
            {{ chat.timer }}
          </p>
        </div>
      </div>
      <div class="navbar__options">
        <div class="icon__wrapper">
          <i class="fas fa-phone-alt"></i>
        </div>
        <div class="icon__wrapper">
          <i class="fas fa-video"></i>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import moment from "moment";
import ProfileIconComponent from "../components/ProfileIcon.component.vue";

export default {
  name: "ChatRoomHeader",
  props: ["userDetails"],
  components: {
    ProfileIconComponent,
  },
  setup(props) {
    const userDetails = computed(() => props.userDetails);
    const chat = reactive({ timer: null });

    setInterval(() => {
      chat.timer = `Last seen - ${moment(
        props?.userDetails.createdAt.toDate()
      ).fromNow()}`;
    }, 1000);

    return { chat, userDetails };
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables";

.chatRoom {
  flex: 0.75;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .chatRoom__navbar {
    flex: 0.1;
    border-bottom: 1px solid $lightGray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    .chatRoom__container {
      display: flex;
      justify-content: center;
      align-items: center;
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
    }
    .navbar__options {
      width: 80px;
      display: flex;
      justify-content: space-between;
      .icon__wrapper {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        i {
          color: $primary;
          font-size: 1rem;
        }
      }
      :hover {
        background-color: $lightGray;
        i {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
