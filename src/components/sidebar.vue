<!-- vim: set softtabstop=2 shiftwidth=2 expandtab : -->
<template lang="html">
<div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
  <div v-if="isLoggedIn" transition="expand">
    <header class="user-profile">
      <img class="avatar" :src="user.picture" alt="">
      <span>{{fullName | uppercase}}</span>
    </header>
  </div>
  <login v-if="!isLoggedIn" transition="expand"></login>
  <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
    <a v-link="{name:'notifications'}" class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">announcement</i>Notifications</a>
    <a v-link="{name: 'tournamentList'}" class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">rowing</i>Tournaments</a>
    <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">group</i>My teams</a>
    <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">group_add</i>Add team</a>
    <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">security</i>Admin</a>
    <div class="mdl-layout-spacer"></div>
    <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
  </nav>
</div>
</template>

<script>

const UserService = require('../services/user.js');

import Login from './login.vue';

export default {
  data() {
    return {
      user: UserService.userInfo
    }
  },

  filters: {
    uppercase(data) {
      return data.toUpperCase();
    }
  },

  computed: {
    fullName () {
      return this.user.firstName + ' ' + this.user.lastName
    },
    isLoggedIn () {
      return this.user.loggedIn;
    }
  },
  methods: {
  },

  components: {
    Login
  }
}
</script>

<style scoped lang="sass">

@import '../../node_modules/sass-flex-mixin/flex.scss';
.avatar {
  width:50%;
}

.user-profile {
  @include flexbox;
  @include align-items(center);
  @include flex-direction(column);
  @include justify-content(flex-end);
  padding: 16px;
}

/* always present */
.expand-transition {
  transition: all .3s ease;
  opacity: 1;
  overflow: hidden;
  max-height:300px;
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  opacity: 0;
  max-height:0px;
}
</style>
