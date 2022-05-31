<template>
    <NavBar />
    <main class="container">
        <table role="grid">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Heading</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col">#</th>
                    <td scope="col">Total</td>
                    <td scope="col">Total</td>
                    <td scope="col">Total</td>
                    <td scope="col">Total</td>
                    <td scope="col">Total</td>
                </tr>
            </tfoot>
        </table>
    </main>
</template>

<script setup>
import { ref } from "vue"
const articles = ref([]);
const mp = useRuntimeConfig().public.minpress

if (mp.mode === MINDPRESS_MODE.static) {
    console.log('static mode')
    const { data } = await useAsyncData('home', () => queryContent().find())
    // console.log(data.value)
    articles.value = data.value;
} else {
    console.log('server mode')
    const { data: dataServer } = await useFetch(mp.metaUrl)
    // console.log(dataServer.value)

    if (dataServer.value.totalElements > 0) {
        const dataS = ref([])
        dataS.value = dataServer.value.content.map((value) => {
            return mpTransform(value)
        })
        // console.log(dataS)
        articles.value = dataS.value;
    }
}

</script>

