import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Home_page from './pages/Home_page.vue';
import Character_page from './pages/Character_page.vue';
import Game_page from './pages/Game_page.vue';
import About from './pages/About_page.vue';

const routes = [
  { path: '/', component: Home_page },
  { path: '/pageChar', component: Character_page },
  { path: '/pageGame', component: Game_page },
  { path: '/pageAbout', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router); // Utilisez le routeur dans votre application
app.mount('#app');
