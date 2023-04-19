const express = require('express');
const router = express.Router();
const { sendMails } = require('../utils/sendEmail');
const dbHandle = require('../dbHandle/index');
// 引入http模块发送请求
const http = require('http');
// 存储邮箱和验证码的对应关系
const codeMap = new Map();
// 获取邮箱验证码
router.post('/getCode', (req, res) => {
  const { email } = req.body;
  let code = Math.floor(Math.random() * 899999 + 100000);
  console.log(email, code);
  sendMails(email, code)
    .then((result) => {
      codeMap.set(email, code); // 将邮箱和验证码存储到Map中
      return res.send({
        code: 200,
        message: '发送成功',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        code: 201,
        message: '发送失败',
      });
    });
});
// 检查验证码是否正确
router.post('/checkInfo', (req, res) => {
  const { email, code, username, password } = req.body;
  console.log(email, code, username, password);
  let data = email + code + username + password;
  if (!code) {
    return res.send({
      code: 202,
      message: '缺少参数',
    });
  }
  const storedCode = codeMap.get(email); // 从Map中读取已存储的验证码
  console.log(code, storedCode);
  if (storedCode == code) {
    return res.send({
      code: 200,
      message: '验证码正确',
    });
  } else {
    return res.send({
      code: 201,
      message: '验证码错误',
    });
  }
});
// 插入任务
router.post('/addTask', async (req, res) => {
  let task = req.body;
  try {
    let result = await dbHandle.addTask(task);
    return res.send({
      code: 200,
      msg: result,
    });
  } catch (error) {
    return res.send({
      code: 201,
      msg: error,
    });
  }
});
// 新增任务集
router.post('/addTaskSet', async (req, res) => {
  console.log(req);
  let taskSet = req.body;
  try {
    let result = await dbHandle.addTaskSet(taskSet);
    return res.send({
      code: 200,
      msg: result,
    });
  } catch (error) {
    return res.send({
      code: 201,
      msg: error,
    });
  }
});
// 获取指定日期的任务
router.get('/getTask', async (req, res) => {
  try {
    let result = await dbHandle.getTask(req.query);
    return res.send({
      code: 200,
      msg: '查找成功',
      data: result,
    });
  } catch (error) {
    return res.send({
      code: 201,
      msg: '查找失败',
      data: error,
    });
  }
});
// 获取任务集
router.get('/getTaskSet', async (req, res) => {
  try {
    let result = await dbHandle.getTaskSet(req.query);
    return res.send({
      code: 200,
      msg: '查找成功',
      data: result,
    });
  } catch (error) {
    return res.send({
      code: 201,
      msg: '查找失败',
      data: error,
    });
  }
});
// 获取今天所有的任务集和任务
router.get('/getAllTask', async (req, res) => {
  console.log(req.query);
  try {
    let arr = [];
    let result = await dbHandle.getTaskSet(req.query);
    for (let i = 0; i < result.length; i++) {
      let resu = await dbHandle.getAllTask({ user_id: req.query.user_id, id: result[i].id });
      result[i].children = resu;
    }
    console.log(arr);
    return res.send({
      code: 200,
      msg: '查找成功',
      data: result,
    });
  } catch (error) {
    return res.send({
      code: 201,
      msg: '查找失败',
      data: error,
    });
  }
});
module.exports = router;
