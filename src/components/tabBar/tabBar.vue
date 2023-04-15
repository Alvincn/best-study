<template>
  <div id="tabBar">
<!--    顶部-->
    <el-container>
      <el-header style="background-color: rgba(177, 153, 152, 1)">
        <div style="display: flex;height:100%;align-items: center">
          <div style="display: flex;flex: 1;line-height: 50px">
            <el-avatar :size="50" :src="userInfo.profileName"></el-avatar>
            <span style="font-size:20px; color: white">&nbsp;&nbsp;{{ userInfo.username }}
            {{
                new Date().getHours()>0 && new Date().getHours()<9?'早上好☀️！':
                    new Date().getHours()<12?'中午好🌤️！':
                        new Date().getHours()<18?'下午好🌧️！':'晚上好🌕！'
              }}
          </span>
          </div>
          <span style="flex:1">{{dayWord.word}} --{{dayWord.fromWho?dayWord.fromWho:'佚名'}}</span>
          <span style=""><el-link type="warning" style="color:white">退出登录</el-link></span>
        </div>
      </el-header>
    </el-container>
    <el-row class="tac">
      <el-col :span="3" style="background-color: rgba(177, 153, 152,1);height: 100vh">
        <div>
          <el-menu
              style="background-color: rgba(177, 153, 152,1);"
              default-active="1"
              class="el-menu-vertical-demo">
            <el-menu-item index="1" style="">
              <i class="iconfont icon-rili"></i>
              <span slot="title">Todo</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">自习室</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">许愿瓶</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">我的</span>
            </el-menu-item>
          </el-menu>
        </div>

      </el-col>
    </el-row>

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
      dayWord:{}
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
      console.log(result.data)
      this.dayWord = {fromWho:result.data.from_who,word:result.data.hitokoto}
    }
  }
}
</script>

<style scoped lang="less">
</style>
