<script setup lang="ts">
   const emit = defineEmits(['changeActiveChart', 'changeAnimation'])
    const props = defineProps([
        "activeChart",
        "animationType"
    ]);

    const changeActiveChart: (chart: string) => void = (chart) => {
        emit('changeActiveChart', chart)
    }

    const changeAnimation: (type: string) => void = (type) => {
        emit('changeAnimation', type)
    }
</script>

<template>
    <div class="top-container">
        <div class="links">
            <button class="navBtn" :class="props.activeChart == 'gender' ? 'activeChart' : ''"  @click="changeActiveChart('gender')">
                Gender
            </button>
            <button class="navBtn" :class="props.activeChart == 'prize' ? 'activeChart' : ''" @click="changeActiveChart('prize')">
                Prize
            </button>
            <button class="navBtn" :class="props.activeChart == 'countries' ? 'activeChart' : ''" @click="changeActiveChart('countries')">
                Country
            </button>           <button class="navBtn" :class="props.activeChart == 'category' ? 'activeChart' : ''" @click="changeActiveChart('category')">
                Category
            </button>
            <button class="navBtn" :class="props.activeChart == 'laureatesCategory' ? 'activeChart' : ''" @click="changeActiveChart('laureatesCategory')">
                Laureates
            </button>
            <button class="navBtn" :class="props.activeChart == 'year' ? 'activeChart' : ''" @click="changeActiveChart('year')">
                Years
            </button>
        </div>
        <div class="animations">
            <p class="sub-headline">Pick animations</p>
            <div class="anim-type">
                <p class="fade" :class="props.animationType == 'fade' ? 'activeAnim' : ''" @click="changeAnimation('fade')">Fade</p>
                <p class="grow" :class="props.animationType == 'grow' ? 'activeAnim' : ''" @click="changeAnimation('grow')">Grow</p>
                <p class="spin" :class="props.animationType == 'spin' ? 'activeAnim' : ''" @click="changeAnimation('spin')">Spin</p>
                <p class="bounce" :class="props.animationType == 'bounce' ? 'activeAnim' : ''" @click="changeAnimation('bounce')">Bounce</p>
                <p class="slide" :class="props.animationType == 'slide' ? 'activeAnim' : ''" @click="changeAnimation('slide')">Rotate</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/chartTop';
</style>