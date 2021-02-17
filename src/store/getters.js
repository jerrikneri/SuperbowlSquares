export default {
    playerIds: (state) => {
        const ids = state.players.map(player => player.player_id);
        return ids.concat([+process.env.VUE_APP_ADMIN_ID]);
    },


    availableSquares: (state, getters) => state.squares - getters.takenSquares,
    takenSquares: (state) => state.players.length && state.players.reduce((player, prev) => ({ squares: (+player.squares) + (+prev.squares) })).squares,

    squareAssignment: (state) => ({ x, y }) => state.squareAssignments.length && state.squareAssignments.find(square => square.x === x && square.y === y)
};