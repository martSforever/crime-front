<template>
  <div class="login-page">
    <transition name="fade-in" mode="out-in">
      <div class="login-wrapper" v-if="mode === 'login'" key="1">
        <el-input placeholder="username" v-model="loginData.userName"></el-input>
        <el-input placeholder="password" v-model="loginData.password"></el-input>
        <el-button type="success" @click="handleLogin">login</el-button>
        <span class="registry-btn" @click="mode='registry'">registry</span>
      </div>

      <div class="login-wrapper" v-if="mode === 'registry'" key="2">
        <el-input placeholder="username" v-model="registryData.userName"></el-input>
        <el-input placeholder="password" v-model="registryData.password"></el-input>
        <el-input placeholder="confirm password" v-model="registryData.confirmPassword"></el-input>
        <el-button type="success" @click="handleRegistry">registry</el-button>
        <span class="return-to-btn" @click="mode='login'">return to login</span>
      </div>
    </transition>
  </div>
</template>

<script>
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
    methods: {
      handleLogin() {
        if (!this.loginData.userName) {
          this.$message("username is illegal!");
          return
        }
        if (!this.loginData.password) {
          this.$message('password is illegal!');
          return
        }
      },
      async handleRegistry() {
        if (!this.registryData.userName) {
          this.$message("username is illegal!");
          return
        }
        if (!this.registryData.password) {
          this.$message('password is illegal!');
          return
        }
        if (this.registryData.password !== this.registryData.confirmPassword) {
          this.$message('password and confirm password does not match!');
          return
        }

        let ret = await this.$http.post('person/upsert', this.registryData)
        console.log(ret)
      },
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
