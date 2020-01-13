<!--  -->
<template>
  <div id="userAll">
    <div class="headFood">
      <div class="headFoodLeft">
        <div class="headFoodLeftHead">
          <span style="color:#379e
            e9;">用户</span>
          <span @click="areaManager" style="cursor:pointer;margin-left:50px">区域经理</span>
        </div>
        <div class="headFoodLeftCenter"></div>
        <div style="display:flex;margin: 15px 0 0 10px">
          <input class="headFoodLeftInput" type="text" placeholder="请输入手机号码" v-model="areaInput" />
          <button
            @click="userSearch()"
            class="layui-btn"
            style="background-color:#379EE9;font-size:14px"
          >搜索</button>
        </div>
        <div class="headFoodLeftFood">
          <table class="headFoodLeftTable">
            <tr>
              <th>手机号码</th>
              <th>呢称</th>
              <th>归属地</th>
            </tr>
            <tr
              @click="userTr(item.userPhonenum,index)"
              v-for="(item, index) in userAll"
              :key="index"
              :style="{backgroundColor: (trIndex == index ? '#B9DEF8' : '')}"
            >
              <td>{{item.userPhonenum}}</td>
              <td>{{item.userName}}</td>
              <td>{{item.registerArea}}</td>
            </tr>
          </table>
          <div v-if="this.userTotal == 0" style="text-align:center;font-size:16px">暂无数据</div>
          <Page class="page" :total="userTotal" :current="pageNum" @on-change="pagination" />
        </div>
      </div>
      <div class="headFoodRight">
        <div class="headFoodRightHeadHead">
          <div @click="entire" :style="{color: this.audit == 'entire'? '#379ee9':'#333333'}">全部</div>
          <div
            @click="HasBeenOn"
            :style="{color: this.audit == 'HasBeenOn'? '#379ee9':'#333333'}"
          >已审</div>
          <div
            @click="NotCareful"
            :style="{color: this.audit == 'NotCareful'? '#379ee9':'#333333'}"
          >未审</div>
        </div>
        <div class="headFoodRightHeadCenter">
          <div v-show="this.audit == 'entire'"></div>
          <div v-show="this.audit == 'HasBeenOn'"></div>
          <div v-show="this.audit == 'NotCareful'"></div>
        </div>
        <p style="width:100%;height:1px;border-top:1px solid #ebebeb;"></p>
        <!-- 多选框 -->
        <p class="headFoodRightP"></p>
        <div class="headFoodRightHead" ref="label">
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="one" value="1" v-model="checkedNames" />
              <label for="one"></label>
            </div>
            <span>一级</span>

            <span>( {{(ReleaseLevel.oneLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.oneLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="two" value="2" v-model="checkedNames" />
              <label for="two"></label>
            </div>
            <span>二级</span>

            <span>( {{(ReleaseLevel.secondLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.secondLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="three" value="3" v-model="checkedNames" />
              <label for="three"></label>
            </div>
            <span>三级</span>

            <span>( {{(ReleaseLevel.threeLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.threeLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="four" value="4" v-model="checkedNames" />
              <label for="four"></label>
            </div>
            <span>四级</span>

            <span>( {{(ReleaseLevel.fourLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.fourLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="five" value="5" v-model="checkedNames" />
              <label for="five"></label>
            </div>
            <span>五级</span>

            <span>( {{(ReleaseLevel.fiveLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.fiveLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="six" value="6" v-model="checkedNames" />
              <label for="six"></label>
            </div>
            <span>六级</span>

            <span>( {{(ReleaseLevel.sixLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.sixLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="seven" value="7" v-model="checkedNames" />
              <label for="seven"></label>
            </div>
            <span>七级</span>

            <span>( {{(ReleaseLevel.sevenLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.sevenLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv">
            <div class="headFoodRightHeadDivdiv">
              <input type="checkbox" class="labelinput" id="eight" value="8" v-model="checkedNames" />
              <label for="eight"></label>
            </div>
            <span>八级</span>

            <span>( {{(ReleaseLevel.eightLevelPublishCount == '' || this.ReleaseLevel.length == 0) ? 0 : ReleaseLevel.eightLevelPublishCount}}条 )</span>
          </div>
          <div class="headFoodRightHeadDiv1">
            <span>{{this.gradeNumberTrue ? '全部条数' : '选中条数'}}</span>
            <span>{{this.checkedNames1}}</span>
          </div>
        </div>
        <div class="headFoodRightFood">
          <div
            style="border: 1px solid #e6e6e6;width:68%;margin: 0 0 20px 30px;display:flex;flex-direction:column;"
          >
            <div class="headFoodRightFoodTitle">
              <div>发布信息审核</div>
              <div>
                <button @click="auditOperation('hasBeenOn')" class="layui-btn">已审</button>
                <button @click="auditOperation('soldOut')" class="layui-btn">下架</button>
                <button @click="auditOperation('forbid')" class="layui-btn" style="width:84px">禁止发布</button>
                <button @click="auditOperation('blacklist')" class="layui-btn">拉黑</button>
                <button
                  @click="auditOperation('delete')"
                  class="layui-btn"
                  style="background-color:#ff5722;"
                >删除</button>
              </div>
            </div>
            <table style="table-layout:fixed;">
              <tr>
                <th style="width:50px">
                  <input type="checkbox" id="trTh" @click="allElection()" />
                </th>
                <th style="width:110px">发布人手机号码</th>
                <th>标题</th>
                 <!-- style="width:155px" -->
                <th style="width:130px">显示区域</th>
                <th style="width:145px">发布时间</th>
                <th style="width:34px">等级</th>
                <th style="width:32px">分数</th>
                <th style="width:65px">发布状态</th>
                <th style="width:65px;">审核状态</th>
                <!-- <th style="width:18px"></th> -->
              </tr>
            </table>
            <div class="overflow">
              <table class="headFoodLeftTable1" style="table-layout:fiexd;">
                <tbody>
                  <tr
                    v-for="(item,index) in areasubordinateall"
                    :key="index"
                    :style="{backgroundColor: (areasubordinateindex == index ? '#B9DEF8' : '')}"
                  >
                    <td style="width:50px">
                      <input type="checkbox" class="trTd" @click="publishedIfnClick(index)" />
                    </td>
                    <td
                      @click="areaClick(item.publishId,index)"
                      style="width:110px"
                    >{{item.publishUserPhoneNumber}}</td>
                     <!-- style="width:155px" -->
                    <td @click="areaClick(item.publishId,index)">{{item.publishName}}</td>
                    <td
                      style="width:130px;"
                      @click="areaClick(item.publishId,index)"
                    >{{item.showAreaProvinceName}}-{{item.showAreaCityName}}</td>
                    <td
                      style="width:145px;"
                      @click="areaClick(item.publishId,index)"
                    >{{item.addTime}}</td>
                    <td
                      @click="areaClick(item.publishId,index)"
                      style="width:34px"
                    >{{item.levelTitle}}</td>
                    <td
                      @click="areaClick(item.publishId,index)"
                      style="width:32px"
                    >{{item.recommendScore}}</td>
                    <td @click="areaClick(item.publishId,index)" style="width:65px">
                      <span v-if="item.status == 1">正常</span>
                      <span v-if="item.status == 2">已下架</span>
                      <span v-if="item.status == 3">已删除</span>
                    </td>
                    <!-- <td
                      v-if="audit == 'entire'"
                      @click="areaClick(item.publishId,index)"
                      style="width:100px"
                    >
                      <span v-if="item.auditStatus == 0">未审核</span>
                      <span
                        v-if="item.auditStatus == 1 && item.status != 1 && item.status != 2 && item.status != 3"
                      >已审核</span>
                      <span v-if="item.auditStatus == 1 && item.status == 1">正常</span>
                      <span v-if="item.auditStatus == 1 && item.status == 2">已下架</span>
                      <span v-if="item.auditStatus == 1 && item.status == 3">已删除</span>
                      <span
                        v-if="item.status != 1 && item.status != 2 && item.status != 3 && item.contentViolation == 1"
                      >违规</span>
                    </td> -->
                    <!-- <td
                      v-if="audit == 'HasBeenOn'"
                      @click="areaClick(item.publishId,index)"
                      style="width:100px"
                    >
                      <span
                        v-if="item.auditStatus == 1 && item.status != 1 && item.status != 2 && item.status != 3"
                      >已审核</span>
                      <span v-if="item.status == 1">正常</span>
                      <span v-if="item.status == 2">已下架</span>
                      <span v-if="item.status == 3">已删除</span>
                      <span
                        v-if="item.status != 1 && item.status != 2 && item.status != 3 && item.contentViolation == 1"
                      >违规</span>
                    </td> -->
                    <!-- <td
                      v-if="audit == 'NotCareful'"
                      @click="areaClick(item.publishId,index)"
                      style="width:100px"
                    >
                      <span v-if="item.auditStatus == 0">未审核</span>
                      <span v-if="item.auditStatus == 1">已审核</span>
                    </td> -->
                    <td @click="areaClick(item.publishId,index)"
                      style="width:65px"
                    >
                      <span v-if="item.auditStatus == 0">未审核</span>
                      <span v-if="item.auditStatus == 1">已审核</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="this.areasubordinatetotal == 0" style="text-align:center;font-size:16px">暂无数据</div>
            <Page
              class="page"
              :total="areasubordinatetotal"
              :current="userPageNum"
              @on-change="userQualityChange"
              :page-size-opts="[10,20,30]"
              show-elevator
              show-sizer
              show-total
              :page-size="userPageSize"
              @on-page-size-change="userChangePagesize"
            />
            <Spin size="large" fix v-if="spinShow"></Spin>
          </div>
          <div class="headFoodRightFoodDiv">
            <div class="headFoodRightFoodPhone">
              <img
                class="headFoodRightFoodDivImg"
                src="https://images.baiduyuyue.com/background-组44.png"
                alt
              />
              <iframe v-if="iframetrue" id="iframe" ref="iframe" :src="iframesrc" frameborder="0"></iframe>
            </div>
            <div class="headFoodRightFoodDivFood">
              <span>分类:</span>
              <li style="display:inline-block;" v-for="(item,index) in phoneClassify" :key="index">
                <span class="headFoodRightFoodDivFoodSpan">{{item.classifyName}}</span>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
export default {
  // inject: ["reload"],
  data() {
    return {
      userAll: [], //用户总数据
      userTotal: 0, //用户总数据条数
      areasubordinatetotal: 0, //当前用户发布质量数据总条数
      areasubordinateall: [], //当前用户发布质量数据
      checkedNames: [], //多选框
      checkedNames1: 0, //多选框总条数
      gradeNumberTrue: true,
      checkedNamesSting: "",
      ReleaseLevel: [], //等级发布数数组
      userIdAll: [], //存储全部的userId
      publishIdAll: [], //存储全部的publishId
      userPageNum: 1, //用户发布质量数据当前页
      userPageSize: 10, //用户发布质量数据每页显示数据条数
      areasubordinateindex: -1, //点击的发布信息下标
      audit: "NotCareful", //默认为未审核

      spinShow: false, //懒加载
      iframetrue: true,
      iframesrc: "",
      phoneClassify: [], //分类详情
      pageNum: 1, // 用户当前页数
      areaInput: "", //输入的用户手机号
      trIndex: 0, //点击某一用户发布内容的下标
      // urls: "http://192.168.0.189:8080", //测试ip
      urls: "https://www.baiduyuyue.com/management", //线上网址
      sTime: "", // 开始时间
      eTime: "" //结束时间
    };
  },
  metaInfo: {
    title: "内容审核系统",
    titleTemplate: "%s - 用户",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },

  components: {},
  created() {
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
    this.sTime = year + seperator1 + month + seperator1 + strDate + "+00:00:00";
    this.eTime = year + seperator1 + month + seperator1 + strDate + "+23:59:59";
  },
  computed: {},
  watch: {
    iframesrc: function() {
      setTimeout(() => {
        this.iframetrue = true;
      }, 300);
    },
    checkedNames: function() {
      this.checkedFalse();
      var one = $("#one").prop("checked");
      var two = $("#two").prop("checked");
      var three = $("#three").prop("checked");
      var four = $("#four").prop("checked");
      var five = $("#five").prop("checked");
      var six = $("#six").prop("checked");
      var seven = $("#seven").prop("checked");
      var eight = $("#eight").prop("checked");

      var inputAll = 0;
      // console.log(one, two, three, four, five, six, seven, eight);
      if (one == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.oneLevelPublishCount;
      }
      if (two == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.secondLevelPublishCount;
      }
      if (three == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.threeLevelPublishCount;
      }
      if (four == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.fourLevelPublishCount;
      }
      if (five == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.fiveLevelPublishCount;
      }
      if (six == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.sixLevelPublishCount;
      }
      if (seven == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.sevenLevelPublishCount;
      }
      if (eight == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.ReleaseLevel.eightLevelPublishCount;
      }

      this.checkedNames1 = inputAll;
      // console.log(this.checkedNames1, inputAll);

      if (
        one == false &&
        two == false &&
        three == false &&
        four == false &&
        five == false &&
        six == false &&
        seven == false &&
        eight == false
      ) {
        this.gradeNumberTrue = true;
        this.checkedNames1 =
          this.ReleaseLevel.oneLevelPublishCount +
          this.ReleaseLevel.secondLevelPublishCount +
          this.ReleaseLevel.threeLevelPublishCount +
          this.ReleaseLevel.fourLevelPublishCount +
          this.ReleaseLevel.fiveLevelPublishCount +
          this.ReleaseLevel.sixLevelPublishCount +
          this.ReleaseLevel.sevenLevelPublishCount +
          this.ReleaseLevel.eightLevelPublishCount;
        // console.log(this.checkedNames1, this.gradeNumberTrue);
      }

      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      // console.log(this.checkedNames);
      this.checkedNamesSting = this.checkedNames.toString();
      // console.log(this.checkedNamesSting);
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      this.spinShow = true;
      if (this.audit == "entire") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryCommonUserPublishsList?startDate=${this.sTime}&endDate=${this.eTime}&phoneNumber=${this.userphone}&auditStatus=&recommendLevelList=${this.checkedNamesSting}`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "全部");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.ReleaseLevel = res.data.data;
            this.spinShow = false;
          });
        // console.log(strdate, enddate);
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryCommonUserPublishsList?startDate=${this.sTime}&endDate=${this.eTime}&phoneNumber=${this.userphone}&auditStatus=1&recommendLevelList=${this.checkedNamesSting}`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "已审");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.ReleaseLevel = res.data.data;
            this.spinShow = false;
          });
        // console.log(strdate, enddate);
      } else if (this.audit == "NotCareful") {
        // console.log(strdate, enddate);
        Vue.axios
          .get(
            this.urls +
              `/publish/queryCommonUserPublishsList?startDate=${this.sTime}&endDate=${this.eTime}&phoneNumber=${this.userphone}&auditStatus=0&recommendLevelList=${this.checkedNamesSting}`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "未审");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.ReleaseLevel = res.data.data;
            this.spinShow = false;
          });
      }
    }
  },
  mounted() {
    // console.log(this.sTime, this.eTime);
    Vue.axios
      .get(
        this.urls +
          `/user/queryPublishUsersList?startDate=${this.sTime}&endDate=${this.eTime}`
      )
      .then(res => {
        // console.log(res);
        this.userAll = res.data.data.list;
        this.userTotal = res.data.data.total;
        this.userphone = res.data.data.list[0].userPhonenum;
        setTimeout(() => {
          Vue.axios
            .get(
              this.urls +
                `/publish/queryCommonUserPublishsList?startDate=${this.sTime}&endDate=${this.eTime}&phoneNumber=${this.userphone}&auditStatus=0`
            )
            .then(res => {
              this.ReleaseLevel = res.data.data;
              this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
              this.areasubordinatetotal =
                res.data.data.publishBeanPageInfo.total;
              // console.log(res);
            })
            .catch(err => {});
        }, 500);
      })
      .catch(err => {});
  },

  methods: {
    //数据清空
    numberDelete(){
      this.ReleaseLevel = [];
      this.areasubordinateall = [];
      this.areasubordinatetotal = 0;
      this.areasubordinateindex = -1;
      this.trIndex = -1;
      this.iframesrc = "";
      this.gradeNumberTrue = true;
      this.phoneClassify = [];
      this.audit = "";
      this.checkedNames1 = 0;
      this.userIdAll = [];
      this.publishIdAll = [];
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].disabled = true;
      }
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
    },
    //输入手机号查询
    userSearch() {
      this.numberDelete();
      if (this.areaInput == "") {
        Vue.axios
          .get(
            this.urls +
              `/user/queryPublishUsersList?startDate=${this.sTime}&endDate=${this.eTime}`
          )
          .then(res => {
            // console.log(res);
            this.userAll = res.data.data.list;
            this.userTotal = res.data.data.total;
          });
      } else {
        Vue.axios
          .get(
            this.urls +
              `/user/queryPublishUsersList?startDate=${this.sTime}&endDate=${this.eTime}&phoneNumber=${this.areaInput}`
          )
          .then(res => {
            // console.log(res);
            this.userAll = res.data.data.list;
            this.userTotal = res.data.data.total;
          });
      }
    },

    //父组件点击搜索
    search(k, j) {
      this.numberDelete();
      this.pageNum = 1;
      this.sTime = k;
      this.eTime = j;
      // console.log(k, j);
      // console.log(this.sTime, this.eTime);
      Vue.axios
        .get(
          `/user/queryPublishUsersList?startDate=${k}&endDate=${j}`
        )
        .then(res => {
          // console.log(res);
          this.userAll = res.data.data.list;
          this.userTotal = res.data.data.total;
        })
        .catch(err => {});
    },
    //点击显示区域经理
    areaManager() {
      this.$emit("success", false);
    },
    //全选
    allElection() {
      if (event.target.checked == true) {
        for (let i = 0; i < $(".trTd").length; i++) {
          $(".trTd")[i].checked = true;
          if (this.userIdAll.indexOf(this.areasubordinateall[i].userId) == -1) {
            this.userIdAll.push(this.areasubordinateall[i].userId);
            // console.log(this.userIdAll);
          }

          if (
            this.publishIdAll.indexOf(this.areasubordinateall[i].publishId) ==
            -1
          ) {
            this.publishIdAll.push(this.areasubordinateall[i].publishId);
            // console.log(this.publishIdAll);
          }
        }
      } else {
        for (let i = 0; i < $(".trTd").length; i++) {
          $(".trTd")[i].checked = false;
        }
        this.userIdAll = [];
        this.publishIdAll = [];
      }
    },
    //点击选中
    publishedIfnClick(index) {
      if ($(".trTd")[index].checked == true) {
        if (
          this.userIdAll.indexOf(this.areasubordinateall[index].userId) == -1
        ) {
          this.userIdAll.push(this.areasubordinateall[index].userId);
        }

        if (
          this.publishIdAll.indexOf(this.areasubordinateall[index].publishId) ==
          -1
        ) {
          this.publishIdAll.push(this.areasubordinateall[index].publishId);
          // console.log(this.userIdAll, this.publishIdAll);
        }
      } else {
        this.userIdAll.splice(
          this.userIdAll.indexOf(this.areasubordinateall[index].userId),
          1
        );
        this.publishIdAll.splice(
          this.publishIdAll.indexOf(this.areasubordinateall[index].publishId),
          1
        );
        // console.log(this.userIdAll, this.publishIdAll);
      }
    },
    //表格内单选框全选不中
    checkedFalse() {
      var checked = $("tr input");
      this.userIdAll = [];
      this.publishIdAll = [];
      for (let i = 0; i < checked.length; i++) {
        checked[i].checked = false;
      }
    },
    //审核操作弹窗
    promptPopup(txt) {
      layui.use("layer", function() {
        var layer = layui.layer;
        layer.msg(txt);
      });
    },
    //改变用户发布质量当前页
    userQualityChange(value) {
      this.checkedFalse();
      this.iframesrc = "";
      this.spinShow = true;
      this.areasubordinateindex = -1;
      this.phoneClassify = [];
      this.userPageNum = value;
      if (this.audit == 'entire') {
        this.userToLoad('');
      }else if (this.audit == 'HasBeenOn') {
        this.userToLoad(1);
      }else if (this.audit == 'NotCareful') {
        this.userToLoad(0);
      }
    },
    //加载更新的用户发布数据
    userToLoad(i){
      // console.log(i,this.audit);
      this.spinShow = true;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.areasubordinateindex = -1;
      Vue.axios
        .get(
          this.urls +
            `/publish/queryCommonUserPublishsList?startDate=${this.sTime}&endDate=${this.eTime}&phoneNumber=${this.userphone}&auditStatus=${i}&pageNum=${this.userPageNum}&pageSize=${this.userPageSize}`
        )
        .then(res => {
          // console.log(res);
          this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
          this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
          this.ReleaseLevel = res.data.data;
          this.checkedNames1 =
          res.data.data.oneLevelPublishCount +
          res.data.data.secondLevelPublishCount +
          res.data.data.threeLevelPublishCount +
          res.data.data.fourLevelPublishCount +
          res.data.data.fiveLevelPublishCount +
          res.data.data.sixLevelPublishCount +
          res.data.data.sevenLevelPublishCount +
          res.data.data.eightLevelPublishCount;
          this.spinShow = false;
        });
    },
    //改变用户发布质量每页数据条数
    userChangePagesize(value) {
      this.checkedFalse();      
      this.userPageSize = value;
      // console.log(value);
      if (this.audit == 'entire') {
        this.userToLoad('');
      }else if (this.audit == 'HasBeenOn') {
        this.userToLoad(1);
      }else if (this.audit == 'NotCareful') {
        this.userToLoad(0);
      }
    },
    //审核全部
    entire() {
      this.userPageNum = 1;
      this.userPageSize = 10;
      this.userToLoad('');
      this.checkedFalse();
      this.gradeNumberTrue = true;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.audit = "entire";
    },
    //已审核
    HasBeenOn() {
      this.checkedFalse();
      this.userPageNum = 1;
      this.userPageSize = 10;
      this.userToLoad(1);
      this.gradeNumberTrue = true;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.audit = "HasBeenOn";
    },
    //未审核
    NotCareful() {
      this.checkedFalse();
      this.userPageNum = 1;
      this.userPageSize = 10;
      this.userToLoad(0);
      this.gradeNumberTrue = true;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.audit = "NotCareful";
    },
    //选中操作
    auditOperation(i) {
      if (this.userIdAll.length == 0 || this.publishIdAll.length == 0) {
      } else {
        // console.log("审核id有值");
        if (this.audit == "HasBeenOn") {
          this.promptPopup("信息已审核,无需重新操作");
        } else if (this.audit == "NotCareful") {
          // console.log("未审NotCareful");
          switch (i) {
            //已审
            case "hasBeenOn": {
              // console.log("点击已审");
              var postData = `publishIds=${this.publishIdAll}`;
              Vue.axios({
                method: "post",
                url:
                  "/publish/updatePublishAuditStatus",
                data: postData,
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
                }
              }).then(res => {
                // console.log(res);
                if (res.data.status == "200") {
                  this.checkedFalse();
                  this.userToLoad(0);
                }
              });
              break;
            }
            //下架
            case "soldOut": {
              var postData = {
                publishStatus: "2",
                publishIds: this.publishIdAll
              };
              Vue.axios({
                method: "post",
                url:
                  "/publish/updateManyPublishStatusPC",
                data: postData,
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              })
                .then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.userToLoad(0);
                  }
                })
                .catch(err => {});
              break;
            }
            //禁止发布
            case "forbid": {
              var postData = `userId=${this.userIdAll}&publishIds=${this.publishIdAll}`;
              Vue.axios({
                method: "post",
                url: "/contentAudit/forbidPublish",
                data: postData,
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
                }
              })
                .then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.userToLoad(0);
                  }
                })
                .catch(err => {});
              break;
            }
            //拉黑
            case "blacklist": {
              var postData = {
                userIds: this.userIdAll,
                punishmentType: "2",
                publishIds: this.publishIdAll
              };
              Vue.axios({
                method: "post",
                url: "/user/punishmentManyMemberUser",
                data: postData,
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              })
                .then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.userToLoad(0);
                  }
                })
                .catch(err => {});
              break;
            }
            //删除
            case "delete": {
              // console.log("删除");
              var postData = `publishId=${this.publishIdAll}`;
              Vue.axios({
                method: "post",
                url: "/contentAudit/deletePublish",
                data: postData,
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
                }
              }).then(res => {
                // console.log(res,'13525114577');
                if (res.data.status == "200") {
                  this.checkedFalse();
                  this.userToLoad(0);
                }
              });
              break;
            }
          }
        }
      }
    },
    // 点击发布内容显示手机框内内容
    areaClick(id, i) {
      this.areasubordinateindex = i;
      this.contentId = id;
      this.iframetrue = false;
      this.iframesrc = `https://www.baiduyuyue.com/web/mobile.html?from=singlemessage#/?publish_id=${id}&yyb=yyb`;
      // console.log(this.iframesrc,this.iframetrue)
      Vue.axios
        .get(
          `https://www.baiduyuyue.com/management/publish/getPublishDetailsByPublishId?publishId=${id}`
        )
        .then(res => {
          // console.log(res.data.data.classifies);
          this.phoneClassify = res.data.data.classifies;
        });
    },
    // 改变用户当前页
    pagination(value) {
      // this.trIndex = -1;
      this.numberDelete();
      this.pageNum = value;
      Vue.axios
        .get(
          this.urls +
            `/user/queryPublishUsersList?startDate=${this.sTime}&endDate=${this.eTime}&pageNum=${value}&pageSize=10`
        )
        .then(res => {
          this.userTotal = res.data.data.total;
          this.userAll = res.data.data.list;
        });
    },
    //用户发表内容
    userTr(phone, i) {
      this.checkedFalse();
      this.userPageNum = 1;
      this.userPageSize = 10;
      this.trIndex = i;
      this.userphone = phone;
      this.audit = "NotCareful";
      this.gradeNumberTrue = true;
      this.checkedNames = [];
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].disabled = false;
      }
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.userToLoad(0);
    },
    //回到用户发布页面
    // areaSpan() {
    //   // this.$router.go(0)
    //   this.reload();
    // }
  }
};
</script>
<style scoped>
.headFoodRightHeadHead {
  margin: 20px 0 20px 30px;
  font-size: 16px;
  display: flex;
}
.headFoodRightHeadHead > div {
  cursor: pointer;
}
.headFoodRightHeadHead > div:nth-child(2) {
  margin: 0 60px;
}
.headFoodRightHeadCenter {
  margin-left: 30px;
  position: relative;
}
.headFoodRightHeadCenter div {
  width: 26px;
  height: 4px;
  background-color: #379ee9;
}
.headFoodRightHeadCenter > div:nth-child(1) {
  position: absolute;
  left: 0px;
  top: -1px;
}
.headFoodRightHeadCenter > div:nth-child(2) {
  position: absolute;
  left: 95px;
  top: -1px;
}
.headFoodRightHeadCenter > div:nth-child(3) {
  position: absolute;
  left: 187px;
  top: -1px;
}
/* 表格内选框 */
tr input[type="checkbox"] {
  width: 18px;
  height: 18px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 18px;
  position: relative;
}
tr input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}
tr input[type="checkbox"]:checked::before {
  content: "\2713";
  background-color: #5fb878;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 2px;
}

.page {
  margin: 7px 0;
  text-align: center;
}
#userAll {
  width: 100%;
  height: 100%;
}

.headFood {
  display: flex;
  margin-top: 30px;
}
.rightTime {
  margin-left: 30px;
}
.rightTime span {
  font-size: 16px;
}
.headCentre {
  height: 80px;
  background-color: #ffffff;
  line-height: 80px;
  border-radius: 4px;
}
.headFoodLeft {
  min-width: 350px;
  width: 30%;
  height: 660px;
  background-color: #ffffff;
  border-radius: 4px;
}
.headFoodLeftHead {
  padding-left: 30px;
  height: 65px;
  line-height: 65px;
  border-bottom: 1px solid #eeeeee;
  font-size: 16px;
}
.headFoodLeftInput {
  margin: 0 20px;
  /* width: 190px; */
  width: 40%;
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
.headFoodLeftCenter {
  width: 26px;
  height: 4px;
  background-color: #379ee9;
  margin-left: 30px;
  margin-top: -2px;
}
.headFoodLeftFood {
  margin: 25px 30px 20px;
  border: 1px solid #e6e6e6;
}
table {
  width: 100.1%;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-collapse: collapse;
  color: #666666;
}
.headFoodLeftTable{
  width: 100.1%;
}
.headFoodLeftTable tr th,
.headFoodLeftTable tr td {
  border: 1px solid #e6e6e6;
}
.headFoodLeftTable tr th {
  background-color: #f4faff;
  border-left: 0px solid #e6e6e6;
  border-top: 0px solid #e6e6e6;
}
.headFoodLeftTable tr th:nth-child(3),.headFoodLeftTable tr td:nth-child(3) {
  border-right: 0px solid #e6e6e6;
}
.headFoodLeftTable tr td:nth-child(1) {
  border-left: 0px solid #e6e6e6;
}
.headFoodLeftTableTr:hover {
  background-color: #f4faff;
}
table tr th,table tr td {
  border: 1px solid #e6e6e6;
}
table tr th {
  background-color: #f4faff;
  border-left: 0px solid #e6e6e6;
  border-top: 0px solid #e6e6e6;
}
table tr th:last-child, table tr td:last-child {
  border-right: 0px solid #e6e6e6;
}
table tr td:nth-child(1) {
  border-left: 0px solid #e6e6e6;
}
table tr:hover {
  background-color: #bfe2ff;
}
.headFoodRight {
  margin-left: 30px;
  border-radius: 4px;
  min-width: 1120px;
  width: 69%;
  /* height: 800px; */
  background-color: #ffffff;
  position: relative;
}
.headFoodRightHead {
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  margin-bottom: 62px;
  align-items: center;
  width: 93%;
  height: 118px;
}
.headFoodRightFood {
  width: 100%;
  display: flex;
}
.headFoodRightFoodTitle {
  width: 100%;
  height: 97px;
  border-bottom: 1px solid #e6e6e6;
  background-color: #f4faff;
}
.headFoodRightFoodTitle > div:nth-child(1) {
  border-bottom: 1px solid #e6e6e6;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  font-size: 16px;
  color: #333333;
}
.headFoodRightFoodTitle > div:nth-child(2) {
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  padding-left: 16px;
}
.headFoodRightFoodTitle > div:nth-child(2) button {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 2px;
  background-color: #379ee9;
  cursor: pointer;
  color: #ffffff;
  font-size: 12px;
}
/* .headFoodLeftTable1 {
  width: 100%;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-collapse: collapse;
  color: #666666;
} */
.headFoodRightFoodDiv {
  margin-left: 30px;
  width: 270px;
  height: 600px;
}
.headFoodRightFoodPhone {
  /* margin-left: 20px; */
  /* width: 270px; */
  width: 100%;
  height: 552px;
  background: url(https://images.baiduyuyue.com/background-手机模型.png)
    no-repeat;
  position: relative;
}
.headFoodRightFoodDivImg {
  position: absolute;
  top: 30%;
  left: 11%;
}
iframe {
  position: absolute;
  top: 54px;
  left: 10px;
  width: 248px;
  height: 436px;
}
.headFoodRightFoodDivFood {
  padding: 20px 30px 0;
  text-align: center;
  font-size: 16px;
}
.headFoodRightFoodDivFoodSpan {
  color: #379ee9;
  margin-right: 5px;
}
/* 多选框样式 */

#one + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #ffffff;
  border-radius: 50%;
}
.headFoodRightHeadDivdiv > input[type="checkbox"] {
  visibility: hidden;
}
#one:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #379ee9;
  border-radius: 50%;
}
#two + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#two:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #379ee9;
  border-radius: 50%;
}
#three + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#three:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #379ee9;
  border-radius: 50%;
}
#four + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#four:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #379ee9;
  border-radius: 50%;
}
#five + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#five:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #379ee9;
  border-radius: 50%;
}
#six + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#six:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #379ee9;
  border-radius: 50%;
}
#seven + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#seven:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #399ae7;
  border-radius: 50%;
}
#eight + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#eight:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #399ae7;
  border-radius: 50%;
}

.headFoodRightP {
  width: 75%;
  height: 1px;
  position: absolute;
  border-top: 1px solid #ebebeb;
  top: 122px;
  margin: 0 55px 0 30px;
}
.headFoodRightHeadDiv1 {
  font-size: 16px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 4px solid #379ee9;
  background-color: #dbf0ff;
  color: #379ee9;
  margin-top: 30px;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.headFoodRightHeadDiv1 span:nth-child(1) {
  font-size: 13px;
}
.headFoodRightHeadDiv1 span:nth-child(2) {
  font-size: 22px;
}
.headFoodRightHeadDiv {
  /* position: relative; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 35px;
  width: 63px;
  height: 100px;
  font-size: 16px;
}
.headFoodRightHeadDiv span + span {
  color: #6cb9ef;
}
.headFoodRightHeadDivdiv {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #379ee9;
  background-color: #ffffff;
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