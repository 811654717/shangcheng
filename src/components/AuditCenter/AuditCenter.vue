<!-- 审核中心 -->
<template>
  <div class="Audit">
    <div class="top">
      <span>审核中心</span>
    </div>
    <div class="buttom">
      <div class="Btop">
        <div>
          <span>发布时间</span>
          <div class="layui-inline" style="margin-left:20px">
            <input type="text" class="layui-input" id="strDate" />
          </div>
          <span style="margin: 0 10px">-</span>
          <div class="layui-inline">
            <input type="text" class="layui-input" id="endDate" />
          </div>
        </div>
        <div>
          <span style="margin: 0 20px 0 30px">手机号码</span>
          <input type="text" placeholder="请输入发布人手机号码" v-model="publishPhone" />
        </div>
        <div>
          <span style="margin: 0 20px 0 30px">匹配</span>
          <input type="text" placeholder="请输入匹配内容" v-model="matching" />
        </div>
        <div style="display:flex;align-items: center;">
          <span style="margin: 0 20px 0 30px">选择分类</span>
          <Cascader
            id="iviewCascader"
            class="amendDiv"
            :data="data"
            v-model="classify"
            change-on-select
            @on-change="pitchOn"
          ></Cascader>
          <!-- :clearable="false" -->
          <button
            @click="inquire"
            type="submit"
            class="layui-btn"
            style="margin: 0px 20px;background-color:#379EE9"
          >搜索</button>
          <button
            type="reset"
            style="background-color:white;color:#379EE9;border:1px solid #379EE9;display:flex;align-items: center;padding:0 10px;"
            class="layui-btn"
            @click="reset"
          >
            <img
              style="margin-right:10px"
              src="https://images.baiduyuyue.com/background-重置.png"
              alt
            />重置
          </button>
        </div>
      </div>
      <div class="BBottom">
        <div class="status">
          <div class="dai" v-for="(item,index) in AuditAll" :key="index" @click="status(item)">
            <span :style="{color: statusIndex == item ? '#379ee9' : ''}" v-if="item == 3001">待审核</span>
            <span :style="{color: statusIndex == item ? '#379ee9' : ''}" v-if="item == 3002">审核成功</span>
            <span :style="{color: statusIndex == item ? '#379ee9' : ''}" v-if="item == 3003">审核失败</span>
            <div class="dingwei" v-if="statusIndex == item"></div>
          </div>
        </div>
        <ToAudit v-if="statusIndex == 3001" ref="user"></ToAudit>
        <Approve v-if="statusIndex == 3002" ref="user"></Approve>
        <AuditFailure v-if="statusIndex == 3003" ref="user"></AuditFailure>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import ToAudit from "../AuditCenter/ToAudit";
import Approve from "../AuditCenter/Approve";
import AuditFailure from "../AuditCenter/AuditFailure";
export default {
  data() {
    return {
      k: "", //开始时间
      j: "", //结束时间
      publishPhone: "", //输入的发布人手机号码
      matching: '', //要匹配的内容
      statusIndex: "",
      classify: [], //选择的分类
      classifyID: "", //选择的分类id
      data: [], //分类数据
      // urls: "http://192.168.0.189:8080", //测试地址
      urls: "https://www.baiduyuyue.com/management", //线上地址
      AuditAll: []
    };
  },
  metaInfo: {
    title: "审核中心",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  components: { ToAudit, Approve, AuditFailure },

  computed: {},
  created() {
    var luyou = JSON.parse(sessionStorage.getItem("luyou"));
    for (let index = 0; index < luyou.length; index++) {
      if (luyou[index].resourceUrl == "Audit") {
        console.log(luyou[index].auditorResources);
        luyou[index].auditorResources.forEach(element => {
          this.AuditAll.push(element.resourceId)
        });
        this.statusIndex = this.AuditAll[0];
      }
    }
  },
  mounted() {
    console.log(this.AuditAll);
    Vue.axios
      .get(this.urls + "/promoteClassify/queryAllPromoteClassify")
      .then(res => {
        // console.log(res);
        this.data = convertTree(res.data.data.children);
        function convertTree(tree) {
          const result = [];
          tree.forEach(item => {
            let {
              classifyId: value,
              classifyName: label,
              children: children
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
      });
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
  },
  watch: {
    classify() {
      if (this.classify.length == 1) {
        // console.log(this.classify[0]);
        this.classifyID = this.classify[0];
      } else if (this.classify.length == 2) {
        // console.log(this.classify[1]);
        this.classifyID = this.classify[1];
      } else if (this.classify.length == 0) {
        // console.log(this.classifyID);
        this.classifyID = "";
      }
    }
  },
  methods: {
    // 选择的分类
    pitchOn(value) {
      // console.log(value);
      // console.log(this.classify);
      // console.log(this.classifyID);
    },
    //搜索按钮
    inquire() {
      const strdate = $("#strDate").val() + "+00:00:00";
      this.k = strdate;
      const enddate = $("#endDate").val() + "+23:59:59";
      this.j = enddate;
      const phone = this.publishPhone;
      const ID = this.classifyID;
      const M = this.matching;
      this.$refs.user.search(strdate, enddate, phone, ID, M);
      console.log("点击了搜索按钮");
    },
    //重置按钮
    reset() {
      // console.log(this.classifyID);
      this.classify = [];
      this.classifyID = "";
      this.publishPhone = "";
      this.matching = '';
      $("#strDate").val(new Date().toLocaleString());
      $("#endDate").val(new Date().toLocaleString());
      // console.log("点击了重置按钮");
    },

    //查看不同审核状态信息
    status(i) {
      this.k = $("#strDate").val() + "+00:00:00";
      this.j = $("#endDate").val() + "+23:59:59";
      this.statusIndex = i;
    }
  }
};
</script>
<style scoped>
.Audit {
  min-width: 2170px;
  max-width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.top {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #ffffff;
  font-size: 16px;
  padding: 0 20px;
  color: #666666;
}
.buttom {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
.Btop {
  width: 100%;
  height: 80px;
  margin-top: 25px;
  padding: 0 30px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
.Btop input {
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
.Btop p {
  display: inline-block;
  border: 1px solid #379ee9;
  width: 70px;
  height: 38px;
  color: #379ee9;
  text-align: center;
  line-height: 38px;
  border-radius: 2px;
  cursor: pointer;
}
.BBottom {
  width: 100%;
  height: 800px;
  background-color: #fff;
  margin-top: 25px;
  margin-bottom: 30px;
  border-radius: 4px;
}
.status {
  padding-left: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  border-bottom: 1px solid #eeeeee;
}
.status > div {
  position: relative;
  cursor: pointer;
}
.dai {
  margin-right: 50px;
}
.tongguo {
  margin-right: 50px;
}
.dingwei {
  width: 30px;
  height: 2px;
  background-color: #379ee9;
  position: absolute;
  top: 40px;
  left: 1px;
}
</style>