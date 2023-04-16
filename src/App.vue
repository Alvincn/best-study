<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    let height = window.screen.availHeight;
    document.body.style.height = height + 'px';
  },
};
</script>

<style>
.el-popup-parent--hidden {
  padding: 0 !important;
}
root {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
