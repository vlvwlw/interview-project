<script setup lang="ts">
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { ref, onMounted, watch } from 'vue'
import { getChannelQuestionCount } from '@/api/home';
import { useLayoutSetting } from '@/stores/setting'

const layoutSetting = useLayoutSetting()

let channelQuestionCountData = ref()

echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

const channelQuestionCountFn = async () => {
    let res = await getChannelQuestionCount()
    let data = res.data.map((item: any) => {
        return {
            value: item.questionCount,
            name: item.channelName
        }
    })
    channelQuestionCountData.value = data
    console.log(channelQuestionCountData.value)
}


async function initChart() {

    await channelQuestionCountFn()

    let chartDom = document.getElementById('chart') as HTMLDivElement;
    echarts.dispose(chartDom)
    let myChart = echarts.init(chartDom, layoutSetting.isLightTheme ? '' : 'dark');
    let option;

    option = {
        title: {
            text: '问题类型分布'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '85%',
            left: 'center'
        },
        series: [
            {
                name: '问题数量',
                type: 'pie',
                radius: ['70%', '30%'],
                avoidLabelOverlap: false,
                padAngle: 3,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: channelQuestionCountData.value
            }
        ]
    };

    option && myChart.setOption(option);

}

onMounted(initChart)

watch(() => layoutSetting.isLightTheme, () => {
    initChart()
})



</script>

<template>
    <div id="chart" class="chart-container w-full h-[500px] shadow-xl"></div>
</template>

<style scoped lang="scss">
.chart-container{
    background-color: var(--color-bg-white) ;
    border-radius: 10px;
}
</style>