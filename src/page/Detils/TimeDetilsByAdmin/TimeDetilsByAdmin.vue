<template>
  <div>
    <card>
      <img slot="header" src="../../../assets/2.jpg" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p>
          开发中
        </p>
      </div>
    </card>
  </div>
</template>

<script>
import {Card} from 'vux';
export default {
  components:{
    Card
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped lang="less">
.card-padding {
  padding: 15px;
}
</style>
