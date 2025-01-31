import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css';
import './assets/index.scss';
import App from './App.vue'
import router from './router';

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(router)
    .use(OpenLayersMap)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .mount('#app');

