import axios from 'axios';

export default {  
    async fetchPlayers({ commit }) {
        const { data } = await axios.get('players');

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
    },


    async fetchSquares({ commit }) {
        const { data } = await axios.get('squares');

        commit('SET_SQUARES', data);
    },



    async fetchSettings({ commit }) {
        const { data } = await axios.get('settings');

        commit('SET_ALL_SETTINGS', data);
    },
    async saveSettings({ commit }, settings) {
        const { data } = await axios.post('settings', settings);

        commit('SET_ALL_SETTINGS', data);
    }
};