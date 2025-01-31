import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { PointDTO } from '@ol-api/point/dto';
import { STATUSES, type StatusesValues } from '@ol-utils/statuses';
import PointAPI from '@/shared/api/point';

export const usePointsPageStore = defineStore('pointsPage', () => {
    const points = ref<Array<PointDTO>>([]);
    const status = ref<StatusesValues>(STATUSES.IDLE);

    const searchText = ref<string>('');
    const filteredPoints = computed(() => points.value.filter((point) => {
        return point?.address?.includes(searchText.value) ||
            point?.name?.includes(searchText.value) ||
            point?.code?.includes(searchText.value);
    }));

    const isAllSelected = ref<boolean>(false);
    const checked = reactive<Set<PointDTO['code']>>(new Set());
    const activeItem = ref<PointDTO['code']>('');

    async function requestPoints() {
        try {
            status.value = STATUSES.LOADING;

            const res = await PointAPI.fetchPoints();

            if (!res.data.length) {
                status.value = STATUSES.EMPTY;
                return;
            }

            res.data.map((item, index) => ({
                ...item,
                checked: !!index,
                active: !!index,
            }));

            const firstItemCode = res.data[0].code;

            points.value = res.data;
            activeItem.value = firstItemCode;
            checked.add(firstItemCode);

            status.value = STATUSES.SUCCESS;
        } catch (e) {
            status.value = STATUSES.FAILED;
        }
    }

    function togglePointStatus(code: PointDTO['code']) {
        if (checked.has(code)) {
            checked.delete(code);
        } else {
            checked.add(code);
        }

        isAllSelected.value = checked.size === points.value.length;
    }

    function toggleAllSelected() {
        if (isAllSelected.value) {
            checked.clear();
            checked.add(activeItem.value);
        } else {
            points.value.forEach(({ code }) => {
                checked.add(code);
            })
        }

        isAllSelected.value = !isAllSelected.value;
    }

    function handleSearchText(value) {
        searchText.value = value;
    }

    function activate(code) {
        checked.add(code);
        activeItem.value = code;
    }

    function $reset() {
        points.value = [];
        status.value = STATUSES.IDLE;
        checked.clear();
        isAllSelected.value = false;
        activeItem.value = '';
        searchText.value = '';
    }

    return {
        $reset,
        togglePointStatus,
        requestPoints,
        isAllSelected,
        toggleAllSelected,
        points,
        status,
        checked,
        searchText,
        filteredPoints,
        handleSearchText,
        activeItem,
        activate,
    }
});
