export default {
    SET_QUARTER(state, quarter) {
        state.currentQuarter = quarter;
    },
    SET_SCORE(state, { quarter, home, away }) {
        let existingScoreIndex = state.scores.findIndex(score => +score.quarter === +quarter);

        if (existingScoreIndex !== -1) {
            return state.scores[existingScoreIndex] = { quarter, home, away };
        }

        state.scores.push({ quarter, home, away });
    },
    SET_TEAM(state, { team, name }) {
        state[team] = name;
    }
};