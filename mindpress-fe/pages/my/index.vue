<template>
    <div>
        <NavBar />
        <main class="container">
            <UTable :columns="selectedColumns" :rows="rows">
                <template #title-data="{ row }">
                    <NuxtLink :to="row.permalink">
                        {{ row.title }}
                    </NuxtLink>
                </template>
                <template #actions-data="{ row }">
                    <span class="article-meta">
                        <NuxtLink :to="row.editlink">
                            <UIcon name="i-heroicons-pencil-square" />
                            <span class="article-edit">Edit</span>
                        </NuxtLink>
                    </span>
                </template>
            </UTable>
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="articles.length" />
            </div>
            <!--
            <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">Article ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Update Time</th>
                        <th scope="col">Space</th>
                        <th scope="col">isPublic</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in articles" :key="article.id">
                        <th scope="row">
                            <NuxtLink :to="article.permalink">
                                {{ article.articleid }}
                            </NuxtLink>
                        </th>
                        <td>{{ article.title }}</td>
                        <td>{{ formatDate(article.createTime, 'en') }}</td>
                        <td>{{ formatDate(article.updateTime, 'en') }}</td>
                        <td>{{ article.space }}</td>
                        <td>{{ article.isPublic }}</td>
                        <td>
                            <NuxtLink :to="article.editlink">
                                <picture style="max-width: 23px;margin-left: 0.5rem;">
                                    <source
                                        srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAET0lEQVR4nO2bW4hVVRjHvzWjpmWZgxaWlfQwQfaUdqGHCPGhLFAkSTToCkJRkooV9aAR+SD1IiURFRSSKHST6KK+dINUuqGVpobkBaWUCjUbx18P62z6zvHMWns363LOcH4wcGaf/zr7/19zWGuvb60R6dChQ4cOHTq0GsAoYBJwbm4vyQCGA0uAn/iPM8A24B7A5PYYDWA8sBU3Hw3JbwTQDXzuCV/wTm6/wQEeLhm+4PbcnoMBjAGOVOyAt0PdvyvUBw2CJ0RkfMU2U0PdPOuoCowVkQMiMqpi02PGmJ4QHnJ/A0aKyIj/0e5QKANZO8AYc0hE7hKRgxWbbopgJx/AaOA54GSJAbAP6M3tOQrAZcAbng54MbfPQQGcD3wI7ACajubANOD7JuGPAVVnjNYCeF4FWu3QDQMeAn5T+kUpvQYH6AVOqUCzS7TpAZ4EFgG5Z63BAXygwn/GUF7dNQJMV+H7gSm5PSUDu87/QXXAyx79DcAuYBNwXiqf0QAWlh3Ja521Q+lnpPQaHGAccFQFesyjf1Rp/wDGpfIaBeAlFehHYLhD29Mw7S1O6TU4wNXYR9eC2zz61Ur7M3BOKq9RAD5WgTZ4tJMbOqu9qz7AbBXmFHCVR/+J0m9M5TMKwAjsNFaw0qO/U2n7gMmpvEYB++hacBgY49COBPYq/QspvQYHuBg7fRU86NE/rbS/A0FKXdkAXleBvga6HdpLgb+UfkFKr8EBrsU+5xfc7NG/qbTbgWGpvAYHMMCnKtBbHv2N2H2/gltSeY0CMF+FOQFc4dAa4CulX5fSa3CwW9n7VKBlHv29SnsSmJTKaxSA5SrQrziWsNgK8AGlfyal1+AAE4HjKtBcj36F0u53dVZbAKxVgb7AUeYCrqS+9j8/pdfgADepkbwfuM6jf1eF/9LVWS0P0AVsUYFe8einKW0/cH0qr1EAHlCB/gQmOLTd1G90vJbSa3CwuzsHVaAlHv0jZTurLaB+2tuNo3IDjKW+zPV4Sq/Bwdbt9Gpvpke/qmxntQXAUyrQFtdIztllrlkpvUYB2Fnhr79Radu7zCUiAkxVgQ7jWL4Cs5S2D7gmpdcoAEtVqAEPKgAXUL84WpXSZzSADSrUHIfuVaU7QruXuQqAX1SwiQNoFlCPc3HUNmCf5v6phfq72egP3KE0AOtzeI0CcIkKtrfJ+3OoP/3xLTA6h9coYOf0gm3qejfwLPXF0H3A5Tn9Bge79C3YXLvWiz3qotk55MKLiAAzVMj3sf/ZcaIh/GbgotxeowDMU0H7G4L3YRdIA26CtCpVNiIuVK/1cbXtInK/MWZrYwPskdaZEvZM8hkRec8Ys6vhXl0iMq/26xpjDAHvedaGJ9jpbjkw4GlvYA9x2N3kXner90vXGqt8A/ao19+IyH3GmO8qtG9JSneAMWYd9uGnS0TWG2NOl2h2q4jMFZGQpe/jIrK2yfU1IkLtx7ktp/kXiF6cOJtO4AcAAAAASUVORK5CYII="
                                        media="(prefers-color-scheme: dark)">
                                    <img style="max-width: 23px;"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg=="
                                        alt="edit">
                                </picture>
                                <span class="article-edit">Edit</span>
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">Article ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Update Time</th>
                        <th scope="col">Space</th>
                        <th scope="col">isPublic</th>
                        <th scope="col">Actions</th>
                    </tr>
                </tfoot>
            </table>
            -->
        </main>
    </div>
</template>

<script setup>
import { ref } from "vue"
const articles = ref([]);
const mp = mpConfig(useRuntimeConfig().public.minpress)
const formatDate = mpFormatDate;
const useReqURL = useRequestURL()

const columns = [/*{
    key: 'articleid',
    label: 'Article ID'
},*/ {
        key: 'title',
        label: 'Title',
    }, {
        key: 'createTimeF',
        label: 'Create Time'
    }, {
        key: 'updateTimeF',
        label: 'Update Time'
    }, /*{
    key: 'space',
    label: 'Space',
}, {
    key: 'isPublic',
    label: 'isPublic'
},*/
    {
        key: 'actions',
        label: 'Actions'
    }]
const selectedColumns = ref([...columns])
const page = ref(1)
const pageCount = 9
const rows = computed(() => {
    return articles.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

console.log('mode===>' + mp.mode)
if (mp.mode === MINDPRESS_MODE.SSG) {
    console.log('static mode')
    const { data } = await useAsyncData('home', () => queryContent().find())
    const tdata = data.value.map((value) => {
        return staticMdTransform(value)
    })
    articles.value = tdata.map(item => {
        item.updateTimeF = formatDate(item.updateTime)
        item.createTimeF = formatDate(item.createTime)
        return item;
    })
    // console.log(tdata)
    articles.value = tdata;
} else if (mp.mode === MINDPRESS_MODE.FCM) {
    try {
        const { data: dataQ } = await useFetch('/api/md/query');
        const tdata = dataQ.value.map((value) => {
            return staticMdTransform(value)
        })
        articles.value = tdata.map(item => {
            item.updateTimeF = formatDate(item.updateTime)
            item.createTimeF = formatDate(item.createTime)
            return item;
        })
        // console.log('***************')
        // console.log(tdata)
    } catch (error) {
        console.warn(error)
    }
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
