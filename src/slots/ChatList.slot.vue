<template>
  <!-- chatlist -->
  <div class="chatList">
    <div class="chatList__top">
      <div class="header">
        <div class="title">
          <h1>Chats</h1>
        </div>
      </div>
      <div class="options">
        <div class="icon__wrapper" @click="clicked">
          <i class="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
    <div class="chatList__bottom-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatList",
  props: ["clicked"],
};
</script>

<style lang="scss">
@import "@/scss/_variables";

.chatList {
  flex: 0.25;
  border-right: 1px solid $lightGray;
  display: flex;
  flex-direction: column;
  .chatList__top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    .header {
      display: flex;
      align-items: center;
      .title {
        h1 {
          font-size: 1.5rem;
          color: $black;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
      }
    }
    .options {
      cursor: pointer;
      transition: 0.5s ease-in;
      .icon__wrapper {
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
      }
    }
  }
  .chatList__bottom-scroll {
    margin-left: 10px;
    margin-top: 20px;
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &:hover {
    .chatList__bottom-scroll {
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
    }
  }
}
</style>
