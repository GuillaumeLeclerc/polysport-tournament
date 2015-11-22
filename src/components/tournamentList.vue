<!-- vim: set softtabstop=2 shiftwidth=2 expandtab : -->
<template>

<div class="demo-updates mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col">
  <div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
    <h2 class="mdl-card__title-text mdl-color-text--white">Tournaments</h2>
  </div>
  <div class="mdl-card__actions mdl-card--border">

    <a href="#" :class="{'mdl-button--raised': selectedSport === 'all'}" @click.prevent="select('all')" class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">All</a>
    <a href="#" v-for="sport in sports" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--teal-400" @click.preventDefautl="select(sport)">{{sport}}</a>
  </div>
</div>
</template>

<script>

const sports = require('../services/sports.js');

export default {
  data () {
    const sportkeys = Object.keys(sports);
    return {
      sports: sportkeys,
      selectedSport: 'all'
    }
  },
  methods : {
    select(sport) {
      console.log(sport);
      this.selectedSport = sport;
    }
  }
}
</script>
