import App from './App.svelte';

const storageKey = 'performed-www-redirect';
if (location.href.includes('//minecraftjson.com') && sessionStorage.getItem(storageKey) !== 'yes') {
   sessionStorage.setItem(storageKey, 'yes');
   location.href = 'https://www.minecraftjson.com';
}

const app = new App({ target: document.body });

export default app;