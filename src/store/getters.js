export default {
    playerIds: (state) => {
        const ids = state.players.map(player => player.id);
        return ids.concat([+process.env.VUE_APP_ADMIN_ID]);
    },
    availableSquares: (state, getters) => state.squares - getters.takenSquares,
    takenSquares: (state) => state.players.reduce((player, prev) => ({ squares: (+player.squares) + (+prev.squares) })).squares
};