<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">v-el-table-plus</RouterLink>
      <br>
      <RouterLink to="/form">v-el-form</RouterLink>
      <br>
      <RouterLink to="/table">v-el-table</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
