<template>
    <h1>Futur Dashboard, Vous êtes connecté</h1>

    <div v-for="article in article_list" :key="article['id']">
        <h3>{{ article['title'] }}</h3>
        <span>{{ article['author'] }}</span>
        <div>
            <router-link
                class="uk-button uk-button-success uk-margin-small-right"
                :to="`/article/${article['id']}`"
            >Détail</router-link>
            <router-link
                class="uk-button uk-button-warning uk-margin-small-right"
                :to="`/article/${article['id']}/edit`"
            >Modifier</router-link>
            <router-link
                class="uk-button uk-button-danger"
                :to="`/article/${article['id']}/delete`"
            >Supprimer</router-link>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const article_list = ref([]);

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
        router.push('/authentification');
        return;
    }

    try {
        const res_api = await fetch(
            'http://127.0.0.1:3000/articles/',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const res_data = await res_api.json();
        switch (res_data['code']) {
            case '200':
                article_list.value = res_data['data'];
                break;
            default:
                console.log("Erreur inconnue");
                break;
        }
    } catch (error) {
        console.log("Erreur lors de la récupération des articles", error);
    }
});
</script>