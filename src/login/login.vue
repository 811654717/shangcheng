<!--  -->
<template>
  <div id="All">
    <img class="img" src="https://images.baiduyuyue.com/background-bg.png" alt />
    <div class="All">
      <h3>商城后台管理</h3>
      <div class="div">
        <p>用户登录</p>
        <!-- <center style="text-align: right;">
          <span id="time"></span>
        </center>-->
        <ul>
          <li>
            <input class="input1" type="text" placeholder="请输入用户名" v-model="phoneNum" />
          </li>
          <li>
            <input class="input2" type="password" placeholder="请输入密码" v-model="password" />
          </li>
          <li style="margin: 18px 0 18px 50px;display:flex;align-items:center;">
            <input id="input" name="autoLogin" type="checkbox" v-model="checked" />
            <span style="font-size:14px;color:#ffffff;margin-left:7px">记住我的登录信息</span>
          </li>
          <li>
            <button @click="register">登录</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Message } from "element-ui";
export default {
  data() {
    return {
      phoneNum: "",
      password: "",
      checked: false
      // urls: "http://192.168.0.189:8080", //测试地址
      // urls: "https://www.baiduyuyue.com/management" //线上地址
    };
  },
  metaInfo: {
    title: "登录",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },

  components: {},

  created() {
    //     (function($) {
    // 				var _options = {};
    // 				var _container = {};
    // 				jQuery.fn.MyDigitClock = function(options) {
    // 					var id = $(this).get(0).id;
    // 					_options[id] = $.extend({}, $.fn.MyDigitClock.defaults, options);
    // 					return this.each(function() {
    // 						_container[id] = $(this);
    // 						showClock(id);
    // 					});
    // 					function showClock(id) {
    // 						var d = new Date;
    // 						var n = d.getFullYear();
    // 						var y = d.getMonth() + 1;
    // 						var r = d.getDate();
    // 						var h = d.getHours();
    // 						var m = d.getMinutes();
    // 						var s = d.getSeconds();
    //             var xingqi = d.getDay();
    //             console.log(xingqi)
    // 						var x = "";
    // 						if(xingqi == "0"){
    // 							var x = "星期天";
    // 						}else if(xingqi == "1"){
    // 							var x = "星期一";
    // 						}else if(xingqi == "2"){
    // 							var x = "星期二"
    // 						}else if(xingqi == "3"){
    // 							var x = "星期三"
    // 						}else if(xingqi == "4"){
    // 							var x = "星期四"
    // 						}else if(xingqi == "5"){
    // 							var x = "星期五"
    // 						}else if(xingqi == "6"){
    // 							var x = "星期六"
    // 						}
    // 						var ampm = "";
    // 						if(_options[id].bAmPm) {
    // 							if(h > 12) {
    // 								h = h - 12;
    // 								ampm = " PM";
    // 							} else {
    // 								ampm = " AM";
    // 							}
    // 						}
    // 						var templateStr = _options[id].timeFormat + ampm;
    // 						templateStr = templateStr.replace("{yyyy}", getDD(n));
    // 						templateStr = templateStr.replace("{mm}", getDD(y));
    // 						templateStr = templateStr.replace("{dd}", getDD(r));
    // 						templateStr = templateStr.replace("{HH}", getDD(h));
    // 						templateStr = templateStr.replace("{MM}", getDD(m));
    // 						templateStr = templateStr.replace("{SS}", getDD(s));
    // 						templateStr = templateStr.replace("{xxx}", gerxing(x));
    // 						var obj = $("#" + id);
    // 						obj.css("fontSize", _options[id].fontSize);
    // 						obj.css("fontFamily", _options[id].fontFamily);
    // 						obj.css("color", _options[id].fontColor);
    // 						obj.css("background", _options[id].background);
    // 						obj.css("fontWeight", _options[id].fontWeight);
    // 						//change reading
    // 						obj.html(templateStr)
    // 						//toggle hands
    // 						if(_options[id].bShowHeartBeat) {
    // 							obj.find("#ch1").fadeTo(800, 0.1);
    // 							obj.find("#ch2").fadeTo(800, 0.1);
    // 						}
    // 						setTimeout(function() {
    // 							showClock(id)
    // 						}, 1000);
    // 					}
    // 					function getDD(num) {
    // 						return(num >= 10) ? num : "0" + num;
    // 					}
    // 					function gerxing(num){
    // 						return num;
    // 					}
    // 					function refreshClock() {
    // 						setupClock();
    // 					}
    // 				}
    // 				//default values
    // 				jQuery.fn.MyDigitClock.defaults = {
    // 					// fontSize: '14px',
    // 					// fontFamily: 'Microsoft JhengHei, Century gothic, Arial',
    // 					// fontColor: 'black',
    // //					fontWeight: 'bold',
    // 					// background: '#fff',
    // 					timeFormat: '{yyyy}<span>-</span>{mm}<span>-<span>{dd}<span>&nbsp;&nbsp;&nbsp;</span>{HH}<span>:</span>{MM}<span>:</span>{SS}<span>&nbsp;&nbsp;</span>{xxx}',
    // 					bShowHeartBeat: false,
    // 					bAmPm: false
    // 				};
    // 			})(jQuery);
  },
  computed: {},

  mounted() {
    // $(document).ready(function() {
    //   $(function() {
    //     $("#time").MyDigitClock();
    //   });
    // });
    // console.log(sessionStorage.getItem("accessToken"));
    // console.log($("#input").prop("checked"));
    this.getCookie();
  },
  methods: {
    register() {
      if (this.phoneNum == "") {
        this.$message.warning("请输入用户名");
        return false;
      }
      if (this.password == "") {
        this.$message.warning("请输入密码");
        return false;
      }
      if (this.phoneNum != "" && this.password != "") {
        let number = /^\d+$/;
        console.log(number.test(this.phoneNum));
          //审核人员登录
          const postData = `userName=${this.phoneNum}&password=${this.password}`;
          sessionStorage.setItem("auditorId", 2);
          this.$router.push({ path: '/Head/commodity' });
          // Vue.axios({
          //   url: "/auditor/auditorLogin",
          //   method: "post",
          //   data: postData
          // }).then(res => {
          //   console.log(res);
          //   if (res.data.status == 200) {
          //     var this1 = this;
          //     if (this1.checked) {
          //       var name = this1.phoneNum;
          //       var pass = this1.password;
          //       this1.setCookie(name, pass, 1); //name:账号,pass:密码,1:保存的天数
          //     } else {
          //       this1.clearCookie();
          //     }
          //     // sessionStorage.setItem("auditorId", res.data.data.auditorId);
          //     // sessionStorage.setItem("roleId",res.data.data.roleId)
          //     // sessionStorage.setItem("personnelId",'');
          //     // sessionStorage.setItem("phone",'');
          //     // sessionStorage.setItem("loginName", res.data.data.auditorUserName);
          //     // console.log(sessionStorage.getItem("auditorId"));
          //     // sessionStorage.setItem("luyou", JSON.stringify(res.data.data.resources));
          //     // console.log(JSON.parse(sessionStorage.getItem("luyou")));
          //     this.$router.push({ path: Head });
          //   } else {
          //     this.$message.warning("您不是管理员或者账号密码错误！");
          //   }
          // });
      }
    },

    //设置Cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.phoneNum = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>
<style scoped>
template {
  width: 100%;
  height: 100%;
  text-align: center;
}
.img {
  width: 100%;
  height: 100%;
}
ul,
li {
  list-style-type: none;
}
div,
img,
button,
input,
ul,
li,
h3 {
  padding: 0;
  margin: 0;
}
#All {
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: Microsoft Yahei;
  /* background: url(../image/bg.png) no-repeat; */
}
.All {
  width: 474px;
  height: 441px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* margin-top: 150px; */
}
.div {
  width: 474px;
  height: 350px;
  background-color: rgba(2, 2, 2, 0.75);
  border-radius: 8px;
}
h3 {
  font-size: 40px;
  margin-bottom: 32px;
  color: #ffffff;
}
p {
  font-size: 16px;
  color: #ffffff;
  padding-top: 38px;
}
.input1 {
  border: 1px solid #3872f6;
  border-radius: 2px;
  background-color: rgba(2, 2, 2, 0.75);
  font-size: 14px;
  color: #ffffff;
  width: 374px;
  height: 45px;
  line-height: 45px;
  box-sizing: border-box;
  margin: 24px 50px 20px 50px;
  background: url(https://images.baiduyuyue.com/background-用户名.png) no-repeat;
  background-position: 15px 10px;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.input2 {
  border: 1px solid #3872f6;
  border-radius: 2px;
  background-color: rgba(2, 2, 2, 0.75);
  font-size: 14px;
  color: #ffffff;
  width: 374px;
  height: 45px;
  line-height: 45px;
  box-sizing: border-box;
  margin: 0px 50px;
  background: url(https://images.baiduyuyue.com/background-密码.png) no-repeat 0
    0;
  background-position: 15px 10px;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.input1::-webkit-input-placeholder {
  color: #999999;
  font-size: 14px;
  /* line-height: 45px; */
}
.input2::-webkit-input-placeholder {
  color: #999999;
  font-size: 14px;
  /* line-height: 45px; */
}
button {
  width: 375px;
  height: 52px;
  background: #3872f6;
  color: white;
  border: none;
  border-radius: 2px;
}
</style>