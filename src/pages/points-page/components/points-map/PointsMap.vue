<template>
    <section>
        <h2>Карта</h2>
        <ol-map
            :load-tiles-while-animating="true"
            :load-tiles-while-interacting="true"
            style="width: 100%; height: 500px"
        >
            <ol-view
                ref="view"
                :center="[-75, 35]"
                :zoom="5"
                projection="EPSG:4326"
            />
            <ol-tile-layer>
            <ol-source-osm />
            </ol-tile-layer>

            <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="{ x, y, code, address, name } in filteredPoints" :key="code">
                    <div v-if="activeItem === code || checked.has(code)">
                        <ol-geom-point :coordinates="[x, y]"></ol-geom-point>
                        <ol-style>
                            <ol-style-circle :radius="4">
                                <ol-style-fill color="white" />
                                <ol-style-stroke :width="3" :color="activeItem === code ? 'red' : 'green'" />
                            </ol-style-circle>
                        </ol-style>
                        <ol-overlay
                            v-if="activeItem === code"
                            :position="[x, y]"
                            :autoPan="true"
                        >
                            <tooltip :items="toTooltipItems({ name, code, address })" />
                        </ol-overlay>
                    </div>
                </ol-feature>
            </ol-source-vector>
            </ol-vector-layer>
        </ol-map>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePointsPageStore } from '../../store';
import Tooltip from '@/shared/ui/tooltip/Tooltip.vue';

const store = usePointsPageStore();
const {
    isAllSelected,
    checked,
    filteredPoints,
    activeItem,
} = storeToRefs(store);

function toTooltipItems(obj) {
    return Object.entries(obj).map(([title, value]) => ({ title, value }));
}
</script>
