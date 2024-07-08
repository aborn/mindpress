<template>
    <!-- 
    <div class="card-image">
        <img src="/assets/img/flex.JPG" alt="flex demo" loading="lazy" class="card-image-item" />
    </div> 
    -->
    <div class="card-content" @click="onClickNavTo(`${link}`)">
        <NuxtLink :to="`${link}`" style="text-decoration: none !important;">
            <h2 class="card-content-title">
                <h2 v-if="item.highlightTitle" class="card-content-title">
                    <span v-html="item.highlightTitle"></span>
                </h2>
                <h2 v-else class="card-content-title">{{ item.title }}</h2>
            </h2>

            <div>
                <UBadge v-for="tag in tags" :key="tag" :ui="{ rounded: 'rounded-full' }" size="xs"
                    style="margin-right: 5px;">{{ tag }}</UBadge>
                <!--
                <span class="card-content-tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
                -->
            </div>
            <div class="card-content-desc">
                <p v-if="item.highlightHtml" class="card-content-desc">
                    <span v-html="item.highlightHtml"></span>
                </p>
                <p v-else class="card-content-desc">{{ formatDesc(item.description) }}</p>
            </div>
        </NuxtLink>
    </div>

    <div class="card-footer">
        <div class="card-footer-date">
            <span class="card-footer-item">
                <UIcon name="i-heroicons-calendar-days" />
            </span>
            {{ item.date ? formatDate(item.date) : formatDate(item.mtime) }}
        </div>
        <div class="card-footer-author">
            <span class="card-footer-author-item" v-for="author in authors" :key="author">{{ author }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const tags = assembyTags();
const authors = assembyAuthors();
const link = prelink()

function prelink() {
    return permalinkAdapt(props.item.permalink || props.item._path)
}

function assembyAuthors() {
    const authorsArr = [] as string[];
    const authors = props.item.authors;
    if (authors) {
        const len = authors.length;
        authors.forEach((item: any, idx: number) => {
            if (authorsArr.length < 5) {
                // 列表页最多显示前3个作者
                authorsArr.push(item.name)
                if (idx !== len - 1 && idx !== 2) {
                    authorsArr.push("|")
                }
            }
        })
    }
    return authorsArr
}

function assembyTags() {
    let tags = props.item.tag || props.item.tags || props.item.category;
    return tags ? tags : []
}

function formatDesc(des: string) {
    if (!des) { return '' }
    const maxLength = 50
    const cjkMatch = des.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/)
    const trimmedString = des.trim().substring(0, maxLength * 2)
    let trimmedStringPad = ''
    if (des.trim().length > maxLength * 2) {
        trimmedStringPad = "..."
    }
    const cjkTrim = des.trim().substring(0, maxLength);
    let cjkTrimPad = ''
    if (cjkMatch && des.trim().length > maxLength) {
        cjkTrimPad = "..."
    }
    //const desCutWord = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    return cjkMatch ? cjkTrim + cjkTrimPad : trimmedString + trimmedStringPad
}

function formatDate(date: Date) {
    if (!date) { return '' }
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as any
    return new Date(date).toLocaleDateString('en', options)
}

function onClickNavTo(link: string) {
    // console.log('->' + link)
    const arr = link.split('=');
    const urlParams = new URL("http://localhost/" + link).searchParams;
    const id = urlParams.get('id')
    console.log('link:' + link + '  id:' + id)

    if (id) {
        navigateTo({
            path: link,
            query: {
                id: id
            }
        });
    } else {
        navigateTo({ path: link });
    }
    // console.log('click', link)
}
</script>