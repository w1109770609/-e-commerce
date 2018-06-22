import './dialog.scss'
let dialog = {
  install(Vue, options) {
    let dialogBus = new Vue({})
   Object.defineProperty(Vue.prototype,'dialog',{
     value:dialogBus
   })
    Vue.component('Dialog', {
      template: `<div class="dialog" v-show="flag">
            <div :class = "[middle?'middle':'bottom']" >
              <slot></slot>
              <div>
                <span v-for="(item,i) in btnArr" :key="i" @click="statusL(item.att)">{{item.txt}}</span>
              </div>
            </div>
        </div>`,
      data() {
        return {
          flag:false,
          msg:'',
          btnArr:[],
          middle:true
        };
      },
      mounted(){
        this.dialog.$on('upDialog', (res => {
          console.log(res)
          this.flag = res.flag;
          this.btnArr = res.btnArr,
          this.middle = res.middle
        }))
      },
      methods: {
        statusL(attr){
          this.flag = false;
          if(attr=='add'){
            this.$emit('sureF')
          }
        }
      }
    });
  }
}
export default dialog
