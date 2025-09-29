<template>
    <h3>Détail de l'article</h3>
    <div>
        <h3>{{ article['title'] }}</h3>
        <span>{{ article['author'] }}</span>
        <p>{{ article['desc'] }}</p>
        <img :src="article['imgPath']" />

    </div>
    <div>
            <router-link
                class="uk-button uk-button-success uk-margin-small-right"
                :to="`/`"
            >Détail</router-link>
            <router-link
                class="uk-button uk-button-warning uk-margin-small-right"
                :to="`/article/${article['id']}/edit`"
            >Modifier</router-link>
            <button
                class="uk-button uk-button-danger"
                @click="delete_article(article['id'])"
            >Supprimer</button>
        </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const article = ref([]);
const id = route.params.id;

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
        router.push('/authentification');
        return;
    }
    else {
        try {
            const res_api = await fetch(
                `http://127.0.0.1:3000/articles/${id}`,
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
                    article.value = res_data['data'];
                    break;
                default:
                    console.log("Erreur inconnue");
                    break;
            }
        } catch (error) {
            console.log("Erreur lors de la récupération des articles", error);
        }
        
    }
});

async function delete_article(id) {
    const token = localStorage.getItem('token');

    console.log("Lancement de la suppression");
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
        try {
            await fetch(`http://127.0.0.1:3000/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Actualise la liste après suppression
        } catch (error) {
            console.log("Erreur lors de la suppression", error);
        }
    }
    router.push('/');
}

</script>