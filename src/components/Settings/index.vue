<template>
    <div class="settings-wrapper">
        <button @click="$router.push({ name: 'Squares' })">Back to board</button>
        <button @click="resetSquares">Reset All Squares</button>
        <h1 class="text-center">Settings</h1>

        <section v-show="!availableSquares">
            <h3>Allow Assignments</h3>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary ">
                    <input type="radio" name="assignments" id="assignments_on" autocomplete="off" @click="setAssignment(true)"
                        :checked="settings.assignments ? true : null"> On
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="assignments" id="assignments_off" autocomplete="off" @click="setAssignment(false)"
                        :checked="settings.assignments ? null: true"> Off
                </label>
            </div>

            <h3>Scores</h3>
            <button class="btn btn-primary" @click="generateScores">Generate</button>
        </section>

        <!-- Check all squares assigned -->
        <section v-show="allSquaresAssigned">
            <h3>Show Numbers</h3>
            <div class="btn-group btn-group-toggle" data-toggle="buttons2">
                <label class="btn btn-secondary ">
                    <input type="radio" name="numbers" id="numbers_on" autocomplete="off" @click="setNumbers(true)"
                        :checked="settings.numbers ? true : null"> On
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="numbers" id="numbers_off" autocomplete="off" @click="setNumbers(false)"
                        :checked="settings.numbers ? null: true"> Off
                </label>
            </div>
        </section>

        <section>
            <h2>Players:</h2>
            <Players />
        </section>

        <button @click="save"> Save </button>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

import Players from './Players';

export default {
    name: 'Settings',
    components: { Players },
    computed: {
        ...mapGetters(['availableSquares', 'allSquaresAssigned']),
        ...mapState(['settings']),
    },
    created() {
        this.fetchScores();
        this.fetchSettings();
        this.fetchSquares()
    },
    methods: {
        ...mapActions(['fetchSettings', 'fetchScores', 'fetchSquares', 'saveSettings', 'setScores', 'resetSquares']),
        ...mapMutations(['SET_SETTINGS']),
        setAssignment(value) {
            this.SET_SETTINGS({ field: 'assignments', value });
        },
        setNumbers(value) {
            this.SET_SETTINGS({ field: 'numbers', value });
        },
        save() {
            this.saveSettings(this.settings);
        },
        generateScores() {
            const home = this.generateHomeScores();
            const away = this.generateAwayScores();
            this.setScores({ home, away });
        },
        generateHomeScores() {
            return {
                first_quarter: this.generateRandomDigits(),
                second_quarter: this.generateRandomDigits(),
                third_quarter: this.generateRandomDigits(),
                fourth_quarter: this.generateRandomDigits(),
            }
        },
        generateAwayScores() {
            return {
                first_quarter: this.generateRandomDigits(),
                second_quarter: this.generateRandomDigits(),
                third_quarter: this.generateRandomDigits(),
                fourth_quarter: this.generateRandomDigits(),
            }
        },
        generateRandomDigits() {
            let numbers = [];
            while(numbers.length < 10){
                var randomNumber = Math.floor(Math.random() * 10);
                if (numbers.indexOf(randomNumber) === -1) numbers.push(randomNumber);
            }

            return numbers;
        }
    }
}
</script>

<style scoped>
.settings-wrapper {
    background: black;
    height: 100vh
}
</style>
