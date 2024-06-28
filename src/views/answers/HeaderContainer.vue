<script setup lang="ts">
import { ref } from 'vue'
import { FindAllChannelAPI, FindChannelListByIdsAPI } from '@/api/channel'
import type { TransferItem } from '@arco-design/web-vue/es/transfer/interface';
import { UpdateUserInfoAPI } from '@/api/userinfo'

let userInfo = JSON.parse(localStorage.getItem('userinfo') as string)
let ids = userInfo.selfChannelList.split('_')



let channelList = ref()
let channelTransferData:TransferItem[] = []

const FindAllChannelFn = async () => {
    userInfo = JSON.parse(localStorage.getItem('userinfo') as string)
    ids = userInfo.selfChannelList.split('_')

    try{
        let res = await FindChannelListByIdsAPI(ids)
        channelList.value = res.data
    }catch(e){
        console.log(e)
    }

    let allChannels = await FindAllChannelAPI(1,30)
    // console.log(allChannels)
    
    channelTransferData = allChannels.data.rows.map((item:any) =>{
        return {
            value: item.id + '',
            label: item.name,
            disabled: false
        }
    })
}
FindAllChannelFn()

let showDialog = ref(false)

const handleAdd = ()=>{
    showDialog.value = true
}

// ------------- 修改用户channelList -------------
let userChannelList = ''
const handleChannelListChange = (e:string[])=>{
    userChannelList = e.join('_')
}

const handleModalOk = async ()=>{
    try{
        // userInfo = JSON.parse(localStorage.getItem('userinfo') as string)
        // ids = userInfo.selfChannelList.split('_')
        // console.log('==============',!!userInfo.selfChannelList)
        // if(!userInfo.selfChannelList){
        //     return
        // }    
        let res = await UpdateUserInfoAPI({
            id: userInfo.id,
            selfChannelList: userChannelList
        })
        userInfo = {...userInfo, selfChannelList: userChannelList}
        localStorage.setItem('userinfo', JSON.stringify(userInfo))

        await FindAllChannelFn()

    }catch(e){
        console.log(e)
    }
}

// ------------- 选中频道 -------------
const emit = defineEmits(['tabChange', 'searchChange'])

const handleTabChange = (e:any)=>{
    emit('tabChange', e)
    console.log(e)
}
const handleSearchChange = (e:string)=>{
    emit('searchChange', e)
    console.log(e)
}


</script>

<template>
    <div class="sticky -top-8 z-10 h-16" style="background: var(--color-bg-1)">
        <a-tabs type="line" :editable="true" @change="handleTabChange" @add="handleAdd" animation hide-content size="large"
                    header-padding show-add-button auto-switch>
            <a-tab-pane title="推荐" :key="0" :closable="false"></a-tab-pane>
            <a-tab-pane v-for="(item, index) of channelList" :key="item.id" :title="item.name" :closable="false"
                class="text-lg"></a-tab-pane>

            <template #extra>
                <a-trigger position="bottom" :unmount-on-close="false" trigger="focus">
                    <a-input-search :style="{width:'320px'}" placeholder="请输入" @change="handleSearchChange"/>
                    <template #content>
                        <div class="w-[320px] shadow-md">
                            <a-empty />
                        </div>
                    </template>
                </a-trigger>
            </template>
        </a-tabs>
        <div>

        </div>

        <a-modal v-model:visible="showDialog" title="频道设置" @ok="handleModalOk">

            <div>
                <a-transfer 
                            :data="channelTransferData" 
                            :default-value="ids"
                            one-way 
                            :title="['所有频道', '我的频道']"
                            @change="handleChannelListChange">
                </a-transfer>
            </div>
        </a-modal>
    </div>
</template>

<style scoped lang="scss">
:deep(.arco-tabs-tab){
    font-size: 16px !important;
}
</style>