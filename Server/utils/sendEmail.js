// 发送邮箱验证码配置
//引入模块
const nodemailer = require('nodemailer');

let sendMails = (mailId, VerificationCode) => {
  //设置邮箱配置
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', //邮箱服务的主机，如smtp.qq.com
    service: 'qq',
    port: '465', //对应的端口号QQ邮箱的端口号是465
    secure: false, //开启安全连接
    //secureConnection:false,   //是否使用ssl
    auth: {
      //用户信息
      user: 'alvin0423@qq.com', //用来发邮件的邮箱账户
      pass: 'gppdhnvuiykfdagc', //这里的密码是qq的smtp授权码，可以去qq邮箱后台开通查看
    },
  });

  //设置收件人信息
  let mailOptions = {
    from: 'alvin0423@qq.com', //谁发的
    to: mailId, //发给谁
    subject: 'BestStudy', //主题是什么
    text: `您好，你的注册验证码为：${VerificationCode}
此验证码仅用于注册BestStudy，请不要随意将验证码发给他人`, //文本内容
    html: `
    <div style="width:100vw;height:500px">
      <img style="width:200px,height:200px;border-radius:50%" src="http://www.ivikey.top/img/logo.jpg"></img>
      <p>${mailId}老铁，欢迎注册BestStudy⭐，</p>
      <p>您的验证码为 <i>${VerificationCode}</i>，请不要将验证码随意交给他人，</p>
      <p>感谢您注册我们的软件，希望您在使用愉快，</p>
      <p>有任何问题请您积极回复，谢谢!😇</p>
    </div>
    
    `, //html模板
    // attachments: [              //附件信息,如果需要了再打开使用
    //     {
    //         filename: '',
    //         path: '',
    //     }
    // ]
  };

  return new Promise((resolve, reject) => {
    //异步函数
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); //错误
      } else {
        resolve(info);
      }
    });
  });
};

// export default sendMails;
module.exports = {
  sendMails,
};
