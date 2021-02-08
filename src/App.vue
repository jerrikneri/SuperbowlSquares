<template>
  <div id="app">
    <Squares />
    <Settings />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Squares from './components/Squares.vue'

export default {
  name: 'App',
  components: {
    Squares,
  },
  mounted() {
    this.setUp()
  },
  methods: {
    ...mapMutations(['SET_TEAM']),
    setUp() {
      const home = process.env.VUE_APP_HOME;
      const away = process.env.VUE_APP_AWAY;
      this.SET_TEAM({ team: 'home', name: home });
      this.SET_TEAM({ team: 'away', name: away });
    }
  }
}
</script>

<style>
body {
  padding: 10px 50px;
}
</style>
