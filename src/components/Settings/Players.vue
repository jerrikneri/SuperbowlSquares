<template>
    <div>
        <h2>Available Squares: {{ availableSquares }}</h2>
        <table class="players">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Handle</th>
                <th scope="col"># of Squares</th>
                <th scope="col">Color</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in players" :key="player.name">
                    <th scope="row">{{ player.player_id }}</th>
                    <td>{{ player.name }}</td>
                    <td>{{ player.handle }}</td>
                    <td>{{ player.squares }}</td>
                    <td>{{ player.color }}</td>
                    <td>
                        <button @click="editPlayer(player.id)">Edit</button>
                        <button @click="deletePlayer(player.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-show="availableSquares">
            <label for="">
                Player Name
                <input type="text" v-model="newPlayer.name">
            </label>
            <label for="">
                Player Handle
                <input type="text" v-model="newPlayer.handle">
            </label>
            <label for="">
                # of Squares
                <input type="number" v-model="newPlayer.squares">
            </label>
            <label for="">
                Color
                <input type="text" v-model="newPlayer.color">
            </label>
            <button @click="addPlayer">Add Player</button>
        </div>


        <b-modal id="editPlayer"
                title="Edit Player"
                @ok="updatePlayerRequest(playerEdits)"
                no-close-on-backdrop
                no-close-on-esc
                hide-header-close>
            <label for="">
                Player Name
                <input type="text" v-model="playerEdits.name">
            </label>
            <label for="">
                Player Handle
                <input type="text" v-model="playerEdits.handle">
            </label>
            <label for="">
                # of Squares
                <input type="number" v-model="playerEdits.squares">
            </label>
            <label for="">
                Color
                <input type="text" v-model="playerEdits.color">
            </label>
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'Players',
    data() {
        return {
            newPlayer: {
                id: 0,
                name: '',
                handle: '',
                squares: 0,
                color: ''
            },
            playerEdits: {
                id: 0,
                player_id: 0,
                name: '',
                handle: '',
                squares: 0,
                color: ''
            }
        }
    },
    computed: {
        ...mapGetters(['availableSquares', 'takenSquares']),
        ...mapState(['players']),
        validPlayer() {
            return !!(
                this.newPlayer.name
                && this.newPlayer.handle
                && this.newPlayer.color
                && this.newPlayer.squares
                && (this.availableSquares - this.newPlayer.squares >= 0)
            )
        }
    },
    async created() {
        await this.fetchPlayers()
    },
    methods: {
        ...mapActions(['fetchPlayers', 'addPlayerRequest', 'updatePlayerRequest', 'deletePlayerRequest']),
        addPlayer() {
            if (!this.validPlayer) {
                return;
            }
            this.generateUniqueId();
            
            this.addPlayerRequest(this.newPlayer);
    
            this.clearInput();
        },
        editPlayer(id) {
            const player = this.players.find(player => +player.id === +id);
            this.playerEdits.id = player.id;
            this.playerEdits.player_id = player.player_id;
            this.playerEdits.name = player.name;
            this.playerEdits.handle = player.handle;
            this.playerEdits.color = player.color;
            this.playerEdits.squares = player.squares;

            this.$bvModal.show('editPlayer')
        },
        deletePlayer(id) {
            // TODO: confirm delete
            this.deletePlayerRequest(id);
        },
        clearInput() {
            this.newPlayer.name = '';
            this.newPlayer.handle = '';
            this.newPlayer.color = '';
            this.newPlayer.squares = 0;
        },
        generateThreeDigitNumber() {
            return Math.floor(Math.random()*(999+1))
        },
        generateUniqueId() {
            let idNumber = this.generateThreeDigitNumber();
            let existingNumbers = this.players.map(player => player.player_id);
            while (existingNumbers.includes(idNumber)) {
                idNumber = this.generateThreeDigitNumber();
            }

            this.newPlayer.player_id = idNumber;
        }
    }
}
</script>

<style scoped>
.players {
    color: white;
    font-weight: 800;
    font-size: 30;
}
</style>

