export const STATUSES = {
    IDLE: 'idle',
    LOADING: 'loading',
    FAILED: 'failed',
    EMPTY: 'empty',
    SUCCESS: 'success'
} as const;

export type StatusesKeys = keyof typeof STATUSES;
export type StatusesValues = typeof STATUSES[StatusesKeys];
