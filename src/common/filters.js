import Vue from 'vue'

Vue.filter('time', function (value) {
  if (!value) return ''
  return new Date(value).enYyyyMMdd();
})
