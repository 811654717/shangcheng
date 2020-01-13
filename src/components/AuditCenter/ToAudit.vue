<!-- 待审核 -->
<template>
  <div class="ToAudit">
    <div class="TODiv">
      <div class="table" style="position:relative">
        <table>
          <tr>
            <th style="width:130px">昵称</th>
            <th style="width:130px">用户手机号码</th>
            <th style="width:150px">发布时间</th>
            <th style="width:300px">标题</th>
            <th>内容详情</th>
            <th style="width:100px">分类</th>
            <th style="width:100px">标签</th>
            <th style="width:50px">配图</th>
            <th style="width:320px">操作</th>
          </tr>
        </table>
        <div class="overflow" v-if="ToAuditTotal != 0">
          <table>
            <tr v-for="(item, index) in ToAuditAll" :key="index">
              <td style="width:130px">{{item.userName}}</td>
              <td style="width:130px">{{item.userPhoneNum}}</td>
              <td style="width:150px">{{item.addTime}}</td>
              <td style="width:300px;padding: 10px 12px;">{{item.publishName}}</td>
              <td style="text-align:justify;padding: 10px 12px;">{{item.publishDetails}}</td>
              <td style="width:100px">{{item.classifyName}}</td>
              <td style="width:100px">
                <li v-for="(label,i) in item.publishLabelList" :key="i">
                  <span>{{label.labelContent}}</span>
                </li>
              </td>
              <td
                style="width:50px;cursor:pointer"
                @click="slideshow(index)"
              >[{{item.detailImageCount + 1}}图]</td>
              <td style="width:320px">
                <button @click="preview(item.publishId)" class="layui-btn">预览</button>
                <button @click="comeToNothing(item.publishId)" class="layui-btn">失败</button>
                <button @click="via(item.publishId)" class="layui-btn">通过</button>
                <button
                  @click="modification(item.publishId)"
                  class="layui-btn"
                  style="width:84px"
                >修改分类</button>
              </td>
            </tr>
          </table>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div v-if="ToAuditTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="ToAuditTotal != 0"
          class="page"
          :total="ToAuditTotal"
          :current="ToAuditPageNum"
          @on-change="ToAuditPageNumChange"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          :page-size="ToAuditPagesize"
          @on-page-size-change="ToAuditPagesizeChange"
        />
      </div>
    </div>
    <!-- 预览弹窗 -->
    <div v-if="previewTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>预览详情</span>
          <span @click="shutPreview">X</span>
        </div>
        <div class="previewB">
          <div class="previewBDiv">
            <iframe
              v-if="iframeToAudit"
              id="iframe"
              ref="iframe"
              :src="iframeToAuditSrc"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <!-- 图片轮播弹窗 -->
    <div v-if="shutPreviewTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>查看图片</span>
          <span @click="shutPreview">X</span>
        </div>
        <div class="shutPreview">
          <el-carousel
            height="555px"
            :interval="0"
            arrow="always"
            style="width:100%;margin:20px auto;"
            :autoplay="false"
          >
            <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
              <img style="object-fit: contain" :src="item | imgSrc" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 失败弹窗 -->
    <div v-if="failureTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>失败</span>
          <span @click="shutPreview">X</span>
        </div>
        <div class="failure">
          <div id="select">
            <span>失败原因</span>
            <select class="select" id="testSelect" v-model="selected">
              <option value>请选择</option>
              <option>涉及等级/承诺/绝对化用语</option>
              <option>涉及夸大诱骗/虚假信息</option>
              <option>涉及非法/黄色/恐暴内容</option>
              <option>涉及侵权/未审核品牌资质/无授权</option>
              <option>企业/主体/信息不一致、不宜推广</option>
              <option>模糊/不清晰/违反美观度原则</option>
              <option>非法链接/链接有误</option>
              <option>涉及出现政治/武警/解放军/军警类元素</option>
              <option>涉及医学教育科研机构等组织或个人的名义、形象</option>
              <option>涉及医疗技术/诊疗方法/疾病名称/药物</option>
              <option>涉及宣传治愈率、有效率等诊疗效果</option>
              <option>涉及淫秽、迷信、荒诞等信息</option>
              <option>涉及医院等级、;类型等医院信息</option>
              <option>涉及医生姓名、患者姓名等信息</option>
              <option>涉及低俗/丑陋/负面炒作</option>
              <option>涉及误导性信息</option>
              <option>图文无关/出错/乱码</option>
              <option>企业信息、logo不易推广</option>
              <option>无OTC标志</option>
              <option value="100">其他原因</option>
            </select>
            <!-- <el-select class="select" v-model="selected" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </div>
          <div v-if="selected == 100" class="failureDiv2">
            <textarea placeholder="请输入其他原因" v-model="textarea"></textarea>
          </div>
          <div class="failureDiv3">
            <button @click="affirm(1)" class="layui-btn">确认</button>
            <button @click="affirm(2)" class="layui-btn">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 通过弹窗 -->
    <div v-if="passTrue" class="popup">
      <div class="popupPass">
        <div class="previewT">
          <span>通过详情</span>
          <span @click="shutPreview">X</span>
        </div>
        <div class="passDiv">
          <p>确定要通过该条发布吗?</p>
          <button @click="pass" class="layui-btn">确认</button>
        </div>
      </div>
    </div>
    <!-- 修改分类弹窗 -->
    <div v-if="amendTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>修改分类</span>
          <span @click="shutPreview">X</span>
        </div>
        <div class="amend">
          <div>
            <span>选择分类</span>
            <Cascader
              id="iviewCascader"
              class="amendDiv"
              :data="data"
              v-model="value1"
              change-on-select
              @on-change="pitchOn"
            ></Cascader>
          </div>
          <div>
            <button @click="amend(1)" class="layui-btn">确认</button>
            <button @click="amend(2)" class="layui-btn">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      previewTrue: false, //预览弹窗
      imageUrl: [], //图片弹窗展示数组
      shutPreviewTrue: false, //图片查看弹窗
      iframeToAuditSrc: "",
      iframeToAudit: true,
      failureTrue: false, //失败弹窗
      comeToNothingPublishID: "", //进行失败操作的发布ID
      textarea: "", //其他失败原因
      selected: "",
      elseTrue: false,
      passTrue: false, //通过弹窗
      passPublishID: "", //要通过的发布ID
      amendTrue: false, //修改分类弹窗
      spinShow: false, //懒加载
      // urls: "http://192.168.0.190:8080", //测试地址
      urls: "https://www.baiduyuyue.com/management", //线上地址

      k: "", //开始时间
      j: "", //结束时间
      phone: "", //输入的手机号
      classifyID: "", //选中的分类id
      modificationCI: "", //修改的分类id
      modificationPublishID: "", //要修改分类的发布ID
      matching: "", //要匹配的内容
      ToAuditTotal: 0, //待审核数据总条数
      ToAuditAll: [], //待审核总数据
      ToAuditPageNum: 1, //待审核当前页
      ToAuditPagesize: 10, //待审核每页数据条数
      value1: [], //修改分类
      data: [],
      options: [
        {
          value: "涉及等级/承诺/绝对化用语",
          label: "涉及等级/承诺/绝对化用语"
        },
        {
          value: "涉及夸大诱骗/虚假信息",
          label: "涉及夸大诱骗/虚假信息"
        },
        {
          value: "涉及非法/黄色/恐暴内容",
          label: "涉及非法/黄色/恐暴内容"
        },
        {
          value: "涉及侵权/未审核品牌资质/无授权",
          label: "涉及侵权/未审核品牌资质/无授权"
        },
        {
          value: "企业/主体/信息不一致、不宜推广",
          label: "企业/主体/信息不一致、不宜推广"
        },
        {
          value: "模糊/不清晰/违反美观度原则",
          label: "模糊/不清晰/违反美观度原则"
        },
        {
          value: "非法链接/链接有误",
          label: "非法链接/链接有误"
        },
        {
          value: "涉及出现政治/武警/解放军/军警类元素",
          label: "涉及出现政治/武警/解放军/军警类元素"
        },
        {
          value: "涉及医学教育科研机构等组织或个人的名义、形象",
          label: "涉及医学教育科研机构等组织或个人的名义、形象"
        },
        {
          value: "涉及医疗技术/诊疗方法/疾病名称/药物",
          label: "涉及医疗技术/诊疗方法/疾病名称/药物"
        },
        {
          value: "涉及宣传治愈率、有效率等诊疗效果",
          label: "涉及宣传治愈率、有效率等诊疗效果"
        },
        {
          value: "涉及淫秽、迷信、荒诞等信息",
          label: "涉及淫秽、迷信、荒诞等信息"
        },
        {
          value: "涉及医院等级、类型等医院信息",
          label: "涉及医院等级、类型等医院信息"
        },
        {
          value: "涉及医生姓名、患者姓名等信息",
          label: "涉及医生姓名、患者姓名等信息"
        },
        {
          value: "涉及低俗/丑陋/负面炒作",
          label: "涉及低俗/丑陋/负面炒作"
        },
        {
          value: "涉及误导性信息",
          label: "涉及误导性信息"
        },
        {
          value: "图文无关/出错/乱码",
          label: "图文无关/出错/乱码"
        },
        {
          value: "企业信息、logo不易推广",
          label: "企业信息、logo不易推广"
        },
        {
          value: "无OTC标志",
          label: "无OTC标志"
        },
        {
          value: "100",
          label: "其他原因"
        }
      ]
    };
  },

  components: {},

  computed: {},
  created() {
    // console.log(sessionStorage.getItem("auditorId"));
    this.k = this.$parent.k;
    this.j = this.$parent.j;
    this.phone = this.$parent.publishPhone;
    this.classifyID = this.$parent.classifyID;
    this.matching = this.$parent.matching;
    // console.log(this.k, this.j, this.phone, this.classifyID);
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
    if (this.k == "") {
      this.k = year + seperator1 + month + seperator1 + strDate + "+00:00:00";
    }
    if (this.j == "") {
      this.j = year + seperator1 + month + seperator1 + strDate + "+23:59:59";
    }
  },
  mounted() {
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
    this.search();
  },
  watch: {
    value1() {
      if (this.value1.length == 1) {
        // console.log(this.value1[0]);
        this.modificationCI = this.value1[0];
      } else if (this.value1.length == 2) {
        // console.log(this.value1[1]);
        this.modificationCI = this.value1[1];
      } else if (this.value1.length == 0) {
        // console.log(this.value1);
        this.modificationCI = "";
      }
    }
  },
  methods: {
    //传值
    search(k, j, s, f, m) {
      this.spinShow = true;
      if (k != undefined) {
        this.k = k;
        this.j = j;
        this.phone = s;
        this.classifyID = f;
        this.matching = m;
        this.ToAuditPageNum = 1;
        this.ToAuditPagesize = 10;
      }
      // console.log("待审核", k, j, s, f);
      Vue.axios
        .get(`/promotePublish/queryPromotePublishList?auditStatus=1&startDate=${this.k}&endDate=${this.j}&phoneNumber=${this.phone}&promotePublishCliassifyId=${this.classifyID}&pageNum=${this.ToAuditPageNum}&pageSize=${this.ToAuditPagesize}&keyWord=${this.matching}`
        )
        .then(res => {
          // console.log(res);
          this.ToAuditTotal = res.data.data.total;
          this.ToAuditAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变待审核当前页
    ToAuditPageNumChange(value) {
      // console.log(value);
      this.ToAuditPageNum = value;
      this.search();
    },
    //改变待审核每页数据条数
    ToAuditPagesizeChange(value) {
      // console.log(value);
      this.ToAuditPagesize = value;
      this.search();
    },
    //待审核 操作
    //预览
    preview(i) {
      // console.log(i);
      // this.iframeToAuditSrc = `https://www.baiduyuyue.com/web/mobile.html?from=singlemessage#/?publish_id=${i}&yyb=yyb`;
      // this.iframeToAuditSrc = `http://127.0.0.1:5500/backstageShare.html?publishId=${i}`;
      this.iframeToAuditSrc = `https://www.baiduyuyue.com/web/backstageShare.html?publishId=${i}`;

      this.previewTrue = true;
    },
    //失败
    comeToNothing(i) {
      //测试失败的发布id为11
      this.comeToNothingPublishID = i;
      this.elseTrue = false;
      this.failureTrue = true;
    },
    //通过
    via(i) {
      this.passPublishID = i;
      this.passTrue = true;
    },
    //修改分类
    modification(i) {
      this.modificationPublishID = i;
      this.amendTrue = true;
    },
    //关闭预览弹窗
    shutPreview() {
      this.previewTrue = false;
      this.shutPreviewTrue = false;
      this.failureTrue = false;
      this.passTrue = false;
      this.amendTrue = false;
      this.selected = "";
      this.textarea = "";
      this.value1 = [];
    },
    //查看图片轮播
    slideshow(i) {
      this.shutPreviewTrue = true;
      this.imageUrl = [];
      for (let l = 0; l < this.ToAuditAll[i].detailImageList.length; l++) {
        this.imageUrl.push(this.ToAuditAll[i].detailImageList[l].imageUrl);
      }
      this.imageUrl.unshift(this.ToAuditAll[i].imageUrl);
      // console.log(this.ToAuditAll[i].detailImageList);
      // this.imgLoad();
      // console.log(this.imageUrl);
    },
    //失败原因确定与取消
    affirm(i) {
      // console.log(i);
      switch (i) {
        // 1是确认
        case 1:
          console.log(this.selected);
          if (this.selected == "") {
            this.$Message.warning("请选择失败原因");
            return;
          } else if (this.selected == 100) {
            if (this.textarea == "") {
              this.$Message.warning("请输入失败原因");
              return;
            }
          }

          let violationDetail = "";
          if (this.selected == 100) {
            violationDetail = this.textarea;
          } else if (this.selected != 100) {
            violationDetail = this.selected;
          }

          let postData = `publishId=${
            this.comeToNothingPublishID
          }&auditStatus=3&auditorId=${sessionStorage.getItem(
            "auditorId"
          )}&violationDetail=${violationDetail}
          `;
          // console.log(postData);
          Vue.axios({
            method: "post",
            url: "/promotePublish/updateAuditStatusByPublishId",
            data: postData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          })
            .then(res => {
              // console.log(res);
              if (res.data.status == 200) {
                this.$Message.success("操作成功");
                this.search();
                this.selected = "";
                this.textarea = "";
                this.failureTrue = false;
              } else {
                this.$Message.warning(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
          // console.log(this.selected);
          // console.log("点击了确认");
          break;
        // 2是取消
        case 2:
          this.selected = "";
          // console.log("selected", this.selected);
          // console.log("点击了取消");
          this.failureTrue = false;
          break;
      }
    },
    //通过
    pass() {
      // console.log("点击了确认通过走请求弹窗消失");
      let postData = `publishId=${
        this.passPublishID
      }&auditStatus=2&auditorId=${sessionStorage.getItem("auditorId")}`;
      Vue.axios({
        method: "post",
        url: "/promotePublish/updateAuditStatusByPublishId",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        // console.log(res);
        if (res.data.status == 200) {
          this.search();
          this.passTrue = false;
        }
      });
    },
    // 选择的分类
    pitchOn(value) {
      // console.log(value, this.value1);
      // this.value1 = [];
      // this.modificationCI = '';
    },
    // 选择的分类确认与取消
    amend(i) {
      switch (i) {
        //1是确认
        case 1:
          // console.log(this.modificationCI);
          // console.log(this.value1);
          if (this.modificationCI == "") {
            this.$Message.warning("请选择修改分类");
            return;
          }
          let postData = `publishId=${this.modificationPublishID}&classifyId=${this.modificationCI}`;
          Vue.axios({
            method: "post",
            url: "/promotePublish/updateClassifyByPublishId",
            data: postData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          })
            .then(res => {
              // console.log(res);
              if (res.data.status == 200) {
                this.$Message.success("修改成功");
                this.search();
                this.amendTrue = false;
                this.value1 = [];
                this.modificationCI = "";
                // console.log(this.value1,"value1",this.modificationCI);
              }else{
                this.$Message.warning(res.data.message);
              }
            })
            .catch(err => {
              // console.log(err);
            });
          break;
        //2是取消
        case 2:
          this.amendTrue = false;
          this.value1 = [];
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
@import "../../CSS/gonggong.css";

.page {
  margin: 7px 0 7px 10px;
}
/* .select {
  margin-left: 50px;
  width: 360px;
}
#select /deep/ .el-select-dropdown__wrap {
    max-height: 400px !important;
} */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.ToAudit {
  width: 100%;
  height: 740px;
  padding: 40px 20px;
}
.TODiv {
  width: 100%;
  height: 100%;
  border: 1px solid #e6e6e6;
}
.table {
  display: flex;
  flex-direction: column;
}

button {
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
/* 预览弹窗 */
.popupDiv {
  width: 630px;
  height: 650px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
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
.previewB {
  height: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.previewBDiv {
  width: 270px;
  background: url(https://images.baiduyuyue.com/background-手机模型.png)
    no-repeat;
  position: relative;
}
iframe {
  position: absolute;
  top: 54px;
  left: 10px;
  width: 247px;
  height: 436px;
}
.shutPreview {
  height: 100%;
  display: flex;
  justify-content: center;
}
.failure {
  height: 100%;
  padding: 60px 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.failure > div:nth-child(1) {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.select {
  width: 500px;
  height: 35px;
  border: 1px solid #e6e6e6;
}

.failureDiv2 {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
}
textarea {
  width: 500px;
  height: 318px;
  border: 1px solid #e6e6e6;
  resize: none;
}
.failureDiv3 {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
.popupPass {
  width: 380px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
}
.passDiv {
  height: 100%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.amend {
  height: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.amend > div:nth-child(1) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.amend > div:nth-child(2) {
  margin-top: 460px;
  width: 40%;
  display: flex;
  justify-content: space-around;
}
.amendDiv {
  width: 70%;
}
</style>