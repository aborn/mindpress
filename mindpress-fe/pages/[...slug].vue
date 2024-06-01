<template>
  <div>
    <NavBar />
    <main class="container">
      <ContentDoc v-slot="{ doc }">
        <div class="article-title">{{ doc.title }}</div>
        <!-- todo: show authors.
      <div v-for="author of doc" :key="author.name">
        {{ author.name }}
      </div>
      -->

        <ContentRenderer :value="doc">
          <template #empty>
            <p>No contents found. This is a default page.</p>
          </template>
        </ContentRenderer>
      </ContentDoc>
    </main>
  </div>
</template>
