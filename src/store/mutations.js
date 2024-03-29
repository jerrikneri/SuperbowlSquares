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

    SET_SCORES(state, { home, away }) {
        state.homeDigits = home;
        state.awayDigits = away;
    },

    SET_SQUARES(state, squares) {
        state.squareAssignments = squares;
    },

    SET_SETTINGS(state, { field, value }) {
        state.settings[field] = value;
    },
    SET_ALL_SETTINGS(state, settings) {
        state.settings = settings;
    },
    SET_TEAM(state, { team, name }) {
        state[team] = name;
    },

    SET_CURRENT_ACTIVE_PLAYER(state, player) {
        state.currentPlayer = player
    },


    TOGGLE_ACTIVELY_PICKING(state) {
        state.readyForAssignment = !state.readyForAssignment;
    },

    TOGGLE_PICKED_SQUARE(state, square) {
        let existingSquareIndex = state.pickedSquares.findIndex(pickedSquare => pickedSquare.x === square.x && pickedSquare.y === square.y);

        if (existingSquareIndex !== -1) {
            return state.pickedSquares.splice(existingSquareIndex, 1);
        }

        state.pickedSquares.push(square);
    }
};