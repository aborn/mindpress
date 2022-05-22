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
        <div class="card-footer-author">
            <span class="card-footer-author-item" v-for="author in authors" :key="author">{{ author }}</span>
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
            tags: this.assembyTags(),
            authors: this.assembyAuthors()
        }
    },
    methods: {
        assembyAuthors() {
            let authors = [];
            if (this.item.author) {
                authors.push(this.item.author);
            }

            if (Array.isArray(this.item.authors)) {
                this.item.authors.forEach((item) => {
                    authors.push(item)
                })
            }
            let pureAuthors = [];
            const len = authors.length;
            authors.forEach((item, idx) => {
                pureAuthors.push(item.name);
                if (idx !== len - 1) {
                    pureAuthors.push("|")
                }
            })
            console.log(pureAuthors)
            return pureAuthors
        },
        assembyTags() {
            let tags = this.item.tag || this.item.tags || this.item.category;
            return tags ? tags : ["MindPress"]
        },
        formatDesc(des) {
            const maxLength = 50
            const cjkMatch = des.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/)
            const trimmedString = des.trim().substr(0, maxLength * 2)
            let trimmedStringPad = ''
            if (des.trim().length > maxLength * 2) {
                trimmedStringPad = "..."
            }
            const cjkTrim = des.trim().substr(0, maxLength);
            let cjkTrimPad = ''
            if (cjkMatch && des.trim().length > maxLength) {
                cjkTrimPad = "..."
            }
            //const desCutWord = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
            return cjkMatch ? cjkTrim + cjkTrimPad : trimmedString + trimmedStringPad
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        }
    }
}
</script>