<template>
    <div class="autocomplete">
        <input type="text" @input="onChange" v-model="search" @keydown.down="onArrowDown" @keydown.up="onArrowUp"
            @keydown.enter="onEnter" style="margin-bottom: 0px;"/>
        <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
            <li class="loading" v-if="isLoading">
                Loading results...
            </li>
            <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" class="autocomplete-result"
                :class="{ 'is-active': i === arrowCounter }">
                {{ result }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SearchAutocomplete',
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
        isAsync: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {
            isOpen: false,
            results: [],
            search: '',
            isLoading: false,
            arrowCounter: -1,
        };
    },
    watch: {
        items: function (value, oldValue) {
            if (value.length !== oldValue.length) {
                this.results = value;
                this.isLoading = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        setResult(result) {
            this.search = result;
            this.isOpen = false;
        },
        filterResults() {
            this.results = this.items.filter((item) => {
                return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            });
        },
        onChange() {
            this.$emit('input', this.search);
            if (this.isAsync) {
                this.isLoading = true;
            } else {
                this.filterResults();
                this.isOpen = true;
            }
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            console.log(' ---- selected ! ' + this.results[this.arrowCounter])
            console.log(' -- origin value:' + this.search)

            const selected = this.results[this.arrowCounter];
            if (selected) {
                this.search = selected;
            }
            this.$emit('search', this.search);
            this.isOpen = false;
            this.arrowCounter = -1;
        },
    },
};
</script>

<style>
.autocomplete {
    position: relative;
    width: 100%;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1.5px solid  #0172ad; /** #0172ad #cfd5e3 */
    max-height: 120px;
    overflow: auto;
    background: #FFF; /*   #fbfcfc*/
    border-radius: 0.25rem;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
}
</style>