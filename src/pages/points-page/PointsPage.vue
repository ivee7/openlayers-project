<template>
    <div class="points-page py-8 px-20">
        <points-panel class="points-page__panel"/>
        <points-map class="points-page__map"/>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { usePointsPageStore } from './store';
import PointsMap from './components/points-map/PointsMap.vue';
import PointsPanel from './components/points-panel/PointsPanel.vue';

const { requestPoints, $reset } = usePointsPageStore();

requestPoints();

onUnmounted(() => {
    $reset();
});
</script>

<style lang="scss">
.points-page {
    display: flex;
    gap: 40px;

    &__panel {
        flex-basis: 40%;
    }

    &__map {
        flex-basis: 60%;
    }
}
</style>
