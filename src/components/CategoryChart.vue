<script setup lang="ts">
    import { Ref, ref, watch } from "vue";
    import { AnimeInstance } from "animejs";
    import { Bar, Doughnut } from "vue-chartjs";
    import { categoryData } from "../composables/awardsData";
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
        if (newVal == "category") {
            const animation: (AnimeInstance | null | undefined) = animationIn('.category-container', props.animationType)
            animation ? animation.play() : null
        } else if (props.prevActiveChart == "category") {
                const animation: (AnimeInstance | null | undefined) = animationOut('.category-container', props.animationType)
                animation ? animation.play() : null
        } else {            
            return
        }
    });

    // Charts
    let categoryPieChart: Ref<boolean> = ref(true);
      let pieOptions: ChartOptions = { 
      responsive: true, 
      maintainAspectRatio: false,  
      scales: {
        x: {
            display: false
        }
      } 
    }
    const changecategoryChart: () => void = () => {
    categoryPieChart.value = !categoryPieChart.value;
    };
</script>

<template>
  <div class="category-container chart" :class="{ category : props.active == 'category'}">
    <button @click="changecategoryChart">
      {{ categoryPieChart ? "Bar Chart" : "Pie Chart" }}
    </button>
    <h2>Times category was included</h2>
    <Doughnut
      :chart-data="categoryData"
      v-if="categoryPieChart"
      :chart-options="pieOptions"
    />
    <Bar :chart-data="categoryData" v-else :chart-options="props.chartOptions" />
  </div>
</template>

<style lang="scss" scoped>
.category-container {
  opacity: 0;
  pointer-events: none;
}

.category {
  opacity: 0;
  pointer-events: all;
  z-index: 2;
}
</style>
