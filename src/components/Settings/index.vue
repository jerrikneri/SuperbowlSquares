<template>
    <div class="settings-wrapper">
        <button @click="$router.push({ name: 'Squares' })">Back to board</button>
        <h1 class="text-center">Settings</h1>

        <section>
            <h3>Allow Assignments</h3>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="assignments_on" autocomplete="off" @click="setAssignment(true)"
                        :checked="settings.assignments ? true : null"> On
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="assignments_off" autocomplete="off" @click="setAssignment(false)"
                        :checked="settings.assignments ? null: true"> Off
                </label>
            </div>
        </section>

        <section>
            <h2>Players:</h2>
            <Players />

            
        </section>

        <button> Save </button>

    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import Players from './Players';

export default {
    name: 'Settings',
    components: { Players },
    computed: mapState(['settings']),
    methods: {
        ...mapMutations(['SET_SETTINGS']),
        setAssignment(value) {
            this.SET_SETTINGS({ field: 'assignments', value });
        }
    }
}
</script>

<style scoped>
.settings-wrapper {
    background: black;
    height: 100vh
}
</style>