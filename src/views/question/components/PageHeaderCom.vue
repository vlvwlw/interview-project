<script setup lang="ts">
import { FindAllChannelAPI } from '@/api/channel/index'
import { ref } from 'vue';


let channelList = ref()
const findAllChannel = async (page = 1, pageSize = 20) => {
    let res = await FindAllChannelAPI(page, pageSize)
    channelList.value = res.data.rows
}
findAllChannel()

</script>

<template>
    <div>
        <a-tabs default-active-key="2" lazy-load size="large" @change="(e)=>{console.log(e)}" >
            <template #extra>
                <a-button type="secondary">我的频道</a-button>
            </template>
            <a-tab-pane v-for="item in channelList" :key="item.id" :title="item.name">
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<style scoped lang="scss"></style>