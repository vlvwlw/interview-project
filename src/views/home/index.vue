<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getChannelQuestionCount, getTableRowCountAPI } from '@/api/home';
import { useLayoutSetting } from '@/stores/setting'
import ChannelQuestionCount from './ChannelQuestionCount.vue'
import DailyIncreaseCount from './DailyIncreaseCount.vue'
import DataCard from './DataCard.vue';



// getTableRowCountAPI()
//     .then(res=>{
//         console.log(res)
//     })


let cardList = ref([
    {
        title: '用户数量',
        value: 0,
        icon: 'icon-user',
        bgcolor:'rgb(var(--arcoblue-6))',
        path:'/user'
    },
    {
        title: '问题数量',
        value: 0,
        icon: 'icon-question-circle',
        bgcolor:'rgb(var(--green-6))',
        path:"/data/question"
    },
    {
        title: '回答数量',
        value: 0,
        icon: 'icon-message',
        bgcolor:'rgb(var(--orange-4))',
        path:"/data/answers"
    },
    {
        title: '用户数量',
        value: 0,
        icon: 'icon-user',
        bgcolor:'rgb(var(--red-3))',
        path:'/'
    },

])


const tableRowCountFn = async ()=>{
    let res = await getTableRowCountAPI()
    res.data.forEach((item:any, index:number)=>{
        cardList.value[index].value = item.rowCount
    })
}
tableRowCountFn()

</script>

<template>

    <div class="home-container">
        <div class="mb-4 font-bold ">基础数据</div>
        <div class="cards mb-8 flex justify-between">
            <DataCard v-for="item in cardList" :key="item.title" :cardData="item"/>
        </div>                   
        <div class="flex">
            <DailyIncreaseCount class="flex-[0.7]"></DailyIncreaseCount>         
            <ChannelQuestionCount class="flex-[0.3]"></ChannelQuestionCount>

        </div>
    </div>
</template>

<style scoped lang="scss">
.home-container {
    background-color: var(--color-neutral-2);
    // background-color: yellow;
}
</style>
