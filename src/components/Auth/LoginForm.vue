<template>
  <div class="form">
    <h1 class="form-title">Авторизация</h1>
    <form
      @submit.prevent="$emit('onSubmit')"
      v-show="isLogin"
      class="login-form"
    >
      <input
        type="text"
        placeholder="Почта"
        @input="$emit('update:email', $event.target.value)"
      />
      <input
        type="password"
        placeholder="Пароль"
        @input="$emit('update:password', $event.target.value)"
      />
      <button>Войти</button>
      <p class="message">
        Нет аккаунта?
        <button type="button" @click="toggleForm">Создать аккаунт</button>
      </p>
    </form>
    <form
      @submit.prevent="$emit('onSubmit')"
      v-show="!isLogin"
      class="register-form"
    >
      <input
        type="text"
        placeholder="Почта"
        @input="$emit('update:email', $event.target.value)"
      />
      <input
        type="password"
        placeholder="Пароль"
        @input="$emit('update:password', $event.target.value)"
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        @input="$emit('update:repeatPassword', $event.target.value)"
      />
      <button>Создать</button>
      <p class="message">
        Уже есть аккаунт?
        <button type="button" @click="toggleForm">Войти</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  components: {},
  props: ["email", "password", "repeatPassword", "isLogin"],
  emits: [
    "onSubmit",
    "update:email",
    "update:password",
    "update:repeatPassword",
    "formChange",
  ],
  methods: {
    toggleForm() {
      this.$emit("formChange");
    },
  },
};
</script>

<style></style>
