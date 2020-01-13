<!--  -->
<template>
  <div class="opinion">
    <div class="head">
      <span>意见反馈</span>
    </div>
    <div class="food">
      <div class="foodFood">
        <div class="foodFoodHead">
          <p>意见反馈</p>
          <div>
            <input type="text" placeholder="请输入充值人手机号码" v-model="opinionPhone" />
            <button
              @click="inquire()"
              class="layui-btn"
              style="margin: 0px 20px;background-color:#379EE9"
            >搜索</button>
          </div>
        </div>
        <div class="foodFoodCenterDiv"></div>
        <div class="foodFoodFoodDiv">
          <div style="display:flex;flex-direction:column;">
            <table>
              <tr>
                <th style="width:130px">用户手机号码</th>
                <th style="width:130px">昵称</th>
                <th>描述</th>
                <th style="width:60px">配图</th>
                <th style="width:140px">联系方式</th>
                <th style="width:200px">反馈时间</th>
                <!-- <th style="width:18px"></th> -->
              </tr>
            </table>
            <div v-if="this.opinionTotal != 0" class="overflow">
              <table>
                <tr
                  v-for="(item, index) in opinionData"
                  :key="index"
                  @click="popup(index)"
                  :style="{backgroundColor: (indexOpinion == index ? '#bfe2ff' : '')}"
                >
                  <td style="width:130px">{{item.userPhoneNum}}</td>
                  <td style="width:130px">{{item.userName}}</td>
                  <td style="color:#379EE9;">{{item.suggestionDetail}}</td>
                  <td style="width:60px">[{{item.imageCount}}图]</td>
                  <td style="width:140px">{{item.suggestionContact}}</td>
                  <td style="width:200px">{{item.suggestionTime}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div style="text-align:center;width:100%;font-size:16px;" v-if="this.opinionTotal == 0">
            <p>暂无数据</p>
          </div>
          <Page
            class="page"
            :total="opinionTotal"
            :current="opinionPageNum"
            @on-change="opinionPageNumChange"
            :page-size-opts="[10,20,30]"
            show-elevator
            show-sizer
            show-total
            :page-size="opinionPageSize"
            @on-page-size-change="opinionPageSizeChange"
          />
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </div>
      <!-- 弹窗 -->
      <div v-show="popupTrue" class="popup">
        <div class="popupDiv" id="popupDiv">
          <div class="popupDivHead">
            <span>用户意见反馈详情</span>
            <img
              style="cursor: pointer;"
              @click="shutPopup"
              src="https://images.baiduyuyue.com/Close.png"
              alt
            />
          </div>
          <el-carousel height="540px" :interval="0" arrow="always" style="width:76%;margin:20px auto;" :autoplay='false' >
            <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
              <img style="object-fit: contain" :src="item.imageUrl | imgSrc" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
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
      opinionPhone: "", //查询手机号
      opinionTotal: 0, //意见反馈数据总条数
      opinionData: [], //意见反馈总数据
      indexOpinion: -1, //点击的反馈用户下标
      opinionPageNum: 1, //反馈当前页
      opinionPageSize: 10, //反馈每页数据条数
      spinShow: false, //懒加载
      popupTrue: false, //弹窗显隐
      imageUrl: [], //点击的反馈图片集合

        urls: "https://www.baiduyuyue.com/management", //线上地址
      // urls: "http://192.168.0.190:8080" //测试地址
    };
  },

  components: {},
  metaInfo: {
    title: "意见反馈",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  computed: {},
  created() {
    
  },
  mounted() {
    Vue.axios
      .get(
        this.urls +
          `/suggestion/getAllSuggestions?pageNum=${this.opinionPageNum}&pageSize=${this.opinionPageSize}`
      )
      .then(res => {
        // console.log(res);
        this.opinionTotal = res.data.data.total;
        this.opinionData = res.data.data.list;
      });
  },

  methods: {
    //点击出现的发布弹窗
    popup(i) {
      this.indexOpinion = i;
      this.popupTrue = true;
      this.imageUrl = this.opinionData[i].detailImageList;
      this.suggestionDetail = this.opinionData[i].suggestionDetail;
      // console.log(this.imageUrl);
    },
    //关闭弹窗
    shutPopup(event) {
      // var sp = document.getElementById("popupDiv");
      // if (sp) {
      //   if (!sp.contains(event.target)) {
      //     //这句是说如果我们点击到了id为myPanel以外的区域
      this.popupTrue = false;
      this.imageUrl = [];
      //   }
      // }
    },

    // 搜索按钮
    inquire() {
      this.indexOpinion = -1;
      this.spinShow = true;
      Vue.axios
        .get(
          this.urls +
            `/suggestion/getAllSuggestions?pageNum=1&pageSize=10&userPhoneNum=${this.opinionPhone}`
        )
        .then(res => {
          // console.log(res);
          this.opinionTotal = res.data.data.total;
          this.opinionData = res.data.data.list;
          this.spinShow = false;
        });
    },
    //改变反馈当前页
    opinionPageNumChange(value) {
      this.indexOpinion = -1;
      this.opinionPageNum = value;
      this.spinShow = true;
      Vue.axios
        .get(
          this.urls +
            `/suggestion/getAllSuggestions?pageNum=${this.opinionPageNum}&pageSize=${this.opinionPageSize}&userPhoneNum=${this.opinionPhone}`
        )
        .then(res => {
          // console.log(res);
          this.opinionTotal = res.data.data.total;
          this.opinionData = res.data.data.list;
          this.spinShow = false;
        });
    },
    //改变反馈每页数据条数
    opinionPageSizeChange(value) {
      this.indexOpinion = -1;
      this.opinionPageSize = value;
      this.spinShow = true;
      // console.log(value);
      Vue.axios
        .get(
          this.urls +
            `/suggestion/getAllSuggestions?pageNum=${this.opinionPageNum}&pageSize=${this.opinionPageSize}&userPhoneNum=${this.opinionPhone}`
        )
        .then(res => {
          // console.log(res);
          this.opinionTotal = res.data.data.total;
          this.opinionData = res.data.data.list;
          this.spinShow = false;
        });
    }
  }
};
</script>
<style scoped>
.el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /* 反馈描述 */
  .describe{
    width:100%;
    height:80px;
    background-color:#f2f2f2;
    text-align: center;
    font-size: 20px;
  }
/* 轮播 */
.lunbo {
  width: 500px;
  height: 470px;
  margin: 20px auto;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.lunbo > img {
  width: 9px;
  height: 20px;
  cursor: pointer;
}
.lunboDiv {
  width: 325px;
  height: 100%;
  background-color: #f2f2f2;
  display: -webkit-inline-box;
  /* overflow: hidden; */
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
#test1 {
  margin: 20px auto;
}
.page {
  margin: 7px 0 7px 10px;
}
.opinion {
  height: 100%;
  min-width: 1314px;
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
  padding: 20px;
}

.foodFood {
  width: 100%;
  height: 627px;
  background-color: #fff;
  border-radius: 5px;
  /* margin: 20px 25px 20px 34px; */
}
.foodFoodHead {
  padding: 10px 0 10px 34px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.foodFoodHead input {
  width: 190px;
  height: 38px;
  text-indent: 10px;
  font-size: 14px;
  border: 1px solid #e6e6e6;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}
.foodFoodHead div {
  display: flex;
}
.foodFoodHead > p {
  font-size: 16px;
  color: #379ee9;
}
.foodFoodCenterDiv {
  width: 26px;
  height: 4px;
  background-color: #379ee9;
  margin: -2px 0 0 34px;
}
.foodFoodFoodDiv {
  height: 517px;
  margin: 27px 25px 20px 34px;
  border: 1px solid #e6e6e6;
  position: relative;
}
table {
  width: 100%;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-collapse: collapse;
  color: #666666;
}
table tr th,
table tr td {
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
}
table tr th {
  background-color: #f4faff;
  border-left: 0px solid #e6e6e6;
  border-top: 0px solid #e6e6e6;
}
table tr th:last-child,table tr td:last-child {
  border-right: 0px solid #e6e6e6;
}
table tr td:nth-child(1) {
  border-left: 0px solid #e6e6e6;
}
table tr:not(:first-child):hover {
  background-color: #b9def8;
}
table tr:nth-child(2n) {
  background-color: #f4faff;
}
table tr:hover {
  background-color: #bfe2ff;
}
.overflow{
  height:411px;
  overflow-y:scroll;
  overflow-x: hidden;
}
.overflow::-webkit-scrollbar {
  width: 0px;
}
</style>