<!-- 已确认 -->
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
          <th style="width:150px">收货时间</th>
          <th style="width:150px">物流单号</th>
        </tr>
      </table>
      <div class="overflow" v-if="this.confirmedTotal != 0">
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
            <td style="width:80px" class="TDClick" @click="Carousel(index)">{{item.productImageCount}}</td>
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
            <td style="width:150px">{{item.receivingTime}}</td>
            <td style="width:150px">{{item.deliveryNumber}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="text-align:center;width:100%;font-size:16px;" v-if="this.confirmedTotal == 0">
      <p>暂无数据</p>
    </div>
    <Page
      class="page"
      :total="confirmedTotal"
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
    <div v-show="popupTrue" class="popup">
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
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      userId: '', //商户id
      confirmedTotal: 0, //完成数据总条数
      paymentData: [], //完成总数据
      paymentPageNum: 1, //完成当前页
      paymentPageSize: 10, //完成每页数据条数
      spinShow: false, //懒加载
      orderReference: "", //订单
      title: "", //标题
      distributionId: "", //配送方式
      k: "",
      j: "",
      popupTrue: false, //弹窗显隐
      imageUrl: [] //商品图片集合
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
  },

  methods: {
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
          }&orderStatus=4`
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
      this.paymentPageNum = 1;
      this.paymentPageSize = 10;
      console.log(d, b, p, k, j);
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
          }&orderStatus=4`
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
      this.imageUrl = [];
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
</style>