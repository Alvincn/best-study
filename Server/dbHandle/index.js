const db = require('../db/index');
module.exports = {
  // 新增任务
  addTask: (task) => {
    let date = new Date();
    let dateToday = date.toLocaleDateString();
    console.log(dateToday);
    return new Promise((resolve, reject) => {
      db.query(
        `insert into t_task(user_id, title, isCheck, date, parentIndex, point) values(?,?,?,?,?,?)`,
        [task.user_id, task.title, '0', dateToday, task.parentIndex, task.point],
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve('任务添加成功');
          }
        }
      );
    });
  },
  // 新增任务集
  addTaskSet: (taskSet) => {
    return new Promise((resolve, reject) => {
      console.log(taskSet);
      db.query(
        `insert into t_task_set(user_id, title) values(?,?)`,
        [taskSet.user_id, taskSet.title],
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve('数据集添加成功');
          }
        }
      );
    });
  },
  // 获取指定日期的任务
  getTask: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from t_task where date=? AND user_id=?',
        [data.date, data.user_id],
        (err, result) => {
          if (err) reject(new Error(err));
          resolve(result);
        }
      );
    });
  },
  // 获取指定人的任务集
  getTaskSet: (data) => {
    return new Promise((resolve, reject) => {
      db.query('select * from t_task_set where user_id=?', [data.user_id], (err, result) => {
        if (err) reject(new Error(err));
        result.forEach((item) => {
          item.children = [];
        });
        resolve(result);
      });
    });
  },
  // 获取今天的任务及任务集
  getAllTask: (data) => {
    let date = new Date().toLocaleDateString();
    return new Promise((resolve, reject) => {
      db.query(
        'select * from t_task where user_id=? AND date=? AND parentIndex=?',
        [data.user_id, date, data.id],
        (err, child) => {
          if (err) reject(err);
          resolve(child);
        }
      );
    });
  },
};
