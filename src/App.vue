<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,
body,
p,
div {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
