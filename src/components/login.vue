<!-- vim: set softtabstop=2 shiftwidth=2 expandtab : -->

<template>
<form action="#" class="login">
  <div class="mdl-textfield mdl-js-textfield mdl-color-text--primary-contrast">
    <input class="mdl-textfield__input mdl-color-text--primary-contrast" type="email" id="sample1" v-model="email">
    <label class="mdl-textfield__label mdl-color-text--primary-contrast" for="sample1">Email</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-color-text--primary-contrast">
    <input class="mdl-textfield__input mdl-color-text--primary-contrast" type="password" id="sample1" v-model="password">
    <label class="mdl-textfield__label mdl-color-text--primary-contrast" for="sample1">Passowrd</label>
  </div>
  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" @click="login">
    Login
  </button>
  <button class="mdl-button mdl-js-button mdl-color-text--primary-contrast">
    Sign in
  </button>
</form>
</template>

<script>

const UserService = require('../services/user.js');

export default {
  data () {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    login () {
      UserService.login(this.email, this.password);
    }
  }
}

</script>

<style lang="sass">

@import '../../node_modules/sass-flex-mixin/flex.scss';

.login{
  @include flexbox;
  @include align-items(center);
  @include flex-direction(column);
  @include justify-content(flex-end);
  padding: 16px;
}
</style>
