<template>
    <h1>Détail de l'article</h1>

    <div>
        <div>
            <span>Titre</span>
            <input type="text" name="title" id="title" :value="article.title" />
        </div>
        <div>
            <span>Auteur</span>
            <input type="text" name="author" id="author" :value="article.author" />
        </div>
        <div>
            <span>Description</span>
            <input type="text" name="desc" id="desc" :value="article.desc" />
        </div>
    </div>
    
    <a class="uk-button uk-button-primary" @click="edit_article">Modifier</a>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const article = ref([]);
const route = useRoute();
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

async function edit_article() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const desc = document.getElementById('desc').value;

    const token = localStorage.getItem('token');

    try {
        const res_api = await fetch(
            `http://127.0.0.1:3000/articles/save`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    author: author,
                    desc: desc,
                })

            }
        );
        const res_data = await res_api.json();
        switch (res_data['code']) {
            case '200':
                router.push('/');
                break;
            default:
                console.log("Erreur inconnue");
                break;
        }
    } catch (error) {
        console.log("Erreur lors de la récupération des articles", error);
    }
}
    
</script>