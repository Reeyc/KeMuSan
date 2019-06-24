<template>
  <div>
    <div class="res" v-show="!randomList.length">
      <span v-show="result">
        测验结果：
        <strong style="color:#67C23A;">合格</strong>
      </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span v-show="!result">
        测验结果：
        <strong style="color:#f56c6c;">不合格</strong>
      </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text" @click="showAnswer">查看答案</el-button>
    </div>
    <el-row>
      <el-col>
        <h1 class="title">科目三模拟夜间灯光考试（{{randomList.length}}）</h1>
        <p ref="p">题目: {{random}}</p>
        <el-alert type="success" v-show="flag">出题完毕，请重新开始测验</el-alert>
        <br>
        <div class="container">
          <el-input placeholder="请输入答案" v-model="value" clearable ref="clear"></el-input>
          <el-button :disabled="flag" @click="handleClick">提交</el-button>
        </div>
        <br>
        <el-button :disabled="flag" @click="nextClick">下一题</el-button>
        <el-button @click="reClick">重新开始</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      size="small"
      v-show="resAnswer"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="random" align="center" label="题目"></el-table-column>
      <el-table-column prop="userVal" align="center" label="你的答案"></el-table-column>
      <el-table-column prop="answer" align="center" label="正确答案"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "", //输入值
      flag: false, //是否出题完毕
      result: true, //是否合格
      resAnswer: false, //是否展示表格
      randomIndex: 0, //当前题目索引
      tableData: [], //表格数据
      randomList: [
        {
          topic: "通过有信号灯控制的路口",
          answer: "近光灯"
        },
        {
          topic: "通过没有交通信号灯控制的路口",
          answer: "远近交替"
        },
        {
          topic: "超车",
          answer: "远近交替"
        },
        {
          topic: "同方向近距离跟车行驶",
          answer: "近光灯"
        },
        {
          topic: "通过坡路",
          answer: "远近交替"
        },
        {
          topic: "通过拱桥",
          answer: "远近交替"
        },
        {
          topic: "通过急弯",
          answer: "远近交替"
        },
        {
          topic: "通过人行横道",
          answer: "远近交替"
        },
        {
          topic: "与机动车会车",
          answer: "近光灯"
        },
        {
          topic: "在有路灯，照明良好的道路上行驶",
          answer: "近光灯"
        },
        {
          topic: "夜间进入照明不良的道路上行驶",
          answer: "远光灯"
        },
        {
          topic: "在路边临时停车",
          answer: "示宽灯+双闪"
        },
        {
          topic: "进入无照明的道路上行驶",
          answer: "远光灯"
        }
      ]
    };
  },
  created() {
    localStorage.setItem("randomList", JSON.stringify(this.randomList));
  },
  computed: {
    //随机出题
    random() {
      if (!this.randomList.length) {
        this.$refs.p.innerHTML = "";
        this.flag = true;
        return;
      }
      this.randomIndex = Math.round(
        Math.random() * (this.randomList.length - 1)
      );
      return this.randomList[this.randomIndex].topic;
    }
  },
  methods: {
    handleClick() {
      if (!this.value.trim()) {
        //空值
        this.$message({
          message: "未填写答案",
          type: "warning",
          duration: 1300,
          customClass: "my-message"
        });
        this.result = false;
      } else if (
        this.value.trim() !== this.randomList[this.randomIndex].answer
      ) {
        //错误值
        this.$message({
          message: "回答错误",
          type: "error",
          duration: 1300,
          customClass: "my-message"
        });
        this.result = false;
      } else {
        //正确值
        this.$message({
          message: "回答正确",
          type: "success",
          duration: 1300,
          customClass: "my-message"
        });
      }
      //表格更新
      this.tableData.push({
        random: this.randomList[this.randomIndex].topic,
        userVal: this.value.trim() || "你未填写答案",
        answer: this.randomList[this.randomIndex].answer
      });
      //数据更新
      const dataList = localStorage.getItem("randomList");
      if (dataList) {
        this.randomList = JSON.parse(dataList);
        this.randomList.splice(this.randomIndex, 1); //更新randomList
        localStorage.setItem("randomList", JSON.stringify(this.randomList)); //更新localStore
      } else {
        localStorage.setItem("randomList", JSON.stringify(this.randomList));
      }
      this.value = "";
    },
    nextClick() {
      if (!this.value.trim()) {
        this.$confirm("是否跳过当前题目？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "my-confirm"
        })
          .then(() => {
            this.handleClick();
          })
          .catch(() => {});
      } else {
        this.$alert("请先提交当前题目", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          customClass: "my-confirm"
        });
      }
    },
    reClick() {
      location.reload();
    },
    showAnswer() {
      this.resAnswer = true;
    },
    tableRowClassName({ row }) {
      if (row.userVal !== row.answer) {
        return "error-row";
      }
      return "";
    }
  }
};
</script>

<style lang="stylus" scoped>
.res
  position: fixed
  width: 100%
  text-align: center
.el-row
  position: fixed
  left: 50%
  top: 10%
  transform: translateX(-50%)
  text-align: center
.title
  font-size: 30px
  font-weight: normal
.container
  display: flex
.el-table
  position: absolute
  top: 55%
  left: 50%
  transform: translateX(-50%)
  width: 60%
@media only screen and (min-device-width: 320px) and (max-device-width: 374px)
  /* iphone5 */
  .el-row
    width: 80%
  .title
    font-size: 16px
  .el-table
    width: 90%
@media only screen and (min-device-width: 375px) and (max-device-width: 413px)
  /* iphone6-7-8 */
  .el-row
    width: 80%
  .title
    font-size: 20px
  .el-table
    width: 90%
@media only screen and (min-device-width: 414px) and (max-device-height: 736px)
  /* iphone6plus-7plus-8plus */
  .el-row
    width: 80%
  .title
    font-size: 22px
  .el-table
    width: 90%
</style>
<style lang="stylus">
.el-table .error-row
  background-color: #fca4a4
@media only screen and (min-device-width: 320px) and (max-device-width: 736px)
  .my-message
    min-width: 300px
  .my-confirm
    width: 300px
</style>

