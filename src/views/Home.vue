<template>
  <section class="home">
    <!-- chatlist -->
    <chat-list-slot :clicked="onLogout">
      <!-- chat user comes here -->
      <chat-list-component
        v-for="(item, index) in $store.state?.users"
        :key="index"
        :item="item"
        @click="initChat(item)"
      />
    </chat-list-slot>
    <chat-room-slot v-if="chat.started" :userDetails="chat.userDetails">
      <!-- display chats -->
      <div class="chats">
        <div v-for="(item, index) in $store.state?.conversations" :key="index">
          <div
            :class="[
              item?.uid_1 === $store.state.user?.uid
                ? 'message__list right'
                : 'message__list',
            ]"
          >
            <div class="message__container">
              <div class="message__container-top">
                <p class="message__text">
                  {{ item.message }}
                </p>
              </div>
              <div class="message__container-bottom">
                <p class="message__notification">
                  Message seen
                  {{ moment(item.createdAt.toDate()).format("LT") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- input field for messaging -->
      <div class="chatRoom__input-container">
        <form class="type__container" @submit.prevent="sendMessage">
          <div class="form-control">
            <input
              type="text"
              class="form-input"
              placeholder="Type something here..."
              v-model="message"
            />
          </div>
          <button class="type__thumbs-up-btn" type="submit">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </chat-room-slot>
  </section>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";

import ChatListSlot from "@/slots/ChatList.slot.vue";
import ChatListComponent from "../components/ChatList.component.vue";
import ChatRoomSlot from "../slots/ChatRoom.slot.vue";

export default {
  name: "Home",
  components: {
    ChatListSlot,
    ChatListComponent,
    ChatRoomSlot,
  },
  setup() {
    const store = useStore();
    const uid = store.state.user?.uid;
    const chat = reactive({ started: false, userDetails: null, userUid: null });
    const message = ref("");

    const onLogout = () => {
      store.dispatch("logOut", {
        uid: uid,
      });
    };

    const initChat = (user) => {
      chat.started = true;
      chat.userDetails = user;
      chat.userUid = user?.uid;

      store.dispatch("getRealTimeConversations", {
        uid_1: uid,
        uid_2: user?.uid,
      });
    };

    const sendMessage = () => {
      const msgObj = {
        uid_1: uid,
        uid_2: chat.userUid,
        message: message.value,
      };
      if (message !== "") {
        store.dispatch("updateMessage", msgObj);
        message.value = "";
      }
    };

    watch(
      () => store.state?.users,
      (users, prevUser) => {
        users?.map((item) => {
          if (item?.uid === chat?.userUid) {
            chat.userDetails = item;
          }
        });
      }
    );

    onMounted(() => {
      store.dispatch("getRealTimeUsers", uid);
    });

    return { onLogout, initChat, chat, message, sendMessage, moment };
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables";

.home {
  display: flex;
  flex-direction: row;
  height: 100vh;
  .chats {
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: block;
      width: 8px;
      background-color: $lightGray;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: $gray;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: $lightGray;
    }
    .message__list {
      display: flex;
      align-items: flex-end;
      margin-bottom: 14px;
      margin-left: 10px;
      margin-right: 10px;
      .message__container {
        width: fit-content;
        .message__container-top {
          background-color: #f1f2f6;
          padding: 20px;
          border-radius: 1.2rem;
          border-bottom-left-radius: 0;
          margin-top: 4px;
          width: fit-content;
          .message__text {
            color: $text;
            font-size: 0.9rem;
            font-weight: 500;
            line-height: 1.8;
            letter-spacing: 0.03em;
          }
        }
        .message__container-bottom {
          margin-top: 5px;
          .message__notification {
            font-size: 0.8rem;
            font-weight: 400;
            color: $lightSilver;
            letter-spacing: 0.03em;
          }
        }
      }
      &.right {
        flex-direction: row-reverse;
        .message__container-top {
          border-radius: 1.2rem;
          border-bottom-right-radius: 0;
          background-color: $secondary;
          .message__text {
            color: $white;
          }
        }
        .message__notification {
          text-align: right;
        }
      }
    }
  }
  .chatRoom__input-container {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
    width: 100%;
    .type__container {
      display: flex;
      align-items: center;
      .type__thumbs-up-btn {
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-bottom: 5px;
        background: $primary;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        i {
          font-size: 1rem;
          color: $white;
        }
        &:active {
          transform: scale(0.6);
        }
      }

      .form-control {
        flex: 1;
        padding-left: 10px;
        padding-right: 10px;
        .form-input {
          background-color: $lightGray;
          border: none;
          width: 100%;
          padding: 14px;
          border-radius: 4rem;
          font-weight: 400;
          font-size: 0.8rem;
          &::placeholder {
            color: #d0d4de;
            letter-spacing: 0.03em;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
