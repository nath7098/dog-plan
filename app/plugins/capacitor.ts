import {App} from '@capacitor/app';

export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        App.addListener('backButton', () => {
            navigateTo('/');
        });

        return {
            $destroy() {
                App.removeAllListeners('backButton');
            }
        }
    }
})