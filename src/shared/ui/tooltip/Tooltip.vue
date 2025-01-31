<template>
    <ul class="tooltip p-8">
        <li
            v-for="({ title, value }, index) in items"
            :key="index"
            class="tooltip__item"
        >
            <span class="tooltip__title">{{ title }}</span>: <span class="pl-4">{{ value }}</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface TooltipListItem {
    title: string
    value: string | number
}

interface TooltipListProps {
    items: Array<TooltipListItem>
}

defineProps<TooltipListProps>();
</script>

<style lang="scss">
li {
    list-style-type: none;
}
ul {
    padding-left: 0;
}

.tooltip {
    background-color: white;
    font-size: 12px;
    border-radius: 6px;
    max-width: 140px;

    &__item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__title {
        font-weight: 500;
        color: red;
    }
}
</style>
