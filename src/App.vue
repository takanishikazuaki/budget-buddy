<template>
  <header>キャッシュレス決済家計簿</header>
  <Home />
  <nav>
     <RouterLink to="/dashboard">ダッシュボード</RouterLink>
      <RouterLink to="/csv-import">CSV取り込み</RouterLink>
      <RouterLink to="/">手入力</RouterLink>
      <RouterLink to="/cards">カード管理</RouterLink>
      <RouterLink to="/categories">カテゴリー管理</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
</script>