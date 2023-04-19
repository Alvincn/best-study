<template>
  <div id="login">
    <div id="title">
      <transition name="el-fade-in-linear">
        <h2>BestStudy</h2></transition
      >
      <h2 style="font-size: 2rem">优学习</h2>
    </div>
    <!-- 判断是否是登录状态 -->
    <transition name="el-fade-in-linear">
      <div id="form" v-show="isLogin">
        <h1 style="text-align: center;font-size: 30px;color: white;line-height: 60px">用户登录</h1>
        <el-form style="width: 90%;" :model="userLogin" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" v-model="userLogin.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码（包含大写、小写、数字）" type="password" v-model="userLogin.password"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right" @click="changeRegister">注册</el-button>
            <el-button style="float: right; margin-right: 20px" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <!--        <span class="toRegister" style="" @click="changeRegister()">还没账号嘛?立即注册></span>-->
      </div>
    </transition>
    <!-- 这是注册状态 -->
    <transition name="el-fade-in-linear">
      <div id="form1" v-show="isRegister"><h1 style="text-align: center;line-height: 60px;font-size: 30px;color: white">
        用户注册</h1>
        <el-form style="width: 90%;" :model="userRegister" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" type="text" v-model="userRegister.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="registerPassword">
            <el-input placeholder="请输入密码（包含大写、小写、数字）" type="password" v-model="userRegister.registerPassword"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input placeholder="重新输入密码" type="password" v-model="userRegister.confirmPassword"
                      show-password></el-input>
          </el-form-item>

          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input type="text" placeholder="输入邮箱验证码" v-model.number="userRegister.emailCode">
              <template slot="append">
                <el-button ref="getCodeButton" @click="getCode">获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right" type="primary" @click="register">注册</el-button>
            <el-button style="float: right; margin-right: 20px" @click="changeRegister">去登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        this.checked.emailOk = false
        return callback(new Error('邮箱不能为空'));
      }
      let eamilRule = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/
      let result = eamilRule.test(value)
      if (!result) {
        this.checked.emailOk = false
        return callback(new Error("请输入正确的邮箱"))
      }
      this.checked.emailOk = true
    };
    var checkPassword = (rule, value, callback) => {
      if (value.trim() === '') {
        this.checked.passwordOk = false
        return callback(new Error('密码不能为空'))
      }
      if (value.trim().length < 6 || value.trim().length > 15) {
        this.checked.passwordOk = false
        return callback(new Error('密码应在6-15位之间'))
      }
      var testPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/
      if (!testPass.test(value)) {
        this.checked.passwordOk = false
        return callback(new Error('密码需同时包含大写字母、小写字母、数字'))
      }
      this.checked.passwordOk = true
    };
    var confirmPassword = (rule, value, callback) => {
      if (!value.trim()) {
        this.checked.confPasswordOk = false
        return callback(new Error('请再次输入密码'))
      }
      if (this.userRegister.registerPassword.trim() !== value) {
        this.checked.confPasswordOk = false
        return callback(new Error('两次密码输入不一致'))
      }
      this.checked.confPasswordOk = true
    };
    var emailCode = (rule, value, callback) => {
      if (!value) {
        this.checked.emailCodeOk = false
        return callback(new Error('验证码不能为空'))
      }
      if (isNaN(value * 1)) {
        this.checked.emailCodeOk = false
        return callback(new Error('验证码必须是数字'))
      }
      if ((value + '').trim().length !== 6) {
        this.checked.emailCodeOk = false
        return callback(new Error('验证码应为6位'))
      }
      this.checked.emailCodeOk = true
    }
    return {
      isLogin: true,
      isRegister: false,
      allChecked: false,
      // 用户登录表单
      userLogin: {
        // 登录时用户名
        email: '',
        // 登录密码
        password: '',
      },
      // 用户注册表单
      userRegister: {
        // 注册用户名
        registerUsername: '',
        // 注册密码
        registerPassword: '',
        // 确认密码
        confirmPassword: '',
        // 邮箱
        email: '',
        // 邮箱验证码
        emailCode: '',
        // 正确的邮箱验证码
        trueCode: '',
      },
      //  规则表单
      rules: {
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        registerPassword: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: confirmPassword, trigger: 'blur'}
        ],
        emailCode: [
          {validator: emailCode, trigger: 'blur'}
        ]
      },
      // 检查
      checked: {
        passwordOk: false,
        confPasswordOk: false,
        emailOk: false,
        emailCodeOk: false
      }
    };
  },
  mounted() {
  },
  methods: {
    // 登录注册切换
    changeRegister() {
      if (this.isLogin === true) {
        this.isLogin = false;
        this.isRegister = true;
      } else {
        this.isRegister = false;
        this.isLogin = true;
      }
    },
    // 获取邮箱验证码
    getCode(event) {
      let count = 60
      if (!this.checked.emailOk || !this.checked.passwordOk  || !this.checked.confPasswordOk) {
        return this.$message({
          message: "请完善信息再获取",
          type: 'warning'
        })
      }
      event.target.innerHTML = `${count}秒后重新获取`
      event.target.setAttribute('disabled', true)
      event.target.style.cursor = 'not-allowed'
      event.stopPropagation()
      let timer = setInterval(() => {
        if (count === 60) {
          count -= 1
        }
        if (count === 0) {
          event.target.innerHTML = `获取验证码`
          event.target.removeAttribute('disabled')
          event.target.style.cursor = 'pointer'
          return clearInterval(timer)
        }
        event.target.innerHTML = `${count}秒后重新获取`
        count -= 1
      }, 1000)
      // 获取验证码
      this.$axios.getCode(this.userLogin.email).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '验证码已发送',
            type: 'success'
          })
        } else {
          this.$message({
            message: '发送失败',
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message({
          message: '发送失败',
          type: 'warning'
        })
      })
    },
    // 注册
    register() {
      if (!this.checked.emailOk || !this.checked.passwordOk || !this.checked.confPasswordOk || !this.checked.emailCodeOk) {
        return this.$message({
          message: '请检查信息',
          type: 'warning'
        })
      }
      // 注册的流程 --->  先向Node发送接口,看一下验证码是否正确
      this.$axios.checkCode({
        username: this.userRegister.email,
        password: this.userRegister.registerPassword,
        email: this.userRegister.email,
        code: this.userRegister.emailCode
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$axios.Login({
            password: this.userRegister.registerPassword,
            email: this.userRegister.email,
          }).then(resu=>{
            console.log(resu)
            if(resu.code === 200){
              window.localStorage.setItem('bestStudySession', resu.data)
              this.$message({
                message:"注册成功，即将为您自动登录",
                type:'success'
              })
              setTimeout(()=>{
                this.$router.push("/home")
              },1000)
            }else {
              this.$message({
                message:"登录失败",
                type:'error'
              })
            }
          })
        }
      })
    },
    // 登录
    login() {
      if (!this.checked.emailOk || !this.checked.passwordOk) {
        return this.$message({
          message: '请检查邮箱和密码',
          type: 'warning'
        })
      }
      this.$axios.Login(this.userLogin).then(res => {
        console.log(res)
        if(res.code === 200){
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          window.localStorage.setItem('bestStudySession', res.data)
          setTimeout(() => {
            this.$router.push('/home')
          }, 1000)
        }else{
          this.$message({
            message: '未知错误' + res.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: '未知错误' + err,
          type: 'error'
        })
      })
    },
  },
};
</script>

<style scoped lang="less">
/* 背景颜色 */
#login {
  width: 100%;
  height: 100%;
  background-color: #e493d0;
  background-image: radial-gradient(closest-side, rgba(235, 105, 78, 1), rgba(235, 105, 78, 0)),
  radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
  radial-gradient(closest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
  radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
  radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax,
  50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 7s movement linear infinite;
}

@keyframes movement {
  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax,
    50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax, -40vmax -20vmax,
    40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax, 60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax, 20vmax 10vmax, 30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax, -10vmax 10vmax,
    40vmax 60vmax;
  }
}

/* 背景颜色Over */
/* 输入框Start */
#login {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: relative;
}

/* title文字 */
#title h2 {
  color: white;
  font-size: 3rem;
  text-align: center;
  letter-spacing: 10px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  line-height: 70px;
  margin: 0;
}

#title {
  padding-top: 40px;
}

.toRegister {

}

.toRegister:hover {
  text-decoration: underline;
}

#form {
  //line-height: 100px;
  width: 30%;
  //text-align: center;
  /* 实现毛玻璃效果 */
  background: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
  /* 毛玻璃完成 */
  /* 设置层级 */
  z-index: 101;
  /* 进行居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 设置内边距 */
}

#form1 {
  width: 27%;
  // height: 35%;
  text-align: center;
  /* 实现毛玻璃效果 */
  background: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
  /* 毛玻璃完成 */
  /* 设置层级 */
  z-index: 101;
  /* 进行居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wave-group {
  text-align: center;
  position: relative;
  margin-bottom: 30px;
}

</style>
