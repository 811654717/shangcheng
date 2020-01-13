<!-- 人员管理 -->
<template>
  <div class="ToAudit">
    <div class="Btop">
      <div>
        <el-input v-model="representativeName" placeholder="请输入商务代表姓名" clearable></el-input>
      </div>
      <div>
        <el-input v-model="representativePhone" placeholder="请输入商务代表人手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <el-input v-model="leadName" placeholder="请输入所属领导" clearable></el-input>
      </div>
      <div>
        <el-input v-model="leadPhone" placeholder="请输入领导手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <el-select style="width: 150px;margin: 0 25px" v-model="positionName" placeholder="请选择职位">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div style="display:flex;align-items: center;">
        <el-button style="margin: 0" @click="inquire" type="primary">搜索</el-button>
        <!-- <button
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
        </button>-->
      </div>
      <div v-for="item in twoAll" :key="item">
        <el-button v-if="item == 6201" type="primary" @click="newlyIncreased">新增</el-button>
        <el-button v-if="item == 6202" type="primary" @click="compile">编辑</el-button>
        <el-button v-if="item == 6203" type="primary" @click="expurgate">删除</el-button>
      </div>
    </div>
    <div class="TODiv">
      <div class="table" style="position:relative">
        <table>
          <tr>
            <th style="width:50px">序号</th>
            <th style="width:100px">商务代表</th>
            <th style="width:150px">代表人手机号</th>
            <th style="width:100px">所属领导</th>
            <th style="width:150px">领导手机号</th>
            <th style="width:100px">职位</th>
            <!-- <th></th> -->
          </tr>
        </table>
        <div class="overflow" v-if="personnelTotal != 0">
          <table>
            <tr
              v-for="(item, index) in BusinessAll"
              :key="index"
              :style="{backgroundColor: TRIndex == index ? '#BEE1FF' : ''}"
              @click="TrClick(item.personnelId,index)"
            >
              <!-- <tr  > -->
              <td style="width:50px">{{index + 1}}</td>
              <td style="width:100px">{{item.personnelUserName}}</td>
              <td style="width:150px">{{item.personnelPhoneNumber}}</td>
              <td style="width:100px">
                <span v-if="item.leaderName == ''">-</span>
                <span v-else>{{item.leaderName}}</span>
              </td>
              <td style="width:150px">
                <span v-if="item.leaderPhoneNum == ''">-</span>
                <span v-else>{{item.leaderPhoneNum}}</span>
              </td>
              <td style="width:100px">{{item.roleName}}</td>
              <!-- <td></td> -->
            </tr>
          </table>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div v-if="personnelTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="personnelTotal != 0"
          class="page"
          :total="personnelTotal"
          :current="personnelPageNum"
          @on-change="personnelPageNumChange"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          :page-size="personnelPagesize"
          @on-page-size-change="personnelPagesizeChange"
        />
      </div>
    </div>
    <!-- 新增 -->
    <div v-if="newlyIncreasedTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>管理</span>
          <span @click="cancel">X</span>
        </div>
        <div class="maintain">
          <div>
            <span>商务代表 :</span>
            <el-input style="width: 200px;" v-model="newName" placeholder="请输入姓名" clearable></el-input>
          </div>
          <div>
            <span>商务代表手机号 :</span>
            <el-input style="width: 200px;" v-model="newPhone" maxlength="11" placeholder="请输入手机号" clearable></el-input>
          </div>
          <div>
            <span>所属领导 :</span>
            <el-select
              style="width: 200px;"
              v-model="leadershipName"
              filterable
              reserve-keyword
              clearable
              placeholder="请选择所属领导"
              @change="salesman"
            >
              <el-option
                v-for="item in shiftData"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>领导手机号 :</span>
            <el-input style="width: 200px;" v-model="newLeadPhone" maxlength="11" placeholder="请输入手机号" clearable></el-input>
          </div>
          <div>
            <span>职位 :</span>
            <el-select style="width: 200px;" v-model="newPositionName" placeholder="请选择职位">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="operatingButton">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </div>
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
      spinShow: false,
      personnelTotal: 0, //人员管理总条数
      // personnelTotal: 10, //人员管理总条数
      BusinessAll: [], //人员管理总数据
      personnelPageNum: 1, //人员管理当前页
      personnelPagesize: 10, //人员管理每页数据条数
      representativeName: "", //输入的商务代表姓名
      representativePhone: "", //输入的商务代表手机号
      leadName: "", //输入的商务所属领导
      leadPhone: "", //输入的商务所属领导手机号
      positionName: "", //选择的职位
      newlyIncreasedTrue: false, //新增
      checkedCities: [],
      options: [],
      shiftData: [], //
      leadershipName: "", //选择的领导对象
      newName: "", //新增的商务代表姓名
      newPhone: "", //新增的商务代表手机号
      newLeadName: "", //新增所属领导
      newLeadPhone: "", //新增所属领导手机号
      newPositionName: "", //新增的职位
      compileTrue: false, //是否点击了编辑
      TRIndex: -1,
      personnelId: "", //选中的商务人员id
      twoAll: []
    };
  },
  metaInfo: {
    title: "人员管理",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  components: {},

  computed: {},
  created() {
    this.twoAll = this.$parent.twoAll;
  },
  mounted() {
    this.inquire();
    this.GetTheName();
  },
  watch: {},
  methods: {
    //获取角色名称
    GetTheName() {
      this.shiftData = [];
      this.options = [];
      Vue.axios.get("/role/queryCommercialPersonnelRole").then(res => {
        console.log(res);
        this.options = convertTree(res.data.data);
        function convertTree(tree) {
          const result = [];
          tree.forEach(item => {
            let {
              roleId: value,
              roleName: label
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
      });
      Vue.axios
        .get("/commercialPersonnel/queryPersonnelListByRoleName")
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            // this.shiftData = res.data.data;
            res.data.data.forEach(element => {
              let {
                personnelId: value,
                personnelUserName: label,
                personnelPhoneNumber: phone
              } = element;
              this.shiftData.push({
                value,
                label,
                phone
              });
            });
            console.log(this.shiftData);
          }
        });
    },
    //搜索
    inquire() {
      this.personnelPageNum = 1;
      this.personnelPagesize = 10;
      console.log(this.positionName);
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialPersonnel/queryAllCommercialPersonnelList?personnelName=${
            this.representativeName
          }&personnelPhoneNum=${this.representativePhone}&leaderName=${
            this.leadName
          }&leaderPhoneNum=${this.leadPhone}&roleId=${
            this.positionName
          }&pageNum=${1}&pageSize=${10}`
        )
        .then(res => {
          console.log(res);
          this.personnelTotal = res.data.data.total;
          this.BusinessAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      console.log(this.positionName);
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialPersonnel/queryAllCommercialPersonnelList?personnelName=${this.representativeName}&personnelPhoneNum=${this.representativePhone}&leaderName=${this.leadName}&leaderPhoneNum=${this.leadPhone}&roleId=${this.positionName}&pageNum=${this.personnelPageNum}&pageSize=${this.personnelPagesize}`
        )
        .then(res => {
          console.log(res);
          this.personnelTotal = res.data.data.total;
          this.BusinessAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选中
    TrClick(id, index) {
      console.log(id, index);
      this.personnelId = id;
      this.TRIndex = index;
    },
    //改变商户当前页
    personnelPageNumChange(value) {
      // console.log(value);
      this.personnelId = '';
      this.TRIndex = -1;
      this.personnelPageNum = value;
      this.search();
    },
    //改变商户每页数据条数
    personnelPagesizeChange(value) {
      // console.log(value);
      this.personnelId = '';
      this.TRIndex = -1;
      this.personnelPagesize = value;
      this.search();
    },
    //新增弹窗
    newlyIncreased() {
      this.GetTheName();
      this.newlyIncreasedTrue = true;
    },
    //所选领导
    salesman(value) {
      console.log(value);
      if (value == "") {
        this.newLeadName = "";
        this.newLeadPhone = "";
      } else {
        this.newLeadName = value.label;
        this.newLeadPhone = value.phone;
      }
    },
    //关闭弹窗及取消
    cancel() {
      this.newlyIncreasedTrue = false;
      this.newName = "";
      this.newPhone = "";
      this.newLeadName = "";
      this.leadershipName = "";
      this.newLeadPhone = "";
      this.newPositionName = "";
      this.compileTrue = false;
      this.TRIndex = -1;
      this.personnelId = "";
    },
    //编辑
    compile() {
      this.GetTheName();
      if (this.TRIndex == -1) {
        this.$message({
          message: "请选择要编辑的信息",
          type: "warning"
        });
        return;
      }
      Vue.axios
        .get(
          `/commercialPersonnel/queryPersonnelByPersonnelId?personnelId=${this.personnelId}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.newName = res.data.data.personnelUserName;
            this.newPhone = res.data.data.personnelPhoneNumber;
            this.newLeadName = res.data.data.leaderName;
            this.leadershipName = res.data.data.leaderName;
            this.newLeadPhone = res.data.data.leaderPhoneNum;
            this.newPositionName = res.data.data.roleId;
          }
        });
      this.newlyIncreasedTrue = true;
      this.compileTrue = true; //点击了编辑
    },
    //删除
    expurgate() {
      if (this.TRIndex == -1) {
        this.$message({
          message: "请选择要删除的信息",
          type: "warning"
        });
        return;
      }
      Vue.axios({
        method: "post",
        url: "/commercialPersonnel/deletePersonnelByPersonnelId",
        data: `personnelId=${this.personnelId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        this.TRIndex = -1;
        if (res.data.status == 200) {
          this.$Message.success("删除成功");
          this.search();
        } else {
          this.$Message.warning(res.data.message);
        }
      });
    },
    //确认
    confirm() {
      console.log(this.options);
      console.log(this.compileTrue);
      console.log(this.newPositionName);
      console.log(this.newName);
      console.log(
        this.newPhone,
        this.newLeadName,
        this.newLeadPhone,
        this.newPositionName
      );

      if (this.newPositionName == this.options[2].value) {
        if (
          this.newName == "" ||
          this.newPhone == "" ||
          this.newPositionName == ""
        ) {
          this.$message.warning("请先完善信息");
          return;
        }
      } else {
        if (
          this.newName == "" ||
          this.newPhone == "" ||
          this.newLeadName == "" ||
          this.newLeadPhone == "" ||
          this.newPositionName == ""
        ) {
          this.$message.warning("请先完善信息");
          return;
        }
      }
      let postData = `personnelName=${this.newName}&personnelPhoneNum=${this.newPhone}&leaderName=${this.newLeadName}&leaderPhoneNum=${this.newLeadPhone}&roleId=${this.newPositionName}`;
      if (this.compileTrue) {
        //编辑
        Vue.axios({
          method: "post",
          url: "/commercialPersonnel/updatePersonnelInfo",
          data: postData + `&personnelId=${this.personnelId}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            // console.log(this.TRIndex);
            this.$Message.success("更新成功");
            this.cancel();
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      } else {
        //新增
        Vue.axios({
          method: "post",
          url: "/commercialPersonnel/insertPersonnel",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            // console.log(this.TRIndex);
            this.$Message.success("添加成功");
            this.cancel();
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
/* .el-select>.el-input{
  width: 120px;
  margin-left: 30px;
} */
@import "../../CSS/gonggong.css";
.overflow {
  height: 404px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overflow::-webkit-scrollbar {
  width: 0px;
}
.page {
  margin: 7px 0 7px 10px;
}
.Btop div + div {
  margin-left: 30px;
}
.Btop {
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  /* justify-content: space-between; */
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.ToAudit {
  width: 100%;
  padding: 35px 20px;
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

/* 预览弹窗 */
.popupDiv {
  width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
.previewT span:nth-child(2) {
  cursor: pointer;
}
.maintain {
  margin: 30px;
  display: flex;
  flex-direction: column;
  width: 55%;
}
.maintain div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.maintain div + div {
  margin-top: 20px;
}
.operatingButton {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
</style>