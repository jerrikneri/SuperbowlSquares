<template>
    <div class="app container-fluid">
      <router-view class="row" />
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
.app {
  background: black;
  color: white;
}
</style>
