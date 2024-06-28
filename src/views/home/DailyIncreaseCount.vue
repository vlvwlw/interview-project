<script setup lang="ts">
import { getDailyIncreaseCount } from '@/api/home'
import { ref, onMounted, watch } from 'vue'

import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    MarkPointComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { useLayoutSetting } from '@/stores/setting'

const layoutSetting = useLayoutSetting()

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    MarkPointComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);



let dailyIncreaseCountData: any
let dailyIncreaseAnswerCountData: any
let xAxisData: any
let queryDays = ref(7)

let today = new Date(); // 获取今天的日期
let dates = []; // 用来存储过去七天的日期

// for (let i = 0; i <= 6; i++) { // 循环7次，包括今天和过去6天
//     let pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000); // 根据索引i回溯日期
//     let month = ("0" + (pastDate.getMonth() + 1)).slice(-2); // 获取月份并补零
//     let day = ("0" + pastDate.getDate()).slice(-2); // 获取日期并补零
//     dates.unshift(month + '-' + day); // 存储格式化的日期
// }
// xAxisData = dates

const getDailyIncreaseCountData = async (days=queryDays.value) => {
    let res = await getDailyIncreaseCount(days)
    console.log(res)
    // xAxisData = res.data.map((item: any) => {
    //     return item.date
    // })
    
    dates = []

    for (let i = 0; i < days; i++) { // 循环7次，包括今天和过去6天
        let pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000); // 根据索引i回溯日期
        let month = ("0" + (pastDate.getMonth() + 1)).slice(-2); // 获取月份并补零
        let day = ("0" + pastDate.getDate()).slice(-2); // 获取日期并补零
        dates.unshift(month + '-' + day); // 存储格式化的日期
    }
    xAxisData = dates

    dailyIncreaseCountData = res.data.map((item: any) => {
        return item.dailyIncreaseCount
    })
    dailyIncreaseAnswerCountData = res.data.map((item:any) =>{
        return item.dailyIncreaseAnswerCount
    })
    console.log(xAxisData, dailyIncreaseCountData, dailyIncreaseAnswerCountData)
}




async function initDailyIncreaseCountChart() {
    await getDailyIncreaseCountData()
    let chartDom = document.querySelector('.dailyIncreaseCountChart') as HTMLDivElement;
    echarts.dispose(chartDom)

    let myChart = echarts.init(chartDom, layoutSetting.isLightTheme ? '' : 'dark');
    let option;

    option = {
        title: {
            text: `${queryDays.value} 天内每日问题新增数量`
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 个'
            }
        },
        series: [
            {
                name: '问题增长',
                type: 'line',
                data: dailyIncreaseCountData,
                smooth: true,
                areaStyle: {},
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: '平均' }]
                }
            },
            {
                name: '回答增长',
                type: 'line',
                data: dailyIncreaseAnswerCountData,
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: '平均' }]
                }
            },
        ]
    };

    option && myChart.setOption(option);
}

onMounted(initDailyIncreaseCountChart)

watch(() => layoutSetting.isLightTheme, () => {
    initDailyIncreaseCountChart()
})

const handleQueryDays = ()=>{
    initDailyIncreaseCountChart()
}


</script>

<template>
    <div class="w-full mr-10 shadow-xl ">
        <a-popconfirm @ok="handleQueryDays">
            <a-button type="primary">查询最近新增</a-button>
            <template #content>
                <div>查询最近{{queryDays}}天的数据</div>
                <a-input-number v-model="queryDays" placeholder="请输入要查询天数" class="input-demo" :min="1" :max="14"/>
            </template>
        </a-popconfirm>
        
        <div class="dailyIncreaseCountChart h-[450px] w-full mt-4 "></div>
    </div>
</template>

<style scoped lang="scss">
.dailyIncreaseCountChart {
    background-color: var(--color-bg-1);
    border-radius: 10px;
    // background-color: rgb(var(--color-bg-white)) ;
}
</style>