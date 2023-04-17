import mock from 'mockjs'
// mock.setup({
//     timeout: '300-600'
// })
// 模拟登录接口 返回一个token
mock.mock("/mock/login", 'post', (data) => {
    data = JSON.parse(data.body)
    if (data.phone === 15568295503 && data.password === 'Chen20020423') {
        return {
            code: 200,
            message: 'success',
            data:{
                session:"session"
            }
        }
    } else {
        return {
            code: 201,
            message: "false"
        }
    }
})
//注册
mock.mock("/mock/register", 'post', (data) => {
    data = JSON.parse(data.body)
    // if (data.code === count) {
    //     return {
    //         code: 200,
    //         message: 'success'
    //     }
    // } else {
    //     return {
    //         code: 201,
    //         message: 'false'
    //     }
    // }
    return {
        code: 200,
        message: 'success'
    }
})
//获取验证码
mock.mock("/mock/getCode", 'post', (data) => {
    let count = Math.floor(Math.random() * 8999 + 1000)
    return {
        code: 200,
        message: 'success',
        data: count
    }
})
//获取个人信息
mock.mock("/mock/user/getUser", 'post', (data) => {
    return {
        code: 200,
        message:'success',
        data: {
            username:'Alvincn',
            profileName:'logo.jpg'
        }
    }
})
