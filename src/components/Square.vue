<template>
    <div class="square"
        :class="{ 'winner': isWinner, 'cursor': !assignedPlayer }"
        :style="getBackground"
        @click="assign">
        <h1>{{ label }}</h1>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
    name: 'Square',
    props: {
        awayScore: {
            required: true,
            type: Number
        },
        homeScore: {
            required: true,
            type: Number
        },
        xPosition: {
            required: true,
            type: Number
        },
        yPosition: {
            required: true,
            type: Number
        },
        assignment: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            selected: false
        }
    },
    computed: {
        ...mapGetters(['squareAssignment', 'remainingPlayerSquares']),
        ...mapState(['currentQuarter', 'scores', 'readyForAssignment', 'players']),
        isWinner() {
            let currentScore = this.scores.find(score => +score.quarter === +this.currentQuarter);
            if (!currentScore) return false;
            let { away, home } = currentScore;
            away = this.getLastDigit(away);
            home = this.getLastDigit(home);

            return (+away === +this.awayScore) && (+home === +this.homeScore);
        },
        assignedPlayer() {
            let assignment = this.squareAssignment({ x: this.xPosition, y: this.yPosition});

            let player = this.players.length && this.players.find(player => player.player_id === assignment.player_id);

            return player || null;
        },
        label() {
            return this.selected ? 'SELECTED' 
                            : (this.assignedPlayer && this.assignedPlayer.handle || 'AVAILABLE')
        },
        getBackground() {
            return {
                background: this.selected ? 'yellow' : (this.assignedPlayer && this.assignedPlayer.color || '')
                }
        }

    },
    methods: {
        ...mapMutations(['TOGGLE_PICKED_SQUARE']),
        assign() {
            if (this.assignedPlayer) {
                return;
            }

            if (!this.readyForAssignment) {
                return this.$bvToast.toast("You've reached your maximum squares or player is not assigned.", {
                    title: 'Squares not available',
                    solid: true,
                    variant: 'danger',
                    autoHideDelay: 10000,
                    noCloseButton: true
                });
            }
            if (!this.selected && this.remainingPlayerSquares === 0) {
                return this.$bvToast.toast("You've reached your maximum squares.", {
                    title: 'Squares not available',
                    solid: true,
                    variant: 'danger',
                    autoHideDelay: 10000,
                    noCloseButton: true
                });
            }

            this.selected = !this.selected;

            this.TOGGLE_PICKED_SQUARE({ x: this.xPosition, y: this.yPosition });
        },
        getLastDigit(number) {
            return Number.isInteger(number)
                ? number % 10
                : number.toString().slice(-1);
        }
    }
}
</script>

<style scoped>
.cursor {
    cursor: pointer;
}

.square {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
    margin-bottom: 10px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.winner {
    background: yellow;
    color: black;
}
</style>