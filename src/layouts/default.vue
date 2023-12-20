<template>
  <div>
    <nav class="flex flex-col">
      <router-link to="/">index</router-link>
      <router-link to="/user">users</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>
