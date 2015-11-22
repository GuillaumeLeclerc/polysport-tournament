<!-- vim: set softtabstop=2 shiftwidth=2 expandtab : -->
<template>
<div class="demo-updates mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
  <div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
    <h2 class="mdl-card__title-text mdl-color-text--white">Welcome</h2>
  </div>
  <div class="mdl-card__supporting-text mdl-color-text--grey-600">
    Displaying tournament {{id}}
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--teal-400">Read More</a>
  </div>
</div>

<div class="demo-updates notification mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--4-col-desktop" v-for="item in items">
  <div class="cover mdl-card__title mdl-card--expand mdl-color--grey-100">
    {{{item.sport | background}}}
  </div>
  <div class="mdl-card__supporting-text mdl-color-text--grey-600">
    Your team <b>{{item.team}}</b> has a new match to play. <br>
    Get ready !
  </div>
  <div class="mdl-card__actions mdl-card--border mdl-grid date-container">
    <a href="#" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"><i class="material-icons" role="presentation">date_range</i> Details</a> 
    <div class="mdl-layout-spacer"></div>
    <span class="date mdl-color-text--grey-700">June, 15th 2015</span>
  </div>
</div>
</template>

<script>

const sportsMap = require('../services/sports.js');

export default {
  data () {
    return {
    }
  },
  props: ['id']
}
</script>

<style lang="sass">
@import '../../node_modules/sass-flex-mixin/flex.scss';
.notification {
  .cover {
    background-size: cover;
    background-position: center center;
  }

  .date-container {
    .date {
      @include align-self(center);
    }
  }
}
</style>
