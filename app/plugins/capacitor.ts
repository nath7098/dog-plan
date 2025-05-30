import {App, BackButton} from '@capacitor/app';

export default defineNuxtPlugin(() => {
    App.addListener('backButton', () => {
        navigateTo('/');
    });

    return {
        $destroy() {
            App.removeAllListeners('backButton');
        }
    }
})