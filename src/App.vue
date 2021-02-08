<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
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
