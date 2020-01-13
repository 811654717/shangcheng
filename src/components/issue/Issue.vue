<!--  -->
<template>
  <div id="All">
    <div class="head">
      <span>内容审核系统 ></span>
      <!-- <span>{{this.$route.params.title}} > </span> -->
      <!-- @click="areaSpan" -->
      <span v-if="allUsertrue" class="headSpan">用户</span>
      <div style="display:inline-block" v-if="!allUsertrue">
        <span v-if="headSpan" class="headSpan">区域经理</span>
        <span v-if="!headSpan" @click="areaSpan" class="headSpan2">区域经理</span>
        <span v-if="!headSpan">></span>
        <span v-if="!headSpan" class="headSpan">{{areaPhone}}团队详情</span>
      </div>
    </div>
    <div class="headHead">
      <!-- v-if="headSpan" -->
      <div class="headCentre">
        <div class="rightTime">
          <span>日期选择</span>
          <div class="layui-inline" style="margin-left:20px">
            <input type="text" class="layui-input" id="strDate" />
          </div>
          <span style="margin: 0 10px">~</span>
          <div class="layui-inline">
            <input type="text" class="layui-input" id="endDate" />
          </div>
          <button
            @click="inquire()"
            class="layui-btn"
            style="margin-left:30px;background-color:#379EE9"
          >搜索</button>
        </div>
      </div>
      <div class="headFood" v-if="!allUsertrue">
        <div v-if="headSpan" class="headFoodLeft">
          <div class="headFoodLeftHead">
            <span @click="allUser" style="cursor:pointer">用户</span>
            <span style="color:#379e
            e9;margin-left:50px">区域经理</span>
          </div>
          <div class="headFoodLeftCenter"></div>
          <div style="display:flex;margin: 15px 0 0 10px">
            <input class="headFoodLeftInput" type="text" placeholder="请输入手机号码" v-model="areaInput" />
            <button
              @click="search()"
              class="layui-btn"
              style="background-color:#379EE9;font-size:14px"
            >搜索</button>
          </div>
          <div class="headFoodLeftFood">
            <table class="headFoodLeftTable">
              <tr>
                <th>手机号码</th>
                <th>呢称</th>
                <th>操作</th>
              </tr>
              <tr
                v-for="(item, index) in areaAll"
                :key="index"
                :style="{backgroundColor: (trIndex == index ? '#B9DEF8' : '')}"
              >
                <td
                  @click="TableTr(item.promoteAreaId,index,item.userPhonenum)"
                >{{item.userPhonenum}}</td>
                <td @click="TableTr(item.promoteAreaId,index,item.userPhonenum)">{{item.userName}}</td>
                <td
                  style="color:#379ee9;cursor:pointer"
                  @click="areaParticulars(item.promoteAreaId,item.userPhonenum)"
                >详情</td>
              </tr>
            </table>
            <div v-if="this.total == 0" style="text-align:center;font-size:16px">暂无数据</div>
            <Page class="page" :total="total" :current="pageNum" @on-change="pagination" />
          </div>
        </div>
        <div v-if="!headSpan" class="headFoodLeft">
          <div class="headFoodLeftHead">
            <span style="color:#379e
            e9;font-size:16px">{{areaPhone}}团队详情</span>
            <input class="headFoodLeftInput" type="text" placeholder="请输入手机号码" v-model="teamInput" />
            <button
              @click="searchTeam()"
              class="layui-btn"
              style="background-color:#379EE9;font-size:14px"
            >搜索</button>
          </div>
          <div class="headFoodLeftCenter"></div>
          <div class="headFoodLeftFood">
            <table class="headFoodLeftTable">
              <tr>
                <th>手机号码</th>
                <th>呢称</th>
              </tr>
              <tr
                @click="TableTr1(index,item.userPhonenum)"
                v-for="(item, index) in teamall"
                :key="index"
                :style="{backgroundColor: (trIndex1 == index ? '#B9DEF8' : '')}"
              >
                <td>{{item.userPhonenum}}</td>
                <td>{{item.userName}}</td>
              </tr>
            </table>
            <div v-if="this.teamTotal == 0" style="text-align:center;font-size:16px">暂无数据</div>
            <Page
              class="page"
              :total="teamTotal"
              :current="pageNumTeam"
              @on-change="paginationTeam"
            />
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
          <div v-if="headSpan" class="headFoodRightHead" ref="label">
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input type="checkbox" class="labelinput" id="one" value="1" v-model="checkedNames" />
                <label for="one"></label>
              </div>
              <span>一级</span>

              <span>( {{(gradeNumber.oneLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.oneLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input type="checkbox" class="labelinput" id="two" value="2" v-model="checkedNames" />
                <label for="two"></label>
              </div>
              <span>二级</span>

              <span>( {{(gradeNumber.secondLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.secondLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinput"
                  id="three"
                  value="3"
                  v-model="checkedNames"
                />
                <label for="three"></label>
              </div>
              <span>三级</span>

              <span>( {{(gradeNumber.threeLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.threeLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinput"
                  id="four"
                  value="4"
                  v-model="checkedNames"
                />
                <label for="four"></label>
              </div>
              <span>四级</span>

              <span>( {{(gradeNumber.fourLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.fourLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinput"
                  id="five"
                  value="5"
                  v-model="checkedNames"
                />
                <label for="five"></label>
              </div>
              <span>五级</span>

              <span>( {{(gradeNumber.fiveLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.fiveLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input type="checkbox" class="labelinput" id="six" value="6" v-model="checkedNames" />
                <label for="six"></label>
              </div>
              <span>六级</span>

              <span>( {{(gradeNumber.sixLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.sixLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinput"
                  id="seven"
                  value="7"
                  v-model="checkedNames"
                />
                <label for="seven"></label>
              </div>
              <span>七级</span>

              <span>( {{(gradeNumber.sevenLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.sevenLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinput"
                  id="eight"
                  value="8"
                  v-model="checkedNames"
                />
                <label for="eight"></label>
              </div>
              <span>八级</span>

              <span>( {{(gradeNumber.eightLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.eightLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv1">
              <span>{{this.gradeNumberTrue ? '全部人数' : '选中人数'}}</span>
              <span>{{this.checkedNames1}}</span>
            </div>
          </div>
          <div v-show="!headSpan" class="headFoodRightHead" ref="label1">
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="one"
                  value="1"
                  v-model="checkedNamesF"
                />
                <label for="one"></label>
              </div>
              <span>一级</span>

              <span>( {{(gradeNumber.oneLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.oneLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="two"
                  value="2"
                  v-model="checkedNamesF"
                />
                <label for="two"></label>
              </div>
              <span>二级</span>

              <span>( {{(gradeNumber.secondLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.secondLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="three"
                  value="3"
                  v-model="checkedNamesF"
                />
                <label for="three"></label>
              </div>
              <span>三级</span>

              <span>( {{(gradeNumber.threeLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.threeLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="four"
                  value="4"
                  v-model="checkedNamesF"
                />
                <label for="four"></label>
              </div>
              <span>四级</span>

              <span>( {{(gradeNumber.fourLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.fourLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="five"
                  value="5"
                  v-model="checkedNamesF"
                />
                <label for="five"></label>
              </div>
              <span>五级</span>

              <span>( {{(gradeNumber.fiveLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.fiveLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="six"
                  value="6"
                  v-model="checkedNamesF"
                />
                <label for="six"></label>
              </div>
              <span>六级</span>
              <span>( {{(gradeNumber.sixLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.sixLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="seven"
                  value="7"
                  v-model="checkedNamesF"
                />
                <label for="seven"></label>
              </div>
              <span>七级</span>
              <span>( {{(gradeNumber.sevenLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.sevenLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv">
              <div class="headFoodRightHeadDivdiv">
                <input
                  type="checkbox"
                  class="labelinputinput"
                  id="eight"
                  value="8"
                  v-model="checkedNamesF"
                />
                <label for="eight"></label>
              </div>
              <span>八级</span>
              <span>( {{(gradeNumber.eightLevelPublishUsersCount == '' || this.gradeNumber.length == 0) ? 0 : gradeNumber.eightLevelPublishUsersCount}}人 )</span>
            </div>
            <div class="headFoodRightHeadDiv1">
              <span>{{this.gradeNumber2True ? '全部人数' : '选中人数'}}</span>
              <span>{{this.checkedNames2}}</span>
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
                  <button
                    @click="auditOperation('forbid')"
                    class="layui-btn"
                    style="width:84px"
                  >禁止发布</button>
                  <button @click="auditOperation('blacklist')" class="layui-btn">拉黑</button>
                  <button
                    @click="auditOperation('delete')"
                    class="layui-btn"
                    style="background-color:#ff5722;"
                  >删除</button>
                </div>
              </div>
              <table class="headFoodLeftTable" style="table-layout:fixed;">
                <tr>
                  <th style="width:50px">
                    <input type="checkbox" id="trTh" @click="allElection()" />
                  </th>
                  <th style="width:110px">发布人手机号码</th>
                  <th style="width:110px">邀请人昵称</th>
                  <th>标题</th>
                  <th style="width:145px">发布时间</th>
                  <th style="width:34px">等级</th>
                  <th style="width:32px">分数</th>
                  <th style="width:65px">审核状态</th>
                  <!-- <th style="width:18px"></th> -->
                </tr>
              </table>
              <div class="overflew">
                <table class="headFoodLeftTable1" style="table-layout:fiexd;">
                  <tbody>
                    <tr
                      v-for="(item,index) in areasubordinateall"
                      :key="index"
                      :style="{backgroundColor: (areasubordinateindex == index ? '#B9DEF8' : '')}"
                    >
                      <td style="width:50px">
                        <input type="checkbox" class="trTd" @click="publishedIfnClick(index)" />
                        <!-- <label for="trTd"></label> -->
                      </td>
                      <td
                        @click="areaClick(item.publishId,index)"
                        style="width:110px"
                      >{{item.publishUserPhoneNumber}}</td>
                      <td
                        @click="areaClick(item.publishId,index)"
                        style="width:110px"
                      >{{item.recommendPublishUserName}}</td>
                      <td @click="areaClick(item.publishId,index)">
                        <!-- <p
                          style="width: 200px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;margin:auto;"
                        >{{item.publishName}}</p>-->
                        {{item.publishName}}
                      </td>

                      <td
                        @click="areaClick(item.publishId,index)"
                        style="width:145px"
                      >{{item.addTime}}</td>
                      <td
                        @click="areaClick(item.publishId,index)"
                        style="width:34px"
                      >{{item.levelTitle}}</td>
                      <td
                        @click="areaClick(item.publishId,index)"
                        style="width:32px"
                      >{{item.recommendScore}}</td>
                      <td
                        v-if="audit == 'entire'"
                        @click="areaClick(item.publishId,index)"
                        style="width:65px"
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
                      </td>
                      <td
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
                      </td>
                      <td
                        v-if="audit == 'NotCareful'"
                        @click="areaClick(item.publishId,index)"
                        style="width:100px"
                      >
                        <span v-if="item.auditStatus == 0">未审核</span>
                        <span v-if="item.auditStatus == 1">已审核</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                v-if="this.areasubordinatetotal1 == 0 && this.areasubordinatetotal == 0"
                style="text-align:center;font-size:16px"
              >暂无数据</div>
              <Page
                v-if="headSpan"
                class="page"
                :total="areasubordinatetotal"
                :current="areasubordinatepagenum"
                @on-change="paginationareasubordinate"
                :page-size-opts="[10,20,30]"
                show-elevator
                show-sizer
                show-total
                :page-size="pagesizeArea"
                @on-page-size-change="handlePageSize"
              />
              <Page
                v-if="!headSpan"
                class="page"
                :total="areasubordinatetotal1"
                :current="areasubordinatepagenum1"
                @on-change="paginationareasubordinate1"
                :page-size-opts="[10,20,30]"
                show-elevator
                show-sizer
                show-total
                :page-size="pagesize"
                @on-page-size-change="handlePageSize1"
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
                <li
                  style="display:inline-block;"
                  v-for="(item,index) in phoneClassify"
                  :key="index"
                >
                  <span class="headFoodRightFoodDivFoodSpan">{{item.classifyName}}</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <userIssue ref="user" v-show="allUsertrue" @success="success"></userIssue>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import userIssue from "../issue/userIssue";
export default {
  inject: ["reload"],
  components: { userIssue },
  data() {
    return {
      total: 0, // 区域经理数据总条数
      pageNum: 1, // 区域经理当前页数
      pagesize: 10, //区域经理详情下级每页显示条数
      pagesizeArea: 10, //区域经理下级每页显示条数
      areaInput: "", //区域经理手机号
      areaAll: "", //区域经理数据
      areaid: "", //区域经理id
      trIndex: 0, //点击某一区域经理
      headSpan: true, //
      areaPhone: "", //点击的区域经理手机号
      teamInput: "", //团队详情手机号
      teamTotal: 0, //团队数据总条数
      pageNumTeam: 1, //团队数据当前页数
      teamall: "", //团队详情数据
      areasubordinate: "", //默认选中的区域经理id
      regionalManagerPhone: "", //区域经理手机号
      areasubordinatetotal: 0, //区域经理下级数据总条数
      areasubordinatetotal1: 0, //区域经理详情下级数据总条数
      areasubordinatepagenum: 1, //区域经理下级当前页
      areasubordinatepagenum1: 1, //区域经理详情下级当前页
      areasubordinateall: "", //区域经理下级数据
      contentId: "", //手机框内显示内容的id
      areasubordinateindex: -1,
      iframesrc: "",
      trIndex1: -1, // 点击团队某一人
      checkedNames: [], //多选框
      checkedNamesSting: "",
      checkedNamesF: [],
      checkedNamesFSting: "",
      gradeNumber: [], //等级人数数组
      areasubordinatephone: "",
      checkedNames1: 0, //多选框总人数
      checkedNames2: 0,
      iframetrue: true,
      phoneClassify: [], //分类详情
      gradeNumberTrue: true,
      gradeNumber2True: true,
      spinShow: false, //懒加载

      election: [], //存储选中的下标
      userIdAll: [], //存储全部的userId
      publishIdAll: [], //存储全部的publishId
      audit: "NotCareful",
      // urls: "http://192.168.0.189:8080", //测试ip
      urls: "https://www.baiduyuyue.com/management", //线上网址

      allUsertrue: true //显示用户
    };
  },
  metaInfo: {
    title: "内容审核系统",
    titleTemplate: "%s - 区域经理",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },

  computed: {},

  watch: {
    iframesrc: function() {
      setTimeout(() => {
        this.iframetrue = true;
      }, 300);
    },
    // deep: true,
    checkedNames: function() {
      console.log(12);
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
      console.log(one, two, three, four, five, six, seven, eight);
      if (one == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.oneLevelPublishUsersCount;
      }
      if (two == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.secondLevelPublishUsersCount;
      }
      if (three == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.threeLevelPublishUsersCount;
      }
      if (four == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.fourLevelPublishUsersCount;
      }
      if (five == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.fiveLevelPublishUsersCount;
      }
      if (six == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.sixLevelPublishUsersCount;
      }
      if (seven == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.sevenLevelPublishUsersCount;
      }
      if (eight == true) {
        this.gradeNumberTrue = false;
        inputAll = inputAll + this.gradeNumber.eightLevelPublishUsersCount;
      }

      this.checkedNames1 = inputAll;
      console.log(this.checkedNames1, inputAll);

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
          this.gradeNumber.oneLevelPublishUsersCount +
          this.gradeNumber.secondLevelPublishUsersCount +
          this.gradeNumber.threeLevelPublishUsersCount +
          this.gradeNumber.fourLevelPublishUsersCount +
          this.gradeNumber.fiveLevelPublishUsersCount +
          this.gradeNumber.sixLevelPublishUsersCount +
          this.gradeNumber.sevenLevelPublishUsersCount +
          this.gradeNumber.eightLevelPublishUsersCount;
        console.log(this.checkedNames1, this.gradeNumberTrue);
      }

      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.checkedNamesSting = this.checkedNames.toString();
      console.log(this.checkedNamesSting);
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      this.spinShow = true;
      if (this.audit == "entire") {
        Vue.axios
          .get(
            `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=&recommendLevelList=${this.checkedNamesSting}`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "全部");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.areasubordinatepagenum = 1;
            this.spinShow = false;
          });
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=1&recommendLevelList=${this.checkedNamesSting}`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "已审");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.areasubordinatepagenum = 1;
            this.spinShow = false;
          });
      } else if (this.audit == "NotCareful") {
        Vue.axios
          .get(
            `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=0&recommendLevelList=${this.checkedNamesSting}`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "未审");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.areasubordinatepagenum = 1;
            this.spinShow = false;
          });
      }
    },
    checkedNamesF: function() {
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
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.oneLevelPublishUsersCount;
      }
      if (two == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.secondLevelPublishUsersCount;
      }
      if (three == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.threeLevelPublishUsersCount;
      }
      if (four == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.fourLevelPublishUsersCount;
      }
      if (five == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.fiveLevelPublishUsersCount;
      }
      if (six == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.sixLevelPublishUsersCount;
      }
      if (seven == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.sevenLevelPublishUsersCount;
      }
      if (eight == true) {
        this.gradeNumber2True = false;
        inputAll = inputAll + this.gradeNumber.eightLevelPublishUsersCount;
      }
      this.checkedNames2 = inputAll;
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
        this.gradeNumber2True = true;
        this.checkedNames2 =
          this.gradeNumber.oneLevelPublishUsersCount +
          this.gradeNumber.secondLevelPublishUsersCount +
          this.gradeNumber.threeLevelPublishUsersCount +
          this.gradeNumber.fourLevelPublishUsersCount +
          this.gradeNumber.fiveLevelPublishUsersCount +
          this.gradeNumber.sixLevelPublishUsersCount +
          this.gradeNumber.sevenLevelPublishUsersCount +
          this.gradeNumber.eightLevelPublishUsersCount;
      }

      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      // console.log(this.checkedNamesF,this.checkedNamesF.toString());
      this.checkedNamesFSting = this.checkedNamesF.toString();
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      // console.log(strdate, enddate);
      this.spinShow = true;
      if (this.audit == "entire") {
        Vue.axios
          .get(
            `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=`
          )
          .then(res => {
            this.areasubordinatepagenum1 = 1;
            // console.log(res, "第二个多选框全部");
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
          });
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=1`
          )
          .then(res => {
            this.areasubordinatepagenum1 = 1;
            // console.log(res, "第二个多选框已审");
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
          });
      } else if (this.audit == "NotCareful") {
        Vue.axios
          .get(
            `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=0`
          )
          .then(res => {
            this.areasubordinatepagenum1 = 1;
            // console.log(res, "第二个多选框未审");
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
          });
      }
    }
  },

  mounted() {
    timeInterval("#strDate", "#endDate");
    //提示弹窗
    function promptPopup(txt) {
      layui.use("layer", function() {
        var layer = layui.layer;
        layer.msg(txt);
      });
    }

    //处理时间格式
    Date.prototype.toLocaleString = function() {
      var moth = this.getMonth() + 1;
      var data = this.getDate();
      if (moth < 10) {
        moth = "0" + moth;
      }
      if (data < 10) {
        data = "0" + data;
      }
      return this.getFullYear() + "-" + moth + "-" + data;
    };

    //处理选择日期
    function doneTime(date) {
      return {
        year: date.year,
        month: date.month - 1,
        date: date.date
      };
    }

    //处理当天日期
    function nowTime(date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate()
      };
    }

    //输入框时间处理
    function iptTime(date) {
      return {
        year: date.substring(0, 4) - 0,
        month: date.substring(5, 7) - 1,
        date: date.substring(8, 10) - 0
      };
    }
    function timeInterval(strDateId, endDateId) {
      layui.use("laydate", function() {
        //开始时间
        var strDate = layui.laydate;
        var start = strDate.render({
          elem: strDateId, //指定元素
          btns: ["now", "confirm"],
          max: "new Date()",
          value: new Date(),
          ready: function() {
            end.config.min = iptTime("1990-01-01");
            start.config.max = nowTime(new Date());
          },
          done: function(value, date) {
            end.config.min = doneTime(date);
            //判断时间大小
            var startDate = new Date(value).getTime();
            var endTime = new Date($(endDateId).val()).getTime();
            if (endTime < startDate) {
              promptPopup("开始时间不能大于结束时间");
              start.config.max = nowTime(new Date());
              end.config.min = nowTime(new Date());
              $(strDateId).val(new Date().toLocaleString());
              $(endDateId).val(new Date().toLocaleString());
            }
          }
        });
        //结束时间
        var endDate = layui.laydate;
        var end = endDate.render({
          elem: endDateId, //指定元素
          btns: ["now", "confirm"],
          value: new Date(),
          max: "new Date()",
          ready: function() {
            end.config.min = iptTime("1990-01-01");
            start.config.max = nowTime(new Date());
          },
          done: function(value, date) {
            start.config.max = doneTime(date);

            //判断时间大小
            var startDate = new Date($(strDateId).val()).getTime();
            var endTime = new Date($(endDateId).val()).getTime();
            var nowDate = new Date().getTime();
            if (endTime < startDate) {
              promptPopup("结束时间不能小于开始时间");
              $(strDateId).val(new Date().toLocaleString());
              $(endDateId).val(new Date().toLocaleString());
              start.config.max = nowTime(new Date());
              end.config.min = nowTime(new Date());
            }
            if (endTime > nowDate) {
              promptPopup("时间最大值不能大于当天的值");
              $(strDateId).val(new Date().toLocaleString());
              $(endDateId).val(new Date().toLocaleString());
            }
          }
        });
      });
    }
    //区域经理数据
    Vue.axios
      .get(
        `/user/queryRegionalManagerMemberUserList?pageNum=${this.pageNum}&pageSize=${this.pagesizeArea}`
      )
      .then(res => {
        this.total = res.data.data.total;
        this.areaAll = res.data.data.list;
        this.areasubordinate = res.data.data.list[0].promoteAreaId;
        this.regionalManagerPhone = res.data.data.list[0].userPhonenum;
        // console.log(res, "一次");
        //默认加载的区域经理发布数据
        // const strdate = $("#strDate").val() + "+00:00:00";
        // const enddate = $("#endDate").val() + "+23:59:59";
        setTimeout(() => {
          Vue.axios
            .get(
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${$(
                "#strDate"
              ).val() + "+00:00:00"}&endDate=${$("#endDate").val() +
                "+23:59:59"}&areaId=${
                res.data.data.list[0].promoteAreaId
              }&recommendLevelList=${this.checkedNamesSting}&pageNum=${
                this.areasubordinatepagenum
              }&pageSize=${this.pagesizeArea}&phoneNumber=${
                res.data.data.list[0].userPhonenum
              }&auditStatus=0`
            )
            .then(ress => {
              // console.log(this.areasubordinate, "二次");
              this.gradeNumber = ress.data.data;
              this.checkedNames1 =
                ress.data.data.oneLevelPublishUsersCount +
                ress.data.data.secondLevelPublishUsersCount +
                ress.data.data.threeLevelPublishUsersCount +
                ress.data.data.fourLevelPublishUsersCount +
                ress.data.data.fiveLevelPublishUsersCount +
                ress.data.data.sixLevelPublishUsersCount +
                ress.data.data.sevenLevelPublishUsersCount +
                ress.data.data.eightLevelPublishUsersCount;
              // console.log(ress.data.data);
              this.areasubordinatetotal =
                ress.data.data.publishBeanPageInfo.total;
              this.areasubordinateall = ress.data.data.publishBeanPageInfo.list;
              // console.log(this.iframesrc, 200);
              // console.log(this.contentId);
              // console.log(res.data.data)
            });
        }, 300);
      });
  },

  methods: {
    //子组件调用父组件方法显示区域经理
    success(res) {
      this.allUsertrue = res;
    },
    //跳转用户
    allUser() {
      this.allUsertrue = true;
      // this.$router.push({name:'userIssue'});
    },
    //全选
    allElection() {
      // console.log("123");
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
    // 点击发布内容显示手机框内内容
    areaClick(id, i) {
      this.areasubordinateindex = i;
      this.contentId = id;
      this.iframetrue = false;
      this.iframesrc = `https://www.baiduyuyue.com/web/mobile.html?from=singlemessage#/?publish_id=${id}&yyb=yyb`;
      // console.log(this.iframesrc,this.iframetrue)
      Vue.axios
        .get(
          `/publish/getPublishDetailsByPublishId?publishId=${id}`
        )
        .then(res => {
          // console.log(res.data.data.classifies);
          this.phoneClassify = res.data.data.classifies;
        });
    },
    // 区域经理请求点击页码数据
    pagination(value) {
      // console.log(value, "请求点击页码数据");
      this.trIndex = -1;
      this.pageNum = value;
      Vue.axios
        .get(
          this.urls +
            `/user/queryRegionalManagerMemberUserList?pageNum=${value}&pageSize=${this.pagesizeArea}`
        )
        .then(res => {
          this.total = res.data.data.total;
          this.areaAll = res.data.data.list;
        });
    },
    // 团队点击页码请求数据
    paginationTeam(value) {
      (this.trIndex1 = -1), (this.pageNumTeam = value);
      Vue.axios
        .get(
          this.urls +
            `/user/queryRecommendTeamList?areaId=${this.areaid}&pageNum=${value}&pageSize=10`
        )
        .then(res => {
          // console.log(res);
          this.teamTotal = res.data.data.total;
          this.teamall = res.data.data.list;
        });
    },
    //区域经理下级点击页码请求数据
    paginationareasubordinate(value) {
      // console.log(value, "区域经理下级点击页码请求数据");
      this.checkedFalse();
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.areasubordinatepagenum = value;
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      // console.log(strdate,enddate)
      this.spinShow = true;

      if (this.audit == "entire") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&pageNum=${value}&pageSize=${this.pagesizeArea}&recommendLevelList=${this.checkedNamesSting}&auditStatus=`
          )
          .then(res => {
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&pageNum=${value}&pageSize=${this.pagesizeArea}&recommendLevelList=${this.checkedNamesSting}&auditStatus=1`
          )
          .then(res => {
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else if (this.audit == "NotCareful") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&pageNum=${value}&pageSize=${this.pagesizeArea}&recommendLevelList=${this.checkedNamesSting}&auditStatus=0`
          )
          .then(res => {
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      }
    },
    //区域经理下级点击每页条数请求数据
    handlePageSize(value) {
      this.checkedFalse();
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.pagesizeArea = value;
      // console.log(value, "区域经理下级点击每页条数请求数据");
      this.spinShow = true;
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      if (this.audit == "entire") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&pageNum=${this.areasubordinatepagenum}&pageSize=${value}&recommendLevelList=${this.checkedNamesSting}&auditStatus=`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo, "点击加载全部内容");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&pageNum=${this.areasubordinatepagenum}&pageSize=${value}&recommendLevelList=${this.checkedNamesSting}&auditStatus=1`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo, "点击加载已审内容");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else if (this.audit == "NotCareful") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&pageNum=${this.areasubordinatepagenum}&pageSize=${value}&recommendLevelList=${this.checkedNamesSting}&auditStatus=0`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo, "点击加载未审内容");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      }
    },
    //区域经理详情下级点击页码请求数据
    paginationareasubordinate1(value) {
      this.checkedFalse();
      // console.log(value, "区域经理详情下级点击页码请求数据");
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.areasubordinatepagenum1 = value;
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      this.spinShow = true;
      if (this.audit == "entire") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${value}&pageSize=${this.pagesize}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=`
          )
          .then(res => {
            // console.log(res.data.data, "全部");
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
          });
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${value}&pageSize=${this.pagesize}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=1`
          )
          .then(res => {
            // console.log(res.data.data, "已审");
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
          });
      } else if (this.audit == "NotCareful") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${value}&pageSize=${this.pagesize}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=0`
          )
          .then(res => {
            // console.log(res.data.data, "未审");
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
          });
      }
    },
    //区域经理详情下级点击每页条数请求数据
    handlePageSize1(value) {
      this.checkedFalse();
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.pagesize = value;
      // console.log(value, "区域经理详情下级点击每页条数请求数据");
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      this.spinShow = true;
      if (this.audit == "entire") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${this.areasubordinatepagenum1}&pageSize=${value}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=`
          )
          .then(res => {
            // console.log(res.data.data,'全部');
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
          });
      } else if (this.audit == "HasBeenOn") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${this.areasubordinatepagenum1}&pageSize=${value}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=1`
          )
          .then(res => {
            // console.log(res.data.data,'已审');
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
          });
      } else if (this.audit == "NotCareful") {
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${this.areasubordinatepagenum1}&pageSize=${value}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=0`
          )
          .then(res => {
            // console.log(res.data.data,'未审');
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.spinShow = false;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
          });
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
    //统计时间查询
    inquire() {
      this.checkedFalse();
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      if (this.allUsertrue == true) {
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        this.$refs.user.search(strdate, enddate);
        // console.log("用户");
      } else {
        // console.log("区域");
        if (this.headSpan == true) {
          this.checkedNames = [];
          let checkLabel = this.$refs.label.getElementsByClassName(
            "labelinput"
          );
          for (let i = 0; i < checkLabel.length; i++) {
            checkLabel[i].checked = false;
          }
          this.spinShow = true;
          // console.log(this.headSpan);
          const strdate = $("#strDate").val() + "+00:00:00";
          const enddate = $("#endDate").val() + "+23:59:59";
          if (this.audit == "entire") {
            Vue.axios
              .get(
                this.urls +
                  `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&pageNum=1&pageSize=10&phoneNumber=${this.regionalManagerPhone}&auditStatus=`
              )
              .then(res => {
                // console.log(this.areasubordinate, "统计时间");
                // console.log(res);
                this.areasubordinatetotal =
                  res.data.data.publishBeanPageInfo.total;
                this.areasubordinateall =
                  res.data.data.publishBeanPageInfo.list;
                this.gradeNumber = res.data.data;
                this.checkedNames1 =
                  res.data.data.oneLevelPublishUsersCount +
                  res.data.data.secondLevelPublishUsersCount +
                  res.data.data.threeLevelPublishUsersCount +
                  res.data.data.fourLevelPublishUsersCount +
                  res.data.data.fiveLevelPublishUsersCount +
                  res.data.data.sixLevelPublishUsersCount +
                  res.data.data.sevenLevelPublishUsersCount +
                  res.data.data.eightLevelPublishUsersCount;
                this.spinShow = false;
              });
          } else if (this.audit == "HasBeenOn") {
            Vue.axios
              .get(
                this.urls +
                  `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&pageNum=1&pageSize=10&phoneNumber=${this.regionalManagerPhone}&auditStatus=1`
              )
              .then(res => {
                // console.log(this.areasubordinate, "统计时间");
                // console.log(res);
                this.areasubordinatetotal =
                  res.data.data.publishBeanPageInfo.total;
                this.areasubordinateall =
                  res.data.data.publishBeanPageInfo.list;
                this.gradeNumber = res.data.data;
                this.checkedNames1 =
                  res.data.data.oneLevelPublishUsersCount +
                  res.data.data.secondLevelPublishUsersCount +
                  res.data.data.threeLevelPublishUsersCount +
                  res.data.data.fourLevelPublishUsersCount +
                  res.data.data.fiveLevelPublishUsersCount +
                  res.data.data.sixLevelPublishUsersCount +
                  res.data.data.sevenLevelPublishUsersCount +
                  res.data.data.eightLevelPublishUsersCount;
                this.spinShow = false;
              });
          } else if (this.audit == "NotCareful") {
            Vue.axios
              .get(
                this.urls +
                  `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&pageNum=1&pageSize=10&phoneNumber=${this.regionalManagerPhone}&auditStatus=0`
              )
              .then(res => {
                // console.log(this.areasubordinate, "统计时间");
                // console.log(res);
                this.areasubordinatetotal =
                  res.data.data.publishBeanPageInfo.total;
                this.areasubordinateall =
                  res.data.data.publishBeanPageInfo.list;
                this.gradeNumber = res.data.data;
                this.checkedNames1 =
                  res.data.data.oneLevelPublishUsersCount +
                  res.data.data.secondLevelPublishUsersCount +
                  res.data.data.threeLevelPublishUsersCount +
                  res.data.data.fourLevelPublishUsersCount +
                  res.data.data.fiveLevelPublishUsersCount +
                  res.data.data.sixLevelPublishUsersCount +
                  res.data.data.sevenLevelPublishUsersCount +
                  res.data.data.eightLevelPublishUsersCount;
                this.spinShow = false;
              });
          }
        } else {
          // console.log(this.headSpan);
          this.areasubordinatepagenum1 = 1;
          this.pagesize = 10;
          this.checkedNamesF = [];
          let checkLabel = this.$refs.label1.getElementsByClassName(
            "labelinputinput"
          );
          for (let i = 0; i < checkLabel.length; i++) {
            checkLabel[i].checked = false;
          }
          this.spinShow = true;
          const strdate = $("#strDate").val() + "+00:00:00";
          const enddate = $("#endDate").val() + "+23:59:59";
          if (this.audit == "entire") {
            Vue.axios
              .get(
                this.urls +
                  `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&auditStatus=`
              )
              .then(res => {
                // console.log(res);
                this.areasubordinatetotal1 =
                  res.data.data.publishBeanPageInfo.total;
                this.areasubordinateall =
                  res.data.data.publishBeanPageInfo.list;
                this.gradeNumber = res.data.data;
                this.checkedNames2 =
                  res.data.data.oneLevelPublishUsersCount +
                  res.data.data.secondLevelPublishUsersCount +
                  res.data.data.threeLevelPublishUsersCount +
                  res.data.data.fourLevelPublishUsersCount +
                  res.data.data.fiveLevelPublishUsersCount +
                  res.data.data.sixLevelPublishUsersCount +
                  res.data.data.sevenLevelPublishUsersCount +
                  res.data.data.eightLevelPublishUsersCount;
                this.spinShow = false;
              });
          } else if (this.audit == "HasBeenOn") {
            Vue.axios
              .get(
                this.urls +
                  `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&auditStatus=1`
              )
              .then(res => {
                // console.log(res);
                this.areasubordinatetotal1 =
                  res.data.data.publishBeanPageInfo.total;
                this.areasubordinateall =
                  res.data.data.publishBeanPageInfo.list;
                this.gradeNumber = res.data.data;
                this.checkedNames2 =
                  res.data.data.oneLevelPublishUsersCount +
                  res.data.data.secondLevelPublishUsersCount +
                  res.data.data.threeLevelPublishUsersCount +
                  res.data.data.fourLevelPublishUsersCount +
                  res.data.data.fiveLevelPublishUsersCount +
                  res.data.data.sixLevelPublishUsersCount +
                  res.data.data.sevenLevelPublishUsersCount +
                  res.data.data.eightLevelPublishUsersCount;
                this.spinShow = false;
              });
          } else if (this.audit == "NotCareful") {
            Vue.axios
              .get(
                this.urls +
                  `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&auditStatus=0`
              )
              .then(res => {
                // console.log(res);
                this.areasubordinatetotal1 =
                  res.data.data.publishBeanPageInfo.total;
                this.areasubordinateall =
                  res.data.data.publishBeanPageInfo.list;
                this.gradeNumber = res.data.data;
                this.checkedNames2 =
                  res.data.data.oneLevelPublishUsersCount +
                  res.data.data.secondLevelPublishUsersCount +
                  res.data.data.threeLevelPublishUsersCount +
                  res.data.data.fourLevelPublishUsersCount +
                  res.data.data.fiveLevelPublishUsersCount +
                  res.data.data.sixLevelPublishUsersCount +
                  res.data.data.sevenLevelPublishUsersCount +
                  res.data.data.eightLevelPublishUsersCount;
                this.spinShow = false;
              });
          }
        }
      }
    },

    // 输入框手机号查询
    search() {
      this.checkedFalse();
      this.pagesizeArea = 10;
      this.areasubordinateall = "";
      this.trIndex = -1;
      this.areasubordinatetotal = 0;
      this.checkedNames1 = 0;
      this.gradeNumber = [];
      this.audit = "";
      // console.log(this.gradeNumber.eightLevelPublishUsersCount);
      // let zhengze = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]$/;
      // let zhengze = /^1(3[0-9]|4[579]|5[0-9]|66|7[0135678]|8[0-9]|9[89])$/;
      // if (zhengze.test(this.areaInput)) {
      //   // console.log(this.areaInput);
      // }
      if (this.areaInput == "") {
        Vue.axios
          .get(
            this.urls +
              `/user/queryRegionalManagerMemberUserList?pageNum=${this.pageNum}&pageSize=${this.pagesizeArea}`
          )
          .then(res => {
            this.total = res.data.data.total;
            this.areaAll = res.data.data.list;
          });
      } else {
        Vue.axios
          .get(
            this.urls +
              `/user/queryRegionalManagerMemberUserList?phoneNumber=${this.areaInput}&pageNum=${this.pageNum}&pageSize=${this.pagesizeArea}`
          )
          .then(res => {
            this.total = res.data.data.total;
            this.areaAll = res.data.data.list;
          });
      }
    },
    //团队详情匹配手机号
    searchTeam() {
      this.checkedFalse();
      this.areasubordinateall = "";
      this.trIndex1 = -1;
      this.areasubordinatetotal1 = 0;
      this.checkedNames2 = 0;
      this.gradeNumber = [];
      this.audit = "";
      if (this.teamInput == "") {
        Vue.axios
          .get(`/user/queryRecommendTeamList?areaId=${this.areaid}`)
          .then(res => {
            // console.log(res);
            // console.log(this.teamInput);
            this.teamTotal = res.data.data.total;
            this.teamall = res.data.data.list;
          });
      } else {
        Vue.axios
          .get(
            this.urls +
              `/user/queryRecommendTeamList?areaId=${this.areaid}&phoneNumber=${this.teamInput}`
          )
          .then(res => {
            // console.log(res);
            // console.log(this.teamInput);
            this.teamTotal = res.data.data.total;
            this.teamall = res.data.data.list;
          });
      }
    },
    //区域经理详情点击发布内容
    TableTr1(index, phone) {
      // console.log("加载点击详情发布内容");
      this.audit = "NotCareful";
      this.checkedFalse();
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      let checkLabel = this.$refs.label1.getElementsByClassName(
        "labelinputinput"
      );
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].disabled = false;
      }
      this.areasubordinatepagenum1 = 1;
      this.pagesize = 10;
      this.areasubordinatephone = phone;
      // console.log(phone);
      // this.areasubordinatephone = 15636583567;
      // console.log(index);
      this.trIndex1 = index;
      this.checkedNamesF = [];
      this.spinShow = true;
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      //点击的区域经理详情下级数据
      Vue.axios
        .get(
          this.urls +
            `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${phone}&auditStatus=0`
        )
        .then(res => {
          // console.log(res, "详情点击");
          this.areasubordinatetotal1 = res.data.data.publishBeanPageInfo.total;
          // console.log(res.data.data.publishBeanPageInfo.total,this.areasubordinatetotal)
          this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
          this.gradeNumber = res.data.data;
          this.checkedNames2 =
            res.data.data.oneLevelPublishUsersCount +
            res.data.data.secondLevelPublishUsersCount +
            res.data.data.threeLevelPublishUsersCount +
            res.data.data.fourLevelPublishUsersCount +
            res.data.data.fiveLevelPublishUsersCount +
            res.data.data.sixLevelPublishUsersCount +
            res.data.data.sevenLevelPublishUsersCount +
            res.data.data.eightLevelPublishUsersCount;
          this.spinShow = false;
        });
    },
    //区域经理点击加载发布内容
    TableTr(id, i, phone) {
      // console.log(this.audit);
      this.checkedFalse();
      this.audit = "NotCareful";
      this.areasubordinatepagenum = 1;
      this.pagesizeArea = 10;
      this.checkedNames = [];
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.regionalManagerPhone = phone;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.trIndex = i;
      this.areasubordinate = id;
      // this.areasubordinate = 230100;
      this.spinShow = true;
      // console.log(this.areasubordinate, "区域jingli点击");
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      Vue.axios
        .get(
          this.urls +
            `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=0`
        )
        .then(res => {
          // console.log(this.areasubordinate, "统计时间");
          // console.log(res.data.data.publishBeanPageInfo.list, "点击加载内容");
          this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;

          this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
          this.gradeNumber = res.data.data;
          this.checkedNames1 =
            res.data.data.oneLevelPublishUsersCount +
            res.data.data.secondLevelPublishUsersCount +
            res.data.data.threeLevelPublishUsersCount +
            res.data.data.fourLevelPublishUsersCount +
            res.data.data.fiveLevelPublishUsersCount +
            res.data.data.sixLevelPublishUsersCount +
            res.data.data.sevenLevelPublishUsersCount +
            res.data.data.eightLevelPublishUsersCount;
          this.spinShow = false;
        });
    },
    //区域经理详情
    areaParticulars(id, phone) {
      this.pageNumTeam = 1;
      this.audit = "";
      this.checkedFalse();
      // console.log("区域详情点击");
      // console.log(this.$refs.label1,this.$refs.label, "区域详情点击");
      // console.log("区域详情点击");
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      this.trIndex1 = -1;
      this.areasubordinatetotal1 = 0;
      this.headSpan = false;
      this.areaPhone = phone;
      this.areaid = id;
      this.areasubordinateall = "";
      this.areasubordinatetotal = 0;
      this.gradeNumber = [];
      this.checkedNames2 = 0;
      let checkLabel = this.$refs.label1.getElementsByClassName(
        "labelinputinput"
      );
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].disabled = true;
      }
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      Vue.axios
        .get(`/user/queryRecommendTeamList?areaId=${id}`)
        .then(res => {
          // console.log(res);
          this.teamTotal = res.data.data.total;
          this.teamall = res.data.data.list;
        });
    },
    //回到区域经理页面
    areaSpan() {
      this.checkedFalse();
      // this.reload();
      this.headSpan = true;
      this.spinShow = true;
      this.areasubordinateindex = -1;
      this.iframesrc = "";
      this.phoneClassify = [];
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      Vue.axios
        .get(
          this.urls +
            `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=0`
        )
        .then(res => {
          // console.log(this.areasubordinate, "统计时间");
          // console.log(res.data.data.publishBeanPageInfo.total, "点击加载内容");
          this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;

          this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
          this.gradeNumber = res.data.data;
          this.checkedNames1 =
            res.data.data.oneLevelPublishUsersCount +
            res.data.data.secondLevelPublishUsersCount +
            res.data.data.threeLevelPublishUsersCount +
            res.data.data.fourLevelPublishUsersCount +
            res.data.data.fiveLevelPublishUsersCount +
            res.data.data.sixLevelPublishUsersCount +
            res.data.data.sevenLevelPublishUsersCount +
            res.data.data.eightLevelPublishUsersCount;
          this.spinShow = false;
        })
        .catch(err => {
          // console.log(err);
        });
    },
    //审核操作弹窗
    promptPopup(txt) {
      layui.use("layer", function() {
        var layer = layui.layer;
        layer.msg(txt);
      });
    },
    //审核全部
    entire() {
      this.checkedFalse();
      this.gradeNumberTrue = true;
      this.phoneClassify = [];
      this.iframesrc = "";
      this.areasubordinateindex = -1;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.audit = "entire";
      if (this.headSpan) {
        this.areasubordinatepagenum = 1;
        this.pagesizeArea = 10;
        this.checkedNames = [];
        this.areasubordinateindex = -1;
        this.iframesrc = "";
        this.phoneClassify = [];
        let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
        for (let i = 0; i < checkLabel.length; i++) {
          checkLabel[i].checked = false;
        }
        this.spinShow = true;
        // console.log(this.areasubordinate, "区域jingli点击");
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "点击加载内容");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;

            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else {
        this.areasubordinateindex = -1;
        this.iframesrc = "";
        this.phoneClassify = [];
        let checkLabel = this.$refs.label1.getElementsByClassName(
          "labelinputinput"
        );
        for (let i = 0; i < checkLabel.length; i++) {
          checkLabel[i].disabled = false;
        }
        this.areasubordinatepagenum1 = 1;
        this.pagesize = 10;
        this.checkedNamesF = [];
        this.spinShow = true;
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        //点击的区域经理详情下级数据
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&auditStatus=`
          )
          .then(res => {
            // console.log(res, '详情点击');
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            // console.log(res.data.data.publishBeanPageInfo.total,this.areasubordinatetotal)
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      }
    },
    //已审核
    HasBeenOn() {
      this.checkedFalse();
      this.gradeNumberTrue = true;
      this.phoneClassify = [];
      this.iframesrc = "";
      this.areasubordinateindex = -1;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.audit = "HasBeenOn";
      if (this.headSpan) {
        this.areasubordinatepagenum = 1;
        this.pagesizeArea = 10;
        this.checkedNames = [];
        this.areasubordinateindex = -1;
        this.iframesrc = "";
        this.phoneClassify = [];
        // this.regionalManagerPhone = phone;
        let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
        for (let i = 0; i < checkLabel.length; i++) {
          checkLabel[i].checked = false;
        }
        this.spinShow = true;
        // console.log(this.areasubordinate, "区域jingli点击");
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=1`
          )
          .then(res => {
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else {
        this.areasubordinateindex = -1;
        this.iframesrc = "";
        this.phoneClassify = [];
        let checkLabel = this.$refs.label1.getElementsByClassName(
          "labelinputinput"
        );
        for (let i = 0; i < checkLabel.length; i++) {
          checkLabel[i].disabled = false;
        }
        this.areasubordinatepagenum1 = 1;
        this.pagesize = 10;
        this.checkedNamesF = [];
        this.spinShow = true;
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        //点击的区域经理详情下级数据
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&auditStatus=1`
          )
          .then(res => {
            // console.log(res, '详情点击');
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            // console.log(res.data.data.publishBeanPageInfo.total,this.areasubordinatetotal)
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      }
    },
    //未审核
    NotCareful() {
      this.checkedFalse();
      this.gradeNumberTrue = true;
      this.phoneClassify = [];
      this.iframesrc = "";
      this.areasubordinateindex = -1;
      let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
      for (let i = 0; i < checkLabel.length; i++) {
        checkLabel[i].checked = false;
      }
      this.audit = "NotCareful";
      if (this.headSpan) {
        this.areasubordinatepagenum = 1;
        this.pagesizeArea = 10;
        this.checkedNames = [];
        this.areasubordinateindex = -1;
        this.iframesrc = "";
        this.phoneClassify = [];
        let checkLabel = this.$refs.label.getElementsByClassName("labelinput");
        for (let i = 0; i < checkLabel.length; i++) {
          checkLabel[i].checked = false;
        }
        this.spinShow = true;
        // console.log(this.areasubordinate, "区域jingli点击");
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        Vue.axios
          .get(
            this.urls +
              `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=0`
          )
          .then(res => {
            // console.log(this.areasubordinate, "统计时间");
            // console.log(res.data.data.publishBeanPageInfo.list, "点击加载内容");
            this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames1 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      } else {
        this.areasubordinateindex = -1;
        this.iframesrc = "";
        this.phoneClassify = [];
        let checkLabel = this.$refs.label1.getElementsByClassName(
          "labelinputinput"
        );
        for (let i = 0; i < checkLabel.length; i++) {
          checkLabel[i].disabled = false;
        }
        this.areasubordinatepagenum1 = 1;
        this.pagesize = 10;
        this.checkedNamesF = [];
        this.spinShow = true;
        const strdate = $("#strDate").val() + "+00:00:00";
        const enddate = $("#endDate").val() + "+23:59:59";
        //点击的区域经理详情下级数据
        Vue.axios
          .get(
            this.urls +
              `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&auditStatus=0`
          )
          .then(res => {
            // console.log(res, '详情点击');
            this.areasubordinatetotal1 =
              res.data.data.publishBeanPageInfo.total;
            // console.log(res.data.data.publishBeanPageInfo.total,this.areasubordinatetotal)
            this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
            this.gradeNumber = res.data.data;
            this.checkedNames2 =
              res.data.data.oneLevelPublishUsersCount +
              res.data.data.secondLevelPublishUsersCount +
              res.data.data.threeLevelPublishUsersCount +
              res.data.data.fourLevelPublishUsersCount +
              res.data.data.fiveLevelPublishUsersCount +
              res.data.data.sixLevelPublishUsersCount +
              res.data.data.sevenLevelPublishUsersCount +
              res.data.data.eightLevelPublishUsersCount;
            this.spinShow = false;
          });
      }
    },
    //选中操作之后加载的数据 区域经理
    anewToLoad() {
      // this.checkedFalse();
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      Vue.axios
        .get(
          this.urls +
            `/publish/queryRecommendTeamRecommendPublishList?startDate=${strdate}&endDate=${enddate}&areaId=${this.areasubordinate}&phoneNumber=${this.regionalManagerPhone}&auditStatus=0&pageNum=${this.areasubordinatepagenum}&pageSize=${this.pagesizeArea}&recommendLevelList=${this.checkedNamesSting}`
        )
        .then(res => {
          this.areasubordinatetotal = res.data.data.publishBeanPageInfo.total;
          this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
          this.gradeNumber = res.data.data;
          this.checkedNames1 =
            res.data.data.oneLevelPublishUsersCount +
            res.data.data.secondLevelPublishUsersCount +
            res.data.data.threeLevelPublishUsersCount +
            res.data.data.fourLevelPublishUsersCount +
            res.data.data.fiveLevelPublishUsersCount +
            res.data.data.sixLevelPublishUsersCount +
            res.data.data.sevenLevelPublishUsersCount +
            res.data.data.eightLevelPublishUsersCount;
          this.spinShow = false;
        })
        .catch(err => {});
    },
    //选中操作之后加载的数据 区域经理内详情点击
    anewToLoadClick() {
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      Vue.axios
        .get(
          this.urls +
            `/publish/queryUsersReccommendPublishList?startDate=${strdate}&endDate=${enddate}&phoneNumber=${this.areasubordinatephone}&pageNum=${this.areasubordinatepagenum1}&pageSize=${this.pagesize}&recommendLevelList=${this.checkedNamesFSting}&auditStatus=0`
        )
        .then(res => {
          // console.log(res, "详情点击");
          this.areasubordinatetotal1 = res.data.data.publishBeanPageInfo.total;
          this.areasubordinateall = res.data.data.publishBeanPageInfo.list;
          this.gradeNumber = res.data.data;
          this.checkedNames2 =
            res.data.data.oneLevelPublishUsersCount +
            res.data.data.secondLevelPublishUsersCount +
            res.data.data.threeLevelPublishUsersCount +
            res.data.data.fourLevelPublishUsersCount +
            res.data.data.fiveLevelPublishUsersCount +
            res.data.data.sixLevelPublishUsersCount +
            res.data.data.sevenLevelPublishUsersCount +
            res.data.data.eightLevelPublishUsersCount;
          this.spinShow = false;
        });
    },
    //选中操作
    auditOperation(i) {
      const strdate = $("#strDate").val() + "+00:00:00";
      const enddate = $("#endDate").val() + "+23:59:59";
      // console.log("审核操作");
      // switch (i) {
      //   //已审
      //   case "hasBeenOn": {
      //     var postData = `publishIds=${publishIdAll}`;
      //     Vue.axios({
      //       method: "post",
      //       url: "http://192.168.0.189:8080/publish/updatePublishAuditStatus",
      //       data: postData,
      //       // data: qs.stringify(postData1),
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //       }
      //     })
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {});
      //     break;
      //   }
      //   //下架
      //   case "soldOut": {
      //     var postData = {
      //       publishStatus: "2",
      //       publishIds: [271610, 271612]
      //     };
      //     Vue.axios({
      //       method: "post",
      //       url: "http://192.168.0.189:8080/publish/updateManyPublishStatusPC",
      //       data: postData,
      //       headers: {
      //         "Content-Type": "application/json;charset=UTF-8"
      //       }
      //     })
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {});
      //     console.log(this.userIdAll, this.publishIdAll);
      //     break;
      //   }
      //   //禁止发布
      //   case "forbid": {
      //     var postData = `userId=${[341703]}&publishIds=${[271607]}`;
      //     Vue.axios({
      //       method: "post",
      //       url: "http://192.168.0.189:8080/contentAudit/forbidPublish",
      //       data: postData,
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //       }
      //     })
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {});
      //     console.log(this.userIdAll, this.publishIdAll);
      //     break;
      //   }
      //   //拉黑
      //   case "blacklist": {
      //     var postData = {
      //       userIds: [341703],
      //       punishmentType: "2",
      //       publishIds: [270512]
      //     };
      //     Vue.axios({
      //       method: "post",
      //       url: "http://192.168.0.189:8080/user/punishmentManyMemberUser",
      //       data: postData,
      //       // data: qs.stringify(postData1),
      //       headers: {
      //         "Content-Type": "application/json;charset=UTF-8"
      //       }
      //     })
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {});
      //     break;
      //   }
      //   //删除
      //   case "delete": {
      //     // var postData = `publishId=${this.publishIdAll}`;
      //     var postData = `publishId=${[271604, 271607]}`;
      //     Vue.axios({
      //       method: "post",
      //       url: "http://192.168.0.189:8080/contentAudit/deletePublish",
      //       data: postData,
      //       // data: qs.stringify(postData1),
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //       }
      //       // headers: {
      //       //   "Content-Type": "application/json",
      //       //   "Access-Control-Allow-Origin": "*",
      //       //   Accept: "application/json"
      //       // }
      //     })
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {});
      //     break;
      //   }
      // }

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
              if (this.headSpan) {
                Vue.axios({
                  method: "post",
                  url: "/publish/updatePublishAuditStatus",
                  data: postData,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8"
                  }
                }).then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.anewToLoad();
                  }
                });
              } else {
                Vue.axios({
                  method: "post",
                  url: "/publish/updatePublishAuditStatus",
                  data: postData,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8"
                  }
                }).then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.anewToLoadClick();
                  }
                });
              }
              break;
            }
            //下架
            case "soldOut": {
              var postData = {
                publishStatus: "2",
                publishIds: this.publishIdAll
              };
              if (this.headSpan) {
                Vue.axios({
                  method: "post",
                  url: "/publish/updateManyPublishStatusPC",
                  data: postData,
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                  }
                })
                  .then(res => {
                    // console.log(res);
                    if (res.data.status == "200") {
                      this.checkedFalse();
                      this.anewToLoad();
                    }
                  })
                  .catch(err => {});
              } else {
                Vue.axios({
                  method: "post",
                  url: "/publish/updateManyPublishStatusPC",
                  data: postData,
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                  }
                }).then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.anewToLoadClick();
                  }
                });
              }
              break;
            }
            //禁止发布
            case "forbid": {
              var postData = `userId=${this.userIdAll}&publishIds=${this.publishIdAll}`;
              if (this.headSpan) {
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
                      this.anewToLoad();
                    }
                  })
                  .catch(err => {});
              } else {
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
                      this.anewToLoadClick();
                    }
                  })
                  .catch(err => {});
              }
              break;
            }
            //拉黑
            case "blacklist": {
              var postData = {
                userIds: this.userIdAll,
                punishmentType: "2",
                publishIds: this.publishIdAll
              };
              if (this.headSpan) {
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
                      this.anewToLoad();
                    }
                  })
                  .catch(err => {});
              } else {
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
                      this.anewToLoadClick();
                    }
                  })
                  .catch(err => {});
              }
              break;
            }
            //删除
            case "delete": {
              // console.log("删除");
              var postData = `publishId=${this.publishIdAll}`;
              if (this.headSpan) {
                Vue.axios({
                  method: "post",
                  url: "/contentAudit/deletePublish",
                  data: postData,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8"
                  }
                }).then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.anewToLoad();
                  }
                });
              } else {
                Vue.axios({
                  method: "post",
                  url: "/contentAudit/deletePublish",
                  data: postData,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8"
                  }
                }).then(res => {
                  // console.log(res);
                  if (res.data.status == "200") {
                    this.checkedFalse();
                    this.anewToLoadClick();
                  }
                });
              }
              break;
            }
          }
        }
      }
    }
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
  /* border: 1px solid #e50232; */
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 2px;
}

.page {
  margin: 7px 0;
  text-align: center;
}

#All {
  min-width: 1700px;
  max-width: 100%;
  height: 100%;
}
.head {
  height: 48px;
  background-color: #ffffff;
  font-size: 16px;
  line-height: 48px;
}
.head > span:nth-child(1) {
  margin-left: 20px;
}
.headSpan {
  border-bottom: 1px solid #3ba0e9;
  color: #3ba0e9;
}
.headSpan2:hover {
  border-bottom: 1px solid #3ba0e9;
  color: #3ba0e9;
  cursor: pointer;
}
.headHead {
  height: calc(100% - 48px);
  padding: 30px 30px 0 20px;
  background-color: #f2f2f2;
  box-sizing: border-box;
}
.headFood {
  margin-top: 30px;
  display: flex;
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
  width: 30%;
  min-width: 350px;
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
  margin-left: 117px;
  margin-top: -2px;
}
/* .headFoodLeftCenter1 {
  width: 26px;
  height: 4px;
  background-color: #379ee9;
  margin-left: 30px;
  margin-top: -2px;
} */
.headFoodLeftFood {
  margin: 25px 30px 20px;
  border: 1px solid #e6e6e6;
}
.headFoodLeftTable tr:nth-child(2n + 1) {
  background-color: #f4faff;
}
.headFoodLeftTable1 tr:nth-child(2n) {
  background-color: #f4faff;
}

table {
  width: 100.1%;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-collapse: collapse;
  color: #666666;
}
table tr th,
table tr td {
  border: 1px solid #e6e6e6;
}
table tr th {
  background-color: #f4faff;
  border-left: 0px solid #e6e6e6;
  border-top: 0px solid #e6e6e6;
}
table tr th:last-child {
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
  min-width: 1100px;
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
/* .headFoodRightFoodTitle>div{
  width: 100%;
  height: 50%;
} */
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
/* .headFoodRightFoodTitle > div:nth-child(2) button:nth-child(5) {
  background-color: #ff5722;
}
.headFoodRightFoodTitle > div:nth-child(2) button:nth-child(2n) {
  margin: 0 14px;
}  */

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
  top: 5px;
  left: 20px;
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
  top: 5px;
  left: 22px;
  background: #379ee9;
  border-radius: 50%;
}
#two + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#two:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 22px;
  background-color: #379ee9;
  border-radius: 50%;
}
#three + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#three:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 22px;
  background-color: #379ee9;
  border-radius: 50%;
}
#four + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#four:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 22px;
  background-color: #379ee9;
  border-radius: 50%;
}
#five + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#five:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 21px;
  background-color: #379ee9;
  border-radius: 50%;
}
#six + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#six:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 21px;
  background-color: #379ee9;
  border-radius: 50%;
}
#seven + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#seven:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 21px;
  background-color: #399ae7;
  border-radius: 50%;
}
#eight + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
  background: #FFFFFF(240, 84, 77, 1);
  border-radius: 50%;
}
#eight:checked + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 22px;
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
  position: relative;
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