export default {
    ADD_PLAYER(state, player) {
        state.players.push(player);
    },
    UPDATE_PLAYER(state, player) {
        const existingPlayerIndex = state.players.findIndex(statePlayer => +statePlayer.id === +player.id);

        state.players[existingPlayerIndex] = player;
    },
    DELETE_PLAYER(state, playerId) {
        const indexToDelete = state.players.findIndex(player => +player.id === playerId);
        state.players.splice(indexToDelete, 1);
    },
    SET_ASSIGNMENT(state, value) {
        state.readyForAssignment = value;
    },
    SET_QUARTER(state, quarter) {
        state.currentQuarter = quarter;
    },
    SET_PLAYERS(state, players) {
        state.players = players;
    },
    SET_SCORE(state, { quarter, home, away }) {
        let existingScoreIndex = state.scores.findIndex(score => +score.quarter === +quarter);

        if (existingScoreIndex !== -1) {
            return state.scores[existingScoreIndex] = { quarter, home, away };
        }

        state.scores.push({ quarter, home, away });
    },
    SET_SETTINGS(state, { field, value }) {
        state.settings[field] = value;
    },
    SET_TEAM(state, { team, name }) {
        state[team] = name;
    }
};