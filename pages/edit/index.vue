<template>
    <NavBar />
    <main class="container">
        <md-editor v-model="text" />
    </main>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# ddd');
</script>
