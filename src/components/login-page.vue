<template>
  <div class="login-page">
    <transition name="fade-in" mode="out-in">
      <div class="login-wrapper" v-if="mode === 'login'" key="1">
        <el-input placeholder="username" v-model="loginData.userName"></el-input>
        <el-input placeholder="password" v-model="loginData.password" type="password"></el-input>
        <el-button type="success" @click="handleLogin">login</el-button>
        <span class="registry-btn" @click="mode='registry'">registry</span>
      </div>

      <div class="login-wrapper" v-if="mode === 'registry'" key="2">
        <el-input placeholder="username" v-model="registryData.userName"></el-input>
        <el-input placeholder="password" v-model="registryData.password" type="password"></el-input>
        <el-input placeholder="confirm password" v-model="registryData.confirmPassword" type="password"></el-input>
        <el-button type="success" @click="handleRegistry">registry</el-button>
        <span class="return-to-btn" @click="mode='login'">return to login</span>
      </div>
    </transition>
  </div>
</template>

<script>
  import {showMessage} from "../common/message";
  import {getModuleStore} from "../common/store";

  const {mapMutations, mapGetters} = getModuleStore('person')
  export default {
    name: "login-page",
    data() {
      return {
        mode: 'login',
        loginData: {
          userName: '',
          password: '',
        },
        registryData: {
          userName: '',
          password: '',
          confirmPassword: ''
        },
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
    },
    mounted() {
      this.loginData.userName = this.userInfo.userName
    },
    methods: {
      async handleLogin() {
        if (!this.loginData.userName) {
          showMessage('username is illegal!')
          return
        }
        if (!this.loginData.password) {
          showMessage('password is illegal!')
          return
        }

        let ret = await this.$http.post('person/login', this.loginData)
        console.log(ret)
        if (!!ret && !!ret.success) {
          showMessage('login successful!')
          this.setUserInfo(ret.result)
          this.setLoginTime(new Date().getTime())
          setTimeout(() => {
            this.$router.push('lawCasesPage')
          }, 1000)
        } else {
          showMessage('login failed, username or password is incorrect!')
        }
      },
      async handleRegistry() {
        if (!this.registryData.userName) {
          showMessage("username is illegal!")
          return
        }
        if (!this.registryData.password) {
          showMessage('password is illegal!')
          return
        }
        if (this.registryData.password !== this.registryData.confirmPassword) {
          showMessage("password and confirm password does not match!")
          return
        }

        let ret = await this.$http.post('person/register', this.registryData)
        if (!!ret && !!ret.success) {
          showMessage("registry successful!")
          this.mode = 'login'
          this.loginData.userName = this.registryData.userName
          this.loginData.password = this.registryData.password
        }
      },
      ...mapMutations([
        'setUserInfo', 'setLoginTime'
      ])
    }
  }
</script>

<style scoped lang="scss">
  .login-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20vh;

    .login-wrapper {
      position: relative;
      box-shadow: 0 0 40px 10px #f2f2f2;
      height: 300px;
      width: 500px;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      & > * {
        margin-bottom: 24px;
      }

      .registry-btn {
        position: absolute;
        bottom: 0;
        right: 24px;
        cursor: pointer;
        color: dodgerblue;
      }

      .return-to-btn {
        position: absolute;
        bottom: 0;
        left: 24px;
        cursor: pointer;
        color: dodgerblue;
      }
    }
  }
</style>
