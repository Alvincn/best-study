<template>
  <div id="todo">
    <div>
      <div id="title">
        <span style="font-size: 25px">今天（{{ (new Date).toLocaleDateString() }}）</span>
        <div id="totalTask">
          <!-- 未完成任务 -->
          <div id="rest">
            <div class="count">{{ rest }}</div>
            <span class="introduce">未完成任务</span>
          </div>
          <!-- 已完成任务 -->
          <div id="complete">
            <div class="count">{{ complete }}</div>
            <span class="introduce">已完成</span>
          </div>
          <!-- 当前已专注时间 -->
          <div id="totalTime">
            <div class="count">{{ totalTime }}</div>
            <span class="introduce">已专注时间</span>
          </div>
          <!-- 今日积分 -->
          <div id="points">
            <div class="count">{{ points }}</div>
            <span class="introduce">今日积分</span>
          </div>
          <!-- 累计积分 -->
          <div id="totalPoints">
            <div class="count">{{ totalPoints }}</div>
            <span class="introduce">累计积分</span>
          </div>
        </div>
      </div>
      <div id="task">
        <!-- 上方操作等 -->
        <div id="handleTitle" style="margin-bottom: 20px">
          <span style="font-size: 20px">🌈任务</span>
          <div id="handle">
            <!--            <el-button size="mini" type="warning" @click="addTaskShow = true">新增任务</el-button>-->
            <el-button size="mini" type="success" @click="addTaskArrShow = true">新增任务集</el-button>
          </div>
        </div>
        <div id="tasks">
          <el-card class="box-card" v-for="(parent,index) in taskParentArr" :key="parent.id">
            <div slot="header" class="clearfix">
              <span>{{ parent.title }}</span>
              <el-button icon="el-icon-delete" style="float: right;margin: 0 10px" size="mini" type="danger"
                         circle></el-button>
              <el-button icon="el-icon-plus" style="float: right;" size="mini" type="primary" circle
                         @click="taskShow(parent)"></el-button>
            </div>
            <div class="text item">
              <el-table
                  ref="multipleTable"
                  :data="parent.children"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
                <el-table-column
                    align="center"
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="title"
                    label="任务名"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="points"
                    label="任务积分"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="totalTime"
                    label="学习时间">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>

      </div>
    </div>
    <!--  新增任务  -->
    <el-dialog title="新增任务" :visible.sync="addTaskShow">
      <el-form :model="task">
        <el-form-item label="任务名" :label-width="formLabelWidth">
          <el-input v-model="task.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="积分" :label-width="formLabelWidth">
          <el-select v-model="task.points" placeholder="请选择此任务积分">
            <el-option label="一分" value="1"></el-option>
            <el-option label="二分" value="2"></el-option>
            <el-option label="三分" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTaskShow = false">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建任务集 -->
    <el-dialog title="新增任务集" :visible.sync="addTaskArrShow">
      <el-form :model="task">
        <el-form-item label="任务集名" label-width="100px">
          <el-input v-model="taskParent.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTaskArrShow = false">取 消</el-button>
        <el-button type="primary" @click="addTaskArr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "index",
  data() {
    return {
      totalTime: 0,
      // 今日积分
      points: 0,
      // 累计积分
      totalPoints: 0,
      // 新增任务
      addTaskShow: false,
      addTaskArrShow: false,
      formLabelWidth: '60px',
      // 任务
      task: {
        id: 0,
        user: '',
        title: '',
        isCheck: false,
        totalTime: 0,
        count: 0,
        date: (new Date).toLocaleDateString(),
        points: '',
        parentIndex: ''
      },
      // 任务集的数组
      taskParentArr: [],
      // 单个任务集
      taskParent: {
        id: 0,
        user: '',
        title: '',
        allCheck: false,
        totalTime: 0,
        totalCount: 0,
        totalPoints: 0,
        children: []
      },
      parent: {}
    }
  },
  mounted() {
    this.selectionChange()
  },
  methods: {
    // 添加任务
    addTask() {
      if (this.task.title === '' || this.task.points === '') {
        return this.$message({message: "请填写内容"})
      }
      let task = JSON.parse(JSON.stringify(this.task))
      this.parent.children.push(task)
      window.localStorage.setItem("tasks", JSON.stringify(this.taskParentArr))
      this.addTaskShow = false
      this.task.title = ''
      this.task.points = ''
    },
    taskShow(parent) {
      this.addTaskShow = true
      this.parent = parent
    },
    addTaskArr() {
      if (this.taskParent.title.trim() === '') {
        return this.$message({
          message: '任务集名称不能为空'
        })
      }
      // 设置id自增
      this.taskParent.id = this.taskParentArr.length + 1
      // 读取vuex中的用户名
      this.taskParent.user = this.$store.state.user.userInfo.username
      // 进行深拷贝
      let taskParent = JSON.parse(JSON.stringify(this.taskParent))
      // 将深拷贝后的结果添加到数组中
      this.taskParentArr.push(taskParent)
      // 进行持久化保存
      window.localStorage.setItem("tasks", JSON.stringify(this.taskParentArr))
      // 关闭窗口
      this.addTaskArrShow = false
      // 清空内容
      this.taskParent.title = ''

    },
    handleSelectionChange(val) {
      val.forEach(item=>{
        item.isCheck = true
      })
      window.localStorage.setItem("tasks", JSON.stringify(this.taskParentArr))
    },
    selectionChange() {
      let tasks = window.localStorage.getItem("tasks")
      if (tasks) {
        this.taskParentArr = JSON.parse(tasks)
        this.$nextTick(() => {
          this.taskParentArr.forEach(item => {
            item.children.forEach(child => {
              if (child.isCheck === true) {
                this.$refs.multipleTable[0].toggleRowSelection(child, true)
              }
            })
          })
        })

      }
    }
  },
  computed: {
    // 已完成
    complete() {
      let total = 0
      this.taskParentArr.forEach(item => {
        item.children.forEach(child => {
          child.isCheck === true ? total += 1 : null;
        })
      })
      return total
    },
    // 未完成
    rest() {
      let total = 0
      this.taskParentArr.forEach(item => {
        item.children.forEach(child => {
          child.isCheck === false ? total += 1 : null;
        })
      })
      return total
    }
  }
}
</script>

<style scoped lang="less">
#todo {
  width: 100%;
  height: 80%;
  padding: 0;
  overflow-y: unset;

}

// 任务总览
#totalTask {
  margin: 20px auto;
  padding: 10px 0;
  border-radius: 10px;
  width: 95%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  text-align: center;

  .count {
    font-size: 30px;
    color: rgb(102, 177, 255);
  }

  .introduce {
    font-size: 10px;
    color: gray;
  }
}

#task {
  #tasks {
    width: 95%;
    height:500px;
    margin: 0 auto;
  }

  #handleTitle {
    display: flex;
    justify-content: space-between;
  }
}
</style>
