<template>
  <div class="wrapper">
      <h1 class="text-center">Superbowl Squares</h1>

      <hr>

      <GameInformation />

      <hr>
      <div class="squares-wrapper py-10 ml-10" v-if="awayDigits && homeDigits">
          <div v-for="squareX in digits" :key="`${squareX}-x`" class="squares-row">
              <div class="label labelX" v-show="settings.numbers"> {{ awayDigits[currentQuarter][squareX] }}</div>
              <div v-for="squareY in digits" :key="`${squareY}-y`">
                  <div v-if="squareX === 0" class="label labelY" v-show="settings.numbers">
                      {{ homeDigits[currentQuarter][squareY] }}
                    </div>
                  <Square :xPosition="squareX" :yPosition="squareY"
                    :awayScore="awayDigits[currentQuarter][squareX]" :homeScore="homeDigits[currentQuarter][squareY]"
                    @alert="showAlert" />
              </div>
          </div>
      </div>

          <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      top
      large
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import GameInformation from './GameInformation';
import Square from './Square';

export default {
  name: 'Squares',
  components: { GameInformation, Square },
  data() {
      return {
          digits: [0,1,2,3,4,5,6,7,8,9],
          message: '',
          showSnackbar: false,
          snackbarColor: 'red'
      }
  },
  computed: {
    ...mapGetters(['awayDigits', 'homeDigits']),
    ...mapState(['currentQuarter', 'home', 'away', 'settings']),
  },
  created() {
    this.fetchScores();
  },
  methods: {
    ...mapActions(['fetchScores']),
    showAlert(message) {
      this.message = message;
      this.showSnackbar = true;

      window.scrollTo(0,0);
    }
  }
}
</script>

<style scoped>
.label {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
}

.labelY {
    display: inline-block;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 10px;
    position: absolute;
    left: -15px;
}

.squares-wrapper {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
    color: #444;
    flex-wrap: wrap;
    overflow: scroll;
}

.wrapper {
  background: black;
}
</style>