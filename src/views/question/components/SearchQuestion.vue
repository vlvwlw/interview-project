<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['channelList'])
const emit = defineEmits(['searchQuestionByForm'])

let searchFormRef = ref()

type searchFormType = {
    keyWord?: string;
    channelId?: undefined;
    time?: undefined;
    orderBy?: string;
    orderMethod?: string;
}

let searchForm = ref(<searchFormType>{
    keyWord: '',
    channelId: undefined,
    time: undefined,
    orderBy:'updateTime',
    orderMethod:'desc'
})

const handleSearch = () => {
    // console.log(searchForm.value)
    emit('searchQuestionByForm', searchForm.value)
}


// ------------- 排序方式 -------------
// let orderBy = ref('updateTime')
// let orderMethod = ref('desc')

const changeOrderMethod = (e:any)=>{
    emit('searchQuestionByForm', searchForm.value)
}
const changeOrderBy = (e:any)=>{
    emit('searchQuestionByForm', searchForm.value)
}


</script>

<template>
    <div class="mb-4">
        <a-form ref="searchFormRef" :model="searchForm" layout="inline">
            <a-form-item field="keyWord" label="标题">
                <a-input-search v-model="searchForm.keyWord" placeholder="请输入标题" />
            </a-form-item>
            <a-form-item field="channelId" label="频道">
                <a-select v-model="searchForm.channelId" :style="{ width: '150px' }" placeholder="请选择频道">
                    <a-option v-for="item in channelList" :key="item.id" :value="item.id">{{ item.name }}</a-option>
                </a-select>
            </a-form-item>

            <a-form-item field="time" label="创建时间">
                <a-range-picker v-model="searchForm.time"></a-range-picker>
            </a-form-item>
            <a-button type="primary" @click="handleSearch">查询</a-button>

            <a-trigger trigger="click" position="bottom" auto-fit-position :unmount-on-close="false">
                <a-button type="outline" class="mx-4">排序</a-button>
                <template #content>
                    <div class="demo-basic flex flex-col">
                        <!-- 排序方式： -->
                        <a-radio-group @change="changeOrderMethod" v-model="searchForm.orderMethod" class="ml-4 mb-6">
                            <a-radio value="asc">正序</a-radio>
                            <a-radio value="desc">倒序</a-radio>
                        </a-radio-group>
                        <a-select v-model="searchForm.orderBy" @change="changeOrderBy" :style="{ width: '220px' }" 
                            placeholder="选择排序方式">
                            <a-option value="updateTime">更新时间</a-option>
                            <a-option value="readCount">阅读数</a-option>
                            <a-option value="likeCount">点赞数</a-option>
                            <a-option value="collectionCount">收藏数</a-option>
                        </a-select>
                    </div>
                </template>
            </a-trigger>


            <a-button type="secondary" @click="searchFormRef.resetFields()">清空</a-button>
        </a-form>

    </div>
</template>

<style scoped lang="scss">
.demo-basic {
    padding: 20px;
    // width: 200px;
    // height: 200px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>