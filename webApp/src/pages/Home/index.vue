<template>
  <div id="home">
    <tab-bar :userInfo="this.$store.state.user.userInfo"></tab-bar>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar/tabBar";

export default {
  name: 'Home',
  async mounted() {
    await this.$store.dispatch("getUser")
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

<style>
#home {
  width: 100%;
  height: 100%;
}
</style>
