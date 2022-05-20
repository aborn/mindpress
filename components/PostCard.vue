<template>
    <div class="article">
        <div class="card-image">
            <img src="/assets/img/flex.JPG" alt="flex demo" loading="lazy" class="card-image-item" />
        </div>
        <div class="card-content">
            <a :href="`${item.path}`">
                <h2 class="text-gray-900">{{ item.title }}</h2>
                <p class="text-gray-500">{{ item.description }}</p>
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
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        }
    }
}
</script>