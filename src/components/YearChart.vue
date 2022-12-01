<script setup lang="ts">
    import { Ref, ref, watch } from "vue";
    import { AnimeInstance } from "animejs";
    import { Bar, Pie } from "vue-chartjs";
    import { chartUpdate, uniquePrizes, colors, uniqueYears } from "../composables/awardsData";
    import { animationIn, animationOut } from "../composables/animations";

    type DatasetProps = {
        label: string
        data: string[]
        backgroundColor: string[]
    }

    type DataProp = {
        labels: string[];
        datasets: DatasetProps[]
    }
    
    const props = defineProps([
        "chartOptions",
        "active",
        "animationType",
        "prevActiveChart",
    ]);

    watch(() => props.active, (newVal) => {   
        if (newVal == "year") {
            const animation: (AnimeInstance | null | undefined) = animationIn('.year-container', props.animationType)
            animation ? animation.play() : null
        } else if (props.prevActiveChart == "year") {
                const animation: (AnimeInstance | null | undefined) = animationOut('.year-container', props.animationType)
                animation ? animation.play() : null
        } else {            
            return
        }
    });

    // Charts
    let yearPieChart: Ref<boolean> = ref(true);
    let chosenYear: Ref<string> = ref('2019');
    const chartYear = ref();

    let pieOptions = { responsive: true, maintainAspectRatio: false,  scales:{
        x: {
            display: false
        }
    } }

    const changeYearChart: () => void = () => {
        yearPieChart.value = !yearPieChart.value;
    };

    let yearData: DataProp = {
        labels: uniquePrizes,
        datasets: 
        [
            {
                label: 'Laureates',
                data: chartUpdate(chosenYear.value),
                backgroundColor: colors,
            },
        ],
    }
    const updateYear: () => void = () => {   
        const newData: string[] = chartUpdate(chosenYear.value)
        chartYear.value.chart.data.datasets = [
            {
                label: 'Laureates',
                data: newData,
                backgroundColor: colors,
            },
        ]

        chartYear.value.updateChart()
    }
</script>

<template>
  <div class="year-container chart" :class="{ year : props.active == 'year'}">
    <button @click="changeYearChart">
      {{ yearPieChart ? "Bar Chart" : "Pie Chart" }}
    </button>
    <div class="headline">
        <h2>Category laureates per year</h2>
        <select v-model="chosenYear" @change="updateYear">
            <option v-for="year in uniqueYears" :key="year">{{year}}</option>
        </select>
    </div>
    <Pie
      :chart-data="yearData"
      v-if="yearPieChart"
      :chart-options="pieOptions"
      ref="chartYear"
    />
    
    <Bar :chart-data="yearData" v-else :chart-options="props.chartOptions" ref="chartYear" />
  </div>
</template>

<style lang="scss" scoped>
.year-container {
  opacity: 0;
  pointer-events: none;
  .headline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    background-color: transparent;
    height: fit-content;
  }

  select {
    border: none;
    outline: none;
    font-size: 1em;
    border-radius: 0.4em;
    padding: 0 1em;
    transition: all 400ms;
    background: linear-gradient(to top, #a79374 50%, white 50%);
    background-size: 100% 200%;
    background-position: top;
    box-shadow: 0.2em 0.2em 0.2em  rgba(0, 0, 0, 0.589);
    &:hover {
        background-position: bottom;
        color: #fff;
        box-shadow: -0.2em -0.2em 0.2em  rgba(0, 0, 0, 0.589); 
    }
    option {
        color: #000;
    }
  }
}

.year {
  opacity: 0;
  pointer-events: all;
  z-index: 2;
}
</style>