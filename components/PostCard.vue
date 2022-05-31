<template>
    <!-- 
    <div class="card-image">
        <img src="/assets/img/flex.JPG" alt="flex demo" loading="lazy" class="card-image-item" />
    </div> 
    -->
    <div class="card-content">
        <a :href="`${link}`" style="text-decoration: none !important;">
            <h2 class="card-content-title">{{ item.title }}</h2>
            <div>
                <span class="card-content-tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
            </div>
            <p class="card-content-desc">{{ formatDesc(item.description) }}</p>
        </a>
    </div>

    <div class="card-footer">
        <div class="card-footer-date">
            <img style="max-width: 12.5px;margin-right: 0.1rem;"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABQElEQVRoge2aWwqDMBBFb4u76DraNfjl5lvpv49VCLYfTiRiHkajGWUOBDEOM7l5DYYAy8kB1AB+VCqqi8Xe/kcqLYge7Cz+R5Rz23tS//eIDUmKLqQA0GI+vL6esdmHllD/LbV5hkuEKWAsAVv8Ny7lvp5Zah9KqP/J90uuER81PfWeqC22a4jm3zeUOaZ7/R4JMcS/tb2x5/zeyBphTWaoO9P0Grn0iNwOb8U6JjPnMiMiQrghQrghQrghQrghQrghQriRQsgLQAn/mVVJtsEc9c++RIQqH4ef5IcPPcUx/QspMrLpHTbJhSyNIyeNp0aEcEOEbEDtNL7tV7f1kkLIl54d7ImwI5tyTYCj8sgLQ8b2ZfU3gKfDT/KEGAtJiKwRIdzQ9/IWwAPnWvCtqbLAcJNgrxsNsUsDyxUOgQN/Ae4C203zZCwAAAAASUVORK5CYII=" />
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
            authors: this.assembyAuthors(),
            link: this.prelink()
        }
    },
    methods: {
        prelink() {
            return this.item.permalink || this.item._path
        },
        assembyAuthors() {
            let authors = [];
            if (this.item.author) {
                authors.push(this.item.author)
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
            if (!date) { return '' }
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        }
    }
}
</script>