<!-- 审核失败 -->
<template>
  <div class="AuditFailure">
    <div class="AFDiv">
      <div style="display:flex;flex-direction:column;position:relative">
        <table>
          <tr>
            <th style="width:130px">昵称</th>
            <th style="width:130px">用户手机号码</th>
            <th style="width:150px">发布时间</th>
            <th style="width:200px;padding: 10px 12px;">标题</th>
            <th>内容详情</th>
            <th style="width:100px">分类</th>
            <th style="width:100px">标签</th>
            <th style="width:50px">配图</th>
            <th style="width:80px">审核人员</th>
            <th style="width:150px">审核时间</th>
            <th style="width:200px">失败原因</th>
          </tr>
        </table>
        <div class="overflow" v-if="failureTotal != 0">
          <table>
            <tr v-for="(item, index) in failureAll" :key="index">
              <td style="width:130px">{{item.userName}}</td>
              <td style="width:130px">{{item.userPhoneNum}}</td>
              <td style="width:150px">{{item.addTime}}</td>
              <td style="width:200px;padding: 10px 12px;">{{item.publishName}}</td>
              <td
                style="text-align:justify;padding: 10px 12px;"
              >{{item.publishDetails}}</td>
              <td style="width:100px">{{item.classifyName}}</td>
              <td style="width:100px">
                <li v-for="(label,i) in item.publishLabelList" :key="i">
                  <span>{{label.labelContent}}</span>
                </li>
              </td>
              <td style="width:50px;cursor:pointer" @click="slideshow(index)">[{{item.detailImageCount + 1}}图]</td>
              <td style="width:80px;">{{item.auditorUserName}}</td>
              <td style="width:150px">{{item.auditorTime}}</td>
              <td style="width:200px">{{item.contentViolationDetail}}</td>
            </tr>
          </table>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div v-if="failureTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="failureTotal != 0"
          class="page"
          :total="failureTotal"
          :current="failurePageNum"
          :page-size="failurePagesize"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          @on-change="failurePageNumChange"
          @on-page-size-change="failurePagesizeChange"
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
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      spinShow: false, //懒加载
      imageUrl: [], //图片弹窗展示数组
      shutPreviewTrue: false, //图片查看弹窗
      k: "", //开始时间
      j: "", //结束时间
      phone: "", //输入的手机号
      classifyID: '', //选中的分类id
      matching: '', //要匹配的内容
      failureTotal: 0, //审核失败数据总条数
      failureAll: [], //审核失败总数据
      failurePageNum: 1, //审核失败当前页
      failurePagesize: 10, //审核失败每页数据条数
      // urls: "http://192.168.0.190:8080", //测试地址
      // urls: "https://www.baiduyuyue.com/management", //线上地址
    };
  },

  components: {},

  computed: {},
  created() {
    this.k = this.$parent.k;
    this.j = this.$parent.j;
    this.phone = this.$parent.publishPhone;
    this.classifyID = this.$parent.classifyID;
    this.matching = this.$parent.matching;
    // console.log(this.k, this.j, this.phone, this.classifyID);
  },
  mounted() {
    this.search()
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
        this.failurePageNum = 1;
        this.failurePagesize = 10;
      }
      // console.log("审核失败", k, j, s, f);
      Vue.axios.get(`/promotePublish/queryPromotePublishList?auditStatus=3&startDate=${this.k}&endDate=${this.j}&phoneNumber=${this.phone}&promotePublishCliassifyId=${this.classifyID}&pageNum=${this.failurePageNum}&pageSize=${this.failurePagesize}&keyWord=${this.matching}`).then(res =>{
        // console.log(res);
        this.failureTotal = res.data.data.total;
        this.failureAll = res.data.data.list;
        this.spinShow = false;
      }).catch(err => {
        // console.log(err)
      });
    },
    //查看图片轮播
    slideshow(i) {
      this.shutPreviewTrue = true;
      this.imageUrl = [];
      for (let l = 0; l < this.failureAll[i].detailImageList.length; l++) {
        this.imageUrl.push(this.failureAll[i].detailImageList[l].imageUrl)
      }
      this.imageUrl.unshift(this.failureAll[i].imageUrl)
    },
    //关闭弹窗
    shutPreview(){
      this.shutPreviewTrue = false;
    },
    //修改审核失败当前页
    failurePageNumChange(value) {
      this.failurePageNum = value;
      this.search();
    },
    //修改审核失败每页数据条数
    failurePagesizeChange(value) {
      this.failurePagesize = value;
      this.search();
    }
  }
};
</script>
<style scoped>
@import '../../CSS/gonggong.css';
.page {
  margin: 7px 0 7px 10px;
}
.el-carousel__item img {
    width: 100%;
    height: 100%;
  }
.AuditFailure {
  width: 100%;
  height: 740px;
  padding: 40px 20px;
}
.AFDiv {
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
</style>