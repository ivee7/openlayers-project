const APP_ROUTES = {
    ROOT: '/',
    ERROR: '/error',
};

export const routes = [
    { path: APP_ROUTES.ROOT, component: () => import('@/pages/points-page/PointsPage.vue') },
];