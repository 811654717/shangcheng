<!--  -->
<template>
  <div class="commodity">
    <div class="head">
      <span>商品管理</span>
    </div>
    <div class="food" v-if="administration">
      <div class="foodCenter">
        <div>
          <span>分类</span>
          <!-- <el-select style="width:150px" v-model="classifyId" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-cascader
            v-model="classifyId"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
          ></el-cascader>
        </div>
        <div>
          <span>标题</span>
          <el-input style="width:150px" v-model="title" placeholder="请输入标题" clearable></el-input>
        </div>
        <div>
          <span>当前状态</span>
          <el-select style="width:150px" v-model="statusId" placeholder="请选择当前状态" clearable>
            <el-option
              v-for="item in status"
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
                <th>商品</th>
                <th style="width:130px">分类</th>
                <th style="width:200px">成本价</th>
                <th style="width:130px">总库存</th>
                <th style="width:130px">当前状态</th>
                <th style="width:160px">创建时间</th>
                <th style="width:150px">操作</th>
              </tr>
            </table>
            <!-- v-if="this.commodityTotal != 0" -->
            <div class="overflow">
              <table>
                <tr
                  v-for="(item, index) in commodityData"
                  :key="index"
                  @click="TRclick(item.productId,index)"
                  :style="{backgroundColor: (TRindex == index ? '#bfe2ff' : '')}"
                >
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
                  <td style="width:200px">{{item.productCostPrice}}</td>
                  <td style="width:130px">{{item.productInventory}}</td>
                  <td style="width:130px">
                    <span v-if="item.productStatus == 0">已下架</span>
                    <span v-else-if="item.productStatus == 1">上架中</span>
                    <span v-else-if="item.productStatus == 3">已删除</span>
                  </td>
                  <td style="width:160px">{{item.productAddTime}}</td>
                  <td style="width:150px">
                    <el-button @click.stop="preview(item.productId)" type="primary">预览</el-button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div style="text-align:center;width:100%;font-size:16px;" v-if="this.commodityTotal == 0">
            <p>暂无数据</p>
          </div>
          <Page
            class="page"
            :total="commodityTotal"
            :current="commodityPageNum"
            @on-change="commodityPNChange"
            :page-size-opts="[10,20,30]"
            show-elevator
            show-sizer
            show-total
            :page-size="commodityPageSize"
            @on-page-size-change="commodityPSChange"
          />
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </div>
      <!-- 弹窗 -->
      <div v-if="popupTrue" class="popup">
        <div class="popupDiv">
          <div class="previewT">
            <span>预览</span>
            <span @click="shut">X</span>
          </div>
          <div class="particulars">
            <specification ref="zizujian"></specification>
          </div>
        </div>
      </div>
    </div>
    <div class="administration" v-if="!administration">
      <Glcommodity @amend="success" :true="true" :classify="options"></Glcommodity>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Message } from "element-ui";
import Glcommodity from "./GLcommodity"; //添加商品
import specification from "./specification"; //详情规格
export default {
  data() {
    return {
      commodityData: [], //商品总数据
      commodityTotal: 0, //商品数据总条数
      commodityPageNum: 1, //商品当前页
      commodityPageSize: 10, //商品每页数据条数
      spinShow: false, //懒加载
      indexRecharge: -1, //点击的充值用户下标
      phoneZJIssue: "", //点击的充值用户手机号
      currentdate: "", //当前时间
      urls: "https://www.baiduyuyue.com/management", //线上地址
      // urls: 'http://192.168.0.189:8080', //测试地址
      popupTrue: false, //弹窗显隐
      options: [],
      classifyId: "", //选择的分类
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
          // console.log(value);
          // console.log(Date.now());
          if (Date.now() + 24 * 60 * 60 * 1000 <= value) {
            return true;
          }
          return false;
        }
      },
      commodityID: "", //选中的商品id
      TRindex: -1,
      administration: true
    };
  },

  components: { Glcommodity, specification },
  metaInfo: {
    title: "商品管理",
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
    this.currentdate = year + seperator1 + month + seperator1 + strDate;
  },
  mounted() {
    this.classify(); //获取分类
    this.inquire(); //获取数据
  },
  watch: {},
  methods: {
    //获取分类
    classify() {
      Vue.axios
        .get("/yybProductCategory/queryProductCategoryList")
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.options = convertTree(res.data.data);
            function convertTree(tree) {
              const result = [];
              tree.forEach(item => {
                let {
                  id: value,
                  name: label
                  // children: children
                } = item;
                // if (children) {
                //   children = convertTree(children);
                // }
                result.push({
                  value,
                  label
                  // children
                });
              });
              return result;
            }
          }
        });
    },
    //分类选择
    handleChange(value) {
      console.log(value);
    },
    //选中操作
    TRclick(id, index) {
      console.log(id, index);
      this.commodityID = id;
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
      console.log(this.time);
      let productAddStartTime = "";
      let productAddEndTime = "";
      if (this.time == null || this.time.length == 0) {
      } else {
        productAddStartTime = this.time[0];
        productAddEndTime = this.time[1];
      }
      this.TRindex = -1;
      this.commodityID = "";
      this.spinShow = true;
      Vue.axios
        .get(
          `/yybProduct/queryAllProductListByUserId?userId=${1}&categoryId=${
            this.classifyId
          }&pageNum=1&pageSize=10&productName=${this.title}&productStatus=${
            this.statusId
          }&productAddStartTime=${productAddStartTime}&productAddEndTime=${productAddEndTime}`
        )
        .then(res => {
          console.log(res);
          this.commodityTotal = res.data.data.total;
          this.commodityData = res.data.data.list;
          this.spinShow = false;
        });
    },
    search() {
      let productAddStartTime = "";
      let productAddEndTime = "";
      if (this.time == null || this.time.length == 0) {
      } else {
        productAddStartTime = this.time[0];
        productAddEndTime = this.time[1];
      }
      this.TRindex = -1;
      this.commodityID = "";
      this.spinShow = true;
      Vue.axios
        .get(
          `/yybProduct/queryAllProductListByUserId?userId=${1}&categoryId=${
            this.classifyId
          }&pageNum=${this.commodityPageNum}&pageSize=${
            this.commodityPageSize
          }&productName=${this.title}&productStatus=${
            this.statusId
          }&productAddStartTime=${productAddStartTime}&productAddEndTime=${productAddEndTime}`
        )
        .then(res => {
          console.log(res);
          this.commodityTotal = res.data.data.total;
          this.commodityData = res.data.data.list;
          this.spinShow = false;
        });
    },
    //改变商品当前页
    commodityPNChange(value) {
      this.commodityPageNum = value;
      this.search();
    },
    //改变商品每页数据条数
    commodityPSChange(value) {
      this.commodityPageSize = value;
    },
    //修改父组件的值
    success(i) {
      this.administration = i;
    },
    //添加
    add() {
      this.administration = false;
    },
    //编辑
    compile() {
      if (this.TRindex == -1) {
        this.$message.warning("请选择要编辑的商品");
      } else {
        this.administration = false;
      }
    },
    //更改状态为删除
    GoodsToDelete() {
      if (this.TRindex == -1) {
        this.$message.warning("请选择要删除的商品");
      } else {
        Vue.axios({
          method: "post",
          url: "/yybProduct/updateProductStatusToDeleteByProductId",
          data: `productId=${this.commodityID}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message.success("删除成功");
            this.TRindex = -1;
            this.commodityID = "";
            this.search();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      }
    },
    //预览
    preview(i) {
      this.popupTrue = true;
      console.log(i);
      setTimeout(() => {
        this.$refs.zizujian.yesData = "1";
        this.$refs.zizujian.previewID = i;
      }, 500);
    },
    //关闭预览
    shut() {
      this.popupTrue = false;
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
  width: 1000px;
  height: 800px;
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
  height: 95%;
}

iframe {
  position: absolute;
  top: 54px;
  left: 10px;
  width: 248px;
  height: 436px;
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