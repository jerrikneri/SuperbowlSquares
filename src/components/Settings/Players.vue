<template>
    <div>
        <v-data-table :headers="headers"
                      :items="players"
                      hide-default-footer>
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>
                        Available Squares: {{ availableSquares }}
                    </v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
                        dark
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                            v-show="availableSquares"
                        >
                        Add Player
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <!-- <span class="headline">{{ formTitle }}</span> -->
                        </v-card-title>

                        <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="playerEdits.name"
                                    label="Player name"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="playerEdits.handle"
                                    label="Handle"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="playerEdits.color"
                                    label="Color"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="playerEdits.squares"
                                    label="# of Squares"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small
                        class="mr-2"
                        @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small
                        @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
    name: "Players",
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "#", value: "player_id" },
                { text: "Name", value: "name" },
                { text: "Handle", value: "handle" },
                { text: "# of Squares", value: "squares" },
                { text: "Color", value: "color" },
                { text: "Actions", value: "actions" },
            ],
            playerEdits: {
                id: 0,
                player_id: 0,
                name: "",
                handle: "",
                squares: 0,
                color: "",
            },
            temporarilyUnclaimedSquares: 0,
        };
    },
    computed: {
        ...mapGetters(["availableSquares", "takenSquares"]),
        ...mapState(["players"]),
        validPlayer() {
            return !!(
                this.playerEdits.name &&
                this.playerEdits.handle &&
                this.playerEdits.color &&
                this.playerEdits.squares &&
                this.availableSquares - this.playerEdits.squares >= 0
            );
        },
        validEditedPlayer() {
            return !!(
                this.playerEdits.name &&
                this.playerEdits.handle &&
                this.playerEdits.color &&
                +this.playerEdits.squares &&
                this.availableSquares +
                    this.temporarilyUnclaimedSquares -
                    +this.playerEdits.squares >=
                    0
            );
        },
    },
    async created() {
        await this.fetchPlayers();
    },
    methods: {
        ...mapActions([
            "fetchPlayers",
            "addPlayerRequest",
            "updatePlayerRequest",
            "deletePlayerRequest",
        ]),
        addPlayer() {
            if (!this.validPlayer) {
                return;
            }
            this.generateUniqueId();

            this.addPlayerRequest(this.playerEdits);

            this.clearInput();
        },
        save() {
            console.log('save', this.playerEdits);
            if (this.playerEdits.id) {
                this.updatePlayer();
            } else {
                this.addPlayer();
            }

            this.dialog = false;
        },
        updatePlayer() {
            if (!this.validEditedPlayer) {
                return;
            }

            this.updatePlayerRequest(this.playerEdits);
        },
        deletePlayer(id) {
            this.deletePlayerRequest(id);
        },
        clearInput() {
            this.playerEdits.name = "";
            this.playerEdits.handle = "";
            this.playerEdits.color = "";
            this.playerEdits.squares = 0;
        },
        generateThreeDigitNumber() {
            return Math.floor(Math.random() * (999 + 1));
        },
        generateUniqueId() {
            let idNumber = this.generateThreeDigitNumber();
            let existingNumbers = this.players.map(
                (player) => player.player_id
            );
            while (existingNumbers.includes(idNumber)) {
                idNumber = this.generateThreeDigitNumber();
            }

            this.playerEdits.player_id = idNumber;
        },

        editItem (item) {
            this.editedIndex = this.players.indexOf(item)
            this.playerEdits = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.editedIndex = this.players.indexOf(item);
            this.playerEdits = Object.assign({}, item);
            this.dialogDelete = true;
        },

        async deleteItemConfirm() {
            let player = this.players[this.editedIndex];
            await this.deletePlayer(player.id);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.playerEdits = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.playerEdits = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
    },
};
</script>

<style scoped>
.players {
    color: white;
    font-weight: 800;
    font-size: 30;
}
</style>

