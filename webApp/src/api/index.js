/**
 * 此文件用于接口的统一管理
 */

import {request, nodeRequest, mockRequest} from "@/api/methods";
// 用户登录接口
export default {
    // 登录
    Login: (user) => {
        return request.Post('/user/login', {email: user.email, password: user.password, code: 'null'});
    },
    // 验证验证码是否正确
    checkCode: (user) => {
        return nodeRequest.Post('/checkInfo', {
            email: user.email,
            password: user.password,
            code: user.code,
            username: user.username
        });
    },
    // 获取邮箱验证码
    getCode: (email) => {
        return nodeRequest.Post('/getCode', {email: email});
    },
    // 获取所有的许愿瓶
    getWishBottle: () => {
        return request.Get('/wishbottle/list')
    },
    // 获取个人信息
    getUserInfo: () => {
        return request.Get('/user/detail')
    },
    // 添加任务集
    addTaskSet: (taskSet) => {
        return nodeRequest.Post('/addTaskSet', taskSet)
    },
    // 添加任务集
    addTask: (task) => {
        return nodeRequest.Post('/addTask', task)
    },
    // 获取指定日期的任务 data{date:,user_id:}
    getTask:(date,user_id) =>{
        return nodeRequest.Get('/getTask',{date,user_id})
    },
    // 获取任务集 data{user_id}
    getTaskSet:(user_id) => {
        return nodeRequest.Get('/getTaskSet',{user_id})
    },
    // 获取今天的任务和任务集
    getAllTask:(user_id) =>{
        return nodeRequest.Get('/getAllTask',{user_id})
    },
};
