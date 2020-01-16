<!-- 待发货 -->
<template>
  <div>
    <div style="display:flex;flex-direction:column;">
      <table>
        <tr>
          <th style="width:50px">序号</th>
          <th>商品</th>
          <th style="width:180px">订单编号</th>
          <th style="width:100px">分类</th>
          <th style="width:80px">商品图</th>
          <th style="width:130px">规格</th>
          <th style="width:50px">数量</th>
          <th style="width:80px">应付金额</th>
          <th style="width:80px">优惠金额</th>
          <th style="width:80px">实付金额</th>
          <th style="width:130px">买家</th>
          <th style="width:130px">收货人</th>
          <th style="width:160px">联系方式</th>
          <th style="width:150px">收货地址</th>
          <th style="width:130px">配送方式</th>
          <th style="width:160px">订单备注</th>
          <th style="width:150px">支付时间</th>
          <th style="width:80px">支付方式</th>
          <th style="width:120px">操作</th>
        </tr>
      </table>
      <div class="overflow" v-if="this.paymentTotal != 0">
        <table>
          <tr v-for="(item, index) in paymentData" :key="index">
            <td style="width:50px;">{{index + 1}}</td>
            <td>
              <div class="TDDiv">
                <img :src="item.imageUrl | imgSrc" alt />
                <div>
                  <span style="text-align: left;">{{item.productName}}</span>
                  <p>
                    <span>¥{{item.productCurrentPrice}}</span>
                    <span
                      style="text-decoration:line-through;color:#999999;margin-left: 20px;"
                    >¥{{item.productOriginalPrice}}</span>
                  </p>
                </div>
              </div>
            </td>
            <td style="width:180px">{{item.orderNumber}}</td>
            <td style="width:100px">{{item.categoryName}}</td>
            <td
              style="width:80px"
              class="TDClick"
              @click="Carousel(index)"
            >{{item.productImageCount}}</td>
            <td style="width:130px">{{item.productSkuDetail}}</td>
            <td style="width:50px">{{item.productCount}}</td>
            <td style="width:80px">{{item.productOriginalPrice}}</td>
            <td style="width:80px">{{item.discountsAmount}}</td>
            <td style="width:80px">{{item.payMoneyAmount}}</td>
            <td style="width:130px">{{item.userName}}</td>
            <td style="width:130px">{{item.buyerName}}</td>
            <td style="width:160px">{{item.buyerPhoneNumber}}</td>
            <td style="width:150px">{{item.buyerAddress}}</td>
            <td style="width:130px">
              <span v-if="item.mailWay == 1">快递发货</span>
              <span v-else-if="item.mailWay == 2">同城配送</span>
              <span v-else>到店自提</span>
            </td>
            <td style="width:160px">{{item.orderNote == "" ? '--' : item.orderNote}}</td>
            <td style="width:150px">{{item.orderDealtime}}</td>
            <td style="width:80px">
              <span v-if="item.payWayType == 1">支付宝</span>
              <span v-else-if="item.payWayType == 2">微信</span>
            </td>
            <td style="width:120px">
              <el-button @click="affirm(item.orderNumber,item.mailWay)" type="primary">确认发货</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="text-align:center;width:100%;font-size:16px;" v-if="this.paymentTotal == 0">
      <p>暂无数据</p>
    </div>
    <Page
      class="page"
      :total="paymentTotal"
      :current="paymentPageNum"
      @on-change="paymentPNChange"
      :page-size-opts="[10,20,30]"
      show-elevator
      show-sizer
      show-total
      :page-size="paymentPageSize"
      @on-page-size-change="paymentPSChange"
    />
    <Spin size="large" fix v-if="spinShow"></Spin>
    <!-- 弹窗 -->
    <div v-if="popupTrue" class="popup">
      <div class="popupDiv">
        <div class="popupDivHead">
          <span>商品图</span>
          <img
            style="cursor: pointer;"
            @click="shutPopup"
            src="https://images.baiduyuyue.com/Close.png"
            alt
          />
        </div>
        <el-carousel
          height="540px"
          :interval="0"
          arrow="always"
          style="width:76%;margin:20px auto;text-align: center;"
          :autoplay="false"
        >
          <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
            <img style="object-fit: contain" :src="item.imageUrl | imgSrc" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 确认发货 -->
    <div v-if="shipmentsTrue" class="popup">
      <div class="popupDiv" style="height:470px">
        <div class="popupDivHead">
          <span>确认发货</span>
          <img
            style="cursor: pointer;"
            @click="shutPopup"
            src="https://images.baiduyuyue.com/Close.png"
            alt
          />
        </div>
        <div class="logistics">
          <el-select style="width:300px" v-model="value" clearable placeholder="请选择快递公司">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <el-input style="width:300px" placeholder="请输入物流单号" v-model="input" clearable></el-input>
        </div>
        <div style="display: flex;justify-content: center;">
          <el-button @click="shutPopup">取消</el-button>
          <el-button @click="confirm" type="primary">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";
export default {
  data() {
    return {
      userId: '', //商户id
      paymentTotal: 0, //待付款数据总条数
      paymentData: [], //待付款总数据
      paymentPageNum: 1, //待付款当前页
      paymentPageSize: 10, //待付款每页数据条数
      spinShow: false, //懒加载
      orderReference: "", //订单
      title: "", //标题
      distributionId: "", //配送方式
      k: "",
      j: "",
      popupTrue: false, //弹窗显隐
      imageUrl: [], //商品图片集合
      shipmentsTrue: false,
      options: [],
      value: "", //快递公司
      input: "", //物流单号
      orderNumber: "" //订单编号
    };
  },

  components: {},

  computed: {},
  created() {
    this.userId = sessionStorage.getItem("userId");
    console.log(this.$parent.time);
    this.orderReference = this.$parent.orderReference;
    this.title = this.$parent.title;
    this.distributionId = this.$parent.distributionId;
    if (this.$parent.time == null || this.$parent.time.length == 0) {
    } else {
      this.k = this.$parent.time[0];
      this.j = this.$parent.time[1];
    }
    console.log(this.k, this.j);
  },
  mounted() {
    this.search();
    this.expressInformation(); //查询快递信息
  },

  methods: {
    //获取快递信息
    expressInformation() {
      Vue.axios
        .get(`/yybMallDeliveryCompany/queryAllDeliveryCompany`)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            res.data.data.forEach(element => {
              this.options.push({
                value: element.deliveryCode,
                label: element.deliveryCompany
              });
            });
          }
        });
    },
    //改变待付款当前页
    paymentPNChange(value) {
      this.paymentPageNum = value;
      this.inquire();
    },
    //改变待付款每页数据条数
    paymentPSChange(value) {
      this.paymentPageSize = value;
      this.inquire();
    },
    inquire() {
      this.spinShow = true;
      Vue.axios
        .get(
          `/yybMallOrders/queryOrdersListByShopUserId?userId=${this.userId}&orderNumber=${
            this.orderReference
          }&pageNum=${this.paymentPageNum}&pageSize=${
            this.paymentPageSize
          }&productName=${this.title}&mailWay=${
            this.distributionId
          }&productAddStartTime=${this.k}&productAddEndTime=${
            this.j
          }&orderStatus=2`
        )
        .then(res => {
          console.log(res);
          this.paymentTotal = res.data.data.total;
          this.paymentData = res.data.data.list;
          this.spinShow = false;
        });
    },
    search(d, b, p, k, j) {
      if (d != undefined) {
        this.orderReference = d;
        this.title = b;
        this.distributionId = p;
        this.k = k;
        this.j = j;
      }

      console.log(d, b, p, k, j);
      this.paymentPageNum = 1;
      this.paymentPageSize = 10;
      this.spinShow = true;
      Vue.axios
        .get(
          `/yybMallOrders/queryOrdersListByShopUserId?userId=${this.userId}&orderNumber=${
            this.orderReference
          }&pageNum=${this.paymentPageNum}&pageSize=${
            this.paymentPageSize
          }&productName=${this.title}&mailWay=${
            this.distributionId
          }&productAddStartTime=${this.k}&productAddEndTime=${
            this.j
          }&orderStatus=2`
        )
        .then(res => {
          console.log(res);
          this.paymentTotal = res.data.data.total;
          this.paymentData = res.data.data.list;
          this.spinShow = false;
        });
    },
    //点击出现的商品图弹窗
    Carousel(i) {
      this.popupTrue = true;
      this.imageUrl = this.paymentData[i].productImageList;
    },
    //关闭弹窗
    shutPopup() {
      this.popupTrue = false;
      this.shipmentsTrue = false;
      this.imageUrl = [];
      this.value = ""; //快递公司
      this.input = ""; //物流单号
      this.orderNumber = ""; //订单编号
    },
    //确认发货
    affirm(i, status) {
      console.log(i, status);
      if (status == 1) {
        this.shipmentsTrue = true;
        this.orderNumber = i;
      } else {

      }
    },
    //确定
    confirm() {
      if (this.value == "") {
        this.$message.warning("请选择快递公司");
        return;
      }
      if (this.input == "") {
        this.$message.warning("请输入物流单号");
        return;
      }
      let postData = `deliveryCompany=${this.value}&deliveryNumber=${this.input}&orderNumber=${this.orderNumber}`;
      console.log(postData);
      Vue.axios({
        method: "post",
        url: "/yybMallOrders/updateOrderDeliveryInfoByOrderNumber",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: postData
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.$message.success("确认成功");
          this.shipmentsTrue = false;
          this.inquire();
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../CSS/gonggong.css";
.overflow {
  height: 610px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overflow::-webkit-scrollbar {
  width: 0px;
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
.popupDiv {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
  width: 500px;
  height: 645px;
  margin: auto;
  border-radius: 4px;
}
.popupDivHead {
  width: 100%;
  height: 40px;
  padding: 0 20px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
}
.logistics {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 300px;
}
.el-button + .el-button {
  margin-left: 30px;
}
</style>