<template>
    <section class="points-panel">
        <h2>Точки</h2>
        <input-text
            :model-value="searchText"
            type="text"
            class="mb-20"
            @update:model-value="handleSearchText"
        />
        <div v-if="STATUSES.SUCCESS">
            <div class="mb-20">
                <label>
                    <checkbox
                        binary
                        :model-value="isAllSelected"
                        @update:model-value="toggleAllSelected"
                    />
                    Выбрать всё ({{ points.length }})
                </label>
            </div>
            <virtual-scroller
                :items="filteredPoints"
                :itemSize="cardHeight"
                :numToleratedItems="2"
                :style="{ height: `${cardHeight * 8}px` }"
            >
                <template v-slot:item="{ item }">
                    <points-card
                        v-bind="item"
                        :key="item.code"
                        :checked="checked.has(item.code) || activeItem === item.code"
                        :active="activeItem === item.code"
                        :cardHeight="`${cardHeight}px`"
                        @toggle="togglePointStatus"
                        @activate="activate"
                        class="mb-8"
                    />
                </template>
            </virtual-scroller>
        </div>
        <stub-generator
            v-else
            :status="status"
            @retry="requestPoints"
        />
    </section>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import VirtualScroller from 'primevue/virtualscroller';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import { usePointsPageStore } from '../../store';
import StubGenerator from '@ol-entities/stub-generator/StubGenerator.vue';
import { STATUSES } from '@ol-utils/statuses';
import PointsCard from './components/points-card/PointsCard.vue';
import point from '@/shared/api/point';

const cardHeight = 60;

const store = usePointsPageStore();

const {
    isAllSelected,
    points,
    checked,
    searchText,
    filteredPoints,
    status,
    activeItem,
} = storeToRefs(store);

const {
    toggleAllSelected,
    togglePointStatus,
    handleSearchText,
    activate,
    requestPoints,
} = store;
</script>

<style lang="scss">
.points-panel {
    &__search {
        margin-bottom: 20px;
    }

    &__checkbox {
        margin-bottom: 10px;
    }
}
</style>
