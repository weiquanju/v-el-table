<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <br>
      <RouterLink to="/form">v-el-form</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
