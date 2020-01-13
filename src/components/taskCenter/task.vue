<template>
  <div class="system">
    <div class="head">
      <span>任务中心</span>
    </div>
    <div class="food" v-if="foodTrue">
      <div class="top">
        <span>任务名称</span>
        <input type="text" placeholder="请输入任务名称" v-model="taskName" />
        <span>任务模板</span>
        <el-cascader :options="options" @change="ClickTaskTemplate" clearable></el-cascader>
        <span>任务类型</span>
        <el-cascader :options="taskType" @change="ClickTaskType" clearable></el-cascader>
        <span>任务状态</span>
        <el-cascader :options="taskStatus" @change="ClickTaskStatus" clearable></el-cascader>
        <button
          @click="inquire"
          type="submit"
          class="layui-btn"
          style="margin: 0px 30px;background-color:#379EE9"
        >搜索</button>
      </div>
      <div class="bottom">
        <div class="Btop">
          <div v-for="item in taskAll" :key="item.resourceId">
            <button
              v-if="item.resourceId == 2001"
              @click="increase"
              type="submit"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >新增</button>
            <button
              v-if="item.resourceId == 2002"
              @click="compile"
              type="submit"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >编辑</button>
            <button
              v-if="item.resourceId == 2003"
              @click="remove"
              type="submit"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >删除</button>
          </div>
        </div>
        <div class="Btable">
          <div class="BtableD">
            <table>
              <tr>
                <!-- style="width:130px" -->
                <th style="width:50px">序号</th>
                <th style="width:80px">任务类型</th>
                <th style="width:200px">任务名称</th>
                <th style="width:300px">任务模板</th>
                <th style="width:80px">条件/次</th>
                <th style="width:50px">标识</th>
                <th style="width:50px">奖励</th>
                <th>任务时间</th>
                <th style="width:65px">任务数量</th>
                <th style="width:200px">适用对象</th>
                <th style="width:65px">对象年龄</th>
                <th style="width:65px">对象性别</th>
                <th style="width:65px">任务状态</th>
              </tr>
            </table>
            <div class="overflow" style="height:401px" v-if="taskTotal != 0">
              <table>
                <tr
                  v-for="(item, index) in taskDataAll"
                  :key="index"
                  @click="trClick(index,item.taskId)"
                  :style="{backgroundColor:(TRindex == index ? '#BEE1FF' : '')}"
                >
                  <td style="width:50px">{{index+1}}</td>
                  <td style="width:80px">
                    <span v-if="item.taskType == 1">新手任务</span>
                    <span v-if="item.taskType == 2">日常任务</span>
                    <span v-if="item.taskType == 3">VIP任务</span>
                  </td>
                  <td style="width:200px">{{item.taskName}}</td>
                  <td style="width:300px">{{item.templateName}}</td>
                  <td style="width:80px">{{item.taskCondition}}</td>
                  <td style="width:50px">{{item.taskSign}}</td>
                  <td style="width:50px">{{item.taskAward}}</td>
                  <td>
                    <span v-if="item.taskTimeStatus == 0">长期有效</span>
                    <span
                      v-if="item.taskTimeStatus == 1"
                    >{{item.taskStartTime}}-{{item.taskEndTime}}</span>
                  </td>
                  <td style="width:65px">
                    <span v-if="item.taskNum == -1">无上限</span>
                    <span v-else>{{item.taskNum}}</span>
                  </td>
                  <td style="width:200px">
                    <span v-for="(i,index) in item.taskAndProvinces" :key="index">
                      <span>{{i.shortName}}&nbsp;</span>
                    </span>
                  </td>
                  <td style="width:65px">
                    <span v-if="item.taskAgeStatus == 0">所有</span>
                    <span v-if="item.taskAgeStatus == 1">{{item.taskStartAge}}-{{item.taskEndAge}}</span>
                  </td>
                  <td style="width:65px">
                    <span v-if="item.taskSexStatus == 0">所有</span>
                    <span v-if="item.taskSexStatus == 1">男</span>
                    <span v-if="item.taskSexStatus == 2">女</span>
                  </td>
                  <td style="width:65px">
                    <span v-if="item.taskStatus == 0">关闭</span>
                    <span v-if="item.taskStatus == 1">开启</span>
                  </td>
                </tr>
              </table>
            </div>
            <div v-if="taskTotal == 0" class="noData">暂无数据</div>
            <Page
              v-if="taskTotal != 0"
              class="page"
              :total="taskTotal"
              :current="taskPageNum"
              :page-size="taskPageSize"
              :page-size-opts="[10,20,30]"
              show-elevator
              show-sizer
              show-total
              @on-change="taskPNChange"
              @on-page-size-change="taskPSChange"
            />
          </div>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </div>
    </div>
    <div class="food1" v-show="!foodTrue">
      <div class="XZ">
        <div class="one">
          <span>任务类型</span>
          <!-- <el-cascader :options="taskType" v-model="PTaskType" @change="PClickTaskType" clearable></el-cascader> -->
          <el-select v-model="PTaskType" placeholder="请选择">
            <el-option
              v-for="item in taskType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="two">
          <span>任务名称</span>
          <input type="text" placeholder="请设置任务名称" v-model="SetTaskName" />
        </div>
        <div class="two">
          <span>任务模板</span>
          <input type="text" placeholder="请选择任务模板" v-model="copyChoiceText" disabled />
          <button
            @click="clickTemplate"
            type="button"
            class="layui-btn"
            style="background-color:#379EE9;"
          >模板</button>
        </div>
        <div class="two marginleft">
          <span>条件</span>
          <input type="text" placeholder="请输入次数" v-model="XZtime" />
          <span>次</span>
        </div>
        <div class="two marginleft">
          <span>标识</span>
          <input type="text" v-model="XZidentifying" />
        </div>
        <div class="two marginleft">
          <span>奖励</span>
          <input type="text" placeholder="请输入奖励" v-model="XZaward" />
          <span>先先贝</span>
        </div>
        <div class="two">
          <span>任务时间</span>
          <div class="block" id="elementTime" style="margin:0 30px">
            <el-date-picker
              v-model="TimeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <el-checkbox v-model="checked" @change="TimeClick">长期有效</el-checkbox>
        </div>
        <div class="two">
          <span>任务数量</span>
          <input type="text" placeholder="请输入数量" v-model="XZnumber" @input="NumberInput" />
          <span style="margin-right: 30px">份</span>
          <el-checkbox v-model="checked1" @change="NumberClick">无上限</el-checkbox>
        </div>
        <div class="two">
          <span>适用对象</span>
          <el-cascader
            style="margin:0 30px;"
            placeholder="请选择使用对象"
            :options="cityData"
            :props="{ multiple: true, checkStrictly: true }"
            v-model="XZCity"
            filterable
          ></el-cascader>
          <span style="margin-right: 30px;">(可多选)</span>
          <el-checkbox v-model="checkedAll" @change="AllClick">所有</el-checkbox>
        </div>
        <div class="two">
          <span>对象年龄</span>
          <div>
            <input type="text" v-model="minAge" @change="MIN" />
            <span>到</span>
            <input type="text" @change="MAX" v-model="maxAge" />
          </div>
          <el-checkbox v-model="checkedAge" true-label="1" false-label="0" @change="ageClick">不设置年龄</el-checkbox>
        </div>
        <div class="one">
          <span>对象性别</span>
          <el-select v-model="genderId" placeholder="请选择">
            <el-option
              v-for="item in genderAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="one">
          <span>任务状态</span>
          <el-radio-group v-model="radio">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </div>
        <div class="buttonClass">
          <button @click="save" type="button" class="layui-btn" style="background-color:#379EE9;">保存</button>
          <button
            @click="goBack"
            type="button"
            class="layui-btn"
            style="background-color:#379EE9;"
          >返回</button>
        </div>
      </div>
    </div>
    <div class="popup" style="z-index:1" v-if="popupTrue">
      <div class="popupDiv">
        <div class="previewT">
          <span>模板选择</span>
          <span @click="shut">X</span>
        </div>
        <div style="display:flex; flex-wrap:wrap">
          <div
            class="template"
            v-for="(item,index) in options"
            :key="index"
            @click="copyChoiceClick(item.value,item.label)"
            :style="{'border':copyChoiceId == item.value ? '1px solid #379EE9':' 1px solid #E6E6E6',color:copyChoiceId == item.value ? '#379EE9' : '#333333'}"
          >
            <span>{{item.value}},{{item.label}}</span>
          </div>
        </div>
        <div class="four">
          <button
            @click="confirm"
            type="button"
            class="layui-btn"
            style="background-color:#379EE9;"
          >确定</button>
          <button @click="shut" type="button" class="layui-btn" style="background-color:#379EE9;">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Message } from "iview";
export default {
  data() {
    return {
      taskAll: [], //权限数据
      taskName: "", //输入的任务名称
      XZTaskTemplate: "", //选中的任务模板id
      options: [], //任务模板数据
      taskType: [
        { value: 1, label: "新手任务" },
        { value: 2, label: "日常任务" },
        { value: 3, label: "VIP任务" }
      ], //任务类型数据
      XZTaskType: "", //选中的任务类型id
      PTaskType: "", //弹窗内绑定的任务类型id
      taskStatus: [{ value: 0, label: "关闭" }, { value: 1, label: "开启" }], //任务状态数据
      XZTaskStatus: "", //选中的任务状态id
      taskDataAll: [], //任务中心总数据
      taskTotal: 0, //任务中心数据总条数
      taskPageNum: 1, //当前页
      taskPageSize: 10, //当前每页数据条数
      SetTaskName: "", //设置的任务名称
      XZtime: "", //设置的条件次数
      XZidentifying: "", //设置的标识
      XZaward: "", //设置的奖励
      checked1: false, //不设置任务数量
      XZnumber: "", //设置的数量
      numberStatus: -1, //数量状态
      foodTrue: true,
      checked: false, //不设置任务时间
      TimeValue: "", //选择的时间
      TimeStatus: 0, //任务时间状态
      AgeStatus: 0, //年龄状态
      minAge: "", //开始年龄
      maxAge: "", //结束年龄
      checkedAge: false, //不设置年龄
      checkedAll: false, //不设置对象
      cityData: [], //城市数据
      XZCity: [100000], //选中的城市数据
      genderAll: [
        { value: 0, label: "不设置性别" },
        { value: 1, label: "男" },
        { value: 2, label: "女" }
      ],
      genderId: "", //性别状态
      radio: 1, //任务状态
      copyChoiceIndex: -1,
      copyChoiceId: "", //弹窗内选择的模板id
      copyChoiceText: "", //弹窗内选择的模板名称也是设置的任务模板

      TRindex: -1, //选中的任务下标
      taskId: "", //选中的任务id
      updateTrue: false, //是否点击了编辑
      spinShow: false, //懒加载
      popupTrue: false //弹窗
    };
  },
  components: {},
  metaInfo: {
    title: "任务中心",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  watch: {
    TimeValue() {
      if (this.TimeValue != "") {
        this.TimeStatus = 1;
        this.checked = false;
      }
    },
    XZCity() {
      if (this.XZCity[0] != 100000) {
        this.checkedAll = false;
      }
    },
    XZnumber() {
      if (this.XZnumber == "") {
        this.numberStatus = -1;
      } else {
        this.numberStatus = "";
        this.checked1 = false;
      }
    }
  },
  computed: {},
  created() {
    var luyou = JSON.parse(sessionStorage.getItem("luyou"));
    for (let index = 0; index < luyou.length; index++) {
      if (luyou[index].resourceUrl == "task") {
        this.taskAll = luyou[index].auditorResources
      }
    }
  },
  mounted() {
    console.log(this.taskAll);
    
    this.TaskTemplate();
    this.inquire();
    this.GettingTheCities();
  },
  methods: {
    //搜索按钮
    inquire() {
      this.taskPageNum = 1;
      this.taskPageSize = 10;
      this.TRindex = -1;
      this.taskId = "";
      Vue.axios
        .get(
          `/taskManage/queryAllTaskList?pageNum=${this.taskPageNum}&pageSize=${this.taskPageSize}&taskName=${this.taskName}&templateId=${this.XZTaskTemplate}&taskType=${this.XZTaskType}&taskStatus=${this.XZTaskStatus}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.taskDataAll = res.data.data.list;
            this.taskTotal = res.data.data.total;
          }
        });
    },
    search() {
      this.TRindex = -1;
      this.taskId = "";
      Vue.axios
        .get(
          `/taskManage/queryAllTaskList?pageNum=${this.taskPageNum}&pageSize=${this.taskPageSize}&taskName=${this.taskName}&templateId=${this.XZTaskTemplate}&taskType=${this.XZTaskType}&taskStatus=${this.XZTaskStatus}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.taskDataAll = res.data.data.list;
            this.taskTotal = res.data.data.total;
          }
        });
    },
    //获取任务模板
    TaskTemplate() {
      Vue.axios.get("/taskTemplate/queryAllTaskTemplate").then(res => {
        console.log(res);
        if (res.data.status == 200) {
          console.log(res);
          this.options = convertTree(res.data.data);
          function convertTree(tree) {
            const result = [];
            tree.forEach(item => {
              let {
                templateId: value,
                templateName: label
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
    //获取城市信息
    GettingTheCities() {
      Vue.axios.get("/provinces/queryAllCity").then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.cityData = convertTree(res.data.data.provincesCityList);
          function convertTree(tree) {
            const result = [];
            tree.forEach(item => {
              let {
                id: value,
                cityName: label,
                provincesCityList: children
              } = item;
              if (children) {
                children = convertTree(children);
              }
              result.push({
                value,
                label,
                children
              });
            });
            return result;
          }
        }
      });
    },
    //选中的任务模板
    ClickTaskTemplate(e) {
      if (e.length == 0) {
        this.XZTaskTemplate = "";
      } else {
        this.XZTaskTemplate = e[0];
      }
      setTimeout(() => {
        console.log(this.XZTaskTemplate);
      }, 500);
      console.log(e);
    },
    //选中的任务类型
    ClickTaskType(e) {
      if (e.length == 0) {
        this.XZTaskType = "";
      } else {
        this.XZTaskType = e[0];
      }
    },
    //选中的任务状态
    ClickTaskStatus(e) {
      if (e.length == 0) {
        this.XZTaskStatus = "";
      } else {
        this.XZTaskStatus = e[0];
      }
    },
    //当前选中行
    trClick(index, id) {
      this.TRindex = index;
      this.taskId = id;
    },
    //新增
    increase() {
      this.foodTrue = false;
    },
    //长期有效点击
    TimeClick(value) {
      if (value) {
        this.TimeValue = "";
        this.TimeStatus = 0;
        console.log("选中");
      } else {
        // this.TimeStatus = 1;
        console.log("未选");
      }
    },
    //输入的任务数量
    NumberInput() {
      this.checked1 = false;
    },
    //任务数量无上限点击
    NumberClick(value) {
      if (value) {
        console.log("选中");
        this.XZnumber = "";
        this.numberStatus = -1;
      } else {
        this.numberStatus = "";
        console.log("未选");
      }
    },
    //不设置年龄点击
    ageClick(e) {
      this.minAge = "";
      this.maxAge = "";
      if (e) {
        this.AgeStatus = 0;
      } else {
        this.AgeStatus = 1;
      }
      console.log(e);
      console.log(this.AgeStatus);
    },
    //不设置对象点击
    AllClick(e) {
      console.log(e);
      if (e) {
        this.checkedAll = true;
        this.XZCity = [100000];
      } else {
        this.checkedAll = false;
        this.XZCity = [100000];
      }
    },
    //新增内的返回
    goBack() {
      this.foodTrue = true;
      this.updateTrue = false;
      this.TRindex = -1;
      this.taskId = "";
      this.PTaskType = "";
      this.genderId = ""; //性别状态
      this.radio = 1; //任务状态
      this.copyChoiceId = ""; //弹窗内选择的模板id
      this.copyChoiceText = ""; //弹窗内选择的模板名称也是设置的任务模板
      this.XZCity = [100000]; //选中的城市数据
      this.SetTaskName = ""; //设置的任务名称
      this.XZtime = ""; //设置的次数
      this.XZidentifying = ""; //设置的标识
      this.XZaward = ""; //设置的奖励
      this.XZnumber = ""; //设置的数量
      this.numberStatus = -1; //数量状态
      this.checked = false; //不设置任务时间
      this.TimeValue = ""; //选择的时间
      this.TimeStatus = 0; //任务时间状态
      this.checked1 = false; //不设置任务数量
      this.AgeStatus = 0; //年龄状态
      this.minAge = ""; //开始年龄
      this.maxAge = ""; //结束年龄
      this.checkedAge = false; //不设置年龄
      this.checkedAll = false;
    },
    //新增内保存
    save() {
      // console.log(this.PTaskType, "任务类型1新手2日常3VIP");
      // console.log(this.SetTaskName, "任务名称");
      // console.log(this.XZtime, "次数");
      // console.log(this.XZidentifying, "标识");
      // console.log(this.copyChoiceText,'任务模板');
      // console.log(this.XZaward, "奖励");
      // console.log(this.TimeStatus, "时间状态0长期1限时");
      // console.log(this.TimeValue, "时间");
      // console.log(this.XZnumber, "输入的数量");
      // console.log(this.numberStatus,'数量状态-1为无上限');
      // console.log(this.XZCity, "适用对象城市id");
      // console.log(this.AgeStatus, "年龄状态0所有1限定");
      // console.log(this.minAge, "-", this.maxAge, "开始年龄和结束");
      // console.log(this.genderId, "0所有1男2女");
      console.log(this.radio, "0关闭1开启");
      if (
        this.PTaskType === "" ||
        this.SetTaskName === "" ||
        this.XZtime === "" ||
        this.XZaward === "" ||
        this.genderId === "" ||
        this.radio === "" ||
        this.copyChoiceId === ""
      ) {
        this.$Message.warning("请先完善信息");
        return;
      }
      if (this.minAge != "") {
        if (this.maxAge == "") {
          this.$Message.warning("请先完善信息");
          return;
        }
      }
      if (this.updateTrue) {
        //更新
        let taskStartTime = ""; //开始时间
        let taskEndTime = ""; //结束时间
        let taskNumber = ""; //任务数量
        let cityIDAll = []; //适用对象城市id集合
        if (this.TimeStatus == 1) {
          console.log(this.TimeValue);
          if (this.TimeValue[0] != "") {
            if (this.TimeValue[0].indexOf("00:00:00") == -1) {
              console.log("不存在", this.TimeValue[0].indexOf("00:00:00"));
              console.log(this.TimeValue[0].indexOf("00:00:00"));
              taskStartTime = this.TimeValue[0] + " 00:00:00";
              taskEndTime = this.TimeValue[1] + " 23:59:59";
              
            } else {
              console.log("存在");
              taskStartTime = this.TimeValue[0];
              taskEndTime = this.TimeValue[1];
            }
          }
        }
        if (this.numberStatus == -1) {
          taskNumber = -1;
        } else if (this.numberStatus == "") {
          taskNumber = this.XZnumber;
        }
        if (this.XZCity.length > 1) {
          console.log(this.XZCity.length, this.XZCity);
          this.XZCity.forEach(item => {
            // console.log(item);
            if (item.length == 1) {
              // console.log(item.length);
              cityIDAll = [...cityIDAll, ...item];
            } else {
              // console.log(item.length);
              if (cityIDAll.indexOf(item == -1)) {
                cityIDAll.push(item);
              }
            }
          });
        } else {
          console.log(this.XZCity.length, this.XZCity);
          cityIDAll = [...cityIDAll, ...this.XZCity];
        }
        console.log(cityIDAll);
        console.log(this.TimeStatus);
        console.log(taskStartTime, taskEndTime, "时间");
        let postData = `taskName=${this.SetTaskName}&taskType=${this.PTaskType}&templateId=${this.copyChoiceId}&taskCondition=${this.XZtime}&taskSign=${this.XZidentifying}&taskAward=${this.XZaward}&taskTimeStatus=${this.TimeStatus}&taskStartTime=${taskStartTime}&taskEndTime=${taskEndTime}&taskNum=${taskNumber}&taskAgeStatus=${this.AgeStatus}&taskStartAge=${this.minAge}&taskEndAge=${this.maxAge}&taskSexStatus=${this.genderId}&taskStatus=${this.radio}&provinceIds=${cityIDAll}&taskId=${this.taskId}`;
        Vue.axios({
          method: "post",
          url: "/taskManage/updateTaskByTaskId",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("任务更新成功");
            this.search();
            this.goBack();
          } else {
            this.$Message.warning("任务更新失败");
          }
        });
      } else {
        //新增
        let taskStartTime = ""; //开始时间
        let taskEndTime = ""; //结束时间
        let taskNumber = ""; //任务数量
        let cityIDAll = []; //适用对象城市id集合
        if (this.TimeStatus == 1) {
          taskStartTime = this.TimeValue[0] + " 00:00:00";
          taskEndTime = this.TimeValue[1] + " 23:59:59";
        }
        if (this.numberStatus == -1) {
          taskNumber = -1;
        } else if (this.numberStatus == "") {
          if (this.XZnumber == "") {
            taskNumber = -1;
          } else {
            taskNumber = this.XZnumber;
          }
        }
        if (this.XZCity.length > 1) {
          this.XZCity.forEach(item => {
            cityIDAll = [...cityIDAll, ...item];
          });
        } else {
          cityIDAll = [...cityIDAll, ...this.XZCity];
        }
        console.log(this.TimeStatus);
        console.log(taskStartTime, taskEndTime, "时间");
        console.log(taskNumber, "数量");
        let postData = `taskName=${this.SetTaskName}&taskType=${this.PTaskType}&templateId=${this.copyChoiceId}&taskCondition=${this.XZtime}&taskSign=${this.XZidentifying}&taskAward=${this.XZaward}&taskTimeStatus=${this.TimeStatus}&taskStartTime=${taskStartTime}&taskEndTime=${taskEndTime}&taskNum=${taskNumber}&taskAgeStatus=${this.AgeStatus}&taskStartAge=${this.minAge}&taskEndAge=${this.maxAge}&taskSexStatus=${this.genderId}&taskStatus=${this.radio}&provinceIds=${cityIDAll}`;
        console.log(postData);
        Vue.axios({
          method: "post",
          url: "/taskManage/insertTask",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("任务创建成功");
            this.search();
            this.goBack();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      }
    },
    //编辑
    compile() {
      if (this.taskId == "") {
        this.$Message.warning("请选择要编辑的任务");
        return;
      }
      console.log(this.taskDataAll[this.TRindex], "编辑信息");
      this.foodTrue = false;
      this.updateTrue = true;
      this.PTaskType = this.taskDataAll[this.TRindex].taskType; //任务类型
      console.log(this.PTaskType, "任务类型");
      this.SetTaskName = this.taskDataAll[this.TRindex].taskName; //任务名字
      this.copyChoiceText = this.taskDataAll[this.TRindex].templateName; //弹窗内选择的模板名称也是设置的任务模板
      this.copyChoiceId = this.taskDataAll[this.TRindex].templateId; //弹窗内选择的模板id
      this.XZtime = this.taskDataAll[this.TRindex].taskCondition; //设置的条件次数
      this.XZidentifying = this.taskDataAll[this.TRindex].taskSign; //设置的标识
      this.XZaward = this.taskDataAll[this.TRindex].taskAward; //设置的奖励
      if (this.taskDataAll[this.TRindex].taskTimeStatus == 0) {
        console.log(this.taskDataAll[this.TRindex].taskTimeStatus,'时间状态');
        this.checked = true; //不设置任务时间
        this.TimeStatus = 0; //任务时间状态
      } else if (this.taskDataAll[this.TRindex].taskTimeStatus == 1) {
        console.log(this.taskDataAll[this.TRindex].taskTimeStatus,'时间状态');
        this.checked = false; //不设置任务时间
        this.TimeStatus = 1; //任务时间状态
        let arr = [];
        arr.push(
          this.taskDataAll[this.TRindex].taskStartTime,
          this.taskDataAll[this.TRindex].taskEndTime
        );
        (this.TimeValue = arr), //选择的时间
          console.log(arr);
      }
      if (this.taskDataAll[this.TRindex].taskNum == -1) {
        this.checked1 = true; //不设置任务数量
        this.XZnumber = ""; //设置的数量
        this.numberStatus = -1; //数量状态
      } else {
        this.checked1 = false; //不设置任务数量
        this.XZnumber = this.taskDataAll[this.TRindex].taskNum; //设置的数量
        this.numberStatus = ""; //数量状态
      }
      if (this.taskDataAll[this.TRindex].taskAgeStatus == 0) {
        this.checkedAge = true; //不设置年龄
        this.AgeStatus = 0; //年龄状态
      } else if (this.taskDataAll[this.TRindex].taskAgeStatus == 1) {
        this.checkedAge = false; //不设置年龄
        this.AgeStatus = 1; //年龄状态
        this.minAge = this.taskDataAll[this.TRindex].taskStartAge; //开始年龄
        this.maxAge = this.taskDataAll[this.TRindex].taskEndAge; //结束年龄
      }
      this.genderId = this.taskDataAll[this.TRindex].taskSexStatus; //性别状态
      this.radio = this.taskDataAll[this.TRindex].taskStatus; //任务状态
      if (
        this.taskDataAll[this.TRindex].taskAndProvinces[0].provincesId ===
        100000
      ) {
        console.log(
          this.taskDataAll[this.TRindex].taskAndProvinces[0].provincesId
        );
        console.log(this.checkedAll);
        this.checkedAll = true; //不设置对象
      } else {
        this.XZCity = [];
        console.log(
          this.taskDataAll[this.TRindex].taskAndProvinces[0].provincesId,
          this.XZCity
        );
        this.checkedAll = false; //不设置对象
        for (var item of this.taskDataAll[this.TRindex].taskAndProvinces) {
          console.log(item);
          this.XZCity.push(item.provincesId);
          console.log(this.XZCity);
        }
        console.log(this.XZCity);
      }
    },
    //删除
    remove() {
      if (this.taskId == "") {
        this.$Message.warning("请选择要删除的任务");
        return;
      }
      Vue.axios({
        method: "post",
        url: "/taskManage/deleteTaskByTaskId",
        data: `taskId=${this.taskId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("任务删除成功");
          this.search();
          
        }
      });
    },
    //改变当前页
    taskPNChange(value) {
      this.taskPageNum = value;
      this.search();
    },
    //改变当前页数据条数
    taskPSChange(value) {
      this.taskPageSize = value;
      this.search();
    },
    //确定提交
    confirm() {
      if (this.copyChoiceId == "") {
        this.$Message.warning("请选择一项模板");
      } else {
        this.popupTrue = false;
      }
    },
    //点击了任务模板
    clickTemplate() {
      this.popupTrue = true;
    },
    //输入的最小年龄
    MIN() {
      this.checkedAge = false;
      if (this.minAge == "") {
        this.AgeStatus = 0;
      } else {
        this.AgeStatus = 1;
      }

      // if (this.minAge > this.maxAge) {
      //   this.minAge = "";
      //   this.$Message.warning("请输入合适的年龄");
      // }
      // console.log(e);
    },
    //输入的最大年龄
    MAX(e) {
      this.checkedAge = false;
      console.log(this.XZCity.length, this.XZCity);
      this.XZCity.forEach(item => {
        console.log(item);
        if (item.length == 1) {
        }
      });
      if (eval(this.minAge) > eval(this.maxAge)) {
        this.maxAge = "";
        if (this.maxAge == "") {
          this.AgeStatus = 0;
        } else {
          this.AgeStatus = 1;
        }
        this.$Message.warning("请输入合适的年龄");
        return;
      }
      console.log(e);
    },
    //弹窗选择的模板
    copyChoiceClick(id, text) {
      console.log(id, text);
      this.copyChoiceId = id;
      this.copyChoiceText = text;
    },
    //关闭弹窗
    shut() {
      this.popupTrue = false;
      this.copyChoiceId = "";
      this.copyChoiceText = "";
    }
  }
};
</script>

<style scoped>
@import "../../CSS/gonggong.css";
.color {
  color: #379ee9;
}
.color1 {
  color: #333333;
}
.system {
  min-width: 1470px;
  max-width: 100%;
  /* height: 100%; */
}

.page {
  margin: 9px 0 7px 10px;
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
  height: 800px;
  padding: 30px 20px;
}
.food1 {
  width: 100%;
  /* height: 800px; */
  padding: 30px 20px;
}
.XZ {
  width: 100%;
  height: 100%;
  padding-left: 35%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: end;
}
.XZ input {
  margin: 0 30px;
  width: 217px;
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
.marginleft {
  margin-left: 28px;
}
.top {
  width: 100%;
  height: 80px;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 30px;
  /* padding-left: 30px; */
  display: flex;
  align-items: center;
}
.top span {
  margin: 0 30px;
  font-size: 14px;
  color: #666666;
}
.top input {
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
.bottom {
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
}
.Btop {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.Btable {
  width: 100%;
  height: 535px;
  padding: 20px 30px;
  position: relative;
}
.BtableD {
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  height: 100%;
}
.buttonClass {
  width: 200px;
  display: flex;
  justify-content: space-around;
  margin: 60px 0 90px 140px;
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
  width: 900px;
  height: 800px;
  margin: auto;
  border-radius: 4px;
}
.previewT span {
  color: #333333;
  font-size: 14px;
  margin-right: 20px;
}
.previewT {
  width: 100%;
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
  margin-bottom: 40px;
}
.previewT span:nth-child(2) {
  cursor: pointer;
}
.one {
  margin-top: 50px;
}
.one span {
  margin-right: 30px;
}
.two {
  display: flex;
  margin-top: 50px;
  align-items: center;
}
.twoDiv {
  width: 300px;
  height: 300px;
  border: 1px solid #f2f2f2;
}
.avatar {
  width: 100%;
  height: 100%;
}
.three {
  margin-top: 50px;
}
.three input {
  width: 700px;
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
.four {
  width: 185px;
  margin: 120px auto;
  display: flex;
  justify-content: space-between;
}
.template {
  width: 200px;
  height: 70px;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12.5px;
}
</style>
