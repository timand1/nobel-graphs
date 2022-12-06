<script setup lang="ts">
    import { reactive, Ref, ref, watch } from "vue";
    import { Line as LineChart, Bar } from "vue-chartjs";
    import { AnimeInstance } from "animejs";
    import { prizeYearData } from "../composables/awardsData";
    import { animationIn, animationOut } from "../composables/chartAnimations";

    type DatasetProps = {
      label: string
      data: number[]
      backgroundColor: string,
      borderWidth: number,
      borderColor: string,
      pointBorderWidth: number
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
        if (newVal == "prize") {
            const animation: (AnimeInstance | null | undefined) = animationIn('.prize-container', props.animationType)
            animation ? animation.play() : null
        } else if (props.prevActiveChart == "prize") {
                const animation: (AnimeInstance | null | undefined) = animationOut('.prize-container', props.animationType)
                animation ? animation.play() : null
        } else {            
            return
        }
    });

    // Chart

    let prizeAdjusted: Ref<boolean> = ref(false);
    let awardPrizeData = reactive(prizeYearData);
    let prizeCompare: Ref<boolean> = ref(false);
    const prizeLineChart = ref();
    let prizeBarChart: Ref<boolean> = ref(false);

    const changePrizeChart: () => void = () => {
    prizeBarChart.value = !prizeBarChart.value;
    prizeCompare.value = false
    };

    let prizeData: DataProp = {
    labels: prizeYearData.awardYear,
    datasets: [
        {
        label: "Prize (SEK)",
        data: awardPrizeData.prizeAmount,
        borderColor: "rgb(70, 70, 202)",
        borderWidth: 1,
        pointBorderWidth: 0.2,
        backgroundColor: "rgb(70, 70, 202)",
        },
    ],
    };
    let adjustedPrizeData: DatasetProps[] = [
    {
        label: "Prize Adjusted (SEK)",
        data: awardPrizeData.prizeAmountAdjusted,
        borderColor: "rgb(202, 70, 100)",
        borderWidth: 1,
        pointBorderWidth: 0.2,
        backgroundColor: "rgb(202, 70, 100)",
    },
    ];

    const changePrizeAdjusted: () => void = () => {
    prizeCompare.value = false;
    prizeLineChart.value.chart.data.datasets.length > 0
        ? (prizeLineChart.value.chart.data.datasets = [])
        : null;

    prizeAdjusted.value
        ? (prizeLineChart.value.chart.data.datasets = [
            {
            label: "Prize (SEK)",
            data: awardPrizeData.prizeAmount,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: 'steelblue',
            },
        ])
        : (prizeLineChart.value.chart.data.datasets = adjustedPrizeData);

    prizeAdjusted.value = !prizeAdjusted.value;
    prizeBarChart.value
        ? (prizeLineChart.value.chart.data.datasets.backgroundColor =
            "rgb(70, 70, 202)")
        : (prizeLineChart.value.chart.data.datasets.backgroundColor =
            "transparent");
    prizeLineChart.value.updateChart();
    };

    const comparePrize: () => void = () => {
    prizeLineChart.value.chart.data.datasets.length > 1
        ? prizeLineChart.value.chart.data.datasets.pop()
        : null;
    if (prizeCompare.value) {
        prizeAdjusted.value = true;
        prizeLineChart.value.chart.data = prizeData;
    } else {
        prizeLineChart.value.chart.data.datasets = [
        {
            label: "Adjusted Prize",
            data: awardPrizeData.prizeAmountAdjusted,
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
            pointBorderWidth: 0.2,
            backgroundColor: "rgb(75, 192, 192)",
        },
        {
            label: "Given Prize",
            data: awardPrizeData.prizeAmount,
            borderColor: "rgb(75, 92, 192)",
            borderWidth: 1,
            pointBorderWidth: 0.2,
            backgroundColor: "rgb(75, 92, 192)",
        },
        ];
    }

    prizeCompare.value = !prizeCompare.value;
    prizeLineChart.value.updateChart();
    };
</script>

<template>
  <div class="prize-container chart" :class="{ prize : props.active == 'prize'}">
    <section class="button-container">
        <button @click="changePrizeAdjusted">
          {{ prizeAdjusted ? "Prize given" : "Prize adjusted" }}
        </button>
        <button @click="comparePrize">
          {{ prizeCompare ? "Show one" : "Compare prizes" }}
        </button>
        <button @click="changePrizeChart">
          {{ prizeBarChart ? "Bar Chart" : "Line Chart" }}
        </button>
    </section>
    <h2>Prize awarded per year</h2>
    <LineChart
      v-if="prizeBarChart"
      :chart-data="prizeData"
      :chart-options="props.chartOptions"
      ref="prizeLineChart"
    />
    <Bar
      v-else
      :chart-data="prizeData"
      :chart-options="props.chartOptions"
      ref="prizeLineChart"
    />
  </div>
</template>

<style lang="scss" scoped>
.prize-container {
  opacity: 0;
  pointer-events: none;
}

.prize {
  opacity: 0;
  pointer-events: all;
  z-index: 2;
}
</style>
