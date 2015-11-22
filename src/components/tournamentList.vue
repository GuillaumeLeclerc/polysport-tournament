<!-- vim: set softtabstop=2 shiftwidth=2 expandtab : -->
<template>

<div class="demo-updates mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col">
  <div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
    <h2 class="mdl-card__title-text mdl-color-text--white">Tournaments</h2>
  </div>
  <div class="mdl-card__actions mdl-card--border">

    <a href="#" :class="{'mdl-button--raised': selectedSport == sport, 'mdl-button--accent': sport=='all', 'mdl-color-text--teal-400': sport!= 'all'}" v-for="sport in sports" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--teal-400" @click.stop.prevent="select(sport)">{{sport}}</a>
  </div>
</div>


<div class="demo-updates notification mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--4-col-desktop" v-for="item in getTournaments">
  <div class="cover mdl-card__title mdl-card--expand mdl-color--grey-100">
    {{{item.sport | background}}}
  </div>
  <div class="mdl-card__supporting-text mdl-color-text--grey-600">
    <b>{{item.name}}</b>
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

const _ = require('lodash');

export default {
   filters: {
    background(sport) {
      return sportsMap[sport].image;
    },
  }, data () {
    const sportkeys = Object.keys(sportsMap);
    sportkeys.unshift('all');
    return {
      sports: sportkeys,
      selectedSport: 'all',
      tournaments: [{
        name: 'This is a super football tournament',
        sport: 'football',
        id: 1
      }, {
        name: 'Tennis epfl tournament',
        id: 2,
        sport: 'tennisTable'
      }, {
        name: 'Football super league',
        id: 4,
        sport: 'football'
      },{
        name: 'Ski cross 2016',
        id: 3,
        sport: 'skiCross'
      }
      ]
    }
  },
computed: {
            getTournaments () {
              if (this.selectedSport === 'all') {
                return this.tournaments;
              } else {
                return _.filter(this.tournaments, {'sport' : this.selectedSport});
              }
            }
          },
  methods : {
    select(sport, ev) {
      this.selectedSport = sport;
    }
  }
}
</script>
