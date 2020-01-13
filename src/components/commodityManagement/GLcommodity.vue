<!--  -->
<template>
  <div>
    <div class="content">
      <div class="contentDiv">
        <div>
          <span>商品分类</span>
          <el-select
            style="width:300px"
            v-model="GLclassifyId"
            filterable
            clearable
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span style="margin-right: 35px">商品图</span>
          <div>
            <el-upload
              class="upload"
              action="http://up-z1.qiniup.com/"
              list-type="picture-card"
              :on-remove="handleRemove"
              :before-upload="beforeUploading"
              :before-remove="beforeRemove"
              :limit="6"
              multiple
              :data="qiniuData"
              :on-exceed="exceed"
              :on-success="success"
              accept="image/jpeg, image/png"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" style="color:#999999" class="el-upload__tip">(建议尺寸1200*800像素,最多六张)</div>
            </el-upload>
            <draggable v-model="dialogImageUrl" @update="datadragEnd">
              <transition-group>
                <div v-for="item in dialogImageUrl" :key="item.imageUrl" class="drag-item">
                  <img :src="item.imageUrl" alt />
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div>
          <span style="margin-right: 50px">原价</span>
          <el-input style="width:300px" placeholder="请输入金额" v-model="originalPrice" clearable></el-input>
          <span style="margin-left: 10px">元</span>
        </div>
        <div>
          <span style="margin-right: 50px">现价</span>
          <el-input style="width:300px" placeholder="请输入金额" v-model="currentPrice" clearable></el-input>
          <span style="margin-left: 10px">元</span>
        </div>
        <div>
          <span style="margin-right: 35px">成本价</span>
          <el-input style="width:300px" placeholder="请输入金额" v-model="costPrice" clearable></el-input>
          <span style="margin-left: 10px">元</span>
        </div>
        <div>
          <span style="margin-right: 50px">标题</span>
          <el-input
            style="width:300px"
            type="textarea"
            placeholder="请输入标题"
            v-model="title"
            maxlength="60"
            show-word-limit
            clearable
          ></el-input>
        </div>
        <div>
          <span>计量单位</span>
          <el-select
            style="width:300px"
            v-model="metering"
            allow-create
            filterable
            default-first-option
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in meteringAll"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>
        <!-- 15张 -->
        <div>
          <span>图文详情</span>
          <div>
            <el-upload
              class="upload"
              action="http://up-z1.qiniup.com/"
              list-type="picture-card"
              :on-remove="handleRemove15"
              :before-upload="beforeUploading15"
              :before-remove="beforeRemove15"
              :limit="15"
              multiple
              :data="qiniuData15"
              :on-exceed="exceed15"
              :on-success="success15"
              accept="image/jpeg, image/png"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" style="color:#999999" class="el-upload__tip">(建议尺寸1200*800像素,最多15张)</div>
            </el-upload>
            <draggable v-model="dialogImageUrl15" @update="datadragEnd15">
              <transition-group>
                <div v-for="item in dialogImageUrl15" :key="item.imageUrl" class="drag-item">
                  <img :src="item.imageUrl" alt />
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
      <div>
        <h3>商品规格</h3>
        <div>
          <div class="specification">
            <span>规格名</span>
            <el-select
              style="width:150px"
              v-model="specificationOne"
              allow-create
              filterable
              default-first-option
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in specificationAll" :key="item.value" :value="item.label"></el-option>
            </el-select>
            <el-checkbox style="margin-left:10px;" v-model="checked">添加规格图片</el-checkbox>
          </div>
          <div class="specification">
            <span>规格值</span>
            <div style="display:inline-block;" v-for="(item,index) in inputAll" :key="index">
              <el-input
                style="width:150px;margin-right:15px;"
                placeholder="请输入规格值"
                v-model="inputAll[index].oneGG"
                clearable
              ></el-input>
            </div>
            <!-- style="color:#0390FB" -->
            <el-button @click="addSpecification" plain>添加规格值</el-button>
          </div>
          <div>
            <el-upload
              style="margin-top:20px;margin-left:85px"
              v-if="checked"
              class="upload"
              action="http://up-z1.qiniup.com/"
              list-type="picture-card"
              :on-success="success1"
              :on-remove="handleRemove1"
              :before-upload="beforeUploading1"
              :before-remove="beforeRemove1"
              :limit="this.inputAll.length"
              :data="qiniuData1"
              :on-exceed="exceed1"
              accept="image/jpeg, image/png"
            >
              <i class="el-icon-plus"></i>
              <div
                slot="tip"
                style="color:#999999"
                class="el-upload__tip"
              >(建议尺寸800*800像素,每个规格值最多1张规格图片)</div>
            </el-upload>
            <!-- <draggable v-model="dialogImageUrl1" @update="datadragEnd1">
              <transition-group>
                <div v-for="item in dialogImageUrl1" :key="item" class="drag-item">
                  <img :src="item" alt />
                </div>
              </transition-group>
            </draggable>-->
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <div class="specification">
            <span>规格名</span>
            <el-select
              style="width:150px"
              v-model="specificationTwo"
              allow-create
              filterable
              default-first-option
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in specificationAll" :key="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
          <div class="specification">
            <span>规格值</span>
            <div style="display:inline-block;" v-for="(item,index) in inputAllTwo" :key="index">
              <el-input
                style="width:150px;margin-right:15px;"
                placeholder="请输入规格值"
                v-model="inputAllTwo[index].attributeValue"
                clearable
              ></el-input>
            </div>
            <!-- style="color:#0390FB" -->
            <el-button @click="addSpecificationTwo" plain>添加规格值</el-button>
            <el-button type="primary" @click="SureToAdd" plain>确定添加</el-button>
          </div>
        </div>
      </div>
      <div>
        <h3>规格明细</h3>
        <div class="SpecificationDetails">
          <table>
            <tr>
              <th>{{specificationOne}}</th>
              <th v-if="specificationTwo != ''">{{specificationTwo}}</th>
              <th style="width:150px">现价(元)</th>
              <th style="width:150px">成本价(元)</th>
              <th style="width:150px">编号</th>
              <th style="width:150px;border-right:0">库存</th>
            </tr>
            <tr v-for="(item,index) in inputAll" :key="index">
              <td>{{item.oneGG}}</td>
              <td v-if="specificationTwo != ''">
                <div
                  class="TDDiv"
                  style="height: 60px;line-height: 60px;"
                  v-for="(Two,TwoIndex) in item.arr"
                  :key="TwoIndex"
                >{{Two.attributeValue}}</div>
              </td>
              <td>
                <div class="TDDiv" v-for="(Two,TwoIndex) in item.arr" :key="TwoIndex">
                  <el-input style="width:100px;margin:10px 0;" v-model="Two.currentPrice" clearable></el-input>
                </div>
              </td>
              <td>
                <div class="TDDiv" v-for="(Two,TwoIndex) in item.arr" :key="TwoIndex">
                  <el-input style="width:100px;margin:10px 0;" v-model="Two.costPrice" clearable></el-input>
                </div>
              </td>
              <td>
                <div class="TDDiv" v-for="(Two,TwoIndex) in item.arr" :key="TwoIndex">
                  <el-input style="width:100px;margin:10px 0;" v-model="Two.coding" clearable></el-input>
                </div>
              </td>
              <td>
                <div class="TDDiv" v-for="(Two,TwoIndex) in item.arr" :key="TwoIndex">
                  <el-input style="width:100px;margin:10px 0;" v-model="Two.inventory" clearable></el-input>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="MultipleChoice">
        <span>配送方式</span>
        <div>
          <el-radio v-model="distribution" label="1">快递发货</el-radio>
          <el-radio v-model="distribution" label="2">同城配送</el-radio>
          <el-radio v-model="distribution" label="3">到店自提</el-radio>
        </div>
      </div>
      <div class="MultipleChoice">
        <span>任务状态</span>
        <div>
          <el-radio v-model="task" label="1">上架</el-radio>
          <el-radio v-model="task" label="0">下架</el-radio>
        </div>
      </div>
      <div class="operation">
        <el-button type="primary" @click="preview">预览</el-button>
        <el-button type="primary" @click="preserve">保存</el-button>
        <el-button type="primary" @click=" reverseBack">返回</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <div v-if="popupTrue" class="popup">
      <div class="popupDiv">
        <div class="previewT">
          <span>预览</span>
          <span @click="shut">X</span>
        </div>
        <div class="particulars">
          <specification
            ref="zizujian"
            :dialogImageUrl="dialogImageUrl"
            :dialogImageUrl15="dialogImageUrl15"
            :originalPrice="originalPrice"
            :currentPrice="currentPrice"
            :title="title"
            :yybProductSpecificationList="yybProductSpecificationList"
            :yybProductSkuList="yybProductSkuList"
            :metering="metering"
            :imageUrl="imageUrl"
          ></specification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";
import draggable from "vuedraggable"; //拖动图片组件
import specification from "./specification"; //详情规格
export default {
  props: {
    classify: Array
  },
  data() {
    return {
      token: "",
      GLclassifyId: "", //添加或者编辑的分类id
      options: [],
      dialogImageUrl: [], //上传后的图片集合
      qiniuData: {
        key: "",
        token: ""
      },
      dialogImageUrl15: [], //上传15张的图片集合
      qiniuData15: {
        key: "",
        token: ""
      },
      metering: "", //计量
      meteringAll: [
        {
          label: "件",
          value: "1"
        },
        {
          label: "只",
          value: "2"
        },
        {
          label: "双",
          value: "3"
        },
        {
          label: "套",
          value: "4"
        },
        {
          label: "盒",
          value: "5"
        }
      ],
      originalPrice: "", //原价
      currentPrice: "", //现价
      costPrice: "", //成本价
      title: "", //标题
      checked: false,
      num: 1,
      inputAll: [], //第一个规格值集合
      inputAllTwo: [{ attributeValue: "" }], //第二个规格值集合
      dialogImageUrl1: [], //上传规格值的图片集合
      qiniuData1: {
        key: "",
        token: ""
      },
      specificationOne: "", //第一个规格
      specificationTwo: "", //第二个规格
      specificationAll: [
        {
          value: "选项1",
          label: "颜色"
        },
        {
          value: "选项2",
          label: "尺寸"
        },
        {
          value: "选项3",
          label: "大小"
        },
        {
          value: "选项4",
          label: "套"
        },
        {
          value: "选项5",
          label: "盒"
        }
      ],
      distribution: "1", //配送方式 1快递 2同城 3到店
      task: "1", // 商品任务状态 0下架 1上架
      popupTrue: false, //弹窗显隐
      yybProductSpecificationList: [], //规格名集合
      yybProductSkuList: [] //商品属性集合
      ,imgUrl: '', //主图
    };
  },

  components: {
    draggable,
    specification
  },

  computed: {},
  watch: {
    //现价
    currentPrice: function(params) {
      this.inputAll.forEach(element => {
        for (let i = 0; i < element.arr.length; i++) {
          element.arr[i].currentPrice = this.currentPrice;
        }
      });
    },
    //成本价
    costPrice: function(params) {
      this.inputAll.forEach(element => {
        console.log(element.arr);
        for (let i = 0; i < element.arr.length; i++) {
          element.arr[i].costPrice = this.costPrice;
        }
      });
    }
  },
  mounted() {
    this.options = this.classify;
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.qiniuToken();
  },

  methods: {
    // 获取宽高
    imgWH(i) {
      let that = this;
      switch (i) {
        case 6: {
          if (that.dialogImageUrl.length != 0) {
            for (let i = 0; i < that.dialogImageUrl.length; i++) {
              let url = that.dialogImageUrl[i].imageUrl;
              let img = new Image();
              img.src = url;
              img.onload = function() {
                that.dialogImageUrl[i].imageHeight = img.height;
                that.dialogImageUrl[i].imageWidth = img.width;
                console.log(img, img.width, img.height);
              };
            }
          }
          break;
        }
        case 15: {
          if (that.dialogImageUrl15.length != 0) {
            for (let i = 0; i < that.dialogImageUrl15.length; i++) {
              let url = that.dialogImageUrl15[i].imageUrl;
              let img = new Image();
              img.src = url;
              img.onload = function() {
                that.dialogImageUrl15[i].imageHeight = img.height;
                that.dialogImageUrl15[i].imageWidth = img.width;
                console.log(img, img.width, img.height);
              };
            }
          }
          break;
        }
        // case 1: {
        //   if (that.dialogImageUrl1.length != 0) {
        //     for (let i = 0; i < that.dialogImageUrl1.length; i++) {
        //       let url = that.dialogImageUrl1[i].imageUrl;
        //       let img = new Image();
        //       img.src = url;
        //       console.log(img);
        //       img.onload = function() {
        //         that.dialogImageUrl1[i].imageHeight = img.height;
        //         that.dialogImageUrl1[i].imageWidth = img.width;
        //         console.log(img, img.width, img.height);
        //       };
        //     }
        //   }
        //   break;
        // }
        default:
          break;
      }
      console.log(that.dialogImageUrl);
    },
    //获取上传需要的token
    qiniuToken() {
      Vue.axios
        .get(`https://www.baiduyuyue.com/appointment/qiniu/getQiniuUploadToken`)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.token = res.data.data;
            this.qiniuData.token = res.data.data;
            this.qiniuData15.token = res.data.data;
          }
        });
    },
    //上传之前
    beforeUploading(file) {
      console.log(file.uid);
      this.qiniuData.key = file.uid;
    },
    //删除
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      for (let i = 0; i < this.dialogImageUrl.length; i++) {
        let img = this.dialogImageUrl[i].imageUrl.split("baiduyuyue.com/")[1];
        console.log(img);
        if (file.uid == img) {
          this.dialogImageUrl.splice(i, 1);
        }
      }
      console.log(this.dialogImageUrl);
    },
    //上传成功
    success(response, file, fileList) {
      console.log(file);
      this.dialogImageUrl.push({
        imageUrl: "https://images.baiduyuyue.com/" + file.uid
      });
      this.imgWH(6);
    },
    //超出6张
    exceed(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 6 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //删除之前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //拖动6张图片
    datadragEnd(evt) {
      evt.preventDefault();
      // console.log("拖动前的索引 :" + evt.oldIndex);
      // console.log("拖动后的索引 :" + evt.newIndex);
      console.log(this.dialogImageUrl, "拖动六张");
    },
    //上传15张之前
    beforeUploading15(file) {
      this.qiniuData15.key = file.uid;
    },
    //删除15
    handleRemove15(file, fileList) {
      for (let i = 0; i < this.dialogImageUrl15.length; i++) {
        let img = this.dialogImageUrl15[i].imageUrl.split("baiduyuyue.com/")[1];
        console.log(img);
        if (file.uid == img) {
          this.dialogImageUrl15.splice(i, 1);
        }
      }
    },
    // 上传15成功
    success15(response, file, fileList) {
      this.dialogImageUrl15.push({
        imageUrl: "https://images.baiduyuyue.com/" + file.uid
      });
      this.imgWH(15);
    },
    //超出15张
    exceed15(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 15 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //删除15之前
    beforeRemove15(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //拖动15张图片
    datadragEnd15(evt) {
      console.log(evt);
      evt.preventDefault();
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      // console.log(this.dialogImageUrl15);
    },
    //添加第一个规格值
    addSpecification() {
      if (this.specificationOne == "") {
        this.$message.warning("请先选择规格名");
        return;
      }
      for (let i = 0; i < this.inputAll.length; i++) {
        if (this.inputAll[i].oneGG == "") {
          this.$message.warning("请先输入规格值");
          return;
        }
      }
      this.inputAll.push({
        oneGG: "",
        arr: [
          {
            currentPrice: this.currentPrice,
            costPrice: this.costPrice,
            coding: "",
            inventory: 0
          }
        ]
      });
      console.log(this.inputAll);
    },

    //添加第二个规格值
    addSpecificationTwo() {
      for (let i = 0; i < this.inputAllTwo.length; i++) {
        if (this.inputAllTwo[i].attributeValue == "") {
          this.$message.warning("请先输入规格值");
          return;
        }
      }
      this.inputAllTwo.push({ attributeValue: "" });
      console.log(this.inputAllTwo);
      console.log(this.inputAll);
    },
    //确定添加
    SureToAdd() {
      if (this.specificationTwo == "") {
        this.$message.warning("请先选择规格名");
        return;
      }
      for (let i = 0; i < this.inputAllTwo.length; i++) {
        if (this.inputAllTwo[i].attributeValue == "") {
          this.$message.warning("请先补充规格值");
          return;
        }
      }
      this.inputAll.forEach(element => {
        element.arr = [];
        console.log(element);
        for (let i = 0; i < this.inputAllTwo.length; i++) {
          if (this.inputAllTwo[i].attributeValue == "") {
            element.arr.push({
              currentPrice: this.currentPrice,
              costPrice: this.costPrice,
              coding: "",
              inventory: 0
            });
          } else {
            element.arr.push({
              attributeValue: this.inputAllTwo[i].attributeValue,
              currentPrice: this.currentPrice,
              costPrice: this.costPrice,
              coding: "",
              inventory: 0
            });
          }
        }
        console.log(element);
      });
      console.log(this.inputAll);
    },
    //上传1张之前
    beforeUploading1(file) {
      this.qiniuData1.key = file.uid;
      this.qiniuData1.token = this.token;
    },
    //删除1
    handleRemove1(file, fileList) {
      for (let i = 0; i < this.dialogImageUrl1.length; i++) {
        let img = this.dialogImageUrl1[i].split("baiduyuyue.com/")[1];
        console.log(img);
        if (file.uid == img) {
          this.dialogImageUrl1.splice(i, 1);
        }
      }
    },
    //上传1成功
    success1(response, file, fileList) {
      console.log(response, file);
      console.log(fileList, "成功");
      this.dialogImageUrl1.push("https://images.baiduyuyue.com/" + file.uid);
      console.log(this.dialogImageUrl1, "图片集合");
    },
    //超出1张
    exceed1(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 ${this.inputAll.length} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //删除1
    beforeRemove1(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //拖动1张图片
    datadragEnd1(evt) {
      console.log(evt);
      evt.preventDefault();
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      // console.log(this.dialogImageUrl15);
    },
    //预览
    preview() {
      console.log(this.GLclassifyId, "分类id");
      // if (this.GLclassifyId == "") {
      //   this.$message.warning("请先选择分类");
      //   // categoryId
      //   return;
      // }
      let imageUrl = ""; //主图
      console.log(this.dialogImageUrl.length);
      if (this.dialogImageUrl.length != 0) {
        imageUrl = this.dialogImageUrl[0].imageUrl;
        this.imageUrl = this.dialogImageUrl[0].imageUrl;
        //商品图排序
        for (let i = 0; i < this.dialogImageUrl.length; i++) {
          this.dialogImageUrl[i].imageSort = i;
        }
      } else {
        this.$message.warning("请添加商品图");
        return;
      }
      console.log(this.originalPrice, "原价");
      if (this.originalPrice == "") {
        this.$message.warning("请输入原价");
        return;
        // productOriginalPrice
      }
      console.log(this.currentPrice, "现价");
      if (this.currentPrice == "") {
        this.$message.warning("请输入现价");
        return;
        // productCurrentPrice
      }
      console.log(this.costPrice, "成本价");
      if (this.costPrice == "") {
        this.$message.warning("请输入成本价");
        return;
        // productCostPrice
      }
      console.log(this.title, "标题");
      if (this.title == "") {
        this.$message.warning("请输入标题");
        return;
        // productName
      }
      console.log(this.metering, "计量单位");
      if (this.metering == "") {
        this.$message.warning("请输入计量单位");
        return;
        // productUnit
      }
      if (this.dialogImageUrl15.length != 0) {
        //图文详情排序
        for (let i = 0; i < this.dialogImageUrl15.length; i++) {
          this.dialogImageUrl15[i].imageSort = i;
        }
      } else {
        this.$message.warning("请添加图文详情");
        return;
      }
      let yybProductSpecificationList = []; //规格名集合
      let yybProductSpecificationAttributeList0 = [];
      let yybProductSpecificationAttributeList1 = [];
      this.inputAll.forEach(element => {
        if (element.oneGG != "") {
          yybProductSpecificationAttributeList0.push({
            attributeValue: element.oneGG
          });
        }
      });
      this.inputAllTwo.forEach(element => {
        if (element.attributeValue != "") {
          yybProductSpecificationAttributeList1.push({
            attributeValue: element.attributeValue
          });
        }
      });
      console.log(this.specificationOne, "规格名");
      if (this.specificationOne == "") {
        this.$message.warning("请选择规格名");
        return;
      } else {
        //规格名排序
        if (this.specificationTwo == "") {
          if (this.inputAll.length == 0 || this.inputAll[0].oneGG == "") {
            this.$message.warning("请补充规格值");
            return;
          } else {
            yybProductSpecificationList.push({
              specificationName: this.specificationOne,
              specificationSort: 0,
              yybProductSpecificationAttributeList: yybProductSpecificationAttributeList0
            });
          }
        } else {
          // this.SureToAdd();
          if (this.specificationOne == this.specificationTwo) {
            this.$message.warning("规格名不能一样");
            return;
          } else {
            if (this.inputAllTwo[0].attributeValue == "") {
              this.$message.warning("请补充规格值");
              return;
            } else {
              yybProductSpecificationList.push(
                {
                  specificationName: this.specificationOne,
                  specificationSort: 0,
                  yybProductSpecificationAttributeList: yybProductSpecificationAttributeList0
                },
                {
                  specificationName: this.specificationTwo,
                  specificationSort: 1,
                  yybProductSpecificationAttributeList: yybProductSpecificationAttributeList1
                }
              );
            }
          }
        }
        console.log(yybProductSpecificationList);
      }
      this.yybProductSpecificationList = yybProductSpecificationList;
      let yybProductSkuList = []; //商品属性集合
      for (let i = 0; i < this.inputAll.length; i++) {
        console.log(this.inputAll[i]);
        if (this.dialogImageUrl1[i] == undefined) {
          console.log(this.dialogImageUrl1);
          this.$message.warning("请上传规格图片");
          return;
        } else {
          for (let l = 0; l < this.inputAll[i].arr.length; l++) {
            if (this.inputAll[i].arr[l].attributeValue != undefined) {
              yybProductSkuList.push({
                imageUrl: this.dialogImageUrl1[i],
                currentPrice: this.inputAll[i].arr[l].currentPrice,
                costPrice: this.inputAll[i].arr[l].costPrice,
                inventory: this.inputAll[i].arr[l].inventory,
                skuCode: this.inputAll[i].arr[l].coding,
                attributeValue1: this.inputAll[i].oneGG,
                attributeValue2: this.inputAll[i].arr[l].attributeValue,
                specificationName1: this.specificationOne,
                specificationName2: this.specificationTwo
              });
            } else {
              yybProductSkuList.push({
                imageUrl: this.dialogImageUrl1[i],
                currentPrice: this.inputAll[i].arr[l].currentPrice,
                costPrice: this.inputAll[i].arr[l].costPrice,
                inventory: this.inputAll[i].arr[l].inventory,
                skuCode: this.inputAll[i].arr[l].coding,
                attributeValue1: this.inputAll[i].oneGG,
                attributeValue2: "",
                specificationName1: this.specificationOne,
                specificationName2: this.specificationTwo
              });
            }
          }
        }
      }
      this.yybProductSkuList = yybProductSkuList;
      //价格是否填写
      console.log(this.inputAll);
      for (const element of this.inputAll) {
        console.log(element);
        for (let i = 0; i < element.arr.length; i++) {
          if (element.arr[i].currentPrice === "") {
            this.$message.warning("请先输入商品现价");
            return;
          }
          if (element.arr[i].costPrice === "") {
            this.$message.warning("请先输入商品成本价");
            return;
          }
          if (element.arr[i].coding === "") {
            this.$message.warning("请先输入商品编码");
            return;
          }
          if (element.arr[i].inventory === "") {
            console.log(element.arr[i].inventory);
            this.$message.warning("请先输入商品库存");
            return;
          }
        }
      }
      this.popupTrue = true;
    },
    //关闭预览
    shut() {
      this.popupTrue = false;
    },
    //保存
    preserve() {
      console.log(this.GLclassifyId, "分类id");
      if (this.GLclassifyId == "") {
        this.$message.warning("请先选择分类");
        // categoryId
        return;
      }
      let imageUrl = ""; //主图
      console.log(this.dialogImageUrl.length);
      if (this.dialogImageUrl.length != 0) {
        imageUrl = this.dialogImageUrl[0].imageUrl;
        //商品图排序
        for (let i = 0; i < this.dialogImageUrl.length; i++) {
          this.dialogImageUrl[i].imageSort = i;
        }
      } else {
        this.$message.warning("请添加商品图");
        return;
      }
      console.log(this.originalPrice, "原价");
      if (this.originalPrice == "") {
        this.$message.warning("请输入原价");
        return;
        // productOriginalPrice
      }
      console.log(this.currentPrice, "现价");
      if (this.currentPrice == "") {
        this.$message.warning("请输入现价");
        return;
        // productCurrentPrice
      }
      console.log(this.costPrice, "成本价");
      if (this.costPrice == "") {
        this.$message.warning("请输入成本价");
        return;
        // productCostPrice
      }
      console.log(this.title, "标题");
      if (this.title == "") {
        this.$message.warning("请输入标题");
        return;
        // productName
      }
      console.log(this.metering, "计量单位");
      if (this.metering == "") {
        this.$message.warning("请输入计量单位");
        return;
        // productUnit
      }
      if (this.dialogImageUrl15.length != 0) {
        //图文详情排序
        for (let i = 0; i < this.dialogImageUrl15.length; i++) {
          this.dialogImageUrl15[i].imageSort = i;
        }
      } else {
        this.$message.warning("请添加图文详情");
        return;
      }
      let yybProductSpecificationList = []; //规格名集合
      let yybProductSpecificationAttributeList0 = [];
      let yybProductSpecificationAttributeList1 = [];
      this.inputAll.forEach(element => {
        if (element.oneGG != "") {
          yybProductSpecificationAttributeList0.push({
            attributeValue: element.oneGG
          });
        }
      });
      this.inputAllTwo.forEach(element => {
        if (element.attributeValue != "") {
          yybProductSpecificationAttributeList1.push({
            attributeValue: element.attributeValue
          });
        }
      });
      console.log(this.specificationOne, "规格名");
      if (this.specificationOne == "") {
        this.$message.warning("请选择规格名");
        return;
      } else {
        //规格名排序
        if (this.specificationTwo == "") {
          if (this.inputAll.length == 0 || this.inputAll[0].oneGG == "") {
            this.$message.warning("请补充规格值");
            return;
          } else {
            yybProductSpecificationList.push({
              specificationName: this.specificationOne,
              specificationSort: 0,
              yybProductSpecificationAttributeList: yybProductSpecificationAttributeList0
            });
          }
        } else {
          // this.SureToAdd();
          if (this.specificationOne == this.specificationTwo) {
            this.$message.warning("规格名不能一样");
            return;
          } else {
            if (this.inputAllTwo[0].attributeValue == "") {
              this.$message.warning("请补充规格值");
              return;
            } else {
              yybProductSpecificationList.push(
                {
                  specificationName: this.specificationOne,
                  specificationSort: 0,
                  yybProductSpecificationAttributeList: yybProductSpecificationAttributeList0
                },
                {
                  specificationName: this.specificationTwo,
                  specificationSort: 1,
                  yybProductSpecificationAttributeList: yybProductSpecificationAttributeList1
                }
              );
            }
          }
        }
        console.log(yybProductSpecificationList);
      }

      let yybProductSkuList = []; //商品属性集合
      for (let i = 0; i < this.inputAll.length; i++) {
        console.log(this.inputAll[i]);
        if (this.dialogImageUrl1[i] != undefined) {
          for (let l = 0; l < this.inputAll[i].arr.length; l++) {
            if (this.inputAll[i].arr[l].attributeValue != undefined) {
              yybProductSkuList.push({
                imageUrl: this.dialogImageUrl1[i],
                currentPrice: this.inputAll[i].arr[l].currentPrice,
                costPrice: this.inputAll[i].arr[l].costPrice,
                inventory: this.inputAll[i].arr[l].inventory,
                skuCode: this.inputAll[i].arr[l].coding,
                attributeValue1: this.inputAll[i].oneGG,
                attributeValue2: this.inputAll[i].arr[l].attributeValue,
                specificationName1: this.specificationOne,
                specificationName2: this.specificationTwo
              });
            } else {
              yybProductSkuList.push({
                imageUrl: this.dialogImageUrl1[i],
                currentPrice: this.inputAll[i].arr[l].currentPrice,
                costPrice: this.inputAll[i].arr[l].costPrice,
                inventory: this.inputAll[i].arr[l].inventory,
                skuCode: this.inputAll[i].arr[l].coding,
                attributeValue1: this.inputAll[i].oneGG,
                attributeValue2: "",
                specificationName1: this.specificationOne,
                specificationName2: this.specificationTwo
              });
            }
          }
        } else {
          this.$message.warning("请上传规格图片");
          return;
        }
      }
      //价格是否填写
      console.log(this.inputAll);
      for (const element of this.inputAll) {
        console.log(element);
        for (let i = 0; i < element.arr.length; i++) {
          if (element.arr[i].currentPrice === "") {
            this.$message.warning("请先输入商品现价");
            return;
          }
          if (element.arr[i].costPrice === "") {
            this.$message.warning("请先输入商品成本价");
            return;
          }
          if (element.arr[i].coding === "") {
            this.$message.warning("请先输入商品编码");
            return;
          }
          if (element.arr[i].inventory === "") {
            console.log(element.arr[i].inventory);
            this.$message.warning("请先输入商品库存");
            return;
          }
        }
      }
      let postData = {
        productName: this.title, //标题
        categoryId: this.GLclassifyId, //分类id
        productOriginalPrice: this.originalPrice, //原价
        productCurrentPrice: this.currentPrice, //现价
        productCostPrice: this.costPrice, //成本价
        productStatus: this.task, //商品任务状态 0下架、1上架、3删除
        mailWay: this.distribution, //配送方式 1快递 2同城 3到店
        userId: "1", //商户id
        productUnit: this.metering, //计量单位
        imageUrl: imageUrl, //主图
        yybProductImageList: this.dialogImageUrl, //商品图集合
        yybProductDetailsImageList: this.dialogImageUrl15, //图文详情集合
        yybProductSpecificationList: yybProductSpecificationList, //商品规格集合
        yybProductSkuList: yybProductSkuList //单个商品详情集合
      };
      console.log(this.inputAll);
      console.log(postData);

      Vue.axios({
        method: "post",
        url: "/yybProduct/insertProduct",
        data: postData,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          this.$message.success("商品添加成功");
          this.$emit("amend", true);
        }
      });
    },
    //返回
    reverseBack() {
      this.$emit("amend", true);
    }
  }
};
</script>
<style scoped>
.content {
  background-color: #ffffff;
  padding: 40px 0 20px 100px;
  border-radius: 10px;
}
.contentDiv > div {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
h3 {
  font-weight: bold;
  color: #333333;
}
.contentDiv > div > span {
  margin-right: 20px;
}
.drag-item {
  display: inline-block;
}
.drag-item img {
  width: 146px;
  height: 146px;
  border-radius: 10px;
}
table tr th {
  width: 100px;
  background-color: #f4faff;
  border-right: 1px solid #f2f2f2;
  height: 40px;
}
table tr td {
  height: 60px;
  text-align: center;
  border-top: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
}
.TDDiv + .TDDiv {
  border-top: 1px solid #f2f2f2;
}
.MultipleChoice {
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.MultipleChoice > span {
  margin-right: 20px;
}
.operation {
  margin: 40px 0 20px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.specification {
  margin-top: 20px;
}
.specification > span {
  margin: 0 25px 0 10px;
}
.SpecificationDetails {
  border: 1px solid #f2f2f2;
  display: inline-block;
  margin: 20px 0 0 10px;
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
.particulars {
  height: 95%;
}
</style>