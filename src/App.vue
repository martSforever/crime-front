<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*淡入动画:fade-in*/
  .fade-in-enter-active, .fade-in-leave-active {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    opacity: 1;
  }

  .fade-in-enter, .fade-in-leave-to {
    opacity: 0
  }
</style>
