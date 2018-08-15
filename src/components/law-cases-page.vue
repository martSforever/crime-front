<template>
  <div class="law-cases-page">
    案例列表
    {{userInfo}}--
    {{loginTime}}
  </div>
</template>

<script>

  import {getModuleStore} from "../common/store";
  import CONST from "../common/const";
  import {showMessage} from "../common/message";

  const {mapGetters} = getModuleStore("person")

  export default {
    name: "law-cases-page",
    mounted() {
      console.log(this.loginTime + CONST.loginValidTime, new Date().getTime())
      if ((this.loginTime + CONST.loginValidTime) < new Date().getTime()) {
        showMessage('session timeout!')
        this.$router.push('login')
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'loginTime'])
    },
  }
</script>

<style scoped lang="scss">
  .law-cases-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 300px;
  }
</style>
