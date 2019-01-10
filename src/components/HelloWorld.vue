<template>
  <div class="hello">
    <divider>{{ msg }}</divider>
    <card>
      <img slot="header" src="../assets/1.jpg" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p>欢迎您</p>
        <p>
          {{userInfo.username}}
        </p>
      </div>
    </card>
  </div>
</template>

<script>
import {Divider,Card} from 'vux';
import {getStore} from '@/lib/pAxios.js';
export default {
  components:{
    Divider,
    Card
  },
  name: 'HelloWorld',
  data () {
    return {
      userInfo:{},
      msg: 'Welcome to Project Manage App'
    }
  },
  created(){
    this.userInfo=JSON.parse(getStore("userInfo"))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-padding {
  padding: 15px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
