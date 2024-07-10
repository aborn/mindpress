<template>
    <div>
        <div>
            <span>props.content: {{ content }}</span>
        </div>
        <div>
            <span>inner.content: {{ innerContent }}</span>
        </div>
        <button @click="changeInner">Component Click</button>
    </div>
</template>

<script lang="ts">
export default {
    props: ['content'],
    emits: ['change'],
    name: "DemoComponent",
    data() {
        return {
            innerContent: this.content,
            count: 1,
        }
    },
    watch: {
        innerContent(newV, oldV) {
            console.log('innerContent variable  changed!')
        },
        content(newV, oldV) {
            console.log('props.content changed!')
        }
    },
    computed: {
        doc() {
            return this.content
        }
    },
    methods: {
        changeInner() {
            this.count++
            this.innerContent = "inner count=" + this.count
            this.$emit('change', this.innerContent)
        }
    },
    mounted: function () {
        this.count++
    }
}
</script>

<style scoped>
div {
    height: 100%;
    text-align: left;
}
</style>