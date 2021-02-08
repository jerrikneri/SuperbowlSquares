<template>
    <div class="square cursor"
        :class="{ 'winner': isWinner }"
        @click="assign">
        <h1>{{ assignedName || 'AVAILABLE' }}</h1>
        <p>
            Pos: ({{ xPosition }}, {{ yPosition }})
        </p>
        <p>
            Home: {{ homeScore }}
            Away: {{ awayScore }}
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

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
    computed: {
        ...mapState(['currentQuarter', 'scores']),
        isWinner() {
            let currentScore = this.scores.find(score => +score.quarter === +this.currentQuarter);
            if (!currentScore) return false;
            let { away, home } = currentScore;
            away = this.getLastDigit(away);
            home = this.getLastDigit(home);

            return (+away === +this.awayScore) && (+home === +this.homeScore);
        }
    },
    methods: {
        assign() {
            alert(this.$props)
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