<script setup lang="ts">
    import { onMounted, Ref, ref, watch } from "vue";
    import anime, { AnimeInstance } from "animejs";
    import { Bar, Pie } from "vue-chartjs";
    import { genderData } from "../composables/laureatesData";
    import { animationIn, animationOut } from "../composables/animations";
    
    const props = defineProps([
        "chartOptions",
        "active",
        "animationType",
        "prevActiveChart",
    ]);

    // Animation
    let animation: AnimeInstance | null = null;
    const animChart: () => void = () => {
        animation = anime({
            targets: '.gender-container',
            duration: 1000,
            opacity: [0, 1],
            easing: "linear",
            delay: 1000,
        });
    };
    onMounted(animChart) 
    
    watch(() => props.active, (newVal) => {   
        if (newVal == "gender") {
            const animation: (AnimeInstance | null | undefined) = animationIn('.gender-container', props.animationType)
            animation ? animation.play() : null
        } else if (props.prevActiveChart == "gender") {
                const animation: (AnimeInstance | null | undefined) = animationOut('.gender-container', props.animationType)
                animation ? animation.play() : null
        } else {            
            return
        }
    });

    // Charts
    let genderPieChart: Ref<boolean> = ref(true);
    let pieOptions = { responsive: true, maintainAspectRatio: false,  scales:{
    x: {
        display: false
    }
  }}

    const changeGenderChart: () => void = () => {
    genderPieChart.value = !genderPieChart.value;
    };
</script>

<template>
  <div class="gender-container chart" :class="{ gender : props.active == 'gender'}">
    <button @click="changeGenderChart">
      {{ genderPieChart ? "Bar Chart" : "Pie Chart" }}
    </button>
    <h2>Winners by genders</h2>
    <Pie
      :chart-data="genderData"
      v-if="genderPieChart"
      :chart-options="pieOptions"
    />
    <Bar :chart-data="genderData" v-else :chart-options="props.chartOptions" />
  </div>
</template>

<style lang="scss" scoped>
.gender-container {
  opacity: 0;
  pointer-events: none;
}

.gender {
  opacity: 0;
  pointer-events: all;
  z-index: 2;
}
</style>
