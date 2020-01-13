<!-- 审核通过 -->
<template>
  <div class="Approve">
    <div class="AppDiv">
      <div style="display:flex;flex-direction:column;position:relative">
        <table>
          <tr>
            <th style="width:130px">昵称</th>
            <th style="width:80px">发布id</th>
            <th style="width:80px">用户id</th>
            <th style="width:120px">用户手机号码</th>
            <th style="width:90px">发布时间</th>
            <th style="width:200px;padding: 10px 12px;">标题</th>
            <th style="width:200px;">内容详情</th>
            <th style="width:70px">分类</th>
            <th style="width:70px">标签</th>
            <th style="width:50px">配图</th>
            <th style="width:80px">总浏览量</th>
            <th style="width:80px">微信浏览</th>
            <th style="width:80px">小程序浏览</th>
            <th style="width:80px">APP浏览</th>
            <th style="width:60px">分享量</th>
            <th style="width:60px">点宣量</th>
            <th style="width:60px">收藏量</th>
            <th style="width:80px">审核人员</th>
            <th style="width:90px">审核时间</th>
            <th style="width:320px">操作</th>
          </tr>
        </table>
        <div class="overflow" v-if="ApproveTotal != 0">
          <table>
            <tr v-for="(item, index) in ApproveAll" :key="index">
              <td style="width:130px">{{item.userName}}</td>
              <td style="width:80px">{{item.publishId}}</td>
              <td style="width:80px">{{item.userId}}</td>
              <td style="width:120px">{{item.userPhoneNum}}</td>
              <td style="width:90px">{{item.addTime}}</td>
              <td style="width:200px;padding: 10px 12px;">{{item.publishName}}</td>
              <td style="width:200px;text-align:justify;padding: 10px 12px;">{{item.publishDetails}}</td>
              <td style="width:70px">{{item.classifyName}}</td>
              <td style="width:70px">
                <li v-for="(label,i) in item.publishLabelList" :key="i">
                  <span>{{label.labelContent}}</span>
                </li>
              </td>
              <td
                style="width:50px;cursor:pointer"
                @click="slideshow(index)"
              >[{{item.detailImageCount + 1}}图]</td>
              <td style="width:80px;">{{item.totalBrowseCount == '' ? 0 : item.totalBrowseCount}}</td>
              <td style="width:80px;">{{item.wechatBrowseCount == '' ? 0 : item.wechatBrowseCount}}</td>
              <td style="width:80px;">{{item.appletBrowseCount == '' ? 0 : item.appletBrowseCount}}</td>
              <td style="width:80px;">{{item.appBrowseCount == '' ? 0 : item.appBrowseCount}}</td>
              <td style="width:60px;">{{item.shareCount == '' ? 0 : item.shareCount}}</td>
              <td style="width:60px;">{{item.clickXuanCount == '' ? 0 : item.clickXuanCount}}</td>
              <td style="width:60px;">{{item.collectCount == '' ? 0 : item.collectCount}}</td>
              <td style="width:80px;">{{item.auditorUserName}}</td>
              <td style="width:90px">{{item.auditorTime}}</td>
              <td style="width:320px">
                <button
                  v-if="item.isRecommend == 1"
                  @click="recommend(item.publishId)"
                  class="layui-btn"
                >推荐</button>
                <button
                  v-if="item.isRecommend == 0"
                  @click="noRecommend(item.publishId)"
                  class="layui-btn"
                >不推荐</button>
                <button @click="comeToNothing(item.publishId)" class="layui-btn">失败</button>
                <button @click="remove(item.publishId)" class="layui-btn">删除</button>
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
        <div v-if="ApproveTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="ApproveTotal != 0"
          class="page"
          :total="ApproveTotal"
          :current="ApprovePageNum"
          :page-size="ApprovePagesize"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          @on-change="ApprovePageNumChange"
          @on-page-size-change="ApprovePagesizeChange"
        />
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
    <!-- v-loading="loading"  -->
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
            </el-select>-->
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
// import { Loading } from 'element-ui';
import { Message } from "element-ui";
export default {
  data() {
    return {
      spinShow: false, //懒加载
      imageUrl: [], //图片弹窗展示数组
      shutPreviewTrue: false, //图片查看弹窗
      k: "", //开始时间
      j: "", //结束时间
      phone: "", //输入的手机号
      classifyID: "", //选中的分类id
      matching: "", //要匹配的内容
      ApproveTotal: 0, //已通过数据总条数
      ApproveAll: [], //已通过总数据
      ApprovePageNum: 1, //已通过当前页
      ApprovePagesize: 10, //已通过每页数据条数
      // urls: "http://192.168.0.190:8080", //测试地址
      // urls: "https://www.baiduyuyue.com/management", //线上地址
      comeToNothingPublishID: "", //失败id
      failureTrue: false, //失败弹窗
      amendTrue: false, //修改分类弹窗
      textarea: "", //其他失败原因
      selected: "",
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
      ,data: [],
      value1: [], //修改分类
      modificationCI: "", //修改的分类id
      modificationPublishID: '', //要修改分类的发布ID
      // loading: true
    };
  },

  components: {},

  computed: {},

  mounted() {
    Vue.axios
      .get("/promoteClassify/queryAllPromoteClassify")
      .then(res => {
        console.log(res);
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
  created() {
    this.k = this.$parent.k;
    this.j = this.$parent.j;
    this.phone = this.$parent.publishPhone;
    this.classifyID = this.$parent.classifyID;
    this.matching = this.$parent.matching;
    // console.log(this.k, this.j, this.phone, this.classifyID);
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
        this.ApprovePageNum = 1;
        this.ApprovePagesize = 10;
      } else {
        console.log(k);
      }
      // console.log("审核通过", k, j, s, f);
      Vue.axios
        .get(
          `/promotePublish/queryPromotePublishList?auditStatus=2&startDate=${this.k}&endDate=${this.j}&phoneNumber=${this.phone}&promotePublishCliassifyId=${this.classifyID}&pageNum=${this.ApprovePageNum}&pageSize=${this.ApprovePagesize}&keyWord=${this.matching}`
        )
        .then(res => {
          console.log(res);
          this.ApproveTotal = res.data.data.total;
          this.ApproveAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          // console.log(err);
        });
    },
    //查看图片轮播
    slideshow(i) {
      this.shutPreviewTrue = true;
      this.imageUrl = [];
      for (let l = 0; l < this.ApproveAll[i].detailImageList.length; l++) {
        this.imageUrl.push(this.ApproveAll[i].detailImageList[l].imageUrl);
      }
      this.imageUrl.unshift(this.ApproveAll[i].imageUrl);
    },
    //关闭弹窗
    shutPreview() {
      this.shutPreviewTrue = false;
      this.previewTrue = false;
      this.failureTrue = false;
      this.selected = "";
      this.textarea = "";
      this.value1 = [];
    },
    //改变已通过当前页
    ApprovePageNumChange(value) {
      this.ApprovePageNum = value;
      this.search();
    },
    //改变已通过每页数据条数
    ApprovePagesizeChange(value) {
      this.ApprovePagesize = value;
      this.search();
    },
    //设置为推荐
    noRecommend(i) {
      console.log(i);
      let postData = `publishId=${i}&isRecommend=1&auditorId=${sessionStorage.getItem(
        "auditorId"
      )}`;
      console.log(postData);
      Vue.axios({
        method: "post",
        url: "/promotePublish/updatePublishToRecommend",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("操作成功");
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //设置为不推荐
    recommend(i) {
      console.log(i);
      let postData = `publishId=${i}&isRecommend=0&auditorId=${sessionStorage.getItem(
        "auditorId"
      )}`;
      console.log(postData);
      Vue.axios({
        method: "post",
        url: "/promotePublish/updatePublishToRecommend",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("操作成功");
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //审核失败
    comeToNothing(i) {
      // Loading.service(options);
      console.log(i);
      this.comeToNothingPublishID = i;
      this.failureTrue = true;
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
              console.log(res);
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
    //删除
    remove(i) {
      console.log(i);
      let postData = `publishId=${i}&auditorId=${sessionStorage.getItem(
        "auditorId"
      )}`;
      console.log(postData);
      Vue.axios({
        method: "post",
        url: "/promotePublish/updatePublishStatusToDelete",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("操作成功");
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改分类
    modification(i) {
      this.modificationPublishID = i;
      this.amendTrue = true;
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
.el-select-dropdown__wrap {
  max-height: 400px;
}
.el-scrollbar__bar.is-vertical > div {
  width: 100%;
  height: 210px;
} */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.Approve {
  width: 100%;
  height: 740px;
  padding: 40px 20px;
}
.AppDiv {
  width: 100%;
  height: 100%;
  border: 1px solid #e6e6e6;
}
/* 弹窗 */
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
  justify-content: space-between;
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
  padding: 0;
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