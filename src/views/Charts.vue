<script setup lang="ts">
    import { onMounted, Ref, ref, watch  } from 'vue';
    import ChartTop from '../components/ChartTop.vue'
    import PrizeChart from '../components/PrizeChart.vue'
    import GenderChart from '../components/GenderChart.vue'
    import CategoryChart from '../components/CategoryChart.vue'
    import LaureatesCategoryChart from '../components/LaureatesCategoryChart.vue'
    import CountryChart from '../components/CountryChart.vue'
    import YearChart from '../components/YearChart.vue'
    import {slideAnim, slideBtnAnim, fadeInAnim, slideDownNavAnim, fadeInAnimContainer } from '../composables/chartViewAnimations'
    type Options = {
        responsive: boolean,
        maintainAspectRatio: boolean
    }

    let chartOptions : Options = { 
        responsive: true, 
        maintainAspectRatio: false
    }
    
    let activeChart: Ref<string> = ref('gender')
    let prevActiveChart: Ref<string> = ref('gender')
    let animationType: Ref<string> = ref('fade')
    onMounted(slideAnim)
    onMounted(fadeInAnim)
    onMounted(slideBtnAnim)
    onMounted(slideDownNavAnim)
    onMounted(fadeInAnimContainer)

    const changeActiveChart: (chart: string) => void = (chart) => {      
        prevActiveChart.value =  activeChart.value        
        activeChart.value = chart
    }

    const changeAnimation: (type: string) => void = (type) => {
        animationType.value = type
    }

</script>

<template>
    <section class="charts" ref="charts">
        <div class="chart-container">
            <ChartTop :active="activeChart" :animationType="animationType" @changeAnimation="changeAnimation" @changeActiveChart="changeActiveChart" />
            <div class="chart-components">
                <GenderChart :active="activeChart" :chartOptions="chartOptions" :animationType="animationType" :prevActiveChart="prevActiveChart"/>
                <PrizeChart :active="activeChart" :chartOptions="chartOptions" :animationType="animationType" :prevActiveChart="prevActiveChart"/>
                <CategoryChart :active="activeChart" :chartOptions="chartOptions" :animationType="animationType" :prevActiveChart="prevActiveChart"/>
                <LaureatesCategoryChart :active="activeChart" :chartOptions="chartOptions" :animationType="animationType" :prevActiveChart="prevActiveChart"/>
                <CountryChart :active="activeChart" :chartOptions="chartOptions" :animationType="animationType" :prevActiveChart="prevActiveChart"/>
                <YearChart :active="activeChart" :chartOptions="chartOptions" :animationType="animationType" :prevActiveChart="prevActiveChart"/>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.charts {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color:#FAF5EC;
    .chart-container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        overflow: hidden;

        .chart-components {
            display: flex;
        }
    }
}
</style>
