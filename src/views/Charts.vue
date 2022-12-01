<script setup lang="ts">
    import { onMounted, Ref, ref, watch  } from 'vue';
    import anime, {AnimeInstance} from 'animejs';
    import PrizeChart from '../components/PrizeChart.vue'
    import GenderChart from '../components/GenderChart.vue'
    import CategoryChart from '../components/CategoryChart.vue'
    import LaureatesCategoryChart from '../components/LaureatesCategoryChart.vue'
    import CountryChart from '../components/CountryChart.vue'
    import YearChart from '../components/YearChart.vue'
    import {slideAnim, slideBtnAnim, fadeInAnim, slideDownNavAnim, fadeInAnimContainer } from '../composables/animations'
    
    let activeChart: Ref<string> = ref('gender')
    let prevActiveChart: Ref<string> = ref('gender')

    onMounted(slideAnim)
    onMounted(fadeInAnim)
    onMounted(slideBtnAnim)
    onMounted(slideDownNavAnim)
    onMounted(fadeInAnimContainer)


    const genderActive: () => void = () => {
        prevActiveChart.value =  activeChart.value
        activeChart.value = 'gender'
    }
    const prizeActive: () => void = () => {
        prevActiveChart.value =  activeChart.value        
        activeChart.value = 'prize'
    }

    const categoryActive: () => void = () => {
        prevActiveChart.value =  activeChart.value        
        activeChart.value = 'category'
    }

    const laureatesCategoryActive: () => void = () => {
        prevActiveChart.value =  activeChart.value        
        activeChart.value = 'laureatesCategory'
    }

    const countryActive: () => void = () => {
        prevActiveChart.value =  activeChart.value        
        activeChart.value = 'countries'
    }

    const yearActive: () => void = () => {
        prevActiveChart.value =  activeChart.value        
        activeChart.value = 'year'
    }

    let chartOptions = { responsive: true, maintainAspectRatio: false }

    // Animation Types
    let animationType: Ref<string> = ref('fade')
    const animFade: () => void = () => {
        animationType.value = 'fade'
    }

    const animGrow: () => void = () => {
        animationType.value = 'grow'
    }
    const animSpin: () => void = () => {
        animationType.value = 'spin'
    }

    const animBounce: () => void = () => {
        animationType.value = 'bounce'
    }

    const animSlide: () => void = () => {
        animationType.value = 'slide'
    }
</script>

<template>
    <section class="charts" ref="charts">
        <div class="chart-container">
            <header>
                <div class="links">
                    <button class="navBtn" :class="activeChart == 'gender' ? 'activeChart' : ''"  @click="genderActive">
                        Gender
                    </button>
                    <button class="navBtn" :class="activeChart == 'prize' ? 'activeChart' : ''" @click="prizeActive">
                        Prize
                    </button>
                    <button class="navBtn" :class="activeChart == 'countries' ? 'activeChart' : ''" @click="countryActive">
                        Country
                    </button>
                    <button class="navBtn" :class="activeChart == 'category' ? 'activeChart' : ''" @click="categoryActive">
                       Category
                    </button>
                    <button class="navBtn" :class="activeChart == 'laureatesCategory' ? 'activeChart' : ''" @click="laureatesCategoryActive">
                       Laureates
                    </button>
                    <button class="navBtn" :class="activeChart == 'year' ? 'activeChart' : ''" @click="yearActive">
                      Years
                    </button>
                </div>
                <div class="animations">
                    <p class="sub-headline">Pick animations</p>
                    <div class="anim-type">
                        <p class="fade" :class="animationType == 'fade' ? 'activeAnim' : ''" @click="animFade">Fade</p>
                        <p class="grow" :class="animationType == 'grow' ? 'activeAnim' : ''" @click="animGrow">Grow</p>
                        <p class="spin" :class="animationType == 'spin' ? 'activeAnim' : ''" @click="animSpin">Spin</p>
                        <p class="bounce" :class="animationType == 'bounce' ? 'activeAnim' : ''" @click="animBounce">Bounce</p>
                        <p class="slide" :class="animationType == 'slide' ? 'activeAnim' : ''" @click="animSlide">Rotate</p>
                    </div>
                </div>
            </header>
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

        header {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2em;
            border-bottom-right-radius: 1em;
            
            .links {
                background-color: #FAF5EC;
                width: 80%;
                display: flex; 
                justify-content: space-between;
                align-items: flex-end;
                padding: 1em;
                gap: 2em;
                box-shadow: 0.2em 0.2em 0.1em 0.1em #cea15298,
                -0.2em 0.2em 0.1em 0.1em #cea15298;;
                border-bottom-left-radius: 1em;
                border-bottom-right-radius: 1em;
                
                .navBtn {
                    border: none;
                    width: 7vw;
                    padding: 1em;
                    height: 100%;
                    border-radius: 1em; 
                    font-weight: 700;
                    cursor: pointer;
                    background-color: #fff;
                    text-align: center;
                    box-shadow: 0.2em 0.2em 0.1em 0.1em #cea15298,
                        -0.2em 0.2em 0.1em 0.1em #cea15298;;
                    transition: all 400ms;
                    font-size: clamp(1em, 1vw, 1.5em); 
                    &:hover {
                        color: #000;
                        background-color: #CEA152;
                        height: 80%;
                        width: 10vw;
                        padding: 0 2em;
                        box-shadow: 0.2em 0.2em 0.1em 0.1em #000, 
                            -0.2em 0.2em 0.1em 0.1em #000;
                    }
                }
                .activeChart {
                    background-color: #000;
                    color: #CEA152;
                }

            }
            .animations {
                display: flex;
                flex-direction: column;
                gap: 1em;
                align-items: center;
                
                .anim-type {
                    display: flex;
                    gap: 1em;
                    p {
                        padding: 1em;
                        cursor: pointer;
                        border-radius: 1em;
                        transition: all 400ms;
                        &:hover {
                            color: #CEA152;
                            background-color: #000;
                            scale: 115%;
                        }
                    }
                    .fade {
                        transition: all 1s;
                        &:hover{
                            opacity: 0;
                        }
                    }
                    .grow {
                        transition: all 1s;
                        &:hover{
                            scale: 150%;
                        }
                    }
                    .slide {
                        &:hover{
                            animation: rotating 2s ease-in-out forwards;
                        }
                    }
                    @keyframes rotating {
                        0% {transform: translateX(0); scale: 1}
                        25% {transform: translateX(-80px);}
                        50% {transform: translateX(0); scale: 0}
                        75% {transform: translateX(80px);}
                        100% {transform: translateX(0); scale: 1}
                    }
                        
                    .bounce {
                        &:hover{
                            animation: bouncing 400ms ease-in-out infinite;
                        }
                    }
                    @keyframes bouncing {
                        0% {transform: translateY(0);}
                        25% {transform: translateY(20px);}
                        50% {transform: translateY(0);}
                        75% {transform: translateY(-20px);}
                        100% {transform: translateY(0);}
                    }

                    .spin {
                        transition: all 1s;
                        &:hover{
                            transform: rotateZ(1080deg);
                        }
                    }
                    .activeAnim {
                        background-color: #CEA152;
                        color: #fff;
                        &:hover {
                            box-shadow: inset 0.4em 0.4em #CEA152, 
                            inset -0.4em -0.4em #CEA152;
                        }
                    }
                }
            }
        }
        .chart-components {
            display: flex;

        }

    }
}
</style>
