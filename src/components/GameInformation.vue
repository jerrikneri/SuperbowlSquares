<template>
  <div>
    <div class="game-information-wrapper text-center" v-if="doneAssigning">
    <h2 class="text-center">{{ away }} - X AXIS</h2>
    <h2 class="text-center">{{ home }} - Y AXIS</h2>
    <hr>
    <section>
      <h2>Quarter</h2>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button v-for="{ label, value } in quarterLabels"
          :key="label"
          :value="value"
          :class="{ 'active': currentQuarter === value }"
          type="button"
          class="btn btn-secondary"
          @click="setQuarter(value)">{{ label }}</button>
      </div>
    </section>

    <section>
      <h2>Score</h2>
      <div>
        <label for="away">{{ away }}</label>
        <input id="away" type="number" v-model="awayScore">
        <label for="home">{{ home }}</label>
        <input id="home" type="number" v-model="homeScore">
      </div>
      <div>
        <button @click="setScore">Submit Score</button>
      </div>

      <div v-if="scores">
        <p>
          1st Quarter: {{ getScoreByQuarter(1) }}
        </p>
        <p>
          2nd Quarter: {{ getScoreByQuarter(2) }}
        </p>
        <p>
          3rd Quarter: {{ getScoreByQuarter(3) }}
        </p>
        <p>
          Final: {{ getScoreByQuarter(4) }}
        </p>
      </div>
    </section>
    </div>

    <div v-else>
      {{ currentPlayer && currentPlayer.name }}, you have {{ remainingPlayerSquares }} left.

      <button v-if="!remainingPlayerSquares" @click="confirmSquares">Confirm Squares</button>
    </div>

    <b-modal id="playerIdPrompt"
        title="What is your player id? ###"
        @ok="handlePlayerSubmit"
        ok-only
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close>
      <input type="number" placeholder="Player ID ###" v-model="currentPlayerId">
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'GameInformation',
  data() {
    return {
      currentPlayerId: 0,
      doneAssigning: false,
      homeScore: 0,
      awayScore: 0,
      quarterLabels: [
        {
          label: 'One',
          value: 1
        },
        {
          label: 'Two',
          value: 2
        },
        {
          label: 'Three',
          value: 3
        },
        {
          label: 'Final',
          value: 4
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['playerIds', 'remainingPlayerSquares']),
    ...mapState(['players', 'currentPlayer', 'currentQuarter', 'home', 'away', 'scores', 'settings', 'pickedSquares']),
    isAdmin() {
      return this.currentPlayerId === process.env.VUE_APP_ADMIN_ID;
    },
    
  },
  async created() {
    await Promise.all([
      this.fetchPlayers(),
      this.fetchScores(),
      this.fetchSquares(),
      this.fetchSettings()
    ]) 
    this.setUp();
  },
  methods: {
    ...mapActions(['fetchPlayers', 'fetchSquares', 'fetchSettings', 'fetchScores', 'submitSquareRequest']),
    ...mapMutations(['SET_SCORE', 'SET_QUARTER', 'TOGGLE_ACTIVELY_PICKING', 'SET_CURRENT_ACTIVE_PLAYER']),
    clearInput() {
      this.homeScore = 0;
      this.awayScore = 0;
    },
    getScoreByQuarter(quarter) {
      let score = this.scores.find(score => +score.quarter === +quarter);
      if (!score) return '';
      return `${this.home}: ${score.home}, ${this.away}: ${score.away}`;
    },
    setQuarter(quarter) {
      this.SET_QUARTER(quarter);
    },
    setScore() {
      this.SET_SCORE({ quarter: this.currentQuarter, home: this.homeScore, away: this.awayScore});

      this.clearInput();
    },
    setUp() {
      if (this.settings.assignments && this.currentPlayerId === 0) {
        this.$bvModal.show('playerIdPrompt')
      } else {
        this.doneAssigning = true;
      }
    },
    handlePlayerSubmit(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.playerIds.includes(+this.currentPlayerId)) {
        return this.$nextTick(() => {
          return this.$bvToast.toast('Invalid player ID', {
            title: 'Invalid player ID',
            solid: true,
            variant: 'danger',
            autoHideDelay: 10000,
            noCloseButton: true
          });
        });
      }

      this.$nextTick(() => {
        this.$bvToast.toast('Player assigned!', {
          title: 'Begin picking your squares.',
          solid: true,
          variant: 'success',
          autoHideDelay: 10000,
          noCloseButton: true
        });

        this.TOGGLE_ACTIVELY_PICKING();
        this.SET_CURRENT_ACTIVE_PLAYER(
          this.players.find(player => +player.player_id === +this.currentPlayerId)
        );

        if (!+this.availableSquares) {
          this.$bvToast.toast('You do not have any squares left to assign!', {
            title: 'You do not have any squares left to assign!',
            solid: true,
            variant: 'danger',
            autoHideDelay: 10000,
            noCloseButton: true
          });
        }

        this.$bvModal.hide('playerIdPrompt')
      })
    },
    async confirmSquares() {
      // Are you sure?
      await this.submitSquareRequest({ squares: this.pickedSquares, player_id: this.currentPlayer.player_id });
      location.reload();
    }
  },
  watch: {
    currentQuarter() {
      this.clearInput();
    }
  }
}
</script>
