<template>
  <div style="color: #000;width: 100%;height: 100%">
    saads
  </div>
</template>

<script>
import {getAccess} from '../../services/register';
export default {
  data() {
    return {

    };
  },
  computed: {

  },
  created() {
    this.getAccess()
  },
  methods: {
    getAccess() {
      getAccess().then( res => {
        console.log(res,'res');
      }).catch( err => {
        console.log(err,'err');
      })
    }
  },
  mounted() {
    
  },
};
</script>

<style lang="less" scoped>

</style>
