<template>
    <div>
        <NavBar />
        <main class="container">
            <DemoComponent :content="cont" @change="onChange"/>
            <div>
                <span>Parent.message: {{ msg }}</span>
            </div>
            <button @click="parentChange">Parent Click</button>
        </main>
    </div>
</template>

<script setup>
import { ref } from "vue";
let time = 0;
const cont = ref('parent content init value');
const msg = ref('');

const parentChange = () => {
    time = time + 1;
    cont.value = "parent content, Time:" + time
}

function onChange(value) {
    msg.value = 'recevied msg: ' + value
}
</script>