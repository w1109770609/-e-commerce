<template>
  <div>
    <div class="search">
      <p><input type="text" @input="Input" v-model="msg" placeholder="请输入您想要搜索的宝贝"></p>
      <span class="iconfont icon-msg"></span>
    </div>
    <ul v-html="htmls"></ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:'',
      htmls:''
    }
  },
  methods:{
    Input(){
      this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.msg}&dotime=1528960286000`).then(res=>{
        this.htmls = res
      })
    }
  },
  mounted(){
    this.Input()
  }
}
</script>

<style lang="scss" scoped>
  .search {
      height: 0.9rem;
      display: flex;
      line-height: 0.9rem;
      span {
        flex-basis: 1.1rem;
        text-align: center;
      }
      p {
        flex: 1;
        padding-left: .2rem;
        input {
          width: 100%;
          height: 0.6rem;
          background: #f5f5f5;
          border: 0;
          border-radius: 5px;
          padding-left: .2rem;
        }
      }
    }
</style>
