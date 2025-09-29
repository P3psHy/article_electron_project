<template>

        <!--  Navigation-->
    <ul uk-tab>
        <li class="uk-active">
            <router-link to="/">Dashboard</router-link>
        </li>
        <li>
            <router-link to="/authentification">Page Two</router-link>
        </li>
    </ul>

    <router-view />
</template>
