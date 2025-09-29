<template>
    <h1>Futur Dashboard, Vous êtes connecté</h1>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/authentification');
    }
});
</script>
