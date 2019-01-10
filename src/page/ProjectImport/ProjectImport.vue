<template>
  <div class="projectImport">
    <group title="项目录入人">
      <x-input title="项目录入人" :value="userInfo.username" disabled></x-input>
    </group>
    <group v-for="(item,index) in projectList" :title="renderTitle(index)" :key="index">
      <selector title="选择项目" :options="allProjectList" v-model="item.projectId" placeholder="必填的"></selector>
      <selector title="选择时间" :options="timeList" v-model="item.userTime" placeholder="必填的"></selector>
      <selector title="选择职位" :options="positionList" v-model="item.userPosition" placeholder="必填的"></selector>
    </group>
    <x-button class="addButton" @click.native="addProject">添加一个项目</x-button>
    <div style="padding:15px;">
        <x-button plain @click.native="_submit" type="primary"  text="确定"></x-button>
        <x-button plain @click.native="_resetForm"  text="取消"></x-button>
    </div>
  </div>
</template>

<script>
import {getTimeList,getAllPosition,getAllProject,importProject} from '@/api/index.js';
import {Group,XInput,Selector,XButton} from 'vux';
import {getStore} from '@/lib/pAxios.js';
export default {
  components:{
    Group,
    XInput,
    Selector,
    XButton
  },
  name: 'ProjectImport',
  data () {
    return {
      timeList:[],
      positionList:[],
      allProjectList:[],
      projectUser:"",
      userInfo:JSON.parse(getStore("userInfo")),
      projectList:[
        {
          userTime:"",
          projectId:"",
          userPosition:""
        }
      ]
    }
  },
  methods:{
    // 获取时长
    getTimeListFN() {
      this.$vux.loading.show({
       text: '努力获取中'
      })
      getTimeList({}).then((res)=>{
        this.timeList = res.data
        this.$vux.loading.hide()
      }).finally(()=>{
        this.$vux.loading.hide()
      })
    },
    // 获取全部职位
    getAllPositionFN() {
      getAllPosition({}).then((res)=>{
        this.positionList = res.data
      }).finally(()=>{

      })
    },
    // 获取全部项目
    getAllProjectFN() {
      getAllProject({}).then((res)=>{
        res.data && res.data.map((item,index)=>{
          this.allProjectList.push({
            value:item.projectName,
            key:item.id
          })
        })
      })
    },
    _submit() {
      let returnObj = this.checkSubmitData(this.projectList)
      console.log("sdas",returnObj)
      if(returnObj.isOK){
        if(!this.chenckProject(this.projectList)){
          this.$vux.alert.show({
              title: '警告',
              content: "有相同的项目"
          })
          return;
        }
        let sumTime = this.checkSelectTime(this.projectList)
        if(sumTime >1 ) {
          this.$vux.alert.show({
              title: '警告',
              content: "项目时间之和不能大于1"
          })
          return;
        }
      }else{
        this.$vux.alert.show({
            title: '警告',
            content: `请检查 支持项目--${returnObj.index+1} 的必填项`
        })
        return;
      }
      for(let i=0;i<this.projectList.length;i++) {
        this.projectList[i]['userId']=this.userInfo.userId
      }
      importProject(this.projectList).then((res)=>{
        this.$vux.alert.show({
            title: '提示',
            content: "操作成功"
        })
        this.projectList=[
          {
            userTime:"",
            projectId:"",
            userPosition:""
          }
        ]
      })
    },
    // 判断是否都填了值
    checkSubmitData(dataList) {
      var flag = {
        isOK:true,
        index:""
      }
      dataList.map((item,index)=>{
        if(!item.projectId || !item.userTime || !item.userPosition) {
          flag.isOK = false
          flag.index = index
        }
      })
      return flag
    },
    // 判断时间是否大于1
    checkSelectTime(dataList) {
        var sum=0
        dataList.forEach(function(item){
          sum+=item.userTime
        })
        return sum
    },
    // 检查项目是否相同
    chenckProject(dataList){
      var tempArry=[]
      dataList.map((item,index)=>{
        tempArry.push(item.projectId)
      })
      var isOK = true
      if(tempArry.length >1 ) {
        var has={}
        for(let key in tempArry){
          if(has[tempArry[key]]) {
            isOK = false
          }
           has[tempArry[key]] = true
        }
      }
      return isOK
    },
    _resetForm() {
      this.projectList=[
        {
          userTime:"",
          projectId:"",
          userPosition:""
        }
      ]
    },
    renderTitle(index) {
      return "支持的项目--"+(index+1)
    },
    // 添加项目
    addProject() {
      if(this.projectList.length <= 4) {
        this.projectList.push({
          userTime:"",
          projectId:"",
          userPosition:""
        })
      }else{
        this.$vux.alert.show({
            title: '警告',
            content: `最多添加5个项目`
        })
      }
    }
  },
  created(){
    this.getTimeListFN()
    this.getAllPositionFN()
    this.getAllProjectFN()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.addButton {
  width: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
