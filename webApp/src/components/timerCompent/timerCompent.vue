<template>
  <div id="timerCompent">
    <div id="task"><span><i class="el-icon-s-opportunity"></i>正在进行：{{ task.title }}</span><span>当前时间：{{(new Date).toLocaleTimeString()}}</span></div>
    <div id="time" ref="time">{{ this.minute }}:{{ this.seconds }}</div>
    <div id="word">要相信，你的努力终会有结果</div>
    <div id="handle" style="margin-top: 20px">
      <el-button icon="el-icon-video-pause" style="margin: 0 10px" size="medium" type="warning" circle
                 @click="stop"></el-button>
      <el-button icon="el-icon-switch-button" style="margin: 0 10px" size="medium" type="danger" circle
                 @click="quitTimer"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "timerCompent",
  data() {
    return {
      task: {},
      timer: '',
      minute: '00',
      seconds: '00'
    }
  },
  mounted() {
    this.$bus.$on('clear', (parent) => {
      this.task = parent
      this.startTime()
    })
  },
  methods: {
    quitTimer() {
      this.$bus.$emit("closeTimer")
      this.task.studyTime = this.minute
      this.$axios.insertStudyRecord(this.task)
      clearInterval(this.timer)
      this.timer = null
      this.minute = '00'
      this.seconds = '00'
    },
    startTime() {
      this.timer = setInterval(() => {
        let m = 1 * (this.minute)
        let s = 1 * (this.seconds)
        s += 1
        // 如果小于 10，拼上 0
        if (s < 10) {
          return this.seconds = '0' + s
        }
        // 如果大于 60，变成0，并且时间加一
        if(s >= 60) {
          s = 0
          m += 1
          if(m < 10){
             this.minute = '0' + m
          }else {
            this.minute = m
          }
        }
        if(s === 0) {
            return this.seconds = '0' + s
        }
        this.seconds = s
      }, 100)
    },
    stop() {
      if(this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }else {
        this.startTime()
      }
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: electronicFont;
  src: url(../../assets/font/DS-DIGIT.TTF);
}

#timerCompent {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  left: 0;
  top: 0;
  background-color: black;
}

#time {
  font-size: 200px;
  width: 100%;
  text-align: center;
  color: white;
  font-family: electronicFont;
  letter-spacing: 10px;
}
#task {
  display: flex;
  justify-content: space-around;
  width: 700px;
}
</style>
