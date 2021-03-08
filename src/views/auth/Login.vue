<template>
  <auth-header-slot
    content="Don't you have an account?"
    link="/register"
    value="Create one"
  >
    <form @submit.prevent="login()">
      <input-component type="email" placeholder="Email" v-model="email" />
      <input-component
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <button-component type="submit">
        Let's start!
      </button-component>
    </form>
  </auth-header-slot>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import AuthHeaderSlot from "@/slots/AuthHeader.slot.vue";
import InputComponent from "@/components/Input.component.vue";
import ButtonComponent from "@/components/Button.component.vue";

export default {
  name: "Login",
  components: {
    AuthHeaderSlot,
    InputComponent,
    ButtonComponent,
  },
  setup() {
    const store = useStore();

    const email = ref("");
    const password = ref("");

    const login = () => {
      store.dispatch("logIn", {
        email: email.value,
        password: password.value,
      });
    };

    return { email, password, login };
  },
};
</script>
