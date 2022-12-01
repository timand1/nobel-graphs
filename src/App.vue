<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import './App.scss';
  import Charts from './views/Charts.vue'
  import Landing from './views/Landing.vue'

  const activeChart: Ref<boolean> = ref(false)
  const showCharts: () => void = () => {
    activeChart.value = !activeChart.value
  }
</script>

<template>
  <div id="app" v-cloak >
    <Landing v-if="!activeChart" @showCharts="showCharts"/>
    <Charts v-else @showCharts="showCharts"/>
  </div>
</template>

<style scoped>
  [v-cloak] {
    display: none;
  }

  #app {
    width: 100%;
    height: 100vh;
  }
</style>
