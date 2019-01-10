<template>
  <div>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center">
      <tabbar-item link="/newsList">
        <img slot="icon" src="">
        <span slot="label">微应用</span>
      </tabbar-item>
      <tabbar-item link="/home" selected>
        <img slot="icon" src="">
        <span slot="label">工作台</span>
      </tabbar-item>
      </tabbar-item>
      <tabbar-item @on-item-click="showScrollBox =!showScrollBox">
        <img slot="icon" src="">
        <span slot="label">转化角色</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Selector, XDialog, Group, Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Group, XDialog, Selector,
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      value3: '',
      lists: [],
      showScrollBox: false,
    }
  },
  methods: {

  },
  mounted() {

  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-demo-tabbar {
  position: fixed;
}

</style>
