<!-- 商户中心 -->
<template>
  <div class="Audit">
    <div class="top">
      <span>商户中心</span>
    </div>
    <div class="buttom">
      <div class="status">
        <div>
          <div
            class="dai"
            v-for="(item,index) in BusinessAll"
            :key="index"
            @click="status(item)"
          >
            <span
              :style="{color: BusinessIndex == item ? '#379ee9' : ''}"
              v-if="item == 6100"
            >商务中心</span>
            <span
              :style="{color: BusinessIndex == item ? '#379ee9' : ''}"
              v-if="item == 6200"
            >人员管理</span>
            <span
              :style="{color: BusinessIndex == item ? '#379ee9' : ''}"
              v-if="item == 6300"
            >充值录入</span>
            <span
              :style="{color: BusinessIndex == item ? '#379ee9' : ''}"
              v-if="item == 6400"
            >小组排名</span>
            <div class="dingwei" v-if="BusinessIndex == item"></div>
          </div>
        </div>
      </div>

      <div class="BBottom">
        <Business v-if="BusinessIndex == 6100" ref="user"></Business>
        <PeopleManagement v-if="BusinessIndex == 6200" ref="user"></PeopleManagement>
        <recharge v-if="BusinessIndex == 6300" ref="user"></recharge>
        <ranking v-if="BusinessIndex == 6400" ref="user"></ranking>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import Business from "../BusinessCenter/Business";
import PeopleManagement from "../BusinessCenter/PeopleManagement";
import recharge from "../BusinessCenter/recharge";
import ranking from "../BusinessCenter/ranking";
export default {
  data() {
    return {
      BusinessIndex: "",
      // urls: "http://192.168.0.189:8080", //测试地址
      urls: "https://www.baiduyuyue.com/management", //线上地址
      BusinessAll: [],
      oneAll: [],
      twoAll: [],
      threeAll: []
    };
  },
  metaInfo: {
    title: "商户中心",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  components: { Business, PeopleManagement, recharge, ranking },

  computed: {},
  created() {
    var luyou = JSON.parse(sessionStorage.getItem("luyou"));
    console.log();
    for (let index = 0; index < luyou.length; index++) {
      if (luyou[index].resourceUrl == "BusinessCenter") {
        luyou[index].auditorResources.forEach(element => {
          this.BusinessAll.push(element.resourceId);
          if (element.resourceId == 6100) {
            this.oneAll = element.resourcesIds;
          }
          if (element.resourceId == 6200) {
            this.twoAll = element.resourcesIds;
          }
          if (element.resourceId == 6300) {
            this.threeAll = element.resourcesIds;
          }
        });
        this.BusinessIndex = this.BusinessAll[0];
      }
    }
  },
  mounted() {
    console.log(this.BusinessAll);
    console.log(this.BusinessIndex);
  },
  watch: {
    value2() {
      console.log(this.value2);
      if (this.value2 != null) {
        this.creationTime = this.value2;
        console.log(this.creationTime);
      } else {
        this.creationTime = "";
        console.log(this.creationTime);
      }
    }
  },
  methods: {
    //搜索按钮
    inquire() {
      this.$refs.user.search(
        this.contractInput,
        this.businessName,
        this.businessPhone,
        this.rechargeCard,
        this.rechargePhone,
        this.creationTime
      );
      console.log("点击了搜索按钮");
    },
    //重置按钮
    reset() {
      this.contractInput = ""; //输入的合同编号
      this.businessName = ""; //输入的商务代表姓名
      this.businessPhone = ""; //输入的商务代表手机号
      this.rechargeCard = ""; //输入的充值商
      this.rechargePhone = ""; //输入的充值商手机号
      this.value2 = "";
      this.creationTime = ""; //选择的创建日期
      // console.log("点击了重置按钮");
    },

    //查看商户中心
    status(i) {
      console.log(i);
      this.BusinessIndex = i;
    }
  }
};
</script>
<style scoped>
.Audit {
  min-width: 1500px;
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
  /* height: 100%; */
  padding: 0 20px;
}

.BBottom {
  width: 100%;
  background-color: #fff;
  margin-top: 25px;
  margin-bottom: 30px;
  border-radius: 4px;
}
.status {
  background-color: #fff;
  margin-top: 30px;
  padding: 40px 30px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  justify-content: space-between;
}
.status > div {
  display: flex;
}
.dai {
  margin-right: 50px;
  cursor: pointer;
  position: relative;
}
.tongguo {
  margin-right: 50px;
}
.dingwei {
  width: 30px;
  height: 2px;
  background-color: #379ee9;
  position: absolute;
  top: 35px;
  left: 1px;
}
.businessButton {
  margin-left: 30px;
}
</style>