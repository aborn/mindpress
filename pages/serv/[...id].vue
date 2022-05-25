<script setup>
const route = useRoute()
const permalink = '/articles/' + route.params.slug;
const text = "# Article primary title"
const INITIAL_CODE = `# MDC

MDC stands for _**M**ark**D**own **C**omponents_.

This syntax supercharges regular Markdown to write documents interacting deeply with any Vue component from your \`components/content/\` directory or provided by a module.

## Next steps
- [Install Nuxt Content](/docs/getting-started)
- [Explore the MDC syntax](/docs/syntax)
`

// console.log(articles);
</script>

<template>
    <NavBar />
    <main class="container">
        <div class="article-title">Demo</div>
        <Markdown :use="text" unwrap="p">
           
        </Markdown>
    </main>
</template>
