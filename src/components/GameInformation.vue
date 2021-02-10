<template>
  <div class="game-information-wrapper text-center">
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


    <b-modal id="playerIdPrompt" title="What is your player id? ###">
      <input type="text" placeholder="Player ID ###">
    </b-modal>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'GameInformation',
  data() {
    return {
      currentPlayerId: 0,
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
    ...mapState(['currentQuarter', 'home', 'away', 'scores', 'settings'])
  },
  mounted() {
    this.setUp();
  },
  methods: {
    ...mapMutations(['SET_SCORE', 'SET_QUARTER']),
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
        console.log('Prompt  for user id to begin assignments');
        this.$bvModal.show('playerIdPrompt')
      }
    }
  },
  watch: {
    currentQuarter() {
      this.clearInput();
    }
  }
}
</script>
