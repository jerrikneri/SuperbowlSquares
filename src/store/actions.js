import axios from 'axios';

export default {  
    async fetchPlayers({ commit }) {
        const { data } = await axios.get('players');
        console.log('data', data);

        commit('SET_PLAYERS', data);
    },
    async addPlayerRequest({ commit }, player) {
        const { data } = await axios.post('players', player);

        commit('ADD_PLAYER', data);
    },
    async updatePlayerRequest({ commit }, player) {
        const { data } = await axios.patch(`players/${player.id}`, player);

        commit ('UPDATE_PLAYER', data);
    },
    async deletePlayerRequest({ commit }, playerId) {
        const { data } = await axios.delete(`players/${playerId}`);

        commit('DELETE_PLAYER', data);
    }
};