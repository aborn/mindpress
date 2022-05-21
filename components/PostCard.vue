<template>
    <div class="article">
        <div class="card-image">
            <img src="/assets/img/flex.JPG" alt="flex demo" loading="lazy" class="card-image-item" />
        </div>
        <div class="card-content">
            <a :href="`${item.path}`">
                <h2 class="text-gray-900">{{ item.title }}</h2>
                <p class="text-gray-500">{{ formatDesc(item.description) }}</p>
            </a>
            <div class="card-footer">
                <div class="card-footer-date">
                    {{ formatDate(item.mtime) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        description: {
            type: Boolean,
            default: true
        },
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDesc(des) {
            const maxLength = 50;
            const cjkMatch = des.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/) 
            const trimmedString = des.trim().substr(0, maxLength);
            const desCutWord = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
            return cjkMatch ?  trimmedString + "..." : desCutWord
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        }
    }
}
</script>