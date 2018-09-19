<template>
    <div class="error-load">
      <div class="error-info">
        <div class="expression">
          o(╥﹏╥)o
        </div>
        <div class="error_text">
          页面加载出了点问题
        </div>
        <button @click="pageReload">点击重新加载</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorLoaded",
        methods:{
          pageReload(){
            window.location.reload()
          }
        }
    }
</script>

<style scoped>
  .error-load {
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .expression {
    font-size: 140px;
    margin-bottom: 50px;
  }
  .error_text{
    margin-top: 120px;
    font-size: 58px;
  }
  .error-info>button{
    margin-top: 120px;
    width: 990px;
    border: none;
    height: 130px;
    line-height: 130px;
    background-color: transparent;
    background-image: url("../../assets/img/button_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 48px;
    color: #fff;
    outline: none;
    text-align: center;
  }
</style>
