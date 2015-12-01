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
  <table class="final-tree truncate">
    <thead>
      <tr>
        <th class="mdl-color-text--white mdl-color--primary" v-for="t in bracketTitle">{{t}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in bracketGrid">
        <td v-for="c in r" class={{c.type}}>  
          <div v-if="c.type == 'team1' || c.type == 'team2'">{{c.name}}</div>
          <div v-if="c.type == 'score1' || c.type == 'score2'">{{c.score}}</div>
        </td>
      </tr>
      </tbody>
  </table>
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
  computed:{
    bracketTitle: function() {
      const allTournaments = require('../services/tournaments.js');
      const tournament = _.find(allTournaments, {id: parseInt(this.id)});
      const tree = tournament.finalTree;

      var grid = [];
      var rounds = tree.length;

      for(var i = 0; i<rounds; i++)
      {
          grid.push('Round ' + (i+1));
          grid.push('');
          if(i==rounds-1)
          {
            continue;
          }

          
          grid.push('');
          grid.push('');
      }

      return grid;
    },
    bracketGrid: function() {
      const allTournaments = require('../services/tournaments.js');
      const tournament = _.find(allTournaments, {id: parseInt(this.id)});
      const tree = tournament.finalTree;

      var rounds = tree.length;
      var byes;

      if(rounds > 1 && tree[rounds-1].length == tree[rounds-2].length){
        byes = true;
      }else{
        byes = false;
      }
      var rows;
      if(byes){
        rows = Math.pow(2,tree[rounds-1].length);
      }else{
        rows = Math.pow(2,tree[rounds-1].length+1);
      }
      var cols = rounds*4 - 2;
      var grid = []
      
      for(var i = 0; i < rows; i++)
      {
        var row = [];

        for(var j = 0; j < cols; j++)
        {
          row.push({
            type: '',
            name: '',
            score: '?',
            nbRounds: rounds
          });
        }
        grid.push(row);
      }

      var colIndex = -1;
      for(var i = rounds - 1; i >= 0; i--)
      {
        var nbMatch = tree[i].length;
        var round = tree[i];
        var stepIndex = (rows / nbMatch)/2;
        console.log(stepIndex);
        var rowIndex = -1;
        
        for(var j = 0; j < nbMatch; j++)
        {
          if(stepIndex > rows)
          {
            continue;
          }
          rowIndex += stepIndex;
          if(colIndex >= 0)
          {
            if(byes==false || colIndex>3)
            {
              grid[rowIndex][colIndex].type = 'left_bottom';
              grid[rowIndex+1][colIndex].type = 'left_top';
              
            }else
            {
              grid[rowIndex][colIndex].type = 'bottom';
              grid[rowIndex+1][colIndex].type = 'top';
            }

            for(var k = -stepIndex/2 + 1; k < stepIndex/2 + 1; k++)
              {
                if(k!=0 && k!=1 )
                {
                  grid[rowIndex+k][colIndex].type = 'left';
                }
              }
          }
          grid[rowIndex][colIndex+1].type = 'team1';
          grid[rowIndex+1][colIndex+1].type = 'team2';
          grid[rowIndex][colIndex+1].name = round[j].teams[0];
          grid[rowIndex+1][colIndex+1].name = round[j].teams[1];


          grid[rowIndex][colIndex+2].type = 'score1';
          grid[rowIndex+1][colIndex+2].type = 'score2';

          if(round[j].teams[0] != '' && round[j].teams[1] != '' && round[j].scores[0]>=0 && round[j].scores[1]>=0)
          {
            grid[rowIndex][colIndex+2].score = String(round[j].scores[0]);
            grid[rowIndex+1][colIndex+2].score = String(round[j].scores[1]);
          }

          if(colIndex + 3 < cols)
          {
            grid[rowIndex][colIndex+3].type = 'bottom';
            grid[rowIndex+1][colIndex+3].type = 'top';
          }

         rowIndex += stepIndex;
        

        }
        colIndex += 4;
      }

      return grid;
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

  .final-tree{
    width:100%;
    margin: 0 auto;
    padding: 0px;
    border-spacing: 0;
  }

  .truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }

  .score1{
    text-align: center;
    color: white;
    background-color: grey;
    width: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top-right-radius: 5px;
  }

  .score2{
    text-align: center;
    color: white;
    background-color: grey;
    width: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom-right-radius: 5px;
  }

  .team1{
    border: solid black;
    border-width: 0px 1px 0px 0px;
    background-color: lightgrey;
    padding: 5px;
    border-top-left-radius: 5px;
  }

  .team2{
    border: solid black;
    border-width: 0px 1px 0px 0px;
    background-color: lightgrey;
    padding: 5px;
    border-bottom-left-radius: 5px;
  }

  .top{
    border: solid black;
    border-width: 1px 0px 0px 0px;
    width: 3%;
  }

  .bottom{
    border: solid black;
    border-width: 0px 0px 1px 0px;
    width: 3%;
  }

  .left{
    border: solid black;
    border-width: 0px 0px 0px 2px;
    width: 3%;
  }

  .left_top{
    border: solid black;
    border-width: 1px 0px 0px 2px;
    width: 3%;
    border-top-left-radius: 5px;
  }

  .left_bottom{
    border: solid black;
    border-width: 0px 0px 1px 2px;
    width: 3%;
    border-bottom-left-radius: 5px;
  }
}
</style>
