<template>
  <div class="Temp">
   
  </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
export default {
  name:'Temp',
  data() {
    return {
      
    }
  },
  beforeUpdate() {
    
  },
  watch: {
    showPage(){
      
    }
  },
  computed: {
    ...mapState({
      showPage:state=>state.home.showPage,
    })
  },  
  methods: {
    ...mapMutations({
      setToast: "toast/setToast",
    }),
    
  },
}
</script>