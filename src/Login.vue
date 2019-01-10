<template>
    <div>
        <x-header :left-options="{showBack: false}" @on-click-more="onClickMore" :right-options="{showMore:false}" title="登录" style="width:100%;position:absolute;left:0;top:0;"></x-header>
        <div style="text-align:center" class="title">
            项目管理软件
        </div>
        <group>
            <x-input ref="userCode" title="用户名" type="text" v-model.trim="loginForm.userCode" required placeholder="请输入账号" is-type="text" :min="1" >
            </x-input>
        </group>
        <group>
            <x-input ref="userPassword" title="密 码" :type="passwordType" required v-model.trim="loginForm.userPassword" placeholder="请输入密码" is-type="password" :min="1" >
            </x-input>
        </group>
        <div style="padding:15px;">
            <x-button plain @click.native="_login" type="primary"  text="登录"></x-button>
            <x-button plain @click.native="_resetForm"  text="取消"></x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {  XDialog, XInput, Group, XButton, XHeader } from 'vux'
import {login} from '@/api/index.js';
import {setStore} from '@/lib/pAxios.js';
export default {
    components: {
        XDialog,
        XInput,
        XButton,
        Group,
        XHeader
    },
    data() {
        return {
          loginForm:{
            userCode:"",
            userPassword:""
          },
          passwordType:"password"
        }
    },
    methods: {
      onClickMore() {

      },
      _login() {
        if(!this.loginForm.userCode || !this.loginForm.userPassword) {
          this.$vux.alert.show({
              title: '警告',
              content: '用户名或密码不能为空！'
          })
          return
        }else{
          login(this.loginForm).then((res)=>{
            let code = res.code
            if(code==200) {
              setStore("menuList",this.data2tree(res.data.menulist))
              setStore("userInfo",res.data.userInfo)
              this.$router.push("/manage/home")
            }
          })
        }
      },
      _resetForm() {
        this.$refs.userCode.reset()
        this.$refs.userPassword.reset()
      },
      // 处理菜单
    data2tree(datas) {
      		var dataArray = [];
      		datas.forEach(function(data) {
      				let pid = data.parentCode;
      				if(pid=="1") {
      						let objTemp = {
                      id:data.id,
      								title: data.menuName,
      								code: data.menuCode,
      								name: data.menuPath,
      								path:data.menuPath
      						}
      						dataArray.push(objTemp);
      				}
      		})
      		return this.data2treeDG(datas, dataArray);
      },
      data2treeDG(datas, dataArray) {
      		for(var j = 0; j < dataArray.length; j++) {
      				let dataArrayIndex = dataArray[j];
      				let childrenArray = [];
      				let code = dataArrayIndex.code;
      				for(let i = 0; i < datas.length; i++) {
      						let data = datas[i];
      						let pid = data.parentCode;
      						if(pid == code) {//判断是否为儿子节点
      								let objTemp = {
                        id:data.id,
                         title: data.menuName,
                         code: data.menuCode,
                         name: data.menuPath,
                         path:data.menuPath
      								}
      								childrenArray.push(objTemp);
      						}

      				}
      				childrenArray.length>0 ? dataArrayIndex.children = childrenArray :null
      				if(childrenArray.length > 0) {//有儿子节点则递归
      						this.data2treeDG(datas, childrenArray);
      				}

      		}
      		return dataArray;
      }
    },
    created(){
      console.log("login")
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  height: 50px;
  margin-top: 46px;
}
</style>
