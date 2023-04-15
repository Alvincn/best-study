<template>
  <div id="home">
    <tab-bar :userInfo="userInfo"></tab-bar>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar/tabBar";

export default {
  name: 'Home',
  async mounted() {
    await this.$store.dispatch('getUser', window.localStorage.getItem('session'))
    this.userInfo =  this.$store.state.user.userInfo
  },
  components: {tabBar},
  data() {
    return {
      userInfo:''
    }
  },
  computed: {
  }
};
</script>

<style></style>
