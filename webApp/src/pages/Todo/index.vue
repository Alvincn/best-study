<template>
  <div id="todo">
    <div v-show="!timerCompentShow">
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
          <el-card style='margin-bottom: 10px' class="box-card" v-for="(parent,index) in taskParentArr"
                   :key="parent.id">
            <div slot="header" class="clearfix">
              <span>{{ parent.title }}</span>

              <template>
                <el-popconfirm
                    title="这是一段内容确定删除吗？"
                    @confirm="deleteTask(index)"
                >
                  <el-button slot="reference" icon="el-icon-delete" style="float: right;" size="mini" type="danger"
                             circle
                  ></el-button>
                </el-popconfirm>
              </template>


              <el-button icon="el-icon-plus" style="float: right;margin: 0 10px" size="mini" type="primary" circle
                         @click="taskShow(parent)"></el-button>
              <el-button icon="el-icon-video-play" style="float: right;" size="mini" type="success" circle
                         @click="timerShow(parent)"></el-button>
            </div>
            <div class="text item">
              <el-table
                  ref="multipleTable"
                  :data="parent.children"
                  @selection-change="handleSelectionChange"
                  @select="selectChange"
                  @select-all="(selection) => selectAll(selection, index)"
                  style="width: 100%;">
                <el-table-column
                    align="center"
                    type="selection"
                    width="">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="title"
                    label="任务名"
                    width="">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="point"
                    label="任务积分"
                    width="">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>

      </div>
    </div>
    <div v-show="timerCompentShow">
      <timerCompent></timerCompent>
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
import timerCompent from "@/components/timerCompent/timerCompent";
export default {
  name: "index",
  data() {
    return {
      // 已专注时间
      totalTime: 0,
      // 已完成任务
      complete: 0,
      // 未完成任务
      rest: 0,
      // 今日积分
      // points: 0,
      // 累计积分
      totalPoints: 0,
      // 新增任务
      addTaskShow: false,
      addTaskArrShow: false,
      formLabelWidth: '60px',
      // 任务
      task: {
        id: 0,
        user_id: this.$store.state.user.userInfo.user_id,
        title: '',
        isCheck: 0,
        totalTime: 0,
        count: 0,
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
      parent: {},
      currentTask: [],
      charge: true,
      timerCompentShow:false
    }
  },
  async mounted() {
    await this.$store.dispatch("getUser")
    await this.getAllTasks()
    this.selectionChange()
    this.getTotal()
    this.$bus.$on("closeTimer",()=>{
      this.timerCompentShow = false
    })
  },
  methods: {
    // 添加任务
    async addTask() {
      if (this.task.title === '' || this.task.points === '') {
        return this.$message({message: "请填写内容"})
      }
      if (this.parent.children.length === 3) {
        return this.$message({
          message: '每个任务集最多创建三个任务'
        })
      }
      let task = {
        user_id: this.user_id,
        title: this.task.title,
        parentIndex: this.parent.id,
        point: this.task.points
      }
      let result = await this.$axios.addTask(task)
      this.rest += 1
      if (result.data.code === 200) {
        this.$message({
          message: "添加任务成功",
          type: 'success'
        })
      }
      await this.getAllTasks()
      this.addTaskShow = false
      this.task.title = ''
      this.task.points = ''
    },
    // 展示添加任务
    taskShow(parent) {
      this.addTaskShow = true
      this.parent = parent
    },
    // 添加任务集
    async addTaskArr() {
      if (this.taskParent.title.trim() === '') {
        return this.$message({
          message: '任务集名称不能为空'
        })
      }
      if (this.taskParentArr.length === 3) {
        return this.$message({
          message: '任务集最多创建三个'
        })
      }
      let result = await this.$axios.addTaskSet({user_id: this.user_id, title: this.taskParent.title})
      if (result.data.code === 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        await this.getAllTasks()
      } else {
        this.$message({
          message: '添加失败',
          type: 'warning'
        })
      }
      // 关闭窗口
      this.addTaskArrShow = false
      // 清空内容
      this.taskParent.title = ''

    },
    // 取消勾选的事件
    async handleSelectionChange(selection) {
      if (selection.length >= this.currentTask.length) {
        this.currentTask = selection
      } else {
        var minus = this.currentTask.filter(function (v) {
          return selection.indexOf(v) === -1
        })
        let result = await this.$axios.updateCheck({isCheck: 0, tasks: minus})
        if (result.data.code === 200) {
          this.charge = true
          this.rest += 1
          this.complete -= 1
        }
      }
    },
    // 勾选的事件
    async selectChange(selection, row) {
      if (selection.length >= this.currentTask.length) {
        this.complete += 1
        this.rest -= 1
        await this.$axios.updateCheck({isCheck: 1, tasks: selection})
      }
    },
    // 刚开始的如果有已经完成的，自动勾选
    selectionChange() {
      let tasks = window.localStorage.getItem("tasks")
      if (tasks) {
        this.$nextTick(() => {
          this.taskParentArr.forEach(item => {
            item.children.forEach(child => {
              if (child.isCheck == 1) {
                this.$refs.multipleTable.forEach(item => {
                  item.toggleRowSelection(child, true)
                })
              }
            })
          })
        })
      }
    },
    // 全部勾选的事件
    selectAll: async function (selection, index) {
      // 判断这两个的差集，如果差集为空的话，那就说明没有勾选，如果有差集，那么就说明全部勾选了
      var minus = this.taskParentArr[index].children.filter(function (v) {
        return selection.indexOf(v) === -1
      })
      // 说明全部勾选
      if (minus.length === 0) {
        await this.$axios.updateCheck({isCheck: 1, tasks: this.taskParentArr[index].children})
        this.complete += this.taskParentArr[index].children.length
        this.rest -= this.taskParentArr[index].children.length
      } else {
        // 没有一个勾选
        await this.$axios.updateCheck({isCheck: 0, tasks: minus})
        this.complete -= minus.length
        this.rest += minus.length

      }
    },
    // 删除任务
    deleteTask: async function (index) {
      let result = await this.$axios.deleteTaskSet(this.taskParentArr[index])
      if (result.data.code === 200) {
        this.$message({
          message: "删除成功",
          type: 'success'
        })
        await this.getAllTasks()
      }
    },
    // 获取全部的任务
    async getAllTasks() {
      let result = await this.$axios.getAllTask(this.user_id)
      if (result.data.code === 200) {
        if (result.data.data.length === 0) {
          this.taskParentArr = []
          return this.$message({
            message: "还没有任务集呢，快去创建把",
            type: 'warning'
          })
        }
        this.taskParentArr = result.data.data
        this.selectionChange()
      } else {
        return this.$message({
          message: "出现了某些错误，请稍后再试",
          type: 'danger'
        })
      }
    },
    getTotal() {
      this.taskParentArr.forEach(item => {
        item.children.forEach(child => {
          if (child.isCheck === 1) {
            this.complete += 1
          } else {
            this.rest += 1
          }
        })
      })
    },
    timerShow(parent) {
      this.timerCompentShow = true
      this.parent = parent
      this.$bus.$emit('clear',parent);
    }
  },
  computed: {
    user_id() {
      return this.$store.state.user.userInfo.id
    },
    points() {
      let total = 0
      this.taskParentArr.forEach(item => {
        item.children.forEach(child => {
          if (child.isCheck === 1) {
            total += child.point
          }
        })
      })
      return total
    }
  },
  components: {
    timerCompent
  }
}
</script>

<style scoped lang="less">
#todo {
  width: 100%;
  height: 100%;
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
    height: 0;

    margin: 0 auto 400px auto;
  }

  #handleTitle {
    display: flex;
    justify-content: space-between;
  }
}
</style>
