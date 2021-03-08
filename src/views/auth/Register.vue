<template>
  <auth-header-slot
    content="Already you have an account?"
    link="/login"
    value="Log in!"
  >
    <form @submit.prevent="signup()">
      <input-component type="email" placeholder="Email" v-model="email" />
      <input-component type="text" placeholder="Username" v-model="username" />
      <input-component
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <button-component type="submit">
        Next!
      </button-component>
    </form>
  </auth-header-slot>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import ButtonComponent from "../../components/Button.component.vue";
import InputComponent from "../../components/Input.component.vue";
import AuthHeaderSlot from "../../slots/AuthHeader.slot.vue";
export default {
  name: "Register",
  components: { AuthHeaderSlot, InputComponent, ButtonComponent },
  setup() {
    const store = useStore();

    const email = ref("");
    const username = ref("");
    const password = ref("");

    const signup = () => {
      // console.log(email.value, username.value, password.value);
      store.dispatch("signUp", {
        email: email.value,
        username: username.value,
        password: password.value,
      });
    };

    return { email, username, password, signup };
  },
};
</script>
