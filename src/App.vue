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
root {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;

}
#app {
  width: 100%;
  height: 100%;
}
</style>
