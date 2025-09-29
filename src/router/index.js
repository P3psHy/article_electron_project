import { createRouter, createWebHashHistory } from 'vue-router';
import PageOne from '../views/PageOne.vue';
import PageTwo from '../views/PageTwo.vue';

import authentification_page from '../views/authentification_page.vue';


const routes = [
    { path: '/', name: 'PageOne', component: PageOne },
    { path: '/page-2', name: 'PageTwo', component: PageTwo },

    { path: '/authentification', name:'Authentification', component: authentification_page },
    { path: '/inscription', name: 'Inscription',},
    
    { path: '/dashboard', name: 'Dashboard', },
    { path: '/detail-article', name: 'DetailArticle', },
    { path: '/edit-article', name:'EditArticle', },
    { path: '/create-article', name: 'CreateArticle', }


];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;