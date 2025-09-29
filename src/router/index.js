import { createRouter, createWebHashHistory } from 'vue-router';
import PageOne from '../views/PageOne.vue';
import PageTwo from '../views/PageTwo.vue';

import authentification_page from '../views/authentification_page.vue';

import dashboard from '../views/dashboard.vue';
// import detail_article from '../views/detail_article.vue';
// import edit_article from '../views/edit_article.vue';
// import create_article from '../views/create_article.vue';

const routes = [

    { path: '/', name: 'Dashboard', component: dashboard },

    { path: '/authentification', name:'Authentification', component: authentification_page },
    { path: '/inscription', name: 'Inscription',},
    
    { path: '/detail-article', name: 'DetailArticle', },
    { path: '/edit-article', name:'EditArticle', },
    { path: '/create-article', name: 'CreateArticle', }


];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;