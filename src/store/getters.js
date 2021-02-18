export default {
    playerIds: (state) => {
        const ids = state.players.map(player => player.player_id);
        return ids.concat([+process.env.VUE_APP_ADMIN_ID]);
    },


    availableSquares: (state, getters) => state.squares - getters.takenSquares,
    takenSquares: (state) => state.players.length && state.players.reduce((player, prev) => ({ squares: (+player.squares) + (+prev.squares) })).squares,

    remainingPlayerSquares: (state) => {
        if (!state.players.length) {
            return;
        }
        let activePlayer = state.players.find(player => +player.player_id === +state.currentPlayer.player_id);

        if (!activePlayer) {
            return;
        }
        
        let alreadyAssignedSquares = state.squareAssignments.filter(square => +square.player_id === +state.currentPlayer.player_id).length;
        
        return activePlayer.squares - state.pickedSquares.length - alreadyAssignedSquares;
    },

    squareAssignment: (state) => ({ x, y }) => state.squareAssignments.length && state.squareAssignments.find(square => square.x === x && square.y === y)
};