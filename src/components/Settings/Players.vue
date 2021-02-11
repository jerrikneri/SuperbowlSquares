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
                    <th scope="row">{{ player.id }}</th>
                    <td>{{ player.name }}</td>
                    <td>{{ player.handle }}</td>
                    <td>{{ player.squares }}</td>
                    <td>{{ player.color }}</td>
                    <td>
                        <button>Edit</button>
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
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

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
    methods: {
        ...mapMutations(['ADD_PLAYER', 'DELETE_PLAYER']),
        addPlayer() {
            if (!this.validPlayer) {
                return;
            }
            this.generateUniqueId();
            let newPlayerClone = { ...this.newPlayer };
            this.ADD_PLAYER(newPlayerClone);
            this.clearInput();
        },
        deletePlayer(id) {
            // TODO: confirm delete
            this.DELETE_PLAYER(id);
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
            let existingNumbers = this.players.map(player => player.id);
            while (existingNumbers.includes(idNumber)) {
                idNumber = this.generateThreeDigitNumber();
            }

            this.newPlayer.id = idNumber;
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

