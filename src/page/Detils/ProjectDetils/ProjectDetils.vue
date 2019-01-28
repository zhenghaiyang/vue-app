<template>
  <div>
    <div class="search">
      <group label-width="6em" label-margin-right="2em" label-align="left">
        <popup-radio title="搜索条件" :options="options" v-model="radioOption"></popup-radio>
        <x-input title="项目名称" v-model="addForm.projectName" :placeholder="inputPlaceholder" :disabled="inputdisabled"></x-input>
        <datetime title="开始月份" v-model="addForm.startTime"  value-text-align="left"  format="YYYY-MM" :readonly="timeOnly" :placeholder="timePlaceholder"></datetime>
        <datetime title="结束月份" v-model="addForm.endTime"  value-text-align="left" format="YYYY-MM" :readonly="timeOnly" :placeholder="timePlaceholder"></datetime>
      </group>
      <div style="margin:20px">
        <x-button type="primary" mini @click.native="handleClick">查询</x-button>
      </div>
    </div>
    <div class="content">
      <div v-for="(item,index) in dataList" v-if="dataList.length>0">
        <divider >{{ item.projectName }}</divider>
         <card :header="{title: '项目详情' }">
          <div slot="content" class="card-padding">
            <flexbox>
              <flexbox-item>
                  <span>创建日期</span>
                  <span>{{renderDate(item.createdTime)}}</span>
              </flexbox-item>
              <flexbox-item>
                  <span>开始日期</span>
                  <span>{{item.startTime && renderDate(item.startTime)}}</span>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                  <span>预计结束日期</span>
                  <span>{{item.endTime && renderDate(item.endTime)}}</span>
              </flexbox-item>
              <flexbox-item>
                  <span>真实结束日期</span>
                  <span>{{item.trueEndTime && renderDate(item.trueEndTime)}}</span>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                  <span>负责人</span>
                  <span style="color:#1c90f3">{{item.projectManage && item.projectManage}}</span>
              </flexbox-item>
              <flexbox-item>
                  <span>耗时</span>
                  <span>{{renderTime(item)}}</span>
              </flexbox-item>
              <flexbox-item>
                  <span>延期</span>
                  <span v-if="item.projectStatus==1" style="color:red">{{checkYQ(item)}}</span>
                  <span v-else >{{checkYQ(item)}}</span>
              </flexbox-item>
              <flexbox-item>
                  <span>延期天数</span>
                  <span style="color:red">{{renderYQTime(item)}}</span>
              </flexbox-item>
            </flexbox>
          </div>
        </card>
      </div>
        <div v-else  style="text-align:center">
            暂无数据
        </div>
        <x-button v-if="isChorme && dataList.length>0" type="primary" mini style="margin-top:10px" @click.native="exportProjectDetailFN">导出</x-button>
    </div>
  </div>
</template>

<script>
import {Datetime,Group,XButton,XInput,PopupRadio,XTable,Divider,Card,Flexbox, FlexboxItem } from 'vux';
import {getAllProjectByParams,exportProjectDetail} from '@/api/index.js';
import globalConfig from '@/lib/globalConfig.js'
export default {
  components:{
    Datetime,
    Group,
    XButton,
    XInput,
    PopupRadio,
    XTable,
    Divider,
    Card,
    Flexbox,
    FlexboxItem
  },
  data(){
    return {
      isChorme:false,
      inputdisabled:true,
      timeOnly:true,
      inputPlaceholder:"",
      timePlaceholder:"",
      radioOption:"",
      dataList:[],
      addForm:{
        projectName:"",
        startTime:"",
        endTime:""
      },
      options:[
        {
          key:"1",
          value:"按项目名称查询"
        },{
          key:"2",
          value:"按时间范围查询"
        }
      ]
    }
  },
  methods:{
    // 导出
    exportProjectDetailFN() {
      window.location.href = `${globalConfig.apiUrl}export/exportTest?projectName=${this.addForm.projectName}&startTime=${this.addForm.startTime}&endTime=${this.addForm.endTime}`
    },
    IsPC(){
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
                  "SymbianOS", "Windows Phone",
                  "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
              break;
          }
      }
      if(flag) {
        this.isChorme=true
      }
      console.log('flag',flag)
    },
    // 格式化时间
    renderDate(value){
      return new Date(value).format("yyyy-MM-dd")
    },
    handleClick(){
      getAllProjectByParams(this.addForm).then((res)=>{
        this.dataList = res.data
      })
    },
    // 判断是否延期
    checkYQ(item){
      // 已结束
      if(item.projectStatus=="1") {
        if(item.trueEndTime==item.endTime) {
          return "未延期"
        }else {
          return "已延期"
        }
      }else{
        return "未结束"
      }
    },
    // 计算项目耗时
    renderTime(item) {
      if(item.trueEndTime && item.endTime) {
        let submitTime = item.trueEndTime - item.startTime
        return submitTime/(1000*60*60*24) +"天"
      }
    },
    // 计算延期天数
    renderYQTime(item) {
      if(item.projectStatus=="1") {
        if(item.trueEndTime == item.endTime) {
          return "0天"
        }else{
          let submitTime = item.trueEndTime - item.endTime
          return submitTime/(1000*60*60*24) + "天"
        }
      }else{
        return ""
      }
    }
  },
  watch:{
    radioOption:function(val,oldVal) {
      if(val=="1") {
        this.inputdisabled=false
        this.inputPlaceholder="请输入"
        this.timeOnly=true
        this.timePlaceholder=""
        this.addForm={
          projectName:"",
          startTime:"",
          endTime:""
        }
      }
      if(val=="2") {
        this.inputdisabled=true
        this.inputPlaceholder=""
        this.timeOnly=false
        this.timePlaceholder="请选择"
        this.addForm={
          projectName:"",
          startTime:"",
          endTime:""
        }
      }
    }
  },
  mounted(){
    console.log("moument")
    this.IsPC();
  }
}

</script>

<style scoped lang="less">
.content {
  margin: 10px;
}
</style>
