<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },

  data() {
    return (
      {
        isRouterAlive: true
      }
      
    );
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#iviewCascader .ivu-select-dropdown{
  max-height: 274px;
}
#iviewCascader .ivu-cascader-menu{
  height: 274px;
}
#elementTime .el-range-separator{
  width: 6%;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
body {
  /* background-color: #8f949a; */
  overflow: hidden;
}

.overflow {
  height: 570px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overflow::-webkit-scrollbar {
  width: 0px;
}
.noData{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 弹窗 */
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
</style>
