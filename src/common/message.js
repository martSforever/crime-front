import Vue from 'vue'

export function showMessage(msg) {
  Vue.prototype.$message(msg)
}
