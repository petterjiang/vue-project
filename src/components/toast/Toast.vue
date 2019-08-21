<template>
<transition name="donghua">
  <div class="toast" v-show="isShow">
    <div class="content">
      {{ msg }}
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'Toast',
    data () {
      return {
        time:''
      }
    },
    model:{
      prop:'isShow',
      event:'toParent'
    },
    props:{
      isShow:{
        type:Boolean,
        default:false,
      },
      msg:{
        type:String,
        default:'toast提示'
      }
    },
    created(){
      //  console.log(this.isShow)
    },
    updated() {
      // console.log(this.isShow)
    },
    watch:{
      isShow(newVal){
          // console.log(newVal)
        if(newVal===true){
          // clearTimeout(this.time)
          // console.log(this.isShow)
          this.time=setTimeout(()=>{
            this.$emit('toParent',false)
          },1500)
        }
      },
      msg(){
        // if(newVal===true){
          clearTimeout(this.time)
          this.time=setTimeout(()=>{
            this.$emit('toParent',false)
          },1500)
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
.toast {background:rgba(0, 0, 0,.8); font-size: .26rem; line-height: .45rem; padding:0.2rem .2rem; color: #fff; position: fixed; left: 50%; top: 40%; border-radius: .13rem; z-index: 99999; width: 5rem;margin-left: -2.5rem; text-align: center;}
.donghua-enter-active,
.donghua-leave-active {
  transition: all 0.3s;
}
.donghua-enter-active {
  transform: scale(1);
}
.donghua-leave-active {
  transform: scale(0);
}
.donghua-enter,
.donghua-leave {
  transform: scale(0);
}
</style>
