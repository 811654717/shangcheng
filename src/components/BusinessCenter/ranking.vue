<!-- 小组排名 -->
<template>
  <div class="ToAudit">
    <div class="Btop">
      <div>
        <el-input v-model="managerName" placeholder="请输入经理姓名" clearable></el-input>
      </div>
      <div>
        <el-input v-model="managerPhone" placeholder="请输入经理手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <el-date-picker value-format="yyyy-MM" v-model="value2" type="month" placeholder="选择创建时间" clearable></el-date-picker>
      </div>
      <div style="display:flex;align-items: center;">
        <el-button style="margin: 0" @click="inquire" type="primary">搜索</el-button>
        <!-- <button
            type="reset"
            style="background-color:white;color:#379EE9;border:1px solid #379EE9;display:flex;align-items: center;padding:0 10px;"
            class="layui-btn"
            @click="reset"
          >
            <img
              style="margin-right:10px"
              src="https://images.baiduyuyue.com/background-重置.png"
              alt
            />重置
        </button>-->
      </div>
    </div>
    <div class="TODiv">
      <div class="table" style="position:relative">
        <table>
          <tr>
            <th style="width:50px">序号</th>
            <th style="width:100px">经理名称</th>
            <th style="width:150px">经理手机号</th>
            <th style="width:100px">成员数量</th>
            <th style="width:150px">小组总业绩</th>
            <th style="width:100px">月份</th>
          </tr>
        </table>
        <div class="overflow" v-if="managerTotal != 0">
          <table>
            <tr v-for="(item, index) in managerAll" :key="index">
              <td style="width:50px">{{index + 1}}</td>
              <td style="width:100px">{{item.personnelUserName}}</td>
              <td style="width:150px">{{item.personnelPhoneNumber}}</td>
              <td style="width:100px">{{item.personnelCount}}</td>
              <td style="width:150px">{{item.rechargeCount}}</td>
              <td style="width:100px">{{item.monthDate}}</td>
            </tr>
          </table>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div v-if="managerTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="managerTotal != 0"
          class="page"
          :total="managerTotal"
          :current="managerPageNum"
          @on-change="managerPageNumChange"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          :page-size="managerPagesize"
          @on-page-size-change="managerPagesizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
export default {
  data() {
    return {
      spinShow: false, //懒加载
      // urls: "http://192.168.0.190:8080", //测试地址
      urls: "https://www.baiduyuyue.com/management", //线上地址

      managerTotal: 0, //小组排名总条数
      // managerTotal: 10, //小组排名总条数
      managerAll: [], //小组排名总数据
      managerPageNum: 1, //商务当前页
      managerPagesize: 10, //商务每页数据条数
      managerName: "", //输入的经理姓名
      managerPhone: "", //输入的经理手机号
      value2: "",
      creationTime: "" //选择的创建日期
    };
  },
  metaInfo: {
    title: "小组排名",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  components: {},

  computed: {},
  created() {},
  mounted() {
    this.valueTime();
    this.inquire();
    
  },
  watch: {
    value2() {
      console.log(this.value2);
      if (this.value2 != null) {
        this.creationTime = this.value2;
        console.log(this.creationTime);
      } else {
        this.creationTime = "";
        console.log(this.creationTime);
      }
    }
  },
  methods: {
    //日期选择默认时间
    valueTime(){
      console.log(this.value2);
      if (this.value2 == "") {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.value2 = year.toString() + '-' + month.toString();
        console.log(this.value2);
      }
    },
    //搜索
    inquire() {
      this.managerPageNum = 1;
      this.managerPagesize = 10;
      console.log(this.creationTime);
      if (this.creationTime == "") {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.creationTime = year.toString() + '-' + month.toString();
        console.log(this.creationTime);
      }
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialPersonnel/queryRechargeRecordByGroup?personnelName=${
            this.managerName
          }&personnelPhoneNum=${this.managerPhone}&rechargeMonth=${
            this.creationTime
          }&pageNum=${1}&pageSize=${10}`
        )
        .then(res => {
          console.log(res);
          this.managerTotal = res.data.data.total;
          this.managerAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      if (this.creationTime == "") {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.creationTime = year.toString() + '-' + month.toString();
        console.log(this.creationTime);
      }
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialPersonnel/queryRechargeRecordByGroup?personnelName=${this.managerName}&personnelPhoneNum=${this.managerPhone}&rechargeMonth=${this.creationTime}&pageNum=${this.managerPageNum}&pageSize=${this.managerPagesize}`
        )
        .then(res => {
          // console.log(res);
          this.managerTotal = res.data.data.total;
          this.managerAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变商户当前页
    managerPageNumChange(value) {
      // console.log(value);
      this.managerPageNum = value;
      this.search();
    },
    //改变商户每页数据条数
    managerPagesizeChange(value) {
      // console.log(value);
      this.managerPagesize = value;
      this.search();
    }
  }
};
</script>
<style scoped>
@import "../../CSS/gonggong.css";
.page {
  margin: 7px 0 7px 10px;
}
.overflow {
  height: 404px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.Btop div + div {
  margin-left: 30px;
}
.Btop {
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.ToAudit {
  width: 100%;
  padding: 35px 20px;
}
.TODiv {
  width: 100%;
  height: 100%;
  border: 1px solid #e6e6e6;
}
.table {
  display: flex;
  flex-direction: column;
}
</style>