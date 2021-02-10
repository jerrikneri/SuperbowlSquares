<template>
  <div class="wrapper">
      <button @click="allSquaresAssigned = !allSquaresAssigned">TEMP</button>
      <h1 class="text-center">Superbowl Squares</h1>

      <hr>
      
      <h2 class="text-center">{{ away }} - X AXIS</h2>
      <h2 class="text-center">{{ home }} - Y AXIS</h2>
      <hr>

      <GameInformation />

      <hr>
      <div class="squares-wrapper">
          <div v-for="squareX in digits" :key="`${squareX}-x`" class="squares-row">
              <div class="label labelX" v-show="allSquaresAssigned"> {{ awayDigits[currentQuarter][squareX] }}</div>
              <div v-for="squareY in digits" :key="`${squareY}-y`">
                  <div v-if="squareX === 0" class="label labelY" v-show="allSquaresAssigned">
                      {{ homeDigits[currentQuarter][squareY] }}
                    </div>
                  <Square :xPosition="squareX" :yPosition="squareY"
                    :awayScore="awayDigits[currentQuarter][squareX]" :homeScore="homeDigits[currentQuarter][squareY]" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GameInformation from './GameInformation';
import Square from './Square';

export default {
  name: 'Squares',
  components: { GameInformation, Square },
  data() {
      return {
          length: 10,
          digits: [0,1,2,3,4,5,6,7,8,9],
          allSquaresAssigned: false
      }
  },
  computed: {
      ...mapState(['currentQuarter', 'home', 'away']),
      awayDigits() {
          return {
              1: this.awayQuarterOne,
              2: this.awayQuarterTwo,
              3: this.awayQuarterThree,
              4: this.awayQuarterFour,
          }
      },
      awayQuarterOne() {
        let awayQuarterOneDigits = this.generateRandomDigits();

        return awayQuarterOneDigits;
      },
      awayQuarterTwo() {
        let awayQuarterTwoDigits = this.generateRandomDigits();

        return awayQuarterTwoDigits;
      },
      awayQuarterThree() {
        let awayQuarterThreeDigits = this.generateRandomDigits();

        return awayQuarterThreeDigits;
      },
      awayQuarterFour() {
        let awayQuarterFourDigits = this.generateRandomDigits();

        return awayQuarterFourDigits;
      },
      homeDigits() {
          return {
              1: this.homeQuarterOne,
              2: this.homeQuarterTwo,
              3: this.homeQuarterThree,
              4: this.homeQuarterFour,
          }
      },
      homeQuarterOne() {
        let homeQuarterOneDigits = this.generateRandomDigits();

        return homeQuarterOneDigits;
      },
      homeQuarterTwo() {
        let homeQuarterTwoDigits = this.generateRandomDigits();
        
        return homeQuarterTwoDigits;
      },
      homeQuarterThree() {
        let homeQuarterThreeDigits = this.generateRandomDigits();
        
        return homeQuarterThreeDigits;
      },
      homeQuarterFour() {
        let homeQuarterFourDigits = this.generateRandomDigits();
        
        return homeQuarterFourDigits;
      }
  },
  methods: {
      generateRandomDigits() {
        let numbers = [];
        while(numbers.length < 10){
            var randomNumber = Math.floor(Math.random() * this.length);
            if (numbers.indexOf(randomNumber) === -1) numbers.push(randomNumber);
        }

        return numbers;
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
    grid-gap: 10px;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
    color: #444;
    flex-wrap: wrap;
    overflow: scroll;
}
</style>