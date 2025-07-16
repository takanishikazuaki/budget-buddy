<template>
    <n-bbutton></n-bbutton>
  <footer class="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-14 z-50">
    <button @click="$router.push('/')">入力欄</button>
    <button @click="$router.push('/calendar')">カレンダー</button>
    <button @click="$router.push('/dashboard')">グラフ</button>
    <button @click="$router.push('/settings')">設定</button>
  </footer>
</template>
