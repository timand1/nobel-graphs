<script setup lang="ts">
    import { Ref, ref, watch } from "vue";
    import { AnimeInstance } from "animejs";
    import { Bar, PolarArea, Pie } from "vue-chartjs";
    import { categoryLaureatesData, mostWinsData } from "../composables/laureatesData";
    import { animationIn, animationOut } from "../composables/chartAnimations";

    type ChartOptions = {
      [key: string] : boolean | SubChartOption
    }

    type SubChartOption = {
      [key: string] : boolean | SubChartOption
    }

    const props = defineProps([
    "chartOptions",
    "active",
    "animationType",
    "prevActiveChart",
    ]);

    watch(() => props.active, (newVal) => {   
        if (newVal == "laureatesCategory") {
            const animation: (AnimeInstance | null | undefined) = animationIn('.laureatesCategory-container', props.animationType)
            animation ? animation.play() : null
        } else if (props.prevActiveChart == "laureatesCategory") {
                const animation: (AnimeInstance | null | undefined) = animationOut('.laureatesCategory-container', props.animationType)
                animation ? animation.play() : null
        } else {            
            return
        }
    });
    // Charts
    let laureatesCategoryPieChart: Ref<boolean> = ref(true);
    let mostWins: Ref<boolean> = ref(false);

    let pieOptions: ChartOptions = { 
      responsive: true, 
      maintainAspectRatio: false,  
      scales: {
        x: {
            display: false
        }
      } 
    }

    const changelaureatesCategoryChart: () => void = () => {
      laureatesCategoryPieChart.value = !laureatesCategoryPieChart.value;
    };

    const showMostWins: () => void = () => {      
      mostWins.value = !mostWins.value
    }

</script>

<template>
  <div class="laureatesCategory-container chart" :class="{ laureatesCategory : props.active == 'laureatesCategory'}">
    <div class="button-container">
      <button v-if="!mostWins" @click="changelaureatesCategoryChart">
        {{ laureatesCategoryPieChart ? "Bar Chart" : "Pie Chart" }}
      </button>
      <button @click="showMostWins">{{mostWins ? 'Category' : 'Most wins'}}</button>
    </div>
    <h2>{{mostWins ?  'Most wins per laureate' : 'No. of laureates per category'}}</h2>
    <div v-if="mostWins">
      <Pie
        :chart-data="mostWinsData"
        :chart-options="pieOptions"
      />
    </div>
    <div v-else>
      <PolarArea
        :chart-data="categoryLaureatesData"
        v-if="laureatesCategoryPieChart"
        :chart-options="pieOptions"
      />
      <Bar :chart-data="categoryLaureatesData" v-else :chart-options="props.chartOptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.laureatesCategory-container {
  opacity: 0;
  pointer-events: none;
}

.laureatesCategory {
  opacity: 0;
  pointer-events: all;
  z-index: 2;
}
</style>
