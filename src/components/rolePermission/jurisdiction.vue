<!--  -->
<template>
  <div class="jurisdiction">
    <div class="head">
      <span>角色权限</span>
    </div>
    <div class="food" v-if="foodTrue">
      <div class="top">
        <span>账户</span>
        <input type="text" placeholder="请输入账号" v-model="account" />
        <span>选择角色</span>
        <Cascader class="amendDiv" :data="data" change-on-select @on-change="selectName"></Cascader>
        <button
          @click="inquire"
          type="button"
          class="layui-btn"
          style="margin: 0px 30px;background-color:#379EE9"
        >搜索</button>
      </div>
      <div class="bottom">
        <div class="Btop">
          <div v-for="item in jurisdicAll" :key="item.resourceId">
            <button
              v-if="item.resourceName == '新增'"
              @click="increase"
              type="button"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >新增</button>
            <button
              v-if="item.resourceName == '编辑'"
              @click="compile"
              type="button"
              class="layui-btn"
              style="margin-right: 30px;background-color:#379EE9"
            >编辑</button>
            <button
              v-if="item.resourceName == '删除'"
              @click="remove"
              type="button"
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
                <th style="width:130px">序号</th>
                <th style="width:130px">账号</th>
                <th style="width:130px">密码</th>
                <th style="width:130px">角色名称</th>
                <th style="width:130px">创建人</th>
                <th>创建时间</th>
              </tr>
            </table>
            <div class="overflow" style="height:401px" v-if="jurisdictionTotal != 0">
              <table>
                <tr
                  v-for="(item, index) in jurisdictionAll"
                  :key="index"
                  @click="trClick(index,item.auditorId)"
                  :style="{backgroundColor:(TRindex == index ? '#BEE1FF' : '')}"
                >
                  <td style="width:130px">{{index+1}}</td>
                  <td style="width:130px">{{item.auditorUserName}}</td>
                  <td style="width:130px">{{item.auditorPassword}}</td>
                  <td style="width:130px">{{item.roleName}}</td>
                  <td style="width:130px">{{item.addPeopleName}}</td>
                  <td>{{item.auditorAddTime}}</td>
                </tr>
              </table>
              <Spin size="large" fix v-if="spinShow"></Spin>
            </div>
            <div v-if="jurisdictionTotal == 0" class="noData">暂无数据</div>
            <Page
              v-if="jurisdictionTotal != 0"
              class="page"
              :total="jurisdictionTotal"
              :current="jurisdictionPageNum"
              :page-size="jurisdictionPageSize"
              :page-size-opts="[10,20,30]"
              show-elevator
              show-sizer
              show-total
              @on-change="jurisdictionPNChange"
              @on-page-size-change="jurisdictionPSChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="food" v-if="!foodTrue">
      <div class="XZ">
        <div class="XZone">
          <span>账号</span>
          <input type="text" placeholder="请输入账号" v-model="XZaccount" @change="accountInput" />
        </div>
        <div class="XZone">
          <span>密码</span>
          <input type="text" placeholder="请输入密码" v-model="XZpassword" @change="passwordInput" />
        </div>
        <div class="XZthree">
          <span>选择角色</span>
          <Cascader
            class="amendDiv"
            :data="data"
            v-model="compileValue"
            change-on-select
            @on-change="XZselectName"
          ></Cascader>
          <div v-for="item in jurisdicAll" :key="item.resourceId">
            <button
              v-if="item.resourceName == '创建角色'"
              @click="establish"
              type="button"
              class="layui-btn"
              style="background-color:#379EE9;height:32px;line-height:32px;margin: 0 30px;"
            >创建角色</button>
            <button
              v-if="item.resourceName == '角色管理'"
              @click="manage"
              type="button"
              class="layui-btn"
              style="background-color:#379EE9;height:32px;line-height:32px;"
            >角色管理</button>
          </div>
        </div>
        <div class="XZfour">
          <button
            @click="confirm"
            type="button"
            class="layui-btn"
            style="margin: 0px 30px;background-color:#379EE9"
          >确定</button>
          <button
            @click="goBack"
            type="button"
            class="layui-btn"
            style="margin: 0px 30px;background-color:#379EE9"
          >返回</button>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="popup" style="z-index:10" v-if="popupTrue">
      <div class="popupDiv">
        <div class="previewT">
          <span>创建角色</span>
          <span @click="shut">X</span>
        </div>
        <div>
          <div class="popupName">
            <span>角色名称</span>
            <input type="text" placeholder="请输入角色名称" v-model="popupName" @change="roleInput" />
          </div>
          <div class="XZjurisdiction">
            <span>角色权限</span>
            <div class="jurisdictionList">
              <!-- 首页 -->
              <div>
                <el-checkbox-group v-model="SYchecked" @change="SYchange">
                  <el-checkbox
                    :key="SYcheck.resourceId"
                    :label="SYcheck.resourceId"
                  >{{SYcheck.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 首页下的权限 -->
              <div>
                <el-checkbox-group v-model="SYcheckedList" @change="SYchangeList">
                  <el-checkbox
                    v-for="item in SYcheckList"
                    :label="item.resourceId"
                    :key="item.resourceId"
                  >{{item.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 任务中心 -->
              <div>
                <el-checkbox-group v-model="RWchecked" @change="RWchange">
                  <el-checkbox
                    :key="RWcheck.resourceId"
                    :label="RWcheck.resourceId"
                  >{{RWcheck.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 任务中心下的权限 -->
              <div>
                <el-checkbox-group v-model="RWcheckedList" @change="RWchangeList">
                  <el-checkbox
                    v-for="item in RWcheckList"
                    :label="item.resourceId"
                    :key="item.resourceId"
                  >{{item.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 审核中心 -->
              <div>
                <el-checkbox-group v-model="SHchecked" @change="SHchange">
                  <el-checkbox
                    :key="SHcheck.resourceId"
                    :label="SHcheck.resourceId"
                  >{{SHcheck.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 审核中心下的权限 -->
              <div>
                <el-checkbox-group v-model="SHcheckedList" @change="SHchangeList">
                  <el-checkbox
                    v-for="item in SHcheckList"
                    :label="item.resourceId"
                    :key="item.resourceId"
                  >{{item.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 角色权限 -->
              <div>
                <el-checkbox-group v-model="JSchecked" @change="JSchange">
                  <el-checkbox
                    :key="JScheck.resourceId"
                    :label="JScheck.resourceId"
                  >{{JScheck.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 角色权限下的权限 -->
              <div>
                <el-checkbox-group v-model="JScheckedList" @change="JSchangeList">
                  <el-checkbox
                    v-for="item in JScheckList"
                    :label="item.resourceId"
                    :key="item.resourceId"
                  >{{item.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 系统公告 -->
              <div>
                <el-checkbox-group v-model="XTchecked" @change="XTchange">
                  <el-checkbox
                    :key="XTcheck.resourceId"
                    :label="XTcheck.resourceId"
                  >{{XTcheck.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 系统公告下的权限 -->
              <div>
                <el-checkbox-group v-model="XTcheckedList" @change="XTchangeList">
                  <el-checkbox
                    v-for="item in XTcheckList"
                    :label="item.resourceId"
                    :key="item.resourceId"
                  >{{item.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 系统公告 -->
              <div>
                <el-checkbox-group v-model="SWchecked" @change="SWchange">
                  <el-checkbox
                    :key="SWcheck.resourceId"
                    :label="SWcheck.resourceId"
                  >{{SWcheck.resourceName}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 商务中心下的权限 -->
              <div class="business">
                <el-checkbox-group v-model="SWcheckedList" @change="SWchangeList" style="display: flex;flex-direction: column;justify-content:space-around;height: 110px">
                  <el-checkbox
                    v-for="item in SWcheckList"
                    :label="item.resourceId"
                    :key="item.resourceId"
                  >{{item.resourceName}}
                    <el-checkbox
                    v-for="it in item.auditorResources"
                    :label="it.resourceId"
                    :key="it.resourceId"
                  >{{it.resourceName}}</el-checkbox>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="operation">
            <button
              @click="CJaffirm"
              type="button"
              class="layui-btn"
              style="background-color:#379EE9;"
            >确认</button>
            <button
              @click="shut"
              type="button"
              class="layui-btn"
              style="background-color:#379EE9;margin-left:100px;"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="popupTrue1">
      <div class="popupDiv1">
        <div class="previewT">
          <span>角色管理</span>
          <span @click="shut1">X</span>
        </div>
        <div class="BtableD" style="margin:30px;">
          <table>
            <tr>
              <!-- style="width:130px" -->
              <th style="width:50px">序号</th>
              <th style="width:100px">角色名称</th>
              <th>操作</th>
            </tr>
          </table>
          <div class="overflow" style="height:465px;">
            <table>
              <tr v-for="(item, index) in managementAll" :key="index">
                <td style="width:50px">{{index+1}}</td>
                <td style="width:100px">{{item.roleName}}</td>
                <td>
                  <button
                    @click="redact(item.roleId)"
                    type="button"
                    class="layui-btn"
                    style="background-color:#379EE9;height:32px;line-height:32px;"
                  >编辑</button>
                  <button
                    @click="expurgate(item.roleId)"
                    type="button"
                    class="layui-btn"
                    style="background-color:#379EE9;height:32px;line-height:32px;"
                  >删除</button>
                </td>
              </tr>
            </table>
            <Spin size="large" fix v-if="spinShow"></Spin>
          </div>
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
      jurisdicAll: [], //当前路由下的分级权限
      account: "", //输入的账号
      data: [], //角色名称数据
      nameId: "", //选择的名称id
      TRindex: -1, //选中的tr下标
      TRid: "", //选中的tr数据id
      updateTrue: false, //是否点击了编辑
      manageTrue: false, //是否点击了角色管理
      jurisdictionTotal: 0, //权限数据条数
      jurisdictionPageNum: 1, //权限当前页
      jurisdictionPageSize: 10, //权限每页数据条数
      jurisdictionAll: [], //权限总数据
      spinShow: false, //懒加载
      foodTrue: true, //新增显示
      XZaccount: "", //新增输入的账号
      XZpassword: "", //新增输入的密码
      compileValue: [], //点击编辑显示的名称
      XZnameId: "", //新增选择的名称id
      popupTrue: false, //创建角色弹窗
      popupTrue1: false, //角色管理弹窗
      managementAll: [], //点击角色管理出现的角色总数据
      popupName: "", //创建角色输入的名称
      JSGLroleId: "", //角色管理内的编辑选中角色的id
      SYchecked: [], //首页权限选中
      // SYcheck: [{ label: "首页", id: 1000 }], //首页展示权限数据
      SYcheck: [], //首页展示权限数据
      SYcheckedList: [], //首页下的权限选中
      // SYcheckList: [
      //   { label: "新增数据", id: 1001 },
      //   { label: "活跃数据", id: 1002 },
      //   { label: "发布数据", id: 1003 },
      //   { label: "分享数据", id: 1004 },
      //   { label: "曝光数据", id: 1005 },
      //   { label: "充值数据", id: 1006 },
      //   { label: "提现数据", id: 1007 }
      // ], //首页下的权限展示数据
      SYcheckList: [], //首页下的权限展示数据
      RWchecked: [], //任务中心权限选中
      RWcheck: [], //任务中心展示权限数据
      RWcheckedList: [], //任务中心下的权限选中
      RWcheckList: [], //任务中心下的权限展示数据
      SHchecked: [], //审核中心权限选中
      SHcheck: [], //审核中心展示权限数据
      SHcheckedList: [], //审核中心下的权限选中
      SHcheckList: [], //审核中心下的权限展示数据
      JSchecked: [], //角色权限权限选中
      JScheck: [], //角色权限展示权限数据
      JScheckedList: [], //角色权限下的权限选中
      JScheckList: [], //角色权限下的权限展示数据
      XTchecked: [], //系统公告权限选中
      XTcheck: [], //系统公告展示权限数据
      XTcheckedList: [], //系统公告下的权限选中
      XTcheckList: [], //系统公告下的权限展示数据
      SWchecked: [], //商务中心权限选中
      SWcheck: [], //商务中心展示权限数据
      SWcheckedList: [], //商务中心下的权限选中
      SWcheckList: [] //商务中心下的权限展示数据
      ,jurisdictionList: [], //权限总数据
    };
  },

  components: {},
  metaInfo: {
    title: "角色权限",
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
      if (luyou[index].resourceUrl == "jurisdiction") {
        this.jurisdicAll = luyou[index].auditorResources;
      }
    }
  },
  mounted() {
    console.log(this.jurisdicAll);
    Vue.axios.get("/auditorResouce/queryAllAuditorResource").then(res => {
      console.log(res);
      if (res.data.status == 200) {
        this.jurisdictionList = res.data.data;
        //首页
        this.SYcheck = res.data.data[0];
        this.SYcheckList = res.data.data[0].auditorResources;
        //任务中心
        this.RWcheck = res.data.data[1];
        this.RWcheckList = res.data.data[1].auditorResources;
        //审核中心
        this.SHcheck = res.data.data[2];
        this.SHcheckList = res.data.data[2].auditorResources;
        //角色权限
        this.JScheck = res.data.data[3];
        this.JScheckList = res.data.data[3].auditorResources;
        //系统公告
        this.XTcheck = res.data.data[4];
        this.XTcheckList = res.data.data[4].auditorResources;
        //商务中心
        this.SWcheck = res.data.data[5];
        this.SWcheckList = res.data.data[5].auditorResources;
      }
    });
    this.inquire();
    this.GetTheName();
  },

  methods: {
    //获取角色名称
    GetTheName() {
      Vue.axios.get("/role/queryAllRoleList").then(res => {
        console.log(res);
        this.data = convertTree(res.data.data);
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
    },
    //选择的名称
    selectName(value) {
      console.log(value[0]);
      if (value.length == 1) {
        this.nameId = value[0];
      } else {
        this.nameId = "";
      }
      console.log(this.nameId);
    },
    //新增选择的名称
    XZselectName(value) {
      if (value.length == 1) {
        this.XZnameId = value[0];
      } else {
        this.XZnameId = "";
      }
      console.log(this.XZnameId);
    },
    //搜索按钮
    inquire() {
      this.jurisdictionPageNum = 1;
      this.jurisdictionPageSize = 10;
      this.TRindex = -1;
      this.TRid = "";
      Vue.axios
        .get(
          `/auditor/queryAuditorList?userName=${this.account}&roleId=${this.nameId}&pageNum=${this.jurisdictionPageNum}&pageSize=${this.jurisdictionPageSize}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.jurisdictionAll = res.data.data.list;
            this.jurisdictionTotal = res.data.data.total;
          }
        });
      console.log(this.account, this.nameId);
    },
    search() {
      this.TRindex = -1;
      this.TRid = "";
      Vue.axios
        .get(
          `/auditor/queryAuditorList?userName=${this.account}&roleId=${this.nameId}&pageNum=${this.jurisdictionPageNum}&pageSize=${this.jurisdictionPageSize}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.jurisdictionAll = res.data.data.list;
            this.jurisdictionTotal = res.data.data.total;
          }
        });
      console.log(this.account, this.nameId);
    },
    //当前数据选中
    trClick(index, id) {
      console.log(index, id);
      this.TRindex = index;
      this.TRid = id;
    },
    //增加角色
    increase() {
      this.foodTrue = false;
    },
    //编辑角色
    compile() {
      console.log(this.data);
      if (this.TRid == "") {
        this.$Message.warning("请先选择要编辑的角色");
        return;
      }
      this.updateTrue = true;
      this.foodTrue = false;
      this.XZaccount = this.jurisdictionAll[this.TRindex].auditorUserName;
      this.XZpassword = this.jurisdictionAll[this.TRindex].auditorPassword;
      this.compileValue.push(this.jurisdictionAll[this.TRindex].roleId);
      console.log(this.compileValue);
    },
    //角色权限页面内删除角色
    remove() {
      if (this.TRid == "") {
        this.$Message.warning("请先选择要删除的角色");
        return;
      }
      let postData = `auditorId=${this.jurisdictionAll[this.TRindex].auditorId}`;
      Vue.axios({
        method: "post",
        url: "/auditor/deleteAuditorById",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("删除成功");
          this.search();
        }
      });
    },
    //改变权限当前页
    jurisdictionPNChange(value) {
      this.jurisdictionPageNum = value;
      this.search();
    },
    //改变权限每页数据条数
    jurisdictionPSChange(value) {
      this.jurisdictionPageSize = value;
      this.search();
    },
    //创建角色
    establish() {
      this.popupTrue = true;
    },
    //角色管理
    manage() {
      this.manageTrue = true;
      this.popupTrue1 = true;
      Vue.axios.get("/role/queryAllRoleList").then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.managementAll = res.data.data;
        }
      });
    },
    //输入的角色账号
    accountInput() {
      let ZZ = /^[A-Za-z0-9]+$/;
      if (!ZZ.test(this.XZaccount)) {
        this.$Message.warning("账号只能输入英文和数字");
        this.XZaccount = "";
        console.log("有");
      } else {
        console.log("没有");
      }
    },
    //输入的角色密码
    passwordInput() {
      let ZZ = /^[A-Za-z0-9]+$/;
      if (!ZZ.test(this.XZpassword)) {
        this.$Message.warning("密码只能输入英文和数字");
        this.XZpassword = "";
        console.log("有");
      } else {
        console.log("没有");
      }
    },
    //输入的角色名称
    roleInput() {
      let ZZ = / /g;
      if (ZZ.test(this.popupName)) {
        this.$Message.warning("账号内不能有空格");
        this.popupName = "";
        console.log("有");
      } else {
        console.log("没有");
      }
    },
    //新增确定
    confirm() {
      console.log(this.compileValue);
      if (this.compileValue.length != 0) {
        this.XZnameId = this.compileValue[0];
      }
      if (
        this.XZaccount == "" ||
        this.XZpassword == "" ||
        this.XZnameId == ""
      ) {
        this.$Message.warning("请先完善信息");
        return;
      }
      console.log(this.XZnameId);
      if (this.updateTrue) {
        //更新
        let postData = `userName=${this.XZaccount}&password=${
          this.XZpassword
        }&roleId=${this.XZnameId}&addPeopleId=${sessionStorage.getItem(
          "auditorId"
        )}&auditorId=${this.jurisdictionAll[this.TRindex].auditorId}`;
        Vue.axios({
          method: "post",
          url: "/auditor/updateAuditorById",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("更新成功");
            this.goBack();
            console.log(this.TRindex);
            this.foodTrue = true;
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      } else {
        //添加
        let postData = `userName=${this.XZaccount}&password=${
          this.XZpassword
        }&roleId=${this.XZnameId}&addId=${sessionStorage.getItem("auditorId")}`;
        Vue.axios({
          method: "post",
          url: "/auditor/addAuditor",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            console.log(this.TRindex);
            this.$Message.success("添加成功");
            this.goBack();
            this.foodTrue = true;
            this.search();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      }
      this.updateTrue = false;
      console.log(this.TRindex);
    },
    //新增返回
    goBack() {
      this.foodTrue = true;
      this.XZaccount = "";
      this.XZpassword = "";
      this.XZnameId = "";
      this.compileValue = [];
      this.updateTrue = false;
      this.search();
      // console.log(this.XZnameId);
    },
    //关闭创建角色
    shut() {
      this.popupTrue = false;
      this.popupName = "";
      this.SYchecked = [];
      this.SYcheckedList = [];
      this.RWchecked = [];
      this.RWcheckedList = [];
      this.SHchecked = [];
      this.SHcheckedList = [];
      this.JSchecked = [];
      this.JScheckedList = [];
      this.XTchecked = [];
      this.XTcheckedList = [];
      this.SWchecked = [];
      this.SWcheckedList = [];
    },
    //关闭角色管理
    shut1() {
      this.popupTrue1 = false;
      this.manageTrue = false;
    },
    //首页权限选中
    SYchange(e) {
      console.log(e);
      console.log(this.SYchecked);
      if (e.length > 0) {
        for (let i = 0; i < this.jurisdictionList[0].auditorResources.length; i++) {
          this.SYcheckedList.push(this.jurisdictionList[0].auditorResources[i].resourceId);
        }
        // console.log(this.SYcheckedList);
      } else if (e.length == 0) {
        this.SYcheckedList = [];
      }
    },
    //首页下的权限选中
    SYchangeList(e) {
      console.log(e);
      console.log(this.SYcheckedList);
    },
    //任务中心权限选中
    RWchange(e) {
      console.log(e);
      console.log(this.RWchecked);
      if (e.length > 0) {
        for (let i = 0; i < this.jurisdictionList[1].auditorResources.length; i++) {
          this.RWcheckedList.push(this.jurisdictionList[1].auditorResources[i].resourceId);
        }
        // this.RWcheckedList = [2001, 2002, 2003];
      } else if (e.length == 0) {
        this.RWcheckedList = [];
      }
    },
    //任务中心下的权限选中
    RWchangeList(e) {
      console.log(e);
      console.log(this.RWcheckedList);
    },
    //审核中心权限选中
    SHchange(e) {
      console.log(e);
      console.log(this.SHchecked);
      if (e.length > 0) {
        for (let i = 0; i < this.jurisdictionList[2].auditorResources.length; i++) {
          this.SHcheckedList.push(this.jurisdictionList[2].auditorResources[i].resourceId);
        }
        // this.SHcheckedList = [3001, 3002, 3003];
      } else if (e.length == 0) {
        this.SHcheckedList = [];
      }
    },
    //审核中心下的权限选中
    SHchangeList(e) {
      console.log(e);
      console.log(this.SHcheckedList);
    },
    //角色权限权限选中
    JSchange(e) {
      console.log(e);
      console.log(this.JSchecked);
      if (e.length > 0) {
        for (let i = 0; i < this.jurisdictionList[3].auditorResources.length; i++) {
          this.JScheckedList.push(this.jurisdictionList[3].auditorResources[i].resourceId);
        }
        // this.JScheckedList = [4001, 4002, 4003, 4004, 4005];
      } else if (e.length == 0) {
        this.JScheckedList = [];
      }
    },
    //角色权限下的权限选中
    JSchangeList(e) {
      console.log(e);
      console.log(this.JScheckedList);
    },
    //系统公告权限选中
    XTchange(e) {
      console.log(e);
      console.log(this.XTchecked);
      if (e.length > 0) {
        for (let i = 0; i < this.jurisdictionList[4].auditorResources.length; i++) {
          this.XTcheckedList.push(this.jurisdictionList[4].auditorResources[i].resourceId);
        }
        // this.XTcheckedList = [5001, 5002, 5003];
      } else if (e.length == 0) {
        this.XTcheckedList = [];
      }
    },
    //系统公告下的权限选中
    XTchangeList(e) {
      console.log(e);
      console.log(this.XTcheckedList);
    },
    //商务中心权限选中
    SWchange(e) {
      console.log(e);
      console.log(this.SWchecked);
      if (e.length > 0) {
        for (let i = 0; i < this.jurisdictionList[5].auditorResources.length; i++) {
          this.SWcheckedList.push(this.jurisdictionList[5].auditorResources[i].resourceId);
          for (let l = 0; l < this.jurisdictionList[5].auditorResources[i].auditorResources.length; l++) {
            this.SWcheckedList.push(this.jurisdictionList[5].auditorResources[i].auditorResources[l].resourceId);
            
          }
        }
      } else if (e.length == 0) {
        this.SWcheckedList = [];
      }
    },
    //商务中心下的权限选中
    SWchangeList(e) {
      console.log(e);
      console.log(this.SWcheckedList);
    },

    //创建角色确认
    CJaffirm() {
      let arr1 = this.SYchecked;
      let arr2 = this.SYcheckedList;
      let arr3 = this.RWchecked;
      let arr4 = this.RWcheckedList;
      let arr5 = this.SHchecked;
      let arr6 = this.SHcheckedList;
      let arr7 = this.JSchecked;
      let arr8 = this.JScheckedList;
      let arr9 = this.XTchecked;
      let arr10 = this.XTcheckedList;
      let arr11 = this.SWchecked;
      let arr12 = this.SWcheckedList;
      let arrAll = [
        ...arr1,
        ...arr2,
        ...arr3,
        ...arr4,
        ...arr5,
        ...arr6,
        ...arr7,
        ...arr8,
        ...arr9,
        ...arr10,
        ...arr11,
        ...arr12
      ];
      console.log(arrAll);
      if (arrAll.length == 0 || this.popupName == "") {
        this.$Message.warning("请先完善信息");
        return;
      }
      if (this.manageTrue) {
        //更新角色
        let postData = `roleName=${this.popupName}&roleId=${this.JSGLroleId}&resourceList=${arrAll}`;
        Vue.axios({
          method: "post",
          url: "/role/updateRoleAndResourceById",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("更新成功");
            this.manage();
            this.shut();
            this.GetTheName();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      } else {
        console.log(this.popupName);
        //添加角色
        let postData = `roleName=${this.popupName}&resourceIds=${arrAll}`;
        Vue.axios({
          method: "post",
          url: "/role/addRole",
          data: postData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success("添加成功");
            this.shut();
            this.GetTheName();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      }
      this.updateTrue = false;
    },
    //角色管理内的编辑
    redact(id) {
      // this.popupTrue = true;
      this.popupTrue = !this.popupTrue;
      this.JSGLroleId = id;
      Vue.axios.get(`/role/queryRoleByRoleId?roleId=${id}`).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.popupName = res.data.data.roleName;
          for (
            let index = 0;
            index < res.data.data.auditorResources.length;
            index++
          ) {
            if (res.data.data.auditorResources[index].resourceId == 1000) {
              this.SYchecked = [1000];
              res.data.data.auditorResources[index].auditorResources.forEach(element => {
                // console.log(element);
                this.SYcheckedList.push(element.resourceId);
              });
              // this.SYcheckedList =
              //   res.data.data.auditorResources[index].resourcesIds;
            } else if (
              res.data.data.auditorResources[index].resourceId == 2000
            ) {
              this.RWchecked = [2000];
              res.data.data.auditorResources[index].auditorResources.forEach(element => {
                // console.log(element);
                this.RWcheckedList.push(element.resourceId);
              });
            } else if (
              res.data.data.auditorResources[index].resourceId == 3000
            ) {
              this.SHchecked = [3000];
              res.data.data.auditorResources[index].auditorResources.forEach(element => {
                // console.log(element);
                this.SHcheckedList.push(element.resourceId);
              });
            } else if (
              res.data.data.auditorResources[index].resourceId == 4000
            ) {
              this.JSchecked = [4000];
              res.data.data.auditorResources[index].auditorResources.forEach(element => {
                // console.log(element);
                this.JScheckedList.push(element.resourceId);
              });
            } else if (
              res.data.data.auditorResources[index].resourceId == 5000
            ) {
              this.XTchecked = [5000];
              res.data.data.auditorResources[index].auditorResources.forEach(element => {
                // console.log(element);
                this.XTcheckedList.push(element.resourceId);
              });
            }
             else if (
              res.data.data.auditorResources[index].resourceId == 6000
            ) {
              this.SWchecked = [6000];
              res.data.data.auditorResources[index].auditorResources.forEach(element => {
                console.log(element);
                this.SWcheckedList.push(element.resourceId);
                this.SWcheckedList = [...this.SWcheckedList,...element.resourcesIds]
              });
              console.log(this.SWcheckedList);
            }
          }
        }
      });
    },
    //角色管理内的删除
    expurgate(id) {
      Vue.axios({
        method: "post",
        url: "/role/deleteRoleByRoleId",
        data: `roleId=${id}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("删除成功");
          this.GetTheName();
          this.manage();
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../CSS/gonggong.css";
.jurisdiction {
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
.XZ {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding-left: 35%;
}
.XZone {
  margin-top: 50px;
  color: #333333;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.XZone span {
  margin: 0 30px;
}
.XZone input {
  width: 203px;
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
.XZthree {
  margin-top: 50px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  /* width: 90%; */
  color: #333333;
  font-size: 14px;
}
.XZthree span {
  margin-right: 30px;
}
.XZfour {
  margin-top: 300px;
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
}
.BtableD {
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  height: 100%;
  position: relative;
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
  width: 1000px;
  height: 800px;
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
.popupName {
  margin-top: 20px;
  /* margin-left: 150px; */
}
.popupName span {
  margin: 0 30px;
  font-size: 14px;
  color: #666666;
}
.popupName input {
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
.XZjurisdiction {
  display: flex;
  margin: 30px 0 0 0px;
}
.XZjurisdiction span {
  margin: 0 30px;
  font-size: 14px;
  color: #666666;
}
.XZjurisdiction > div div + div {
  margin-top: 10px;
}
.XZjurisdiction > div div:nth-child(even) {
  margin-left: 40px;
}
.jurisdictionList{
  height: 580px;
  overflow-y: auto;
}
.jurisdictionList::-webkit-scrollbar {
  width: 0px;
}
.operation {
  text-align: center;
  margin-top: 30px;
}
.popupDiv1 {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  top: 0%;
  bottom: 0;
  left: 0;
  right: 0;
  width: 700px;
  height: 600px;
  margin: auto;
  border-radius: 4px;
}
</style>