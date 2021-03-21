<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div class="text-white" v-else>
      <v-btn v-show="isAdmin" color="primary" @click="$router.push({ name: 'Settings' })">
        Settings
      </v-btn>
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      top
      large
    >
      {{ message }}
    </v-snackbar>



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
        <v-container>
          <v-row class="input">
            <v-col cols="6">
              <v-input :label="away" v-model="awayScore" light />
            </v-col>
            <v-col cols="6">
              <v-input :label="home" v-model="homeScore" light />
            </v-col>
          </v-row>
        </v-container>
        
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

      <v-btn v-if="!remainingPlayerSquares" @click="confirmSquares" color="success" large>Confirm Squares</v-btn>
    </div>

      <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card dark>
        <v-card-title>
          <span class="headline">What is your Player ID?</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Player ID*"
                  required
                  v-model="currentPlayerId"
                  @keydown.enter="handlePlayerSubmit"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="handlePlayerSubmit"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'GameInformation',
  data() {
    return {
      loading: false,
      dialog: false,
      message: '',
      showSnackbar: false,
      snackbarColor: 'green',
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
    this.loading = true;
    await Promise.all([
      this.fetchPlayers(),
      this.fetchSquares(),
      this.fetchSettings()
    ]);
    this.loading = false;
    this.setUp();
  },
  methods: {
    ...mapActions(['fetchPlayers', 'fetchSquares', 'fetchSettings', 'submitSquareRequest']),
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
        this.dialog = true;
      } else {
        this.doneAssigning = true;
      }
    },
    handlePlayerSubmit() {
      if (this.isAdmin) {
        this.dialog = false;
        return
      }
      if (!this.playerIds.includes(+this.currentPlayerId)) {
        return this.$nextTick(() => {
          this.snackbarColor = 'red';
          this.message = 'Invalid player ID';
          this.showSnackbar = true;
          return;
        });
      }

      this.$nextTick(() => {
        this.snackbarColor = 'green';
        this.message = 'Player assigned successfully!';
        this.showSnackbar = true;

        this.TOGGLE_ACTIVELY_PICKING();
        this.SET_CURRENT_ACTIVE_PLAYER(
          this.players.find(player => +player.player_id === +this.currentPlayerId)
        );

        // if (!+this.availableSquares) {
        //   this.snackbarColor = 'red';
        //   this.message = 'You do not have any squares left to assign!'
        //   this.showSnackbar = true;
        // }

        this.dialog = false;
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

<style scoped>
.input {
  color: white;
}
</style>
