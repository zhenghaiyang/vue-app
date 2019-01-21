<template>
  <div>
    <div class="search">
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <datetime title="开始月份" v-model="addForm.startTime" required value-text-align="left"  format="YYYY-MM"></datetime>
        <datetime title="结束月份" v-model="addForm.endTime" required value-text-align="left" format="YYYY-MM" ></datetime>
      </group>
      <div style="margin:20px">
        <x-button type="primary" mini @click.native="handleClick">查询</x-button>
      </div>
    </div>
    <div class="content">
      <ve-histogram :data="chartData"></ve-histogram>
    </div>

  </div>
</template>

<script>
import {Datetime,Group,XButton} from 'vux';
import {detalisByUser} from '@/api/index.js';
import {getStore} from '@/lib/pAxios.js';
export default {
  components:{
    Datetime,
    Group,
    XButton
  },
  data(){
    return {
      userInfo:JSON.parse(getStore("userInfo")),
      addForm:{
        startTime:new Date().format('yyyy-MM'),
        endTime:new Date().format('yyyy-MM')
      },
      chartData: {
          columns: ['年月', '加班天数', '正常上班天数'],
          rows:[]
        }
    }
  },
  created(){
    let params={
      userId:this.userInfo.userId,
      startTime:this.addForm.startTime,
      endTime:this.addForm.endTime
    }
    detalisByUser(params).then((res)=>{
      // console.log("res",res.data)
      let tempArry=this.renderData(res.data)
      let submitData=this.renderSUMDate(tempArry)
      let rowData = this.renderAddAndDefaultWork(submitData)
      this.chartData.rows=rowData
    })
  },
  methods:{
    //查询
    handleClick() {
      // 只能查询建个三个月的时间
      let startMouth = new Date(this.addForm.startTime).getMonth();
      let endMouth = new Date(this.addForm.endTime).getMonth()
      if((endMouth-startMouth)>3) {
        this.$vux.alert.show({
            title: '警告',
            content: '只能查询三个月之内的信息!'
        })
        return
      }
      let params={
        userId:this.userInfo.userId,
        startTime:this.addForm.startTime,
        endTime:this.addForm.endTime
      }
      this.$vux.loading.show({
       text: '努力获取中'
      })
      detalisByUser(params).then((res)=>{
        console.log("res",res.data)
        let tempArry=this.renderData(res.data)
        let submitData=this.renderSUMDate(tempArry)
        let rowData = this.renderAddAndDefaultWork(submitData)
        this.chartData.rows=rowData
        this.$vux.loading.hide()
      })
      // console.log("dd",this)
    },
    // 处理数据
    renderData(arry) {
      // 根据日期分组
        let newArr = [];
        arry.forEach((address, i) => {
            let index = -1;
            let alreadyExists = newArr.some((newAddress, j) => {
                if (address.importProjectTime == newAddress.importProjectTime) {
                    index = j;
                    return true;
                }
            });
            if (!alreadyExists) {
                newArr.push({
                    importProjectTime: address.importProjectTime,
                    location: [address]
                });
            } else {
                newArr[index].location.push(address);
            }
        });
      return newArr;
    },
    // 根据日期求出每天是加班还是正常工作日期
    renderSUMDate(tempArry) {
      // console.log("tempArry",tempArry)
      var submitArry=[]
      tempArry.map((item,index)=>{
        let tempObj=item.location
        var obj={}
        tempObj.map((items,indexs)=>{
          if(!obj[items.time]) {
            // 1工作日  2加班
            if(items.workType=="2") {
              submitArry.push({
                time:items.importProjectTime,
                isAdd:true,
              })
            }else{
              submitArry.push({
                time:items.importProjectTime,
                defaultTime:true,
              })
            }
            obj[items.time]=true
          }
        })
      })
      return submitArry
    },
    // 按月份分组
    renderAddAndDefaultWork(arry) {
      // 把年月日转换成 年月
      arry.map((item,index)=>{
        item.time = item.time.substring(item.time.length-3,0)
      })
      // 根据年月分组
      let newArr = [];
      arry.forEach((address, i) => {
          let index = -1;
          let alreadyExists = newArr.some((newAddress, j) => {
              if (address.time == newAddress.time) {
                  index = j;
                  return true;
              }
          });
          if (!alreadyExists) {
              newArr.push({
                  time: address.time,
                  location: [address]
              });
          } else {
              newArr[index].location.push(address);
          }
      });
      // 求和
      var rowsData=[]
      newArr.map((item,index)=>{
        let tempList = item.location
        var add=0
        var defaultTime=0
        tempList.map((items,indexs)=>{
          if(items.isAdd) {
            add+=1
          }else if(items.defaultTime){
            defaultTime+=1
          }
        })
        rowsData.push({
          "年月":item.time,
          '加班天数':add,
          '正常上班天数':defaultTime
        })
      })
      console.log("dasd",rowsData)
      return rowsData;
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  background: #fff;
}

</style>
