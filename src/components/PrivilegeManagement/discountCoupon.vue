<!--  -->
<template>
  <div class="commodity">
    <div class="head">
      <span>优惠券管理</span>
    </div>
    <div class="food">
      <div class="foodCenter">
        <div>
          <span>分类</span>
          <el-select style="width:150px" v-model="discountCouponId" placeholder="请选择分类" clearable>
            <el-option
              v-for="item in discountCoupon"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-cascader
            v-model="classifyId"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
          ></el-cascader>-->
        </div>
        <!-- <div>
          <span>标题</span>
          <el-input style="width:150px" v-model="title" placeholder="请输入标题" clearable></el-input>
        </div>-->
        <!-- <div>
          <span>当前状态</span>
          <el-select style="width:150px" v-model="statusId" placeholder="请选择当前状态" clearable>
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>-->
        <div>
          <span>创建时间</span>
          <!-- <el-date-picker
            v-model="time"
            type="datetimerange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>-->
          <el-date-picker style="width:400px"
            v-model="value1"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div>
          <el-button style="margin-left: 20px" @click="inquire" type="primary">搜索</el-button>
        </div>
      </div>
      <div class="foodFood">
        <div class="operation">
          <el-button @click="add" type="primary">添加</el-button>
          <el-button @click="compile" type="primary">编辑</el-button>
          <el-button @click="GoodsToDelete" type="primary">删除</el-button>
        </div>
        <div style="height:60px"></div>
        <div class="foodFoodFoodDiv">
          <div style="display:flex;flex-direction:column;">
            <table>
              <tr>
                <th style="width:50px">序号</th>
                <th style="width:150px">分类</th>
                <th style="width:150px">满</th>
                <th style="width:150px">减/折</th>
                <th style="width:150px">总库存</th>
                <th style="width:150px">当前库存</th>
                <th style="width:150px">共领取</th>
                <th style="width:150px">未使用</th>
                <th style="width:150px">已使用</th>
                <th>有效期</th>
              </tr>
            </table>
            <!-- v-if="this.discountsTotal != 0" -->
            <div class="overflow" v-if="this.discountsTotal != 0">
              <table>
                <tr
                  v-for="(item, index) in discountsData"
                  :key="index"
                  @click="TRclick(item.couponId,index)"
                  :style="{backgroundColor: (TRindex == index ? '#bfe2ff' : '')}"
                >
                  <td style="width:50px;">{{index + 1}}</td>
                  <td style="width:150px">
                    <span v-if="item.couponType == 1">满减券</span>
                    <span v-else-if="item.couponType == 2">满折券</span>
                    <span v-else>折扣券</span>
                  </td>
                  <td style="width:150px">
                    <span v-if="item.couponType == 4">--</span>
                    <span v-else>{{item.couponMeetAmount}}</span>
                  </td>
                  <td style="width:150px">
                    <span
                      v-if="item.couponType == 2 || item.couponType == 4"
                    >{{item.couponDiscount}}</span>
                    <span v-else>{{item.couponReductionAmount}}</span>
                  </td>
                  <td style="width:150px">
                    <span v-if="item.couponInventory == -1">不限</span>
                    <span>{{item.couponInventory}}</span>
                  </td>
                  <td style="width:150px">{{item.couponCurrentCount}}</td>
                  <td style="width:150px">{{item.couponBeReceiveCount}}</td>
                  <td style="width:150px">{{item.couponNoUseCount}}</td>
                  <td style="width:150px">{{item.couponUseCount}}</td>
                  <td>{{item.couponEffectiveTime}} -- {{item.couponFailureTime}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div style="text-align:center;width:100%;font-size:16px;" v-if="this.discountsTotal == 0">
            <p>暂无数据</p>
          </div>
          <Page
            class="page"
            :total="discountsTotal"
            :current="discountsPageNum"
            @on-change="discountsPNChange"
            :page-size-opts="[10,20,30]"
            show-elevator
            show-sizer
            show-total
            :page-size="discountsPageSize"
            @on-page-size-change="discountsPSChange"
          />
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </div>
      <!-- 弹窗 -->
      <div v-if="popupTrue" class="popup">
        <div class="popupDiv">
          <div class="previewT">
            <span>管理</span>
            <span @click="shut">X</span>
          </div>
          <div class="particulars">
            <div>
              <span>优惠券类型</span>
              <el-select
                style="width:150px;margin:0 20px"
                v-model="XZdiscountCouponId"
                placeholder="请选择分类"
                clearable
              >
                <el-option
                  v-for="item in discountCoupon"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div v-if="XZdiscountCouponId == 1" style="margin-left: 56px;">
              <div>
                <span>满</span>
                <el-input
                  style="width:150px;margin:0 20px"
                  v-model="AmountSatisfied"
                  placeholder="请输入金额"
                  clearable
                ></el-input>
                <span>元</span>
              </div>
              <div style="margin-top:30px">
                <span>减</span>
                <el-input
                  style="width:150px;margin:0 20px"
                  v-model="subtract"
                  placeholder="请输入金额"
                  clearable
                ></el-input>
                <span>元</span>
              </div>
            </div>
            <div v-else-if="XZdiscountCouponId == 2" style="margin-left: 56px;">
              <div>
                <span>满</span>
                <el-input
                  style="width:150px;margin:0 20px"
                  v-model="AmountSatisfied"
                  placeholder="请输入金额"
                  clearable
                ></el-input>
                <span>元</span>
              </div>
              <div style="margin-top:30px">
                <span>折</span>
                <el-input
                  style="width:150px;margin:0 20px"
                  v-model="discount"
                  placeholder="请输入折扣数"
                  clearable
                ></el-input>
                <span>折</span>
              </div>
            </div>
            <div v-else-if="XZdiscountCouponId == 4" style="margin-left: 56px;">
              <span>折</span>
              <el-input
                style="width:150px;margin:0 20px"
                v-model="discount"
                placeholder="请输入折扣数"
                clearable
              ></el-input>
              <span>折</span>
            </div>
            <div style="margin-left: 14px">
              <span>添加库存</span>
              <el-input
                style="width:150px;margin:0 20px"
                v-model="amount"
                placeholder="请输入数量"
                clearable
              ></el-input>
              <span>份</span>
            </div>
            <div style="margin-left: 14px">
              <span>创建时间</span>
              <el-date-picker
                style="margin:0 20px"
                v-model="time1"
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
            <div style="margin-left: 14px">
              <span>任务状态</span>
              <el-radio style="margin-left: 30px" v-model="radio" label="1">上架</el-radio>
              <el-radio v-model="radio" label="0">下架</el-radio>
            </div>
          </div>
          <div style="margin-left: 250px;margin-top: 30px;">
            <el-button @click="save" type="primary">保存</el-button>
            <el-button @click="shut" type="primary">返回</el-button>
          </div>
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
      userId: "", //商户id
      discountsData: [], //优惠券总数据
      discountsTotal: 0, //优惠券数据总条数
      discountsPageNum: 1, //优惠券当前页
      discountsPageSize: 10, //优惠券每页数据条数
      spinShow: false, //懒加载
      currentdate: "", //当前时间
      urls: "https://www.baiduyuyue.com/management", //线上地址
      // urls: 'http://192.168.0.189:8080', //测试地址
      popupTrue: false, //弹窗显隐
      discountCoupon: [
        {
          value: "1",
          label: "满减券"
        },
        {
          value: "2",
          label: "满折券"
        },
        {
          value: "4",
          label: "折扣券"
        }
      ],
      discountCouponId: "", //选择的优惠券分类
      title: "", //输入的标题
      status: [
        {
          value: "1",
          label: "上架中"
        },
        {
          value: "0",
          label: "已下架"
        }
      ],
      statusId: "", //选择的状态
      time: [], //选择的时间段
      pickerOptions: {
        disabledDate(value) {
          //  + 24 * 60 * 60 * 1000
          if (Date.now() - 24 * 60 * 60 * 1000 >= value) {
            return true;
          }
          return false;
        }
      },
      discountID: "", //选中的优惠券id
      TRindex: -1,
      XZdiscountCouponId: "", //新增或者编辑选择的优惠券id
      AmountSatisfied: "", //满减满足的金额
      subtract: "", //满减的金额
      discount: "", //折扣数
      amount: "", //库存
      time1: [], //添加编辑的时间段
      radio: "1", //任务状态
      compileTrue: false //是否点击了编辑
      ,value1: [],
    };
  },

  components: {},
  metaInfo: {
    title: "优惠券管理",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  computed: {},
  created() {
    this.userId = sessionStorage.getItem("userId");
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
    // this.currentdate = year + seperator1 + month + seperator1 + strDate;
  },
  mounted() {
    this.inquire(); //获取数据
  },
  watch: {},
  methods: {
    //分类选择
    handleChange(value) {
      console.log(value);
    },
    //选中操作
    TRclick(id, index) {
      console.log(id, index);
      this.discountID = id;
      this.TRindex = index;
    },
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
      console.log(this.time,this.value1);
      let startDate = "";
      let endDate = "";
      if (this.time == null || this.time.length == 0) {
      } else {
        startDate = this.time[0];
        endDate = this.time[1];
      }
      this.TRindex = -1;
      this.discountID = "";
      this.spinShow = true;
      this.discountsPageNum = 1;
      this.discountsPageSize = 10;
      Vue.axios
        .get(
          `/yybProductCoupon/queryAllCouponListByUserId?userId=${this.userId}&couponType=${this.discountCouponId}&pageNum=1&pageSize=10&startDate=${startDate}&endDate=${endDate}`
        )
        .then(res => {
          console.log(res);
          this.discountsTotal = res.data.data.total;
          this.discountsData = res.data.data.list;
          this.spinShow = false;
        });
    },
    search() {
      let startDate = "";
      let endDate = "";
      if (this.time == null || this.time.length == 0) {
      } else {
        startDate = this.time[0];
        endDate = this.time[1];
      }
      this.TRindex = -1;
      this.discountID = "";
      this.spinShow = true;
      Vue.axios
        .get(
          `/yybProductCoupon/queryAllCouponListByUserId?userId=${this.userId}&couponType=${this.discountCouponId}&pageNum=${this.discountsPageNum}&pageSize=${this.discountsPageSize}&startDate=${startDate}&endDate=${endDate}`
        )
        .then(res => {
          console.log(res);
          this.discountsTotal = res.data.data.total;
          this.discountsData = res.data.data.list;
          this.spinShow = false;
        });
    },
    //改变商品当前页
    discountsPNChange(value) {
      this.discountsPageNum = value;
      this.search();
    },
    //改变商品每页数据条数
    discountsPSChange(value) {
      this.discountsPageSize = value;
      this.search();
    },
    //添加弹窗
    add() {
      this.popupTrue = true;
    },
    //编辑
    compile() {
      if (this.TRindex == -1) {
        this.$message.warning("请选择要编辑的优惠券");
        return;
      } else {
        Vue.axios
          .get(
            `/yybProductCoupon/queryCouponByCouponId?couponId=${this.discountID}`
          )
          .then(res => {
            console.log(res);
            if (res.data.status == 200) {
              let data = res.data.data;
              this.XZdiscountCouponId = String(data.couponType);
              this.AmountSatisfied = data.couponMeetAmount;
              this.subtract = data.couponReductionAmount;
              this.discount = data.couponDiscount;
              this.amount = data.couponInventory;
              this.radio = String(data.couponUseStatus);
              this.time1.push(data.couponEffectiveTime, data.couponFailureTime);
            }
          });
        this.popupTrue = true;
        this.compileTrue = true;
      }
    },
    // 保存
    save() {
      if (this.XZdiscountCouponId == "") {
        this.$message.warning("请选择优惠券类型");
        return;
      } else {
        console.log(this.XZdiscountCouponId);
        let number = /^[1-9]\d*$|^0$/;
        let xiaoshu = /^(?=0\.[1-9]|[1-9]\.\d).{3}$|^([1-9])$/;
        switch (this.XZdiscountCouponId) {
          case "1":
            this.discount = ""; //折扣数
            if (number.test(this.AmountSatisfied)) {
              if (
                number.test(this.subtract) &&
                number.test(this.AmountSatisfied) > number.test(this.subtract)
              ) {
              } else {
                this.$message.warning("请输入正确的金额");
                return;
              }
            } else {
              this.$message.warning("请输入正确的金额");
              return;
            }
            break;
          case "2":
            this.subtract = ""; //满减的金额
            if (number.test(this.AmountSatisfied)) {
              if (xiaoshu.test(this.discount)) {
              } else {
                console.log(this.discount);
                this.$message.warning("请输入正确的折扣");
                return;
              }
            } else {
              this.$message.warning("请输入正确的金额");
              return;
            }
            break;
          case "4":
            this.AmountSatisfied = ""; //满减满足的金额
            this.subtract = ""; //满减的金额
            if (xiaoshu.test(this.discount)) {
            } else {
              this.$message.warning("请输入正确的折扣");
              return;
            }
            break;
          default:
            break;
        }
      }
      if (this.amount == "") {
        this.amount = 0;
      }
      if (this.time1 == null || this.time1.length == 0) {
        this.$message.warning("请选择正确的时间");
        return;
      }
      let postData = `couponType=${this.XZdiscountCouponId}&couponMeetAmount=${this.AmountSatisfied}&couponDiscount=${this.discount}&couponReductionAmount=${this.subtract}&couponInventory=${this.amount}&couponUserId=${this.userId}&couponEffectiveTime=${this.time1[0]}&couponFailureTime=${this.time1[1]}&couponUseStatus=${this.radio}`;
      if (this.compileTrue) {
        //编辑
        Vue.axios({
          url: "/yybProductCoupon/updateCouponByCouponId",
          method: "post",
          data: `couponId=${this.discountID}&${postData}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message.success("编辑成功");
            this.shut();
            this.inquire();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      } else {
        //保存
        Vue.axios({
          url: "/yybProductCoupon/insertCoupon",
          method: "post",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message.success("添加成功");
            this.shut();
            this.inquire();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      }
    },
    //更改状态为删除
    GoodsToDelete() {
      if (this.TRindex == -1) {
        this.$message.warning("请选择要删除的优惠券");
      } else {
        Vue.axios({
          method: "post",
          url: "/yybProductCoupon/updateCouponStatus",
          data: `couponId=${this.discountID}&couponStatus=0`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message.success("删除成功");
            this.TRindex = -1;
            this.discountID = "";
            this.search();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      }
    },
    //关闭弹窗
    shut() {
      this.compileTrue = false;
      this.popupTrue = false;
      (this.XZdiscountCouponId = ""), //新增或者编辑选择的优惠券id
        (this.AmountSatisfied = ""); //满减满足的金额
      this.subtract = ""; //满减的金额
      this.discount = ""; //折扣数
      this.amount = ""; //库存
      this.time1 = []; //添加编辑的时间段
      this.radio = "1"; //任务状态
    }
  }
};
</script>
<style scoped>
@import "../../CSS/gonggong.css";
.overflow {
  height: 411px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overflow::-webkit-scrollbar {
  width: 0px;
}
/* 弹窗 */
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
}
.popupDiv {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
  width: 700px;
  height: 600px;
  margin: auto;
  border-radius: 4px;
}
.previewT {
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
.particulars {
  display: flex;
  flex-direction: column;
  height: 63%;
  justify-content: space-evenly;
  margin-left: 100px;
}
.page {
  margin: 7px 0 7px 10px;
}
.commodity {
  height: 100%;
  min-width: 1514px;
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
  position: absolute;
  right: 25px;
  top: 20px;
}
.foodFoodFoodDiv {
  /* height: 517px; */
  margin: 20px 25px 20px 34px;
  border: 1px solid #e6e6e6;
  position: relative;
}
.administration {
  padding: 30px 20px;
}
.TDDiv {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 10px;
}
.TDDiv > img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}
.TDDiv > div {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* height: 60px; */
  margin-left: 20px;
  align-items: baseline;
}
</style>