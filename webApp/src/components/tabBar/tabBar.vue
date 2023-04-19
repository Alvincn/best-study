<template>
  <div id="tabBar">
    <!--    顶部-->
    <el-container>
      <el-header style="background-color: rgba(177, 153, 152, 1)">
        <div style="display: flex;height:100%;width:100%;justify-content: space-around;align-items: center">
          <div style="display: flex;line-height: 50px">
            <span style="font-size:20px; color: white">&nbsp;&nbsp;{{ userInfo.username }}
            {{
                new Date().getHours() >= 0 && new Date().getHours() < 9 ? '早上好☀️！' :
                    new Date().getHours() >= 9 && new Date().getHours() < 12 ? '中午好🌤️！' :
                        new Date().getHours() >= 12 && new Date().getHours() < 18 ? '下午好🌧️！' : '晚上好🌕！'
              }}
          </span>
          </div>
          <span
              style="flex: 1;text-align: center">{{ dayWord.word }} --{{
              dayWord.fromWho ? dayWord.fromWho : '佚名'
            }}</span>
          <span><el-link type="warning" style="color:white">退出登录</el-link></span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="220px" style="height: 100vh;background-color: rgba(177, 153, 152, 1);">
          <el-menu
              default-active="0"
              style="background-color: rgba(177, 153, 152, 0);"
              class="el-menu-vertical-demo">
            <el-menu-item v-for="(item, i) in titleText" :index="'' + i" :key="i" @click="changeRouter(i)">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.text }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import axios from "axios";
// 这是头部选择栏
export default {
  name: "tabBar",
  props: ['userInfo'],
  data() {
    return {
      dayWord: {},
      currentIndex:0,
      titleText: [
        {text: 'Todo', icon: 'el-icon-notebook-2'},
        {text: '自习室', icon: 'el-icon-notebook-2'},
        {text: '许愿瓶', icon: 'el-icon-notebook-2'},
        {text: '我的', icon: 'el-icon-notebook-2'}
      ]
    }
  },
  mounted() {
    this.getDayWord()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 每日一句，温暖你我他
    async getDayWord() {
      let result = await axios.get("https://v1.hitokoto.cn/")
      this.dayWord = {fromWho: result.data.from_who, word: result.data.hitokoto}
    },
    // 路由跳转,更改页面
    changeRouter(index) {
      // 避免出现当前路由重复跳转导致报错
      // 如果当前用户点击的标签等于当前标签，就返回不执行
      if(this.currentIndex === index) return
      this.currentIndex = index
      switch (index) {
        case 0:
          this.$router.push({path: '/todo'})
          break
        case 1:
          this.$router.push({path:'/studyhome'})
      }
    },
  }
}
</script>

<style scoped lang="less">
.el-main {
  background-color: rgb(254, 248, 232);
}

.el-menu-item {
  color: white;
  font-size: 17px;
}

.el-menu-item.is-active {
  color: rgb(252, 213, 63);
}
</style>
