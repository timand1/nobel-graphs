<script setup lang="ts">
    import { watch } from "vue";
    import { AnimeInstance } from "animejs";
    import { Bar } from "vue-chartjs";
    import { countryData } from "../composables/laureatesData";
    import { animationIn, animationOut } from "../composables/chartAnimations";
    
    const props = defineProps([
        "chartOptions",
        "active",
        "animationType",
        "prevActiveChart",
    ]);

    watch(() => props.active, (newVal) => {   
        if (newVal == "countries") {
            const animation: (AnimeInstance | null | undefined) = animationIn('.country-container', props.animationType)
            animation ? animation.play() : null
        } else if (props.prevActiveChart == "countries") {
                const animation: (AnimeInstance | null | undefined) = animationOut('.country-container', props.animationType)
                animation ? animation.play() : null
        } else {            
            return
        }
    });

    let BarOptions = { responsive: true, maintainAspectRatio: false,  scales:{
        x: {
            display: false
        }
    } }
</script>

<template>
  <div class="country-container chart" :class="{ countries : props.active == 'countries'}">
    <h2>Country laureates by category</h2>
    <Bar :chart-data="countryData" :chart-options="BarOptions" />
  </div>
</template>

<style lang="scss" scoped>
.country-container {
  opacity: 0;
  pointer-events: none;
}

.countries {
  opacity: 0;
  pointer-events: all;
  z-index: 2;
}
</style>
