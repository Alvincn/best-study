const db = require('../db/index');
let time = new Date();
let today = time.toLocaleDateString();
module.exports = {
  // 新增任务
  addTask: (task) => {
    let date = new Date();
    let dateToday = date.toLocaleDateString();
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
  // 勾选状态
  updateCheck: (tasks) => {
    let date = new Date();
    let Today = date.toLocaleDateString();
    return new Promise((resolve, reject) => {
      if (tasks.length) {
        tasks.forEach((item) => {
          db.query(
            'UPDATE t_task SET isCheck=1 WHERE user_id=? AND id=? AND date=?',
            [item.user_id, item.id, Today],
            (err, result) => {
              if (err) reject(err);
            }
          );
        });
        resolve('状态更新完成');
      } else {
        db.query(
          'UPDATE t_task SET isCheck=1 WHERE user_id=? AND id=? AND date=?',
          [tasks.user_id, tasks.id, Today],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      }
      db.query();
    });
  },
  // 取消状态
  updateunCheck: (tasks) => {
    let date = new Date();
    let Today = date.toLocaleDateString();
    return new Promise((resolve, reject) => {
      if (tasks.length) {
        tasks.forEach((item) => {
          db.query(
            'UPDATE t_task SET isCheck=0 WHERE user_id=? AND id=? AND date=?',
            [item.user_id, item.id, Today],
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          );
        });
        resolve('状态更新完成');
      } else {
        db.query(
          'UPDATE t_task SET isCheck=0 WHERE user_id=? AND id=? AND date=?',
          [tasks.user_id, tasks.id, Today],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      }
      db.query();
    });
  },
  // 删除任务集
  deleteTaskSet: (taskSet) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM t_task_set WHERE id=?', [taskSet.id], (err, result) => {
        if (err) return reject(err);
        db.query('DELETE FROM t_task WHERE parentIndex=?', [taskSet.id], (err1, result1) => {
          if (err1) return reject(err1);
          resolve(result1);
        });
      });
    });
  },
  // 插入学习记录
  insertStudyRecord: (taskset) => {
    let studyTime = taskset.studyTime * 1;
    return new Promise((resolve, reject) => {
      db.query(
        'insert into t_study(user_id, taskset_id, date, study_time) values(?,?,?,?)',
        [taskset.user_id, taskset.id, today, studyTime],
        (err, result) => {
          if (err) reject(err);
          db.query(
            'select * from t_task_set where id=? and user_id=?',
            [taskset.id, taskset.user_id],
            (err1, result1) => {
              if (err1) reject(err1);
              let totalTime = result1[0].totalTime + studyTime;
              console.log(totalTime);
              db.query(
                'update t_task_set set totalTime=? where id=? and user_id=?',
                [totalTime, result1.id, result1.user_id],
                (err2, result2) => {
                  if (err2) reject(err2);
                  resolve(result2);
                }
              );
            }
          );
        }
      );
    });
  },
};
