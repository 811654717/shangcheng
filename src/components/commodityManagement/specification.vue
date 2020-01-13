<!--  -->
<template>
  <div style="height:100%">
    <div v-if="yesData == '1'" class="specificationParticulars">
      <div>
        <el-button type="primary">详情页</el-button>
        <!-- <span>详情页</span> -->
        <div class="parcel" style="overflow: scroll;">
          <el-carousel
            height="250px"
            style="background-color: #f2f2f2;"
            arrow="never"
            trigger="click"
          >
            <el-carousel-item v-for="item in CommodityFigure" :key="item.imageSort">
              <!-- object-fit: contain; -->
              <img style="width:100%;height:100%" :src="item.imageUrl" alt />
            </el-carousel-item>
          </el-carousel>
          <div class="price">
            <img src="https://images.baiduyuyue.com/img_bg.png@2x.png" alt />
            <p>
              <span style="color:#FFFFFF;font-size:18px">¥</span>
              <span style="color:#FFFFFF;font-size:28px">{{commodityDetails.productCurrentPrice}}</span>
              <span
                style="text-decoration:line-through;color:#FFD1D2;margin-left: 5px; font-size:14px"
              >¥{{commodityDetails.productOriginalPrice}}</span>
            </p>
            <img src="https://images.baiduyuyue.com/btn_white.png@2x.png" alt />
            <img src="https://images.baiduyuyue.com/icon_share.png@2x.png" alt />
            <span>分享</span>
          </div>
          <div class="title">
            <span>{{commodityDetails.productName}}</span>
            <div>
              <img src="https://images.baiduyuyue.com/icon_Collect.png@2x.png" alt />
              <span>收藏</span>
            </div>
          </div>
          <div v-if="commodityDetails.yybProductCouponList.length != 0" class="discountCoupon">
            <p>
              <span style="color:#333333;font-size:15px;font-weight:bold;">店铺券</span>
              <span style="color:#BBBBBB;font-size:14px;">我要领券 ></span>
            </p>
          </div>
          <div class="image-text">
            <span>图文详情</span>
          </div>
          <div>
            <li v-for="item in GraphicDetails" :key="item.imageSort">
              <img style="width:100%;height:100%" :src="item.imageUrl" alt />
            </li>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary">规格页</el-button>
        <div class="parcel" style="position:relative;">
          <div style="width:100%;height:250px">
            <!-- <img style="object-fit: contain;width:100%;height:100%" :src="CommodityFigure[0].imageUrl" alt=""> -->
            <el-carousel
              height="250px"
              style="background-color: #f2f2f2;"
              arrow="never"
              trigger="click"
            >
              <el-carousel-item v-for="item in CommodityFigure" :key="item.imageSort">
                <!-- object-fit: contain; -->
                <img style="width:100%;height:100%" :src="item.imageUrl" alt />
              </el-carousel-item>
            </el-carousel>
            <!-- object-fit: contain; -->
            <!-- <img
              style="width:100%;height:100%"
              src="https://images.baiduyuyue.com/home_banner03.png"
              alt
            />-->
          </div>
          <div class="shade">
            <div class="specification">
              <div class="pitchOn">
                <img style :src="imgurl" alt />
                <div>
                  <p>
                    <span style="font-size:16px;">¥</span>
                    <span style="font-size:26px;">{{currentCost1}}</span>
                  </p>
                  <p>
                    <span>库存:</span>
                    <span>{{inventory}}{{commodityDetails.productUnit}}</span>
                  </p>
                  <p v-if="skuAttributeDetail != ''">
                    <span style="color:#333333;">已选:</span>
                    <span style="color:#FF4F54;">{{skuAttributeDetail}}</span>
                  </p>
                </div>
              </div>
              <div class="specificationOne">
                <span
                  style="color:#999999;font-size:12px"
                >{{commodityDetails.yybProductSpecificationList[0].specificationName}}</span>
                <div class="specificationOneDiv">
                  <li
                    v-for="(item,index) in commodityDetails.yybProductSpecificationList[0].yybProductSpecificationAttributeList" :style="OneIndex == index ? style1 : style2" 
                    :key="index"
                     @click="One(index,item.attributeId)"
                  >
                    <span>{{item.attributeValue}}</span>
                  </li>
                </div>
              </div>
              <div v-if="commodityDetails.yybProductSpecificationList.length == 2" class="specificationOne">
                <span
                  style="color:#999999;font-size:12px"
                >{{commodityDetails.yybProductSpecificationList[1].specificationName}}</span>
                <div class="specificationOneDiv">
                  <li
                    v-for="(item,index) in commodityDetails.yybProductSpecificationList[1].yybProductSpecificationAttributeList" :style="TwoIndex == index ? style1 : style2" 
                    :key="index"
                     @click="Two(index,item.attributeId)"
                  >
                    <span>{{item.attributeValue}}</span>
                  </li>
                </div>
              </div>
              <div class="number">
                <span>数量</span>
                <el-input-number v-model="num"  size="mini" label="描述文字"></el-input-number>
              </div>
              <div class="purchase">
                <button>立即购买</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="yesData == '2'" class="specificationParticulars">
      <div>
        <el-button type="primary">详情页</el-button>
        <!-- <span>详情页</span> -->
        <div class="parcel" style="overflow: scroll;">
          <el-carousel
            height="250px"
            style="background-color: #f2f2f2;"
            arrow="never"
            trigger="click"
          >
            <el-carousel-item v-for="item in dialogImageUrl" :key="item.imageUrl">
              <!-- object-fit: contain; -->
              <img style="width:100%;height:100%" :src="item.imageUrl" alt="">
            </el-carousel-item>
          </el-carousel>
          <div class="price">
            <img src="https://images.baiduyuyue.com/img_bg.png@2x.png" alt />
            <p>
              <span style="color:#FFFFFF;font-size:18px">¥</span>
              <span style="color:#FFFFFF;font-size:28px">{{currentCost}}</span>
              <span
                style="text-decoration:line-through;color:#FFD1D2;margin-left: 5px; font-size:14px"
              >¥{{originalCost}}</span>
            </p>
            <img src="https://images.baiduyuyue.com/btn_white.png@2x.png" alt />
            <img src="https://images.baiduyuyue.com/icon_share.png@2x.png" alt />
            <span>分享</span>
          </div>
          <div class="title">
            <span>{{title}}</span>
            <div>
              <img src="https://images.baiduyuyue.com/icon_Collect.png@2x.png" alt />
              <span>收藏</span>
            </div>
          </div>
          <div class="image-text">
            <span>图文详情</span>
          </div>
          <div>
            <li v-for="item in dialogImageUrl15" :key="item.imageUrl">
              <img style="width:100%;height:100%" :src='item.imageUrl' alt />
            </li>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary">规格页</el-button>
        <div class="parcel" style="position:relative;">
          <div style="width:100%;height:250px">
            <!-- <img style="object-fit: contain;width:100%;height:100%" :src="CommodityFigure[0].imageUrl" alt=""> -->
            <el-carousel
              height="250px"
              style="background-color: #f2f2f2;"
              arrow="never"
              trigger="click"
            >
              <el-carousel-item v-for="item in CommodityFigure" :key="item.imageSort">
                <!-- object-fit: contain; -->
                <img style="width:100%;height:100%" :src="item.imageUrl" alt />
              </el-carousel-item>
            </el-carousel>
            <!-- object-fit: contain; -->
            <!-- <img
              style="width:100%;height:100%"
              src="https://images.baiduyuyue.com/home_banner03.png"
              alt
            />-->
          </div>
          <div class="shade">
            <div class="specification">
              <div class="pitchOn">
                <img style :src="imgurl" alt />
                <div>
                  <p>
                    <span style="font-size:16px;">¥</span>
                    <span style="font-size:26px;">{{currentCost1}}</span>
                  </p>
                  <p>
                    <span>库存:</span>
                    <span>{{inventory}}{{measure}}</span>
                  </p>
                  <p v-if="skuAttributeDetail != ''">
                    <span style="color:#333333;">已选:</span>
                    <span style="color:#FF4F54;">{{skuAttributeDetail}}</span>
                  </p>
                </div>
              </div>
              <div class="specificationOne">
                <span
                  style="color:#999999;font-size:12px"
                >{{Specification[0].specificationName}}</span>
                <div class="specificationOneDiv">
                  <li
                    v-for="(item,index) in Specification[0].yybProductSpecificationAttributeList" :style="OneIndex == index ? style1 : style2" 
                    :key="index"
                     @click="One1(index,item.attributeValue)"
                  >
                    <span>{{item.attributeValue}}</span>
                  </li>
                </div>
              </div>
              <div v-if="Specification.length == 2" class="specificationOne">
                <span
                  style="color:#999999;font-size:12px"
                >{{Specification[1].specificationName}}</span>
                <div class="specificationOneDiv">
                  <li
                    v-for="(item,index) in Specification[1].yybProductSpecificationAttributeList" :style="TwoIndex == index ? style1 : style2" 
                    :key="index"
                     @click="Two1(index,item.attributeValue)"
                  >
                    <span>{{item.attributeValue}}</span>
                  </li>
                </div>
              </div>
              <div class="number">
                <span>数量</span>
                <el-input-number v-model="num"  size="mini" label="描述文字"></el-input-number>
              </div>
              <div class="purchase">
                <button>立即购买</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    dialogImageUrl: Array, //商品图
    dialogImageUrl15: Array, //图文详情
    originalPrice: String, //原价
    currentPrice: String, //现价
    title: String //标题
    ,yybProductSkuList: Array, //商品属性集合
    yybProductSpecificationList: Array, //规格名集合
    metering:String, //计量单位
    imageUrl: String, //主图
  },
  data() {
    return {
      previewID: "",
      yesData: "2",
      commodityDetails: [], //通过商品id获取到的商品详情
      CommodityFigure: [], //商品图集合
      GraphicDetails: [], //图文详情
      originalCost: "", //原价
      currentCost: "", //现价
      currentCost1: "", //现价
      caption: "", // 标题
      imgurl: "", //主图
      inventory: "0" //库存
      ,OneIndex: '-1', //第一个规格值下标
      style1: 'border: 1px solid #FF4F54;color:#FF4F54;',
      style2: 'border: 1px solid #D5D5D5;color:#333333;',
      TwoIndex: '-1', //第二个规格值下标
      skuList: [], //单个商品详情集合
      skuAttributeDetail: '', //已选说明
      OneId: '', //选择第一个规格值的id
      TwoId: '', //选择第二个规格值的id
      num: '',
      Specification: [], //规格名集合
      commodityProperty: [], //商品属性集合
      measure: '', //计量单位
    };
  },

  components: {},
  watch: {
    previewID: function name(params) {
      console.log(params);
      Vue.axios
        .get(`/yybProduct/queryProductDetailsByProductId?productId=${params}`)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.commodityDetails = res.data.data;
            this.imgurl = res.data.data.imageUrl;
            this.inventory = res.data.data.productInventory;
            this.currentCost1 = res.data.data.productCurrentPrice;
            this.skuList = res.data.data.yybProductSkuList;
            this.CommodityFigure = res.data.data.yybProductImageList.sort(
              this.sortBy("imageSort")
            );
            this.GraphicDetails = res.data.data.productDetailsImageList.sort(
              this.sortBy("imageSort")
            );
          }
        });
    }
  },
  computed: {},

  mounted() {
    this.CommodityFigure = this.dialogImageUrl;
    this.GraphicDetails = this.dialogImageUrl15;
    this.originalCost = this.originalPrice;
    this.currentCost1 = this.currentPrice;
    this.currentCost = this.currentPrice;
    this.caption = this.title;
    this.Specification = this.yybProductSpecificationList;
    this.commodityProperty = this.yybProductSkuList;
    this.measure =  this.metering;
    this.imgurl = this.imageUrl;
    console.log(this.Specification,this.commodityProperty,this.title);
    this.commodityProperty.forEach(element=>{
      this.inventory = Number(element.inventory) + Number(this.inventory);
    })
  },

  methods: {
    //数组排序
    sortBy(field) {
      return (x, y) => {
        return x[field] - y[field];
      };
    },
    //匹配
    One(i,id){
      this.OneIndex = i;
      if (this.commodityDetails.yybProductSpecificationList.length == 1) {
        this.skuList.forEach(element=>{
          if (element.attributeId1 == id) {
            this.currentCost1 = element.currentPrice;
            this.inventory = element.inventory;
            this.imgurl = element.imageUrl;
            this.skuAttributeDetail = element.skuAttributeDetail;
          }
        })
      }else{
        this.OneId = id;
        if (this.TwoId == '') {
          
        }else{
          this.skuList.forEach(element=>{
        console.log(element);
          if (element.attributeId1 == this.OneId && element.attributeId2 == this.TwoId) {
            this.currentCost1 = element.currentPrice;
            this.inventory = element.inventory;
            this.imgurl = element.imageUrl;
            this.skuAttributeDetail = element.skuAttributeDetail;
            console.log(this.currentCost1,this.inventory);
          }
        })
        }
        console.log(id);
      }
    },
    Two(i,id){
      this.TwoIndex = i;
      this.TwoId = id;
      console.log(id);
      this.skuList.forEach(element=>{
        console.log(element);
          if (element.attributeId1 == this.OneId && element.attributeId2 == id) {
            this.currentCost1 = element.currentPrice;
            this.inventory = element.inventory;
            this.imgurl = element.imageUrl;
            this.skuAttributeDetail = element.skuAttributeDetail;
            console.log(this.currentCost1,this.inventory);
          }
        })
    },
    //匹配
     One1(i,id){
      this.OneIndex = i;
      if (this.Specification.length == 1) {
        this.commodityProperty.forEach(element=>{
          if (element.attributeValue1 == id) {
            this.currentCost1 = element.currentPrice;
            this.inventory = element.inventory;
            this.imgurl = element.imageUrl;
            this.skuAttributeDetail = id;
          }
        })
      }else{
        this.OneId = id;
        if (this.TwoId == '') {
          
        }else{
          this.commodityProperty.forEach(element=>{
        console.log(element);
          if (element.attributeValue1 == this.OneId && element.attributeValue2 == this.TwoId) {
            this.currentCost1 = element.currentPrice;
            this.inventory = element.inventory;
            this.imgurl = element.imageUrl;
            this.skuAttributeDetail = this.OneId + this.TwoId;
            console.log(this.currentCost1,this.inventory);
          }
        })
        }
        console.log(id);
      }
    },
    Two1(i,id){
      this.TwoIndex = i;
      this.TwoId = id;
      console.log(id);
      this.commodityProperty.forEach(element=>{
        console.log(element);
          if (element.attributeValue1 == this.OneId && element.attributeValue2 == id) {
            this.currentCost1 = element.currentPrice;
            this.inventory = element.inventory;
            this.imgurl = element.imageUrl;
            this.skuAttributeDetail = this.OneId + id;
            console.log(this.currentCost1,this.inventory);
          }
        })
    }
  }
};
</script>
<style scoped>
.specificationParticulars {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.specificationParticulars > div {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.parcel {
  width: 400px;
  height: 670px;
  border: 1px solid #f2f2f2;
}
.parcel::-webkit-scrollbar {
  width: 0px;
}
.price {
  position: relative;
}
.price > img:nth-child(1) {
  width: 100%;
  height: 52px;
}
.price > p:nth-child(2) {
  position: absolute;
  top: 5px;
  left: 20px;
}
.price > img:nth-child(3) {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 1;
  width: 75px;
  height: 28px;
}
.price > img:nth-child(4) {
  position: absolute;
  width: 18px;
  height: 19px;
  top: 10px;
  right: 40px;
  z-index: 2;
}
.price > span:nth-child(5) {
  position: absolute;
  color: #ff4f54;
  font-size: 15px;
  font-weight: bold;
  top: 13px;
  right: 5px;
  z-index: 2;
  font-family: PingFang SC;
}
.title {
  padding: 10px;
  border-bottom: 10px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title > div {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title > div > span {
  color: #999999;
  font-size: 12px;
}
.title > div > img {
  width: 19px;
  height: 17px;
}
.title > span {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
}
.discountCoupon {
  padding: 10px;
  border-bottom: 10px solid #f2f2f2;
}
.discountCoupon > p {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #f2f2f2;
}
.image-text {
  padding: 10px;
  color: #333333;
  font-size: 15px;
  font-weight: bold;
}
.shade {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.specification {
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.pitchOn {
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #f2f2f2;
}
.pitchOn > img {
  width: 90px;
  height: 90px;
  border-radius: 5px;
}
.pitchOn > div {
  margin-left: 10px;
}
.pitchOn > div > p:nth-child(1) {
  color: #ff4f54;
}
.pitchOn > div > p:nth-child(2) {
  color: #333333;
  font-size: 12px;
  margin-bottom: 4px;
}
.pitchOn > div > p:nth-child(2) {
  font-size: 12px;
}
.specificationOne {
  padding: 20px 10px 0;
}
.specificationOne + .specificationOne {
  padding-top: 0px;
}
.specificationOneDiv {
  display: flex;
  flex-wrap: wrap;
}
.specificationOneDiv > li {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 2px 5px;
  border-radius: 5px;
}
.number{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.number>span{
  color: #999999;
  font-size: 12px;
}
.purchase{
  padding: 0 10px 10px;
}
.purchase button{
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: linear-gradient(-90deg,rgba(255,79,84,1) 0%,rgba(251,104,160,1) 100%);
  color: #ffffff;
  font-size: 16px;
  border: 0;
}
</style>