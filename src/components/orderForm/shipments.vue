<!-- 待发货 -->
<template>
  <div>
    <div style="display:flex;flex-direction:column;">
      <table>
        <tr>
          <th style="width:50px">序号</th>
          <th>商品</th>
          <th style="width:130px">订单编号</th>
          <th style="width:130px">分类</th>
          <th style="width:200px">商品图</th>
          <th style="width:130px">规格</th>
          <th style="width:130px">数量</th>
          <th style="width:160px">应付金额</th>
          <th style="width:150px">优惠金额</th>
          <th style="width:200px">实付金额</th>
          <th style="width:130px">买家</th>
          <th style="width:130px">收货人</th>
          <th style="width:160px">联系方式</th>
          <th style="width:150px">收货地址</th>
          <th style="width:130px">配送方式</th>
          <th style="width:160px">订单备注</th>
          <th style="width:150px">提交时间</th>
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
            <td style="width:130px">{{item.categoryName}}</td>
            <td style="width:130px">{{item.categoryName}}</td>
            <td style="width:200px">{{item.productCostPrice}}</td>
            <td style="width:130px">{{item.productInventory}}</td>
            <td style="width:130px">
            </td>
            <td style="width:160px">{{item.productAddTime}}</td>
            <td style="width:150px"></td>
            <td style="width:200px">{{item.productCostPrice}}</td>
            <td style="width:130px">{{item.productInventory}}</td>
            <td style="width:130px">
            </td>
            <td style="width:160px">{{item.productAddTime}}</td>
            <td style="width:150px"></td>
            <td style="width:130px">
            </td>
            <td style="width:160px">{{item.productAddTime}}</td>
            <td style="width:150px"></td>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentTotal: 0, //待付款数据总条数
      paymentData: [], //待付款总数据
      paymentPageNum: 1, //待付款当前页
      paymentPageSize: 10, //待付款每页数据条数
      spinShow: false, //懒加载
      orderReference: "", //订单
      title: "", //标题
      distributionId: "", //配送方式
      k: "",
      j: ""
    };
  },

  components: {},

  computed: {},
  created() {
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
    },
    //改变待付款每页数据条数
    paymentPSChange(value) {
      this.paymentPageSize = value;
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
      //   let productAddStartTime = "";
      //   let productAddEndTime = "";
      //   if (this.time == null || this.time.length == 0) {
      //   } else {
      //     productAddStartTime = this.time[0];
      //     productAddEndTime = this.time[1];
      //   }
      //   this.TRindex = -1;
      //   this.commodityID = "";
      //   this.spinShow = true;
      //   Vue.axios
      //     .get(
      //       `/yybProduct/queryAllProductListByUserId?userId=${1}&categoryId=${
      //         this.classifyId
      //       }&pageNum=${this.commodityPageNum}&pageSize=${
      //         this.commodityPageSize
      //       }&productName=${this.title}&productStatus=${
      //         this.statusId
      //       }&productAddStartTime=${productAddStartTime}&productAddEndTime=${productAddEndTime}`
      //     )
      //     .then(res => {
      //       console.log(res);
      //       this.commodityTotal = res.data.data.total;
      //       this.commodityData = res.data.data.list;
      //       this.spinShow = false;
      //     });
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