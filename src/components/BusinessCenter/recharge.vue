<!-- 充值录入 -->
<template>
  <div class="ToAudit">
    <div class="Btop">
      <div>
        <el-input v-model="contractNumber" placeholder="请输入合同编号" clearable></el-input>
      </div>
      <div>
        <el-input v-model="representativeName" placeholder="请输入商务代表姓名" clearable></el-input>
      </div>
      <div>
        <el-input v-model="representativePhone" placeholder="请输入商务代表人手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <el-input v-model="rechargeCard" placeholder="请输入充值商" clearable></el-input>
      </div>
      
    </div>
    <div class="Btop">
      <div>
        <el-input v-model="rechargePhone" placeholder="请输入充值商手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <div class="block">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
            unlink-panels
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </div>
      </div>
      <div style="display:flex;align-items: center;">
        <el-button style="margin: 0" @click="inquire" type="primary">搜索</el-button>
      </div>
      <div v-for="item in threeAll" :key="item">
        <el-button v-if="item == 6301" type="primary" @click="newlyIncreased">新增</el-button>
        <el-button v-if="item == 6302" type="primary" @click="compile">编辑</el-button>
        <el-button v-if="item == 6303" type="primary" @click="expurgate">删除</el-button>
      </div>
    </div>
    <div class="TODiv">
      <div class="table" style="position:relative">
        <table>
          <tr>
            <th style="width:80px">序号</th>
            <th style="width:150px">合同编号</th>
            <th style="width:100px">商务代表</th>
            <th style="width:150px">代表人手机号</th>
            <th style="width:100px">充值商</th>
            <th style="width:150px">充值商手机号</th>
            <th style="width:100px">充值金额</th>
            <th style="width:100px">物资金额</th>
            <th>备注</th>
            <th style="width:150px">创建时间</th>
          </tr>
        </table>
        <div class="overflow" v-if="rechargeTotal != 0">
          <table>
            <tr
              v-for="(item, index) in rechargeAll"
              :key="index"
              @click="TrClick(index,item.enteringId)"
              :style="{backgroundColor: TRIndex == index ? '#BEE1FF' : ''}"
            >
              <td style="width:80px">{{index + 1}}</td>
              <td style="width:150px">{{item.rechargeContractNumber}}</td>
              <td style="width:100px">{{item.personnelUserName}}</td>
              <td style="width:150px">{{item.personnelPhoneNumber}}</td>
              <td style="width:100px;">{{item.rechargeCommercialName}}</td>
              <td style="width:150px;">{{item.rechargeCommercialPhoneNumber}}</td>
              <td style="width:100px">{{item.rechargeAmount}}</td>
              <td style="width:100px">{{item.rechargeCommodityAomount}}</td>
              <td>
                <span v-if="item.rechargeCommodityRemark == ''">-</span>
                <span v-else>{{item.rechargeCommodityRemark}}</span>
              </td>
              <td style="width:150px">{{item.enteringAddTime}}</td>
            </tr>
          </table>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div v-if="rechargeTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="rechargeTotal != 0"
          class="page"
          :total="rechargeTotal"
          :current="rechargePageNum"
          @on-change="rechargePageNumChange"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          :page-size="rechargePagesize"
          @on-page-size-change="rechargePagesizeChange"
        />
      </div>
    </div>
    <!-- 新增 -->
    <div v-if="newlyIncreasedTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>管理</span>
          <span @click="cancel">X</span>
        </div>
        <div class="maintain">
          <div>
            <span>合同编号 :</span>
            <el-input style="width: 200px;" v-model="newContract" placeholder="请输入合同编号" clearable></el-input>
          </div>
          <div>
            <span>商务代表 :</span>
            <el-select
              style="width: 200px;"
              v-model="newName"
              filterable
              reserve-keyword
              clearable
              placeholder="请选择业务代表"
              @change="salesman"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>商务代表手机号 :</span>
            <el-input style="width: 200px;" v-model="newPhone" maxlength="11" placeholder="请输入手机号" clearable></el-input>
          </div>
          <div>
            <span>充值商 :</span>
            <el-input style="width: 200px;" v-model="newRechargeName" placeholder="请输入姓名" clearable></el-input>
          </div>
          <div>
            <span>充值商手机号 :</span>
            <el-input
              style="width: 200px;"
              v-model="newRechargePhone"
              placeholder="请输入手机号"
              maxlength="11"
              clearable
            ></el-input>
          </div>
          <div>
            <span>充值金额 :</span>
            <el-input
              style="width: 200px;"
              v-model="newRechargeMoney"
              placeholder="请输入金额"
              clearable
            ></el-input>
          </div>
          <div>
            <span>物资金额 :</span>
            <el-input
              style="width: 200px;"
              v-model="newMaterialsMoney"
              placeholder="请输入金额"
              clearable
            ></el-input>
          </div>
          <div>
            <span>物资备注 :</span>
            <el-input
              type="textarea"
              style="width: 200px;"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="newMaterialsRemark"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="operatingButton">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Message } from "element-ui";
export default {
  data() {
    return {
      spinShow: false,
      rechargeTotal: 0, //充值录入总条数
      // rechargeTotal: 10, //充值录入总条数
      rechargeAll: [], //充值录入总数据
      rechargePageNum: 1, //充值录入当前页
      rechargePagesize: 10, //充值录入每页数据条数
      contractNumber: "", //输入的合同编号
      representativeName: "", //输入的商务代表姓名
      representativePhone: "", //输入的商务代表手机号
      rechargeCard: "", //输入的充值商
      rechargePhone: "", //输入的充值商手机号
      dayTime: "", //当前时间
      // time: [
      //   new Date(this.getFullYear(), this.getMonth(), this.getDate()),
      //   new Date(
      //     this.getFullYear(),
      //     this.getMonth(),
      //     this.getDate(),
      //     23,
      //     59,
      //     59
      //   )
      // ],
      time: [],
      newlyIncreasedTrue: false, //新增
      newContract: "", //新增合同编号
      newName: "", //选择商务代表姓名
      newPhone: "", //选择的商务代表手机号
      newRechargeName: "", //新增充值商
      newRechargePhone: "", //新增充值商手机号
      newRechargeMoney: "", //新增充值金额
      newMaterialsMoney: "", //新增物资金额
      newMaterialsRemark: "", //新增物资备注
      compileTrue: false, //是否点击了编辑
      TRIndex: -1,
      enteringId: "", //录入id
      commercialId: "", //更新需要的商户id
      urls: "",
      threeAll: [],
      pickerOptions: {
        disabledDate(value) {
          // console.log(value);
          // console.log(Date.now());
          if (Date.now() + 24 * 60 * 60 * 1000 <= value) {
            return true;
          }
          return false;
        }
      },
      options: [], //商务代表集合
    };
  },
  metaInfo: {
    title: "充值录入",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  components: {},

  computed: {},
  created() {
    //获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    this.dayTime = year + seperator1 + month + seperator1 + strDate;
    console.log(year + seperator1 + month + seperator1 + strDate);
    this.threeAll = this.$parent.threeAll;
  },
  mounted() {
    Vue.axios
      .get(this.urls + "/commercialPersonnel/queryAllPersonnelList")
      .then(res => {
        console.log(res);
        this.options = convertTree(res.data.data);
        function convertTree(tree) {
          const result = [];
          tree.forEach(item => {
            let {
              personnelId: value,
              personnelUserName: label,
              personnelPhoneNumber: phone
              // children: children
            } = item;
            // if (children) {
            //   children = convertTree(children);
            // }
            result.push({
              value,
              label,
              phone
              // children
            });
          });
          return result;
        }
      });
      console.log(this.options);
    this.inquire();
  },
  watch: {},
  methods: {
    //年
    getFullYear() {
      let date = new Date();
      return date.getFullYear();
    },
    //月
    getMonth() {
      let date = new Date();
      return date.getMonth();
    },
    //日
    getDate() {
      let date = new Date();
      return date.getDate();
    },
    //搜索
    inquire() {
      console.log(this.time);
      this.rechargePageNum = 1;
      this.rechargePagesize = 10;
      // console.log(this.time[0].getFullYear(),this.time[0].getMonth()+1,this.time[0].getDate(),this.time[1].getFullYear(),this.time[1].getMonth()+1,this.time[1].getDate());
      let startDate = "";
      let endDate = "";
      if (this.time.length == 0) {
        startDate = "";
        endDate = "";
      } else {
        startDate = this.time[0];
        endDate = this.time[1];
      }
      console.log(startDate, endDate);
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryAllRechargeRecordList?contractNumber=${
            this.contractNumber
          }&personnelName=${this.representativeName}&personnelPhoneNum=${
            this.representativePhone
          }&rechargeCommercialName=${
            this.rechargeCard
          }&rechargeCommercialPhoneNum=${
            this.rechargePhone
          }&startDate=${startDate}&endDate=${endDate}&pageNum=${1}&pageSize=${10}`
        )
        .then(res => {
          console.log(res);
          this.rechargeTotal = res.data.data.total;
          this.rechargeAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      console.log(this.time);
      // console.log(this.time[0].getFullYear(),this.time[0].getMonth()+1,this.time[0].getDate(),this.time[1].getFullYear(),this.time[1].getMonth()+1,this.time[1].getDate());
      let startDate = "";
      let endDate = "";
      if (this.time.length == 0) {
        startDate = "";
        endDate = "";
      } else {
        startDate = this.time[0];
        endDate = this.time[1];
      }
      console.log(startDate, endDate);
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryAllRechargeRecordList?contractNumber=${this.contractNumber}&personnelName=${this.representativeName}&personnelPhoneNum=${this.representativePhone}&rechargeCommercialName=${this.rechargeCard}&rechargeCommercialPhoneNum=${this.rechargePhone}&startDate=${startDate}&endDate=${endDate}&pageNum=${this.rechargePageNum}&pageSize=${this.rechargePagesize}`
        )
        .then(res => {
          console.log(res);
          this.rechargeTotal = res.data.data.total;
          this.rechargeAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    salesman(value) {
      console.log(value);
      this.newName = value.label;
      this.newPhone = value.phone;
      // for (let i = 0; i < this.shiftData.length; i++) {
      //   if (value == this.shiftData[i].personnelId) {
      //     this.salesmanPhone = this.shiftData[i].personnelPhoneNumber;
      //   }
      // }
    },
    //选中
    TrClick(i, id) {
      this.TRIndex = i;
      this.enteringId = id;
    },
    //改变商户当前页
    rechargePageNumChange(value) {
      // console.log(value);
      this.TRIndex = -1;
      this.enteringId = "";
      this.rechargePageNum = value;
      this.search();
    },
    //改变商户每页数据条数
    rechargePagesizeChange(value) {
      // console.log(value);
      this.TRIndex = -1;
      this.enteringId = "";
      this.rechargePagesize = value;
      this.search();
    },
    //新增弹窗
    newlyIncreased() {
      this.newlyIncreasedTrue = true;
    },
    //关闭弹窗及取消
    cancel() {
      this.newlyIncreasedTrue = false;
      this.newContract = ""; //新增合同编号
      this.newName = ""; //新增的商务代表姓名
      this.newPhone = ""; //新增的商务代表手机号
      this.newRechargeName = ""; //新增充值商
      this.newRechargePhone = ""; //新增充值商手机号
      this.newRechargeMoney = ""; //新增充值金额
      this.newMaterialsMoney = ""; //新增物资金额
      this.newMaterialsRemark = ""; //新增物资备注
      this.compileTrue = false;
      this.TRIndex = -1;
      this.enteringId = "";
    },
    //编辑
    compile() {
      if (this.TRIndex == -1) {
        this.$message.warning("请选择要编辑的信息");
        return;
      }
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryRechargeRecordByEnteringId?enteringId=${this.enteringId}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.newContract = res.data.data.rechargeContractNumber; //新增合同编号
            this.newName = res.data.data.personnelUserName; //新增的商务代表姓名
            this.newPhone = res.data.data.personnelPhoneNumber; //新增的商务代表手机号
            this.newRechargeName = res.data.data.rechargeCommercialName; //新增充值商
            this.newRechargePhone = res.data.data.rechargeCommercialPhoneNumber; //新增充值商手机号
            this.newRechargeMoney = res.data.data.rechargeAmount; //新增充值金额
            this.newMaterialsMoney = res.data.data.rechargeCommodityAomount; //新增物资金额
            this.newMaterialsRemark = res.data.data.rechargeCommodityRemark; //新增物资备注
            this.commercialId = res.data.data.commercialId; //商户id
          }
        });
      this.newlyIncreasedTrue = true;
      this.compileTrue = true; //点击了编辑
    },
    //删除
    expurgate() {
      if (this.TRIndex == -1) {
        this.$message.warning("请选择要删除的信息");
        return;
      }
      Vue.axios({
        method: "post",
        url: "/commercialRechargeEntering/deleteRechargeRecord",
        data: `enteringId=${this.enteringId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        this.TRIndex = -1;
        this.enteringId = "";
        if (res.data.status == 200) {
          this.$Message.success("删除成功");
          this.search();
        } else {
          this.$Message.warning(res.data.message);
        }
      });
    },
    //确认
    confirm() {
      console.log(this.compileTrue);
      if (
        this.newContract == "" ||
        this.newName == "" ||
        this.newPhone == "" ||
        this.newRechargeName == "" ||
        this.newRechargePhone == ""
      ) {
        this.$message.warning("请先完善信息");
        return;
      }
      if (this.newMaterialsMoney == "") {
        this.newMaterialsMoney = 0;
      }
      if (this.newRechargeMoney == "") {
        this.newRechargeMoney = 0;
      }
      let postData = `rechargeCommercialName=${this.newRechargeName}&rechargeCommercialPhoneNumber=${this.newRechargePhone}&rechargeAmount=${this.newRechargeMoney}&rechargeCommodityAomount=${this.newMaterialsMoney}&rechargeCommodityRemark=${this.newMaterialsRemark}&personnelUserName=${this.newName}&personnelPhoneNumber=${this.newPhone}&rechargeContractNumber=${this.newContract}`;
      if (this.compileTrue) {
        //编辑
        Vue.axios({
          method: "post",
          url: "/commercialRechargeEntering/updateRechargeRecordByEnteringId",
          data:
            postData +
            `&enteringId=${this.enteringId}&commercialId=${this.commercialId}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            // console.log(this.TRIndex);
            this.$Message.success("更新成功");
            this.cancel();
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      } else {
        //新增
        console.log(postData);
        Vue.axios({
          url: "/commercialRechargeEntering/insertRechargeRecord",
          method: "post",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("添加成功");
            this.cancel();
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
/* .el-select>.el-input{
  width: 120px;
  margin-left: 30px;
} */
@import "../../CSS/gonggong.css";
.overflow {
  height: 404px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overflow::-webkit-scrollbar {
  width: 0px;
}
.page {
  margin: 7px 0 7px 10px;
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
  /* justify-content: space-between; */
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
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

/* 预览弹窗 */
.popupDiv {
  width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: #fff;
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
}
.previewT {
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.previewT span:nth-child(2) {
  cursor: pointer;
}
.maintain {
  width: 55%;
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.maintain div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.maintain div + div {
  margin-top: 20px;
}
.operatingButton {
  width: 200px;
  display: flex;
  justify-content: space-between;
  /* margin-top: 50px; */
}
.maintain1 {
  margin-top: 100px;
  display: flex;
  align-items: center;
  height: 300px;
  flex-direction: column;
  justify-content: space-around;
}
</style>