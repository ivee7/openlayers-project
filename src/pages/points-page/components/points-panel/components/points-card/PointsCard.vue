<template>
    <div
        @click="() => emit('activate', code)"
        :style="{ height: cardHeight }"
        :class="[
            'points-card p-4',
            { 'points-card_active': active },
        ]"
    >
        <div class="points-card__checkbox">
            <label class="d-flex-acntr">
                <checkbox
                    :model-value="checked"
                    :disabled="active"
                    binary
                    class="mr-8"
                    @click.stop
                    @update:model-value="() => emit('toggle', code)"
                />
                {{ name }}
            </label>
            <span class="points-card__code">Код: {{ code }}</span>
        </div>
        Адрес: {{ address }}
    </div>
</template>

<script setup lang='ts'>
import Checkbox from 'primevue/checkbox';
import type { PointDTO } from '@ol-api/point/dto';

type PointsCardProps = PointDTO & {
    checked: boolean
    active: boolean
    cardHeight: number
};

defineProps<PointsCardProps>();

const emit = defineEmits<{
  (e: 'toggle', code: PointDTO['code']): void
  (e: 'activate', code: PointDTO['code']): void
}>();
</script>

<style lang="scss">
.points-card {
    border: 2px solid rgb(170, 167, 167);
    border-radius: 5px;

    &:hover {
        border-color: green;
        color: green;
    }

    &_active {
        pointer-events: none;
        border-color: red;
        color: red;
    }

    &__checkbox {
        display: flex;
        align-items: center;
    }

    &__code {
        width: 100%;
        text-align: end;
        font-size: 12px;
    }
}
</style>
