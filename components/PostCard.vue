<template>
    <!-- 
    <div class="card-image">
        <img src="/assets/img/flex.JPG" alt="flex demo" loading="lazy" class="card-image-item" />
    </div> 
    -->
    <div class="card-content">
        <a :href="`${item.path}`" style="text-decoration: none !important;">
            <h2 class="card-content-title">{{ item.title }}</h2>
            <div>
                <span class="card-content-tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
            </div>
            <p class="card-content-desc">{{ formatDesc(item.description) }}</p>
        </a>

    </div>
    <div class="card-footer">
        <div class="card-footer-date">
            {{ item.date ? formatDate(item.date) : formatDate(item.mtime) }}
        </div>
        <div class="card-footer-auther">
            <span class="card-footer-auther-item">Aborn Jiang</span>
            <span class="card-footer-auther-item">|</span>
            <span class="card-footer-auther-item">张杰</span>
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
    data: function () {
        return {
            tags: this.assembyTags()
        }
    },
    methods: {
        assembyTags() {
            let tags = this.item.tag || this.item.tags || this.item.category;
            return tags ? tags : ["MindPress"]
        },
        formatDesc(des) {
            const maxLength = 50;
            const cjkMatch = des.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/)
            const trimmedString = des.trim().substr(0, maxLength*2);
            const cjkTrim = des.trim().substr(0, maxLength);
            //const desCutWord = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
            return cjkMatch ? cjkTrim + "..." : trimmedString
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        }
    }
}
</script>