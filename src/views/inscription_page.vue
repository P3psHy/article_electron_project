<template>
<h1>Page d'Inscription</h1>

    <div>
        <span>Adresse mail :</span>
        <input type="text" name="mail" id="mail"></input>
    </div>

    <div>
        <span>Mot de passe :</span>
        <input type="text" name="password" id="password"></input>
    </div>

    <div>
        <span>Confirmation du mot de passe :</span>
        <input type="text" name="confirm_password" id="confirm_password"></input>
    </div>

    <div>
        <span>Nom d'utilisateur :</span>
        <input type="text" name="pseudo" id="pseudo"></input>
    </div>

    <div>
        <span>Code postal :</span>
        <input type="text" name="zip_code" id="zip_code"></input>
    </div>

    <div>
        <span>Ville :</span>
        <input type="text" name="city" id="city"></input>
    </div>

    <div>
        <span>Numéro de téléphone :</span>
        <input type="text" name="phone" id="phone"></input>
    </div>

    <div v-if="showError" class="uk-alert-danger uk-margin-top" uk-alert>
        <a class="uk-alert-close" uk-close @click="showError = false"></a>
        {{ textError}}
    </div>

    <a class="uk-button uk-button-primary" @click="signup_api">Connexion</a>

</template>

<script setup>
import { ref } from 'vue';
import log from 'electron-log';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref();
const password = ref();
const confirm_password = ref();
const pseudo = ref();
const zip_code = ref();
const city = ref();
const phone = ref();

const showError = ref(false);
const textError = ref("");

async function signup_api() {
    email.value = document.getElementById('mail').value;
    password.value = document.getElementById('password').value;
    confirm_password.value = document.getElementById('confirm_password').value;
    pseudo.value = document.getElementById('pseudo').value;
    zip_code.value = document.getElementById('zip_code').value;
    city.value = document.getElementById('city').value;
    phone.value = document.getElementById('phone').value;

    try {
        const res = await fetch(
            'http://127.0.0.1:3000/signup', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                    passwordConfirm: confirm_password.value,
                    pseudo: pseudo.value,
                    cityCode: zip_code.value,
                    city: city.value,
                    phone: phone.value
                })
            }
        );

        const res_data = await res.json()
        switch (res_data['code']) {
            case '713':
                showError.value = true;
                textError.value = "Données manquantes";
                break;
            
            case '712':
                showError.value = true; 
                textError.value = "Email déjà utilisé ou mot de passe différent de la confirmation";
                break;

            case '200':
                showError.value = false;
                console.log("Authentification réussie");
                
                router.push('/authentification');
                
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