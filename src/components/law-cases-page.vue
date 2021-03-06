<template>
  <div class="law-cases-page">
    <div class="content-wrapper">
      <div class="header">
        <el-dropdown>
          <div class="user-info">
            Welcome {{userInfo.userName}} <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="handleLogout">logout</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-button @click="openAddCaseDialog">add case</el-button>
      <el-button @click="handleDelete">delete case</el-button>
      <div>
        <el-table
          :data="lawCases"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="id"
            label="id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="type"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="time">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.time | time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="location"
            label="location">
          </el-table-column>
          <el-table-column
            prop="evidence"
            label="evidence">
          </el-table-column>
          <el-table-column
            prop="description"
            label="description">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      title="add law case"
      :visible.sync="dialogVisible"
      width="500px"

    >
      <div class="add-case-content-wrapper">
        <el-input placeholder="type" v-model="addLawCase.type"></el-input>
        <el-date-picker
          v-model="addLawCase.time"
          type="date"
          placeholder="date">
        </el-date-picker>
        <el-input placeholder="location" v-model="addLawCase.location"></el-input>
        <el-input placeholder="evidence" v-model="addLawCase.evidence"></el-input>
        <el-input placeholder="description" v-model="addLawCase.description"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="handleClickSubmitAddLawCase">submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {getModuleStore} from "../common/store";
  import CONST from "../common/const";
  import {showMessage} from "../common/message";

  const {mapMutations, mapGetters} = getModuleStore('person')

  export default {
    name: "law-cases-page",
    data() {
      return {
        lawCases: [],
        dialogVisible: false,
        addLawCase: {},
        currentRow: null,
      }
    },
    mounted() {
      console.log(this.loginTime + CONST.loginValidTime, new Date().getTime())
      if ((this.loginTime + CONST.loginValidTime) < new Date().getTime()) {
        showMessage('session timeout!')
        this.$router.push('login')
        return
      }
      this.loadLawCases()
    },
    computed: {
      ...mapGetters(['userInfo', 'loginTime'])
    },
    methods: {
      ...mapMutations([
        'setUserInfo', 'setLoginTime'
      ]),
      openAddCaseDialog() {
        console.log(new Date().yyyyMMdd())
        this.addLawCase = {
          time: new Date().yyyyMMdd()
        }
        this.dialogVisible = true
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      async handleClickSubmitAddLawCase() {
        let ret = await this.$http.post('lawCase/upsert', this.addLawCase)
        if (!!ret && !!ret.success) {
          showMessage("create successful!")
          this.loadLawCases()
          this.dialogVisible = false
        }
      },
      async loadLawCases() {
        let ret = await this.$http.post('lawCase/queryAll')
        if (!!ret && !!ret.success) {
          this.lawCases = ret.result
        }
        this.currentRow = null
      },
      async handleDelete() {
        if (!this.currentRow) {
          showMessage('Please select one row!')
          return
        }
        let ret = await this.$http.post('lawCase/delete', this.currentRow)
        if (!!ret && !!ret.success) {
          showMessage('delete successful!')
          this.loadLawCases()
        }
      },
      async handleLogout() {
        console.log('login')
        this.setUserInfo({})
        this.setLoginTime(null)
        this.$router.push('/login')
      },
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
    padding-bottom: 10vh;
    .header {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .user-info {
        color: dodgerblue;
        cursor: pointer;
      }
    }
    .content-wrapper {
      height: 70vh;
      width: 1200px;
      box-shadow: 0 0 40px 10px #f2f2f2;
      padding: 24px;
    }

    .add-case-content-wrapper > * {
      margin-bottom: 12px;
      &.el-input {
        width: 100%;
      }
    }
  }
</style>
