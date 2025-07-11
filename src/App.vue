<template>
  <header>キャッシュレス決済家計簿</header>
  <Home />
  <nav>
     <RouterLink to="/">ダッシュボード</RouterLink>
      <RouterLink to="/csv-import">CSV取り込み</RouterLink>
      <RouterLink to="/card-register">カード登録</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Home from './pages/Home.vue'
</script>