<template>
    <h1>Page numéro 1</h1>

    <a class="uk-button uk-button-primary" @click="callApi">Call API</a>

    <div v-for="movie in movies" :key="movie.title">
        {{ movie.title }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
import log from 'electron-log';

    const movies = ref([]);

    async function callApi() {
        log.info('Appel de l\'API pour récupérer les films');
        const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

        const data = await res.json();

        movies.value = data;
    }

</script>