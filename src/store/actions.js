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

    async fetchScores({ commit }) {
        const { data } = await axios.get('scores');

        commit('SET_SCORES', data);
    },
    async setScores({ commit }, scores) {
        const { data } = await axios.post('scores', scores);

        commit('SET_SCORES', data);
    },


    async submitSquareRequest({ commit }, { squares, player_id }) {
        const { data } = await axios.patch('squares', { squares, player_id });

        console.log('data', data);
        commit('SET_SQUARES', data);
    },


    async fetchSquares({ commit }) {
        const { data } = await axios.get('squares');

        commit('SET_SQUARES', data);
    },

    async resetSquares({ commit }) {
        const { data } = await axios.post('squares/reset');

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