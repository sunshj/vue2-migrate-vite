<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    try {
      if (__GIT_INFO__) window.__GIT_INFO__ = __GIT_INFO__
    } catch {}
  }
}
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  text-align: center;
}

nav {
  padding: 30px;

  a {
    color: #2c3e50;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
