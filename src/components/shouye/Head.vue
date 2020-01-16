<!--  -->
<template>
  <section>
    <div id="all">
      <div class="allHead">
        <div>
          <img class="allHead-img" src="https://images.baiduyuyue.com/background-logo.png" alt />
          <span v-if="isCollapse" class="allHead-span"></span>
          <span v-if="!isCollapse" class="allHead-span">商城管理系统</span>
          <img
            class="allHead-img img"
            style="margin-left:35px;"
            src="https://images.baiduyuyue.com/background-展开.png"
            v-if="isCollapse"
            @click.stop="isCollapse = !isCollapse"
            alt
          />
          <img
            class="allHead-img img"
            style="margin-left:35px;"
            src="https://images.baiduyuyue.com/background-展开2.png"
            v-if="!isCollapse"
            @click.stop="isCollapse = !isCollapse"
            alt
          />
        </div>
        <div class="allHead-div" @mouseover="administration">
          <img class="allHead-img2" src="https://images.baiduyuyue.com/background-头像.png" alt />
          <span class="allHead-span2">{{loginName}}</span>
          <img class="allHead-img img" src="https://images.baiduyuyue.com/background-下箭头.png" alt />
          <div v-if="administrationTrue" class="quit" @mouseleave="administrationLeave">
            <div class="quitDiv" @click="quitClick">
              <img
                style="margin: -4px 10px 0 16px;"
                src="https://images.baiduyuyue.com/background-形状706.png"
                alt
              />
              <span style="font-size:16px;color:#666666;">退出登录</span>
            </div>
            <div class="quitDiv" @click="modification" v-if="phone != ''">
              <img
                style="margin: -4px 10px 0 16px;width:20px;height:20px;"
                src="https://images.baiduyuyue.com/%E4%BF%AE%20%E6%94%B9%20%281%29.png"
                alt
              />
              <span style="font-size:16px;color:#666666;">修改密码</span>
            </div>
          </div>
        </div>
      </div>
      <div class="all">
        <el-menu
          default-active="commodity"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#000000"
          text-color="#8a8d98"
          active-text-color="#ffffff"
          router
        >
            <el-menu-item index="commodity">
              <i class="el-icon-icon-shop iconfont" ></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="order">
              <i class="el-icon-icon-order iconfont"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="discountCoupon">
              <i class="el-icon-icon-Coupon iconfont"></i>
              <span slot="title">优惠券管理</span>
            </el-menu-item>
          <!-- <div v-for="(item, i) in luyou" :key="i">
            <el-menu-item :index="item.resourceUrl">
              <i class="iconfont" :class="item.resourceImageUrl"></i>
              <span slot="title">{{item.resourceName}}</span>
            </el-menu-item>
          </div> -->
        </el-menu>
        <!-- </div> -->
        <!-- 修改密码 -->
        <div v-if="modificationTrue" class="popup">
          <div class="popupDiv">
            <div>
              <span>旧密码</span>
              <el-input style="width:200px" v-model="oldPassword" placeholder="请输入旧密码" show-password clearable></el-input>
            </div>
            <div>
              <span>新密码</span>
              <el-input style="width:200px" v-model="newPassword" placeholder="请输入新密码" show-password clearable></el-input>
            </div>
            <div>
              <span>新密码</span>
              <el-input
                style="width:200px"
                v-model="ConfirmNewPassword"
                placeholder="请再次输入新密码"
                show-password
                clearable
              ></el-input>
            </div>
            <div>
              <el-button @click="confirm" type="primary">确认</el-button>
              <el-button style="margin-left:30px" @click="cancel" type="primary">取消</el-button>
            </div>
          </div>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";
export default {
  data() {
    return {
      isCollapse: false,
      imgtrue: true, //侧边框折叠变量
      leftName: this.$store.state.name, // 左侧点击的值
      issueName: "首页", // 发布质量查询
      administrationTrue: false,
      leftIndex: 0, //左侧选中下标
      luyou: [],
      Recharge: "",
      loginName: "",
      modificationTrue: false,
      phone: '', //要修改密码的手机号
      oldPassword: "", //旧密码
      newPassword: "", //新密码
      ConfirmNewPassword: "" //确认新密码
    };
  },
  mounted() {},
  created() {
    // console.log(sessionStorage.getItem("auditorId"));
    // this.phone = sessionStorage.getItem("phone");
    // console.log(this.phone);
    // this.loginName = sessionStorage.getItem("loginName");
    // var get = sessionStorage.getItem("luyou");
    // this.luyou = JSON.parse(sessionStorage.getItem("luyou"));
    // this.Recharge = this.luyou[0].resourceUrl;
    // console.log(JSON.parse(get));
  },
  //计算属性
  computed: {
    state() {
      this.leftName = this.$store.state.name;
      // console.log(this.leftName);
    }
  },
  watch: {
    state: {
      handler() {
        this.leftName = this.$store.state.name;
        // console.log(this.leftName);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 管理员鼠标移入
    administration() {
      this.administrationTrue = true;
    },
    // 移出
    administrationLeave() {
      this.administrationTrue = false;
    },
    //退出
    quitClick() {
      sessionStorage.clear();
      console.log(sessionStorage.getItem("auditorId", ""));
        this.$router.push({ path: "login" });
        this.$store.commit("click", "首页");
    },
    //修改密码
    modification() {
      console.log("修改");
      this.modificationTrue = true;
    },
    //修改密码确定
    confirm() {
      if (this.oldPassword == '') {
        this.$message.warning("请输入旧密码");
        return
      }
      if (this.newPassword == '' || this.ConfirmNewPassword == '') {
        this.$message.warning("请输入新密码");
        return
      }
      if (this.newPassword != this.ConfirmNewPassword) {
        this.$message.warning("两次输入密码不一致");
      }else{
        let postData = `personnelId=${sessionStorage.getItem("personnelId")}&phoneNumber=${this.phone}&password=${this.oldPassword}&newPassword=${this.newPassword}`
        Vue.axios({
          url: '/commercialPersonnel/updateCommercialPersonnelPwd',
          method: 'post',
          headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: postData
        }).then(res=>{
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("修改成功");
            this.$router.push({ path: "login" });
          }else{
            // this.$message.warning(res.data.message);
            this.$message.warning('旧密码输入错误');
          }
        })
      }
    },
    //修改密码取消
    cancel() {
      this.oldPassword = "";
      this.newPassword = "";
      this.ConfirmNewPassword = "";
      this.modificationTrue = false;
    },
    handleOpen(key, keyPath) {
      console.log(123);
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("1234");
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.iconfont {
  margin-left: 3px;
  margin-right: 9px;
  font-size: 16px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
section {
  width: 100%;
  height: 100%;
  list-style: none;
}
#all {
  width: 100%;
  height: 100%;
  font-family: Microsoft Yahei;
}

/* 头部 */
.allHead {
  width: 100%;
  height: 60px;
  background-color: #000000;
  padding: 15px 30px 20px 30px;
  display: flex;
  justify-content: space-between;
}
.allHead-img {
  margin-top: -3px;
}
.img {
  cursor: pointer;
}

.allHead-div {
  margin-right: 15px;
  position: relative;
}
.allHead-span2 {
  font-size: 14px;
  color: white;
  margin: 0 8px 0 0px;
}
/* 退出 */
.quit {
  width: 160px;
  /* height: 52px; */
  background-color: #ffffff;
  border-radius: 2px;
  position: absolute;
  top: 45px;
  left: -30px;
  padding: 7px 0;
}
.quitDiv {
  width: 100%;
  height: 38px;
  line-height: 38px;
}
.quitDiv:hover {
  background-color: #e9ebec;
}
.allHead-span {
  font-size: 16px;
  color: white;
  margin-left: 15px;
}
.all {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}
/* 左边 */
#left {
  flex-shrink: 0;
  width: 220px;
  height: 100%;
  background-color: #1a1d27;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 20px 10px;
}
#left::-webkit-scrollbar {
  width: 0px;
}
#left1 {
  /* flex-shrink: 0; */
  width: 78px;
  height: 100%;
  background-color: #1a1d27;
  /* box-sizing: border-box; */
  position: relative;
  padding: 20px 10px 0 10px;
}
.overflew {
  height: 100%;
}
/* 选中时变色 */
.color {
  font-weight: bold;
  background-color: #c8e0f0;
}
.leftColor {
  background-color: #3a3d51;
  color: #ffffff;
  border-radius: 6px;
}
.leftColor2 {
  color: #8a8d98;
}
.food-fenLeftSpanIssue {
  margin-left: 12px;
  color: #ffffff;
}
.color1 {
  background-color: #199ed8;
  color: white;
}
.food-fen {
  margin: 20px 10px 0 10px;
}
.food-fenLeft {
  height: 46px;
  border-radius: 6px;
  cursor: pointer;
}
.food-fenLeft2 {
  height: 46px;
  border-radius: 6px;
  cursor: pointer;
  line-height: 46px;
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.food-fenLeft2 img {
  margin-left: 19.5px;
  width: 18px;
  height: 18px;
}
/* 鼠标移入样式 */
.foodLeftShow {
  display: none;
  width: 210px;
  height: 80px;
  background-color: #1a1d27;
  border-radius: 4px;
  position: absolute;
  left: 58px;
  top: -17px;
  z-index: 10;
}
.food-fenLeft2:hover > .foodLeftShow {
  display: block;
}
.foodLeftShow:hover {
  display: none;
}
.foodLeftShow div {
  margin: 17px 10px 17px 20px;
  width: 180px;
  height: 46px;
  border-radius: 6px;
  padding-left: 20px;
}
.foodLeftShow1 {
  display: none;
  width: 210px;
  height: 126px;
  background-color: #1a1d27;
  border-radius: 4px;
  position: absolute;
  left: 58px;
  top: -17px;
  z-index: 10;
}
.food-fenLeft2:hover > .foodLeftShow1 {
  display: block;
}
.foodLeftShow1:hover {
  display: none;
}
.foodLeftShow1 div {
  margin: 0 10px 0 20px;
  width: 180px;
  height: 46px;
  border-radius: 6px;
  padding-left: 20px;
}
.foodLeftShow1 div:nth-child(1) {
  margin-top: 17px;
}
.foodLeftShow1 div:nth-child(2) {
  margin-bottom: 17px;
}
.food-fenLeftSpanIssue1 {
  background-color: #3a3d51;
  color: #ffffff;
}
.food-fenLeft img {
  margin: -6px 12px 0 20px;
}
.food-fenLeft span {
  line-height: 46px;
  font-size: 14px;
}
.food-fenLeftSpan {
  margin-left: 10px;
  color: #8a8d98;
}

/* 右边 */
.right {
  /* width: calc(1700px + 140px); */
  width: 100%;
  background-color: #f2f2f2;
  overflow: scroll;
  height: 100%;
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
}

.popupDiv {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
}
</style>