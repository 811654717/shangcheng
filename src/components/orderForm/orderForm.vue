<!--  -->
<template>
  <div class="commodity">
    <div class="head">
      <span>订单管理</span>
    </div>
    <div class="food">
      <div class="foodCenter">
        <div>
          <span>订单编号</span>
          <el-input style="width:150px" v-model="orderReference" placeholder="请输入订单编号" clearable></el-input>
        </div>
        <div>
          <span>标题</span>
          <el-input style="width:150px" v-model="title" placeholder="请输入标题" clearable></el-input>
        </div>
        <div>
          <span>配送方式</span>
          <el-select style="width:150px" v-model="distributionId" placeholder="请选择配送方式" clearable>
            <el-option
              v-for="item in distribution"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>创建时间</span>
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
        <div>
          <el-button style="margin-left: 20px" @click="inquire" type="primary">搜索</el-button>
        </div>
      </div>
      <div class="foodFood">
        <div class="operation">
          <el-radio-group v-model="operationId">
            <el-radio-button label="1">待付款</el-radio-button>
            <el-radio-button label="2">待发货</el-radio-button>
            <el-radio-button label="3">待收货</el-radio-button>
            <el-radio-button label="4">已确认</el-radio-button>
          </el-radio-group>
        </div>
        <div class="foodFoodFoodDiv">
          <noPayment ref="orderForm" v-if="operationId == 1"></noPayment>
          <shipments ref="orderForm" v-if="operationId == 2"></shipments>
          <takeDeliveryOfGoods ref="orderForm" v-if="operationId == 3"></takeDeliveryOfGoods>
          <confirmed ref="orderForm" v-if="operationId == 4"></confirmed>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Message } from "element-ui";
import noPayment from "./noPayment"; //待付款
import shipments from "./shipments"; //待发货
import takeDeliveryOfGoods from './takeDeliveryOfGoods'; //待收货
import confirmed from './confirmed'; //已确认
export default {
  data() {
    return {
      orderReference: "", //订单编号
      title: "", //输入的标题
      operationId: "1", //操作id
      distribution: [
        {
          value: "1",
          label: "快递发货"
        },
        {
          value: "2",
          label: "同城配送"
        },
        {
          value: "3",
          label: "到店自提"
        }
      ],
      distributionId: "", //选择的配送状态
      time: [], //选择的时间段
      pickerOptions: {
        disabledDate(value) {
          // console.log(value);
          // console.log(Date.now());
          if (Date.now() + 24 * 60 * 60 * 1000 <= value) {
            return true;
          }
          return false;
        }
      }
    };
  },

  components: { noPayment,shipments,takeDeliveryOfGoods,confirmed },
  metaInfo: {
    title: "订单管理",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
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
    // console.log(year + seperator1 + month + seperator1 + strDate);
  },
  mounted() {
  },
  watch: {},
  methods: {
    //关闭弹窗
    shutPopup(event) {
      var sp = document.getElementById("popupDiv");
      if (sp) {
        if (!sp.contains(event.target)) {
          //这句是说如果我们点击到了id为myPanel以外的区域
          this.popupTrue = false;
        }
      }
    },
    // 搜索按钮
    inquire() {
      console.log(this.time);
      let d = this.orderReference;
      let b = this.title;
      let p = this.distributionId;
      let k = "";
      let j = "";
      if (this.time == null || this.time.length == 0) {
      } else {
        k = this.time[0];
        j = this.time[1];
      }
      this.$refs.orderForm.search(d,b,p,k,j)
    },
  }
};
</script>
<style scoped>

.commodity {
  height: 100%;
  min-width: 2700px;
  max-width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.head {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #ffffff;
  font-size: 16px;
  padding: 0 20px;
  color: #666666;
}
.food {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
.foodCenter {
  width: 100%;
  height: 80px;
  background-color: #fff;
  margin: 30px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.foodCenter div {
  display: flex;
  align-items: center;
}
.foodCenter div span {
  margin: 0 20px;
}
.foodFood {
  width: 100%;
  /* height: 617px; */
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: 20px;
  position: relative;
}
.operation {
  padding: 30px;
}
.foodFoodFoodDiv {
  /* height: 517px; */
  margin: 0px 25px 20px 30px;
  border: 1px solid #e6e6e6;
  position: relative;
}
</style>