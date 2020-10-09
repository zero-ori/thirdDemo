<template>
  <div>
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
