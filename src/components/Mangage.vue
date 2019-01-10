<template>
  <div id="app" style="height:100%;">
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" v-if="userInfo.userType==1"
      @on-click-menu-menu3="_click"
      @on-click-menu-menu4="_addProject"
      @on-click-menu-menu5="_addUser"
      @on-click-menu-menu6="_ressetPassword"
      ></actionsheet>
      <actionsheet :menus="usermenus" v-model="showMenus" v-if="userInfo.userType==2"
      @on-click-menu-menu3="_click"
      @on-click-menu-menu6="_ressetPassword"
      ></actionsheet>
    </div>
    <drawer width="200px;" :show.sync="drawerVisibility" :show-mode="showModeValue" :placement="showPlacementValue" :drawer-style="{width: '200px'}">
      <!-- drawer content -->
      <div slot="drawer">
        <div class="y_nav_h">
          项目管理系统
        </div>
          <group v-for="(item,index) in menuList"  title-color="#4285f4"
          v-if="item.children" :title="item.title" :key="item.code" style="margin-top:20px">
            <cell v-for="(items,index) in item.children"
             :link="items.path" :key="items.code" @click.native="drawerVisibility = false">
            <span slot="title" class="myCell"><span style="vertical-align:middle;">{{ items.title }}</span></span>
            </cell>
          </group>
          <cell v-for="(item,index) in menuList" v-if="!item.children"
          :title="item.title" :link="item.path" :key="item.code" @click.native="drawerVisibility = false">
            <span slot="title"><span style="vertical-align:middle;">{{ item.title }}</span></span>
          </cell>
      </div>
      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header slot="header"
        :transition="headerTransition"
        style="width:100%;position:absolute;left:0;top:0;z-index:99999"
        :right-options="rightOptions"
        :left-options="leftOptions"
        @on-click-back="onLeftBack"
        @on-click-more="onClickMore" :title="title">
          <span v-if="showDrawer" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>
          <transition name="fade">
            <router-view transition-mode="out-in" class="router-view"></router-view>
          </transition>
        <!-- <FootMain v-if="this.$route.path !== '/login'" slot="bottom"></FootMain> -->
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Qrcode, Drawer, ViewBox, Loading, TransferDom, Group, Cell, XHeader, Actionsheet } from 'vux'
import FootMain from '@/page/FootMain/FootMain';
import {removeStore,getStore} from '@/lib/pAxios';
export default {
  directives: {
    TransferDom
  },
  components: {
    Qrcode, Drawer, ViewBox, Loading, TransferDom, Group, Cell, XHeader, Actionsheet, FootMain
  },
  data(){
    return {
      userInfo:{},
      num: 15,
      drawerVisibility: false,//侧边栏
      showModeValue: 'push',
      showPlacementValue: 'left',
      menus: {
        menu3: '注销登录',
        menu4: "创建项目",
        menu5: "添加用户",
        menu6: "修改密码"
      },
      usermenus:{
        menu3: '注销登录',
        menu6: "修改密码"
      },
      showMenus: false,
      show: true,  //header右菜单
      menuList:JSON.parse(getStore("menuList"))
    }
  },
  methods: {
    onClick() {
      if (this.num === 15) {
        this.num = 70
      } else {
        this.num = 15
      }
    },
    onClickMore() {
      this.showMenus = true
    },
    onLeftBack() {
      // console.log(this.$route)
      this.$router.replace('/manage/home')
      // console.log("back")
    },
    _click() {
      let that = this
      that.$vux.confirm.show({
        title: '注销登录',
        content: '您确认退出程序吗?',
        onConfirm() {
          removeStore("userInfo")
          removeStore("menuList")
          that.$router.replace('/login')
          setTimeout(() => {
            that.$vux.toast.show({
              text: '退出登录成功',
              type: 'text',
              position: 'top',
              width: "15em"
            })
          }, 500)
        }
      },
        that.drawerVisibility = false
      )
    },
    _addProject() {
      this.$router.replace('/addProject')
    },
    _addUser() {
      this.$router.replace('/addUser')
    },
    _ressetPassword() {
      this.$router.replace('/resetPassword')
    }
  },
  computed: {
    showDrawer() {
      if (this.$route.meta.requireMenue) return true
    },
    headerTransition() {
      return this.$route.path === '/manage/home' ? 'vux-header-fade-in-left' : 'vux-header-fade-in-right'
    },
    title() {
      if (this.$route.meta.requireMenue) {
        this.show = true;
      } else {
        this.show = false;
      }
      return this.$route.name
    },
    leftOptions() {
      return {
        preventGoBack: !this.$route.meta.requireMenue
      }
    },
    rightOptions() {
      return {
        showMore: this.show
      }
    }
  },
  created(){
    console.log("created")
    this.userInfo = JSON.parse(getStore("userInfo"))
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

body {
  background-color: #fbf9fe;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.fade-transition {
  transition: opacity .2s ease;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.fade-enter,
.fade-leave {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.y_nav_h {
  width: 200px;
  margin: 0 auto;
  text-align: center;
  padding-top: 25px;
  position: relative;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
  img {
    width: 60px;
    height: 60px;
    margin-left: -5px;
    vertical-align: middle;
  }
}

.router-view {
  width: 100%;
  top: 46px;
}
.myCell {
  font-size: 12px;
}
</style>
