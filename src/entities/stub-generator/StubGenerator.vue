<template>
    <stub />
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { type StatusesValues } from '@ol-utils/statuses';
import Stub from '@ol-ui/stub/Stub.vue';

interface StubGeneratorProps {
    status: StatusesValues
}

const stubProps = computed(() => {
    
});

defineProps<StubGeneratorProps>();
</script>
