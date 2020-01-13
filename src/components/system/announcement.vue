<template>
  <div class="system">
    <div class="head">
      <span>系统公告</span>
    </div>
    <div class="food">
      <div class="top">
        <span>标题</span>
        <input type="text" placeholder="请输入标题" v-model="headline" />
        <span>选择时间</span>
        <div class="layui-inline" style="margin-left:20px">
          <input type="text" class="layui-input" id="strDate" />
        </div>
        <span style="margin: 0 10px">-</span>
        <div class="layui-inline">
          <input type="text" class="layui-input" id="endDate" />
        </div>
        <button
          @click="inquire"
          type="submit"
          class="layui-btn"
          style="margin: 0px 30px;background-color:#379EE9"
        >搜索</button>
      </div>
      <div class="bottom">
        <div class="Btop">
          <div v-for="item in systemAll" :key="item.resourceId">
            <button
              v-if="item.resourceName == '新增'"
              @click="increase"
              type="submit"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >{{item.resourceName}}</button>
            <button
              v-if="item.resourceName == '编辑'"
              @click="compile"
              type="submit"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >{{item.resourceName}}</button>
            <button
              v-if="item.resourceName == '删除'"
              @click="remove"
              type="submit"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >{{item.resourceName}}</button>
          </div>
        </div>
        <div class="Btable">
          <div class="BtableD">
            <table>
              <tr>
                <!-- style="width:130px" -->
                <th style="width:130px">序号</th>
                <th>标题</th>
                <th style="width:130px">发布人</th>
                <th style="width:200px">创建时间</th>
              </tr>
            </table>
            <div class="overflow" style="height:401px" v-if="announcementTotal != 0">
              <table>
                <tr
                  v-for="(item, index) in announcementAll"
                  :key="index"
                  @click="trClick(index,item.noticeId)"
                  :style="{backgroundColor:(TRindex == index ? '#BEE1FF' : '')}"
                >
                  <td style="width:130px">{{index+1}}</td>
                  <td>{{item.noticeTitle}}</td>
                  <td style="width:130px">{{item.auditorUserName}}</td>
                  <td style="width:200px">{{item.noticeAddTime}}</td>
                </tr>
              </table>
              
            </div>
            <div v-if="announcementTotal == 0" class="noData">暂无数据</div>
            <Page
              v-if="announcementTotal != 0"
              class="page"
              :total="announcementTotal"
              :current="announcementPageNum"
              :page-size="announcementPageSize"
              :page-size-opts="[10,20,30]"
              show-elevator
              show-sizer
              show-total
              @on-change="announcementPNChange"
              @on-page-size-change="announcementPSChange"
            />
          </div>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </div>
    </div>
    <div class="popup" v-if="popupTrue">
      <div class="popupDiv">
        <div class="one">
          <span>标题</span>
          <input type="text" placeholder="请输入标题" v-model="popupHeadline" />
        </div>
        <div class="two">
          <span>封面</span>
          <el-upload
            class="upload-demo"
            action="https://up-z1.qiniup.com/"
            :show-file-list="false"
            :data="qiniuyunToken"
            :on-success="handleAvatarSuccess"
            :limit="1"
            ref="elupload"
            accept="image/jpeg, image/gif, image/png, image/bmp"
          >
            <el-button style="margin:0 100px 0 50px;" size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="twoDiv">
            <img v-if="imageUrl" :src="imageUrl | imgSrc" class="avatar" />
          </div>
        </div>
        <div class="three">
          <span>网址</span>
          <input type="text" placeholder="请输入网址" v-model="URL" />
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
      systemAll: [], //权限数据
      headline: "", //输入的标题
      announcementAll: [], //系统公告总数据
      announcementTotal: 0, //系统公告数据总条数
      announcementPageNum: 1, //当前页
      announcementPageSize: 10, //当前每页数据条数
      TRindex: -1, //选中的公告下标
      GGid: '', //选中的公告id
      updateTrue: false, //是否点击了编辑
      spinShow: false, //懒加载
      popupTrue: false, //弹窗
      popupHeadline: "", //弹窗内的标题
      qiniuyunToken: "", //上传图片必须的token
      urls: "https://www.baiduyuyue.com/appointment", //线上地址
      imageUrl: "", //上传图片得到的地址
      URL: "" //输入的网址
    };
  },
  components: {},
  metaInfo: {
    title: "系统公告",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  watch: {},
  computed: {},
  created() {
    var luyou = JSON.parse(sessionStorage.getItem("luyou"));
    for (let index = 0; index < luyou.length; index++) {
      if (luyou[index].resourceUrl == "announcement") {
        this.systemAll = luyou[index].auditorResources;
      }
    }
    //获取图片上传token
    Vue.axios.get(this.urls + "/qiniu/getQiniuUploadToken").then(res => {
      // console.log(res, res.data.data);
      this.qiniuyunToken = { token: res.data.data };
    });
  },
  mounted() {
    // console.log(this.systemAll);
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
    setTimeout(() => {
      console.log($("#strDate").val() + "+00:00:00");
      console.log($("#endDate").val() + "+23:59:59");
      this.inquire();
    }, 500);
  },
  methods: {
    //搜索按钮
    inquire() {
      this.announcementPageNum = 1;
      this.announcementPageSize = 10;
      this.spinShow = true;
      this.TRindex = -1,
      this.GGid = '',
      Vue.axios
        .get(
          `/systemNotice/queryAllNotice?startDate=${$("#strDate").val() +
            "+00:00:00"}&endDate=${$("#endDate").val() +
            "+23:59:59"}&noticeTitle=${this.headline}&pageNum=${
            this.announcementPageNum
          }&pageSize=${this.announcementPageSize}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.spinShow = false;
            this.announcementTotal = res.data.data.total;
            this.announcementAll = res.data.data.list;
          }
        });
    },
    search() {
      this.spinShow = true;
      this.TRindex = -1,
      this.GGid = '',
      Vue.axios
        .get(
          `/systemNotice/queryAllNotice?startDate=${$("#strDate").val() +
            "+00:00:00"}&endDate=${$("#endDate").val() +
            "+23:59:59"}&noticeTitle=${this.headline}&pageNum=${
            this.announcementPageNum
          }&pageSize=${this.announcementPageSize}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.spinShow = false;
            this.announcementTotal = res.data.data.total;
            this.announcementAll = res.data.data.list;
          }
        });
    },
    //当前选中行
    trClick(index, id) {
      this.TRindex = index;
      this.GGid = id;
    },
    //新增
    increase() {
      this.popupTrue = true;
    },
    //编辑
    compile() {
      if (this.GGid == '') {
        this.$Message.warning("请选择要编辑的公告");
        return
      }
      this.popupTrue = true;
      this.updateTrue = true;
      this.popupHeadline = this.announcementAll[this.TRindex].noticeTitle;
      this.imageUrl = this.announcementAll[this.TRindex].noticeImageUrl;
      this.URL = this.announcementAll[this.TRindex].noticeUrl;
    },
    //删除
    remove() {
      if (this.GGid == '') {
        this.$Message.warning("请选择要删除的公告");
        return
      }
      Vue.axios({
        method: 'post',
        url: '/systemNotice/deleteNoticeByNoticeId',
        data: `noticeId=${this.GGid}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res=>{
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("公告删除成功");
          this.search();
        }
      })
    },
    //改变当前页
    announcementPNChange(value) {
      this.announcementPageNum = value;
      this.search();
    },
    //改变当前页数据条数
    announcementPSChange(value) {
      this.announcementPageSize = value;
      this.search();
    },
    handleAvatarSuccess(res, file) {
      this.$refs.elupload.clearFiles();
      console.log(res);
      console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.key;
      console.log(this.imageUrl);
    },
    //图片上传要求 :before-upload="beforeAvatarUpload"
    // beforeAvatarUpload(file) {
    //   console.log(file);
    //   // const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   // if (!isJPG) {
    //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
    //   // }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   // return isJPG && isLt2M;
    //   return isLt2M;
    // },
    //确定提交
    confirm() {
      if (this.popupHeadline == "" || this.imageUrl == "" || this.URL == "") {
        this.$Message.warning("请先完善信息");
        return;
      }
      if (this.updateTrue) {
        //更新
        let postData = `noticeTitle=${this.popupHeadline}&noticeImageUrl=${this.imageUrl}&noticeUrl=${this.URL}&auditorId=${sessionStorage.getItem("auditorId")}&noticeId=${this.GGid}`
      Vue.axios({
        method: "post",
        url: "/systemNotice/updateNoticeByNoticeId",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res=>{
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("公告更新成功");
          this.search();
          this.shut();
        } else{
          this.$Message.warning("公告更新失败");
        }
      })
      }else{
        //新增
        let postData = `noticeTitle=${this.popupHeadline}&noticeImageUrl=${this.imageUrl}&noticeUrl=${this.URL}&auditorId=${sessionStorage.getItem("auditorId")}`
      Vue.axios({
        method: "post",
        url: "/systemNotice/insertNotice",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res=>{
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("公告创建成功");
          this.search();
          this.shut();
        } else{
          this.$Message.warning("公告创建失败");
        }
      })
      }
      
    },
    //关闭弹窗
    shut() {
      this.popupTrue = false;
      this.popupHeadline = "";
      this.imageUrl = "";
      this.URL = "";
      this.updateTrue = false;
    }
  }
};
</script>

<style scoped>
@import "../../CSS/gonggong.css";
.system {
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
  height: 100%;
  padding: 30px 20px;
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
  padding-left: 5%;
}
.popupDiv span {
  color: #333333;
  font-size: 14px;
  margin-right: 20px;
}
.one {
  margin-top: 100px;
}
.one input {
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
  margin: 100px 0 0 300px;
}
</style>