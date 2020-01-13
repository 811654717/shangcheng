<!-- 商户中心 -->
<template>
  <div class="ToAudit">
    <div class="Btop">
      <div>
        <el-input v-model="businessName" placeholder="请输入商务代表姓名" clearable></el-input>
      </div>
      <div>
        <el-input v-model="businessPhone" placeholder="请输入商务代表人手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <el-input v-model="leadName" placeholder="请输入所属领导" clearable></el-input>
      </div>
      <div>
        <el-input v-model="leadPhone" placeholder="请输入领导手机号" maxlength="11" clearable></el-input>
      </div>
      <div>
        <!-- value-format="yyyy-MM" -->
        <el-date-picker v-model="value2" type="month" placeholder="选择创建时间" @change="valueTime"></el-date-picker>
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
      <div>
        <div v-for="item in oneAll" :key="item">
          <el-button v-if="item == 6101" @click="educe" type="primary">导出</el-button>
        </div>
      </div>
    </div>
    <div class="TODiv">
      <div class="table" style="position:relative" ref="table">
        <table>
          <tr>
            <th style="width:50px">序号</th>
            <th style="width:80px">商务代表</th>
            <th style="width:120px">代表人手机号</th>
            <th style="width:100px">所属领导</th>
            <th style="width:120px">领导手机号</th>
            <th style="width:80px">维护客户</th>
            <th style="width:100px">结余首充人数</th>
            <th style="width:100px">结余充值金额</th>
            <th style="width:100px">结余物资金额</th>
            <th style="width:100px">本月首充人数</th>
            <th style="width:100px">本月充值金额</th>
            <th style="width:100px">本月物资金额</th>
            <th style="width:100px">本月充值总计</th>
            <th style="width:70px">所属等级</th>
            <th style="width:100px">月份</th>
          </tr>
        </table>
        <div class="overflow" v-if="BusinessTotal != 0">
          <table>
            <tr v-for="(item, index) in BusinessAll" :key="index">
              <td style="width:50px">{{index + 1}}</td>
              <td style="width:80px">{{item.personnelUserName}}</td>
              <td style="width:120px">{{item.personnelPhoneNumber}}</td>
              <td style="width:100px">
                <span v-if="item.leaderName == ''">-</span>
                <span v-else>{{item.leaderName}}</span>
              </td>
              <td style="width:120px">
                <span v-if="item.leaderPhoneNum == ''">-</span>
                <span v-else>{{item.leaderPhoneNum}}</span>
              </td>
              <td
                class="TDClick"
                style="width:80px;"
                @click="maintain(item.personnelId)"
              >{{item.clientsCount}}</td>
              <td
                class="TDClick"
                style="width:100px;"
                @click="surplus(item.personnelId)"
              >{{item.surplusFirstRechargePeople}}</td>
              <td
                class="TDClick"
                style="width:100px;"
                @click="surplusMoney(item.personnelId)"
              >{{item.surplusRechargeAmount}}</td>
              <td
                class="TDClick"
                style="width:100px;"
                @click="surplusMaterials(item.personnelId)"
              >{{item.surplusCommodityAomount}}</td>
              <td
                class="TDClick"
                style="width:100px;"
                @click="thisMonthRecharge(item.personnelId)"
              >{{item.theMonthFirstRechargePeople}}</td>
              <td
                class="TDClick"
                style="width:100px;"
                @click="thisMonthMoney(item.personnelId)"
              >{{item.theMonthRechargeAmount}}</td>
              <td
                class="TDClick"
                style="width:100px;"
                @click="thisMonthMaterials(item.personnelId)"
              >{{item.theMonthRechargeCommodityAmount}}</td>
              <td style="width:100px">{{item.theMonthRechargeAmountSum}}</td>
              <td style="width:70px">{{item.commercialPersonnelLevel}}</td>
              <td style="width:100px">{{item.monthDate}}</td>
            </tr>
          </table>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div v-if="BusinessTotal == 0" class="noData">暂无数据</div>
        <Page
          v-if="BusinessTotal != 0"
          class="page"
          :total="BusinessTotal"
          :current="BusinessPageNum"
          @on-change="BusinessPageNumChange"
          :page-size-opts="[10,20,30]"
          show-elevator
          show-sizer
          show-total
          :page-size="BusinessPagesize"
          @on-page-size-change="BusinessPagesizeChange"
        />
      </div>
    </div>
    <!-- 维护客户 -->
    <div v-if="maintainTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>维护客户</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">
                <input type="checkbox" id="trTh" @click="allElection()" />
              </th>
              <th style="width:110px">序号</th>
              <th style="width:110px">客户姓名</th>
              <th>客户手机号</th>
              <th style="width:110px">累计充值</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in maintainAll" :key="index">
                  <td style="width:50px">
                    <input type="checkbox" class="trTd" @click="publishedIfnClick(index)" />
                  </td>
                  <td style="width:110px">{{index + 1}}</td>
                  <td style="width:110px">{{item.rechargeCommercialName}}</td>
                  <td>{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:110px">{{item.rechargeAmountSum}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="display:flex;padding: 15px 30px">
          <div v-for="item in oneAll" :key="item">
            <!-- <el-button v-if="item == 6101" @click="educe" type="primary">导出</el-button> -->
            <el-button
              v-if="item == 6102"
              style="margin: 0"
              @click="TheOwnershipTransfer"
              type="primary"
            >归属转移</el-button>
          </div>

          <div v-if="transferTrue" style="display:flex">
            <el-select
              style="width: 150px;margin: 0 25px"
              v-model="transferName"
              filterable
              reserve-keyword
              placeholder="请选择业务员"
              @change="salesman"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
            <el-input
              style="width:150px;margin-right:24px;"
              v-model="salesmanPhone"
              placeholder="请确认业务员电话"
            ></el-input>
            <el-button style="margin: 0" @click="ConfirmTheTransfer" type="primary">确认转移</el-button>
          </div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <!-- 结余首充人数 -->
    <div v-if="surplusTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>结余首充人数</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:120px">客户姓名</th>
              <th>客户手机号</th>
              <th style="width:120px">首充金额</th>
              <th style="width:120px">创建时间</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in surplusNumber" :key="index">
                  <td style="width:50px">{{index + 1}}</td>
                  <td style="width:120px">{{item.rechargeCommercialName}}</td>
                  <td>{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:120px">{{item.rechargeAmount}}</td>
                  <td style="width:120px">{{item.enteringAddTime}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="surplusNumber == 0" class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结余充值金额 -->
    <div v-if="surplusMoneyTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>结余充值金额</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:120px">客户姓名</th>
              <th>客户手机号</th>
              <th style="width:120px">结余充值金额</th>
              <th style="width:120px">创建时间</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in surplusRecharge" :key="index">
                  <td style="width:50px">{{index + 1}}</td>
                  <td style="width:120px">{{item.rechargeCommercialName}}</td>
                  <td>{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:120px">{{item.rechargeAmount}}</td>
                  <td style="width:120px">{{item.enteringAddTime}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="surplusRecharge == 0" class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结余物资金额 -->
    <div v-if="surplusMaterialsTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>结余物资金额</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:80px">客户姓名</th>
              <th style="width:100px">客户手机号</th>
              <th style="width:100px">结余物资金额</th>
              <th>备注</th>
              <th style="width:100px">创建时间</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in surplusMaterialsAll" :key="index">
                  <td style="width:50px">{{index + 1}}</td>
                  <td style="width:80px">{{item.rechargeCommercialName}}</td>
                  <td style="width:100px">{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:100px">{{item.rechargeCommodityAomount}}</td>
                  <td>{{item.rechargeCommodityRemark}}</td>
                  <td style="width:100px">{{item.enteringAddTime}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="surplusMaterialsAll == 0" class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 本月首充人数 -->
    <div v-if="thisMonthTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>本月首充人数</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:120px">客户姓名</th>
              <th>客户手机号</th>
              <th style="width:120px">首充金额</th>
              <th style="width:120px">创建时间</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in monthNumber" :key="index">
                  <td style="width:50px">{{index + 1}}</td>
                  <td style="width:120px">{{item.rechargeCommercialName}}</td>
                  <td>{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:120px">{{item.rechargeAmount}}</td>
                  <td style="width:120px">{{item.enteringAddTime}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="monthNumber == 0" class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 本月充值金额 -->
    <div v-if="thisMonthMoneyTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>本月充值金额</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:120px">客户姓名</th>
              <th>客户手机号</th>
              <th style="width:120px">本月充值金额</th>
              <th style="width:120px">创建时间</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in monthrecharge" :key="index">
                  <td style="width:50px">{{index + 1}}</td>
                  <td style="width:120px">{{item.rechargeCommercialName}}</td>
                  <td>{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:120px">{{item.rechargeAmount}}</td>
                  <td style="width:120px">{{item.enteringAddTime}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="monthrecharge == 0" class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 本月物资金额 -->
    <div v-if="thisMonthMaterialsTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>本月物资金额</span>
          <span @click="shut">X</span>
        </div>
        <div class="maintain">
          <table style="table-layout:fixed;">
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:80px">客户姓名</th>
              <th style="width:100px">客户手机号</th>
              <th style="width:100px">本月物资金额</th>
              <th>备注</th>
              <th style="width:100px">创建时间</th>
            </tr>
          </table>
          <div class="overflow1">
            <table style="table-layout:fiexd;">
              <tbody>
                <tr v-for="(item,index) in monthMaterials" :key="index">
                  <td style="width:50px">{{index + 1}}</td>
                  <td style="width:80px">{{item.rechargeCommercialName}}</td>
                  <td style="width:100px">{{item.rechargeCommercialPhoneNumber}}</td>
                  <td style="width:100px">{{item.rechargeCommodityAomount}}</td>
                  <td>{{item.rechargeCommodityRemark}}</td>
                  <td style="width:100px">{{item.enteringAddTime}}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="monthMaterials == 0" class="noData">暂无数据</div>
          </div>
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
      spinShow: false, //懒加载
      // urls: "http://192.168.0.190:8080", //测试地址
      urls: "https://www.baiduyuyue.com/management", //线上地址

      BusinessTotal: 0, //商户数据总条数
      // BusinessTotal: 10, //商户数据总条数
      BusinessAll: [], //商户总数据
      BusinessPageNum: 1, //商务当前页
      BusinessPagesize: 10, //商务每页数据条数
      businessName: "", //输入的商务代表姓名
      businessPhone: "", //输入的商务代表手机号
      leadName: "", //输入的商务所属领导
      leadPhone: "", //输入的商务所属领导手机号
      value2: "",
      creationTime: "", //选择的创建日期
      lastMonth: "", //结余日期
      maintainTrue: false, //维护客户
      checkedCities: [],
      transferTrue: false, //维护客户 归属转移
      personnelIds: [], //转移的商户id集合
      shiftData: [], //可转移的目标数据
      options: [], //可转移的目标数据
      transferName: [], //选择的转移对象
      salesmanId: "", //选择的业务员
      salesmanPhone: "", //确认的业务员电话
      surplusTrue: false, //结余首充
      surplusMoneyTrue: false, //结余充值金额
      surplusMaterialsTrue: false, //结余物资金额
      thisMonthTrue: false, //本月首充
      thisMonthMoneyTrue: false, //本月充值金额
      thisMonthMaterialsTrue: false, //本月物资金额
      oneAll: [],
      maintainAll: [], //维护客户数据
      surplusNumber: [], //结余首充人数数据
      surplusRecharge: [], //结余充值金额数据
      surplusMaterialsAll: [], //结余物资金额数据
      monthNumber: [], //本月首充人数数据
      monthrecharge: [], //本月充值金额数据
      monthMaterials: [] //本月物资金额数据
    };
  },

  components: {},

  computed: {},
  created() {
    console.log(sessionStorage.getItem("auditorId"));
    console.log(sessionStorage.getItem("roleId"), "角色id");
    if (this.value2 == "") {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      this.value2 = year.toString() + "-" + month.toString();
      console.log(this.value2);
      //结余
      // var lastMonth = date.getMonth();
      // lastMonth = lastMonth < 10 ? "0" + lastMonth : lastMonth;
      // this.lastMonth = year.toString() + "-" + lastMonth.toString();
      // console.log(this.lastMonth);
    }
    this.oneAll = this.$parent.oneAll;
  },
  mounted() {
    this.inquire();
    this.transfer();
  },
  watch: {},
  methods: {
    //获取转移数据
    transfer() {
      Vue.axios.get("/commercialPersonnel/queryAllPersonnelList").then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.shiftData = res.data.data;
          res.data.data.forEach(element => {
            let {
              personnelId: value,
              personnelUserName: label,
              personnelPhoneNumber: phone
            } = element;
            this.options.push({
              value,
              label,
              phone
            });
          });
          console.log(this.options);
        }
      });
    },
    //选择日期处理
    valueTime(value) {
      // console.log(value);
      // console.log(value.getMonth() + 1);
      let month = value.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      this.creationTime = value.getFullYear() + "-" + month;
      // let lastMonth = value.getMonth();
      // lastMonth = lastMonth < 10 ? "0" + lastMonth : lastMonth;
      // this.lastMonth = value.getFullYear() + "-" + lastMonth;
      console.log(this.creationTime, this.lastMonth);
    },
    //搜索
    inquire() {
      console.log(this.creationTime, this.lastMonth);
      this.BusinessPageNum = 1; //商务当前页
      this.BusinessPagesize = 10;
      if (this.creationTime == "") {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.creationTime = year.toString() + "-" + month.toString();
        console.log(this.creationTime);
        // var lastMonth = date.getMonth();
        // lastMonth = lastMonth < 10 ? "0" + lastMonth : lastMonth;
        // this.lastMonth = year.toString() + "-" + lastMonth.toString();
        // console.log(this.lastMonth);
      }
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialPersonnel/queryBusinessCenter?personnelName=${
            this.businessName
          }&personnelPhoneNum=${this.businessPhone}&leaderName=${
            this.leadName
          }&leaderPhoneNum=${this.leadPhone}&rechargeMonth=${
            this.creationTime
          }&pageNum=${1}&pageSize=${10}&roleId=${sessionStorage.getItem(
            "roleId"
          )}&personnelId=${sessionStorage.getItem("personnelId")}`
        )
        .then(res => {
          console.log(res);
          this.BusinessTotal = res.data.data.total;
          this.BusinessAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //
    search() {
      console.log(this.creationTime);
      if (this.creationTime == "") {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.creationTime = year.toString() + "-" + month.toString();
        console.log(this.creationTime);
        // var lastMonth = date.getMonth();
        // lastMonth = lastMonth < 10 ? "0" + lastMonth : lastMonth;
        // this.lastMonth = year.toString() + "-" + lastMonth.toString();
        // console.log(this.lastMonth);
      }
      this.spinShow = true;
      Vue.axios
        .get(
          `/commercialPersonnel/queryBusinessCenter?personnelName=${
            this.businessName
          }&personnelPhoneNum=${this.businessPhone}&leaderName=${
            this.leadName
          }&leaderPhoneNum=${this.leadPhone}&rechargeMonth=${
            this.creationTime
          }&pageNum=${this.BusinessPageNum}&pageSize=${
            this.BusinessPagesize
          }&roleId=${sessionStorage.getItem(
            "roleId"
          )}&personnelId=${sessionStorage.getItem("personnelId")}`
        )
        .then(res => {
          console.log(res);
          this.BusinessTotal = res.data.data.total;
          this.BusinessAll = res.data.data.list;
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变商户当前页
    BusinessPageNumChange(value) {
      // console.log(value);
      this.BusinessPageNum = value;
      this.search();
    },
    //改变商户每页数据条数
    BusinessPagesizeChange(value) {
      // console.log(value);
      this.BusinessPagesize = value;
      this.search();
    },
    //维护客户
    maintain(i) {
      console.log(i);
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryClientListByPersonnelId?personnelId=${i}&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.maintainAll = res.data.data;
            this.maintainTrue = true;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //弹窗关闭
    shut() {
      //维护客户
      this.maintainTrue = false;
      this.transferName = [];
      this.personnelIds = [];
      this.salesmanId = "";
      this.salesmanPhone = "";
      //结余首充人数
      this.surplusTrue = false;
      //结余充值金额
      this.surplusMoneyTrue = false;
      //结余物资金额
      this.surplusMaterialsTrue = false;
      //本月首充人数
      this.thisMonthTrue = false;
      //本月充值金额
      this.thisMonthMoneyTrue = false;
      //本月物资金额
      this.thisMonthMaterialsTrue = false;
      //转移
      this.transferTrue = false;
    },
    //全选
    allElection() {
      if (event.target.checked == true) {
        for (let i = 0; i < $(".trTd").length; i++) {
          $(".trTd")[i].checked = true;
          if (
            this.personnelIds.indexOf(this.maintainAll[i].commercialId) == -1
          ) {
            this.personnelIds.push(this.maintainAll[i].commercialId);
            console.log(this.personnelIds);
          }
        }
      } else {
        for (let i = 0; i < $(".trTd").length; i++) {
          $(".trTd")[i].checked = false;
        }
        this.personnelIds = [];
      }
    },
    //点击选中
    publishedIfnClick(index) {
      if ($(".trTd")[index].checked == true) {
        if (
          this.personnelIds.indexOf(this.maintainAll[index].commercialId) == -1
        ) {
          this.personnelIds.push(this.maintainAll[index].commercialId);
        }
      } else {
        this.personnelIds.splice(
          this.personnelIds.indexOf(this.maintainAll[index].commercialId),
          1
        );
      }
      console.log(this.personnelIds);
    },
    //
    salesman(value) {
      console.log(this.salesmanId);
      console.log(value);
      this.salesmanId = value.value;
      this.salesmanPhone = value.phone;
      // for (let i = 0; i < this.shiftData.length; i++) {
      //   if (value == this.shiftData[i].personnelId) {
      //     this.salesmanPhone = this.shiftData[i].personnelPhoneNumber;
      //   }
      // }
    },
    //归属转移
    TheOwnershipTransfer() {
      this.transferTrue = !this.transferTrue;
    },
    //确认转移
    ConfirmTheTransfer() {
      console.log(this.salesmanId);
      console.log(this.personnelIds, "转移的id集合");
      Vue.axios({
        method: "post",
        url: "/commercialRechargeEntering/updatePersonnelIdByCommercialId",
        data: `commercialIds=${this.personnelIds}&personnelId=${this.salesmanId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.$Message.success("转移成功");
          this.search();
          this.shut();
          this.personnelIds = [];
        } else {
          this.$Message.warning(res.data.message);
        }
      });
    },
    //结余首充
    surplus(i) {
      console.log(i);
      console.log(this.creationTime);
      Vue.axios
        .get(
          `/commercialRechargeEntering/querySurplusRechargePeopleListByPersonnelId?personnelId=${i}&rechargeMonth=${
            this.creationTime
          }&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.surplusTrue = true;
            this.surplusNumber = res.data.data;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //结余充值金额
    surplusMoney(i) {
      console.log(i);
      console.log(this.creationTime);
      Vue.axios
        .get(
          `/commercialRechargeEntering/querySurplusRechargeAmountListByPersonnelId?personnelId=${i}&rechargeMonth=${
            this.creationTime
          }&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.surplusRecharge = res.data.data;
            this.surplusMoneyTrue = true;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //结余物资金额
    surplusMaterials(i) {
      console.log(i);
      console.log(this.creationTime);
      Vue.axios
        .get(
          `/commercialRechargeEntering/querySurplusCommodityAomountListByPersonnelId?personnelId=${i}&rechargeMonth=${
            this.creationTime
          }&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.surplusMaterialsAll = res.data.data;
            this.surplusMaterialsTrue = true;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //本月首充
    thisMonthRecharge(i) {
      console.log(i);
      console.log(this.creationTime);
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryTheMonthFirstRechargeListByPersonnelId?personnelId=${i}&rechargeMonth=${
            this.creationTime
          }&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.monthNumber = res.data.data;
            this.thisMonthTrue = true;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //本月充值金额
    thisMonthMoney(i) {
      console.log(i);
      console.log(this.creationTime);
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryTheMonthRechargeAmountListByPersonnelId?personnelId=${i}&rechargeMonth=${
            this.creationTime
          }&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.monthrecharge = res.data.data;
            this.thisMonthMoneyTrue = true;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //本月物资金额
    thisMonthMaterials(i) {
      console.log(i);
      console.log(this.creationTime);
      Vue.axios
        .get(
          `/commercialRechargeEntering/queryTheMonthRechargeCommodityAmountListByPersonnelId?personnelId=${i}&rechargeMonth=${
            this.creationTime
          }&clickPerssonnelId=${sessionStorage.getItem(
            "auditorId"
          )}&roleId=${sessionStorage.getItem("roleId")}`
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.monthMaterials = res.data.data;
            this.thisMonthMaterialsTrue = true;
          } else {
            this.$message.warning(res.data.message);
          }
        });
    },
    //导出
    educe() {
      console.log(this.businessName);
      console.log(this.businessPhone);
      console.log(this.leadPhone);
      console.log(this.creationTime);
      if (this.creationTime == "") {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.creationTime = year.toString() + "-" + month.toString();
        console.log(this.creationTime);
      }
      console.log(
        `/commercialPersonnel/exportExcel?personnelName=${this.businessName}&personnelPhoneNum=${this.businessPhone}&leaderName=${this.leadName}&leaderPhoneNum=${this.leadPhone}&rechargeMonth=${this.creationTime}`
      );
      window.location.href = `http://192.168.0.190:8080/commercialPersonnel/exportExcel?personnelName=${
        this.businessName
      }&personnelPhoneNum=${this.businessPhone}&leaderName=${
        this.leadName
      }&leaderPhoneNum=${this.leadPhone}&rechargeMonth=${
        this.creationTime
      }&roleId=${sessionStorage.getItem(
        "roleId"
      )}&personnelId=${sessionStorage.getItem("personnelId")}`;
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
.overflow1 {
  height: 410px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overflow1::-webkit-scrollbar {
  width: 0px;
}
.overflow {
  height: 404px;
  overflow-y: scroll;
  overflow-x: hidden;
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

/* button {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 2px;
  background-color: #379ee9;
  cursor: pointer;
  color: #ffffff;
  font-size: 12px;
} */
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
.maintain {
  margin: 30px;
  border: 1px solid #e6e6e6;
}
.previewB {
  height: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.shutPreview {
  height: 100%;
  display: flex;
  justify-content: center;
}
.failure {
  height: 100%;
  padding: 60px 30px 40px;
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