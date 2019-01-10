<template>
  <div>
  <group>
      <x-input ref="UserCode" title="老密码" type="password"  v-model.trim="searchForm.old" required placeholder="请输入账号" is-type="password" :min="1" >
      </x-input>
  </group>
  <group>
      <x-input ref="Password" title="新密码" :type="passwordType" required v-model.trim="searchForm.password" placeholder="请输入密码" is-type="password" :min="1" >
        <span slot="right" @click="passwordType=passwordType === 'password' ? 'text' : 'password'">{{passwordType === 'password' ? '明文' : '密文'}}</span>
      </x-input>
  </group>
  <group>
      <x-input ref="Password" title="确认新密码" :type="newPasswordType" required v-model.trim="searchForm.newPassword" placeholder="请输入密码" is-type="password" :min="1" >
        <span slot="right" @click="newPasswordType=newPasswordType === 'password' ? 'text' : 'password'">{{newPasswordType === 'password' ? '明文' : '密文'}}</span>
      </x-input>
  </group>
  <div style="padding:15px;">
      <x-button plain @click.native="_submit" type="primary"  text="确定"></x-button>
      <x-button plain @click.native="_resetForm"  text="取消"></x-button>
  </div>
</div>
</template>

<script>
import {XInput,Group,XButton} from 'vux';
import {userResetPassword} from '@/api/index';
import {removeStore,getStore} from '@/lib/pAxios';
export default {
  components:{
    XInput,
    Group,
    XButton
  },
  data() {
    return {
      userInfo:JSON.parse(getStore("userInfo")),
      passwordType:"password",
      newPasswordType:"password",
      searchForm:{
        old:"",
        password:"",
        newPassword:"",
      }
    }
  },
  methods:{
    // 判断 两次新密码是否一样
    checkPassword() {
      if(this.searchForm.password!=this.searchForm.newPassword) {
        this.$vux.alert.show({
            title: '警告',
            content: '两次输入的密码不一样！'
        })
        return false
      }
      return true
    },
    // 校验新密码
    checkNewPassword(){
      let reg = new RegExp('^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,13}$')
      if(!reg.test(this.searchForm.password)){
        this.$vux.alert.show({
            title: '警告',
            content: '密码不符合规定,密码必须字母+数字,最少6位'
        })
        return false
      }
      return true
    },
    _submit() {
      if(!this.searchForm.old || !this.searchForm.password ||!this.searchForm.newPassword) {
        this.$vux.alert.show({
            title: '警告',
            content: '必填项未输入!'
        })
        return;
      }else{
        if(!this.checkNewPassword()){
          return;
        }
        if(this.checkPassword()){
          let params ={
            id:this.userInfo.id,
            userCode:this.userInfo.userCode,
            userPassword:this.searchForm.old,
            newUserPassword:this.searchForm.newPassword
          }
          userResetPassword(params).then((res)=>{
            this.$vux.alert.show({
                title: '成功',
                content: '操作成功'
            })
          })
        }
      }


    },
    _resetForm() {
      this.$router.push("/manage/home")
    }
  }
}

</script>

<style scoped lang="less">

</style>
