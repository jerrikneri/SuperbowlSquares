<template>
    <div class="settings-wrapper">
        <v-container>
            <v-row>
                <v-card class="pa-5 my-5" dark>
                    <v-btn @click="$router.push({ name: 'Squares' })"
                        color="secondary"
                        light
                        block
                        class="ml-auto">Back to board</v-btn>
                </v-card>
                <v-card class="pa-5 mb-5" dark>
                    <h1 class="text-center">
                        Settings
                    </h1>
                </v-card>

                <v-card v-show="!availableSquares" class="pa-5 mb-5" dark>
                    <v-card-title>
                        Allow Assignments

                        <div class="ml-auto btn-group btn-group-toggle"
                        data-toggle="buttons">
                            <label class="btn btn-secondary ">
                                <input type="radio"
                                    name="assignments"
                                    id="assignments_on"
                                    autocomplete="off"
                                    @click="setAssignment(true)"
                                    :checked="settings.assignments ? true : null"> On
                            </label>
                            <label class="btn btn-secondary">
                                <input type="radio"
                                    name="assignments"
                                    id="assignments_off"
                                    autocomplete="off"
                                    @click="setAssignment(false)"
                                    :checked="settings.assignments ? null: true"> Off
                            </label>
                        </div>
                    </v-card-title>
                </v-card>

                <v-card class="pa-5 mb-5" dark>
                    <v-card-title>
                        Scores

                        <v-btn class="ml-auto"
                            color="primary"
                            @click="generateScores">Generate</v-btn>
                    </v-card-title>
                    
                </v-card>

                <v-card class="pa-5 mb-5" dark>
                    <v-card-title>
                        Squares

                        <v-btn class="ml-auto"
                            color="primary"
                            @click="resetSquares">Reset All Squares</v-btn>
                    </v-card-title>
                </v-card>

                <v-card class="pa-5 mb-5" dark v-show="allSquaresAssigned">
                    <section>
                        <v-card-title>
                            Show numbers

                            <div class="ml-auto btn-group btn-group-toggle"
                            data-toggle="buttons2">
                                <label class="btn btn-secondary ">
                                    <input type="radio"
                                        name="numbers"
                                        id="numbers_on"
                                        autocomplete="off"
                                        @click="setNumbers(true)"
                                        :checked="settings.numbers ? true : null"> On
                                </label>
                                <label class="btn btn-secondary">
                                    <input type="radio"
                                        name="numbers"
                                        id="numbers_off"
                                        autocomplete="off"
                                        @click="setNumbers(false)"
                                        :checked="settings.numbers ? null: true"> Off
                                </label>
                            </div>
                        </v-card-title>
                        
                    </section>
                </v-card>

                <v-card class="pa-5 mb-5" dark>
                    <section>
                        <v-card-title>
                            Players:
                        </v-card-title>

                        <v-container>
                            <Players />
                        </v-container>
                    </section>
                </v-card>

                <v-card class="pa-5 mb-5" dark>
                    <v-btn color="primary" light block @click="save"> Save </v-btn>
                </v-card>
            </v-row>

        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import Players from "./Players";

export default {
    name: "Settings",
    components: { Players },
    computed: {
        ...mapGetters(["availableSquares", "allSquaresAssigned"]),
        ...mapState(["settings"]),
    },
    created() {
        this.fetchScores();
        this.fetchSettings();
        this.fetchSquares();
    },
    methods: {
        ...mapActions([
            "fetchSettings",
            "fetchScores",
            "fetchSquares",
            "saveSettings",
            "setScores",
            "resetSquares",
        ]),
        ...mapMutations(["SET_SETTINGS"]),
        setAssignment(value) {
            this.SET_SETTINGS({ field: "assignments", value });
        },
        setNumbers(value) {
            this.SET_SETTINGS({ field: "numbers", value });
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
            };
        },
        generateAwayScores() {
            return {
                first_quarter: this.generateRandomDigits(),
                second_quarter: this.generateRandomDigits(),
                third_quarter: this.generateRandomDigits(),
                fourth_quarter: this.generateRandomDigits(),
            };
        },
        generateRandomDigits() {
            let numbers = [];
            while (numbers.length < 10) {
                var randomNumber = Math.floor(Math.random() * 10);
                if (numbers.indexOf(randomNumber) === -1)
                    numbers.push(randomNumber);
            }

            return numbers;
        },
    },
};
</script>

<style scoped>
.settings-wrapper {
    background: black;
}
</style>
