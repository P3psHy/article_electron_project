import { createRouter, createWebHashHistory } from 'vue-router';

import authentification_page from '../views/authentification_page.vue';

import dashboard from '../views/dashboard.vue';
import detail_article_page from '../views/detail_article.vue';
// import edit_article from '../views/edit_article.vue';
// import create_article from '../views/create_article.vue';

const routes = [

    { path: '/', name: 'Dashboard', component: dashboard },

    { path: '/authentification', name:'Authentification', component: authentification_page },
    { path: '/inscription', name: 'Inscription',},
    
    { path: '/article/:id', name: 'DetailArticle', component: detail_article_page },
    { path: '/article/:id/edit', name:'EditArticle', },
    { path: '/article/:id/delete', name: 'DeleteArticle', }


];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;