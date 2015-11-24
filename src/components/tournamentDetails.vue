<!-- vim: set softtabstop=2 shiftwidth=2 expandtab : -->
<template>
<div class="demo-updates mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
  <div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
    <h2 class="mdl-card__title-text mdl-color-text--white">{{tournament.name}}</h2>
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a href="#" @click.stop.prevent="mode='groups'" class="mdl-button mdl-button--raised mdl-js-button mdl-js-ripple-effect mdl-color-text--teal-400">Groups</a>
    <a href="#" @click.stop.prevent="mode='tree'" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--teal-400">Final Tree</a>
  </div>
</div>
<div v-if="mode === 'tree'" class="demo-updates notification mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop""group in tournament.groupStats">
  <div v-for="round in tournament.finalTree">
    <h1>Round {{$index + 1}}</h1>
    <div v-for="match in round">
      <h2>Match {{$index + 1}}</h2>
      {{match | json}}
    </div>
  </div>
</div>


<div v-if="mode === 'groups'" class="demo-updates notification mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop" v-for="group in tournament.groupStats">
  <div class="cover mdl-card__title mdl-card--expand mdl-color--primary">
    <h2 class="mdl-card__title-text mdl-color-text--white">Group {{$index | letter}}</h2>
  </div>
  <div class="mdl-color-text--grey-600">
    <table class="mdl-data-table mdl-js-data-table group-stats">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Team</th>
          <th>V</th>
          <th>D</th>
          <th>T</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="team in group">
        <td class="mdl-data-table__cell--non-numeric">{{team.name}}</td>
        <td>{{team.wins}}</td>
        <td>{{team.defeats}}</td>
        <td>{{team.draws}}</td>
        <td><b>{{team.points}}</b></td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>

const _ = require('lodash');

export default {
  filters: {
    letter(num) {
      return String.fromCharCode(num + 65);
    }
  },
  data () {
    return {
      mode: 'groups',
      tournament: [],
    }
  },
  props: ['id'],
  ready() {
    const allTournaments = require('../services/tournaments.js');
    this.tournament = _.find(allTournaments, {id: parseInt(this.id)});
    if (this.tournament.tree && this.tournament.tree.length > 0) {
      this.mode= 'tree'
    }


    this.tournament.groupStats = _.map(this.tournament.groups, (g) => {
      const teams = {}
      _.each(g, (m) => {
        _.each(m.teams, (t) => {
          if (!teams[t]) {
            teams[t] = {
              name: t,
              wins: 0,
              defeats: 0,
              draws: 0,
              points: 0
            };
          }
        });
        if (m.scores[0] === m.scores[1]) {
          teams[m.teams[0]].draws++;
          teams[m.teams[1]].draws++;
        } else {
          const winnerId = m.scores[0] > m.scores[1]? 0: 1;
          const looserId = 1 - winnerId;
          teams[m.teams[winnerId]].wins++;
          teams[m.teams[looserId]].defeats++;
        }
        teams[m.teams[0]].points += m.points[0];
        teams[m.teams[1]].points += m.points[1];
      });
      return _.sortBy(teams, '-points');
    });

    console.log(this.infos);
  }

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

  .group-stats {
    width:100%;
  }
}
</style>
