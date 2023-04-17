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
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入11位手机号" v-model.number="userLogin.phone"></el-input>
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
      <div id="form1" v-show="isRegister"><h1 style="text-align: center;line-height: 60px;font-size: 30px;color: white">用户注册</h1>
        <el-form style="width: 90%;" :model="userRegister" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="昵称" prop="registerUsername">
            <el-input placeholder="请输入昵称" v-model="userRegister.registerUsername"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="registerPassword">
            <el-input placeholder="请输入密码（包含大写、小写、数字）" type="password" v-model="userRegister.registerPassword"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input placeholder="重新输入密码" type="password" v-model="userRegister.confirmPassword"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入11位手机号" type="text" v-model.number="userRegister.phone"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码" prop="phoneCode">
            <el-input type="text" placeholder="输入手机验证码" v-model.number="userRegister.phoneCode">
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
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        this.checked.phoneOk = false
        return callback(new Error('手机号不能为空'));
      }
      if (isNaN(value * 1)) {
        this.checked.phoneOk = false
        return callback(new Error('手机号必须是数字'))
      }
      if ((value + '').trim().length !== 11) {
        this.checked.phoneOk = false
        return callback(new Error('手机号应为11位'))
      }
      this.checked.phoneOk = true
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
    var checkUserName = (rule, value, callback) => {
      if (!value.trim()) {
        this.checked.nickNameOk = false
        return callback(new Error('昵称不能为空'))
      }
      this.checked.nickNameOk = true
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
    var phoneCode = (rule, value, callback) => {
      if (!value) {
        this.checked.phoneCodeOk = false
        return callback(new Error('验证码不能为空'))
      }
      if (isNaN(value * 1)) {
        this.checked.phoneCodeOk = false
        return callback(new Error('验证码必须是数字'))
      }
      if ((value + '').trim().length !== 4) {
        this.checked.phoneCodeOk = false
        return callback(new Error('验证码应为4位'))
      }
      this.checked.phoneCodeOk = true
    }
    return {
      isLogin: true,
      isRegister: false,
      allChecked: false,
      // 用户登录表单
      userLogin: {
        // 登录时用户名
        phone: '',
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
        // 手机号
        phone: '',
        // 手机号
        phoneCode: '',
        // 正确的手机号验证码
        trueCode: '',
      },
      //  规则表单
      rules: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        registerUsername: [
          {validator: checkUserName, trigger: 'blur'}
        ],
        registerPassword: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: confirmPassword, trigger: 'blur'}
        ],
        phoneCode: [
          {validator: phoneCode, trigger: 'blur'}
        ]
      },
      // 检查
      checked: {
        nickNameOk: false,
        passwordOk: false,
        confPasswordOk: false,
        phoneOk: false,
        phoneCodeOk: false
      }
    };
  },
  mounted() {
  },
  methods: {
    // 登录注册切换
    changeRegister() {
      if (this.isLogin == true) {
        this.isLogin = false;
        this.isRegister = true;
      } else {
        this.isRegister = false;
        this.isLogin = true;
      }
    },
    // 获取手机验证码
    getCode(event) {
      let count = 60
      if (!this.checked.phoneOk || !this.checked.passwordOk || !this.checked.nickNameOk || !this.checked.confPasswordOk) {
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
          console.log(event.target.innerHTML)

          event.target.removeAttribute('disabled')
          event.target.style.cursor = 'pointer'
          return clearInterval(timer)
        }
        event.target.innerHTML = `${count}秒后重新获取`
        count -= 1
      }, 1000)
      this.$api.post('/getCode', this.userRegister.phone).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '验证码已发送',
            type: 'success'
          })
          console.log(res)
        } else {
          this.$message({
            message: '未知错误',
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: '获取失败' + err,
          type: 'error',

        })
      })
    },
    // 注册
    register() {
      if (!this.checked.phoneOk || !this.checked.passwordOk || !this.checked.nickNameOk || !this.checked.confPasswordOk || !this.checked.phoneCodeOk) {
        return this.$message({
          message: '请检查信息',
          type: 'warning'
        })
      }
      this.$api.post('/register', this.userRegister).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          window.localStorage.setItem('username', this.userRegister.registerUsername)
          this.$router.push('/home')
        } else {
          this.$message({
            message: '注册失败',
            type: 'error'
          })
        }
      })
    },
    // 登录
    login() {
      if (!this.checked.phoneOk || !this.checked.passwordOk) {
        return this.$message({
          message: '请检查手机号和密码',
          type: 'warning'
        })
      }
      this.$api.post('/login', this.userLogin).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          window.localStorage.setItem('session',res.data.session)
          setTimeout(()=>{
            this.$router.push('/home')
          },1000)
        } else if (res.code === 201) {
          this.$message({
            message: "账号名密码错误",
            type: 'error'
          })
        } else {
          this.$message({
            message: '未知错误',
            type: 'error'

          })
        }
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
