<template>
    <h1>Page d'authentification</h1>

    <div>
        <span>Adresse mail :</span>
        <input type="text" name="mail" id="mail"></input>
    </div>

    <div>
        <span>Mot de passe :</span>
        <input type="text" name="password" id="password"></input>
    </div>

    <div v-if="showError" class="uk-alert-danger uk-margin-top" uk-alert>
        <a class="uk-alert-close" uk-close @click="showError = false"></a>
        Email ou Mot de passe incorrect, veuillez réessayer.
    </div>

    <a class="uk-button uk-button-primary" @click="auth_api">Connexion</a>


</template>

<script setup>
import { ref } from 'vue';
import log from 'electron-log';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref();
const password = ref();
const showError = ref(false);

async function auth_api() {
    email.value = document.getElementById('mail').value;
    password.value = document.getElementById('password').value;

    log.info('Appel de l\'API pour authentification');

    try {
        const res = await fetch(
            'http://127.0.0.1:3000/login', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            }
        );
        const res_data = await res.json()
        
        switch (res_data['code']) {
            case '768':
                showError.value = true;
                break;
            
            case '200':
                showError.value = false;
                console.log("Authentification réussie");
                console.log(res_data['data'])

                localStorage.setItem('token', res_data['data'].token);
                
                router.push('/');
                
                break;

            default:
                showError.value = false;
                console.log("Erreur inconnue")
                break;
        }

    } catch (error) {
        log.error('Erreur lors de l\'authentification', error);
    }
}
</script>