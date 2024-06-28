<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { FindAllChannelAPI, AddChannelAPI, DeleteChannelAPI, UpdateChannelAPI, FindChannelById } from '@/api/channel/index'
import type {ChannelDataType} from '@/api/channel/type'
import type {TableColumnData} from '@arco-design/web-vue'
import {formatPast} from '@/utils/timeFormat'

let date = new Date("2024-05-27T16:38:31")
console.log(date)
console.log(formatPast(date))

// ------------- 展示channel数据 ------------- 
type Columns = {
    title: string,
    dataIndex?: string,
    slotName?: string,
    align?:string
}
const columns: TableColumnData[] = [
    {
        title: "序号",
        dataIndex: 'id',
        align: 'center'
    },
    {
        title: "频道名称",
        dataIndex: "name",
        align: 'center'
    },
    {
        title: '最后操作时间',
        dataIndex: 'updateTime',
        align: 'center'
    },
    {
        title: '操作',
        slotName: 'optional',
        align: 'center'
    }
]

        // ------------- 排序方式 -------------
let orderBy = ref('default')
let orderMethod = ref('asc')

        // ------------- 分页展示 -------------
let total = ref(0)
let page = ref(1)
let pageSize = ref(6)

const pageChange = ()=>{
    console.log(page.value)
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}
const pageSizeChange = ()=>{
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}

let data = ref()
const findAllChannel = async (page = 1, pageSize = 10, orderBy = 'name', orderMethod = 'updateTime') => {
    let res = await FindAllChannelAPI(page, pageSize, orderBy, orderMethod)

    total.value = res.data.total

    let channelList = res.data.rows.map(item=>{
        let updateTimeDate = new Date(item.updateTime as string)
        let time = formatPast(updateTimeDate)
        return {...item, updateTime: time}
    })
    console.log(channelList)
    data.value = channelList
}
findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)


const changeOrderBy = (e:any)=>{
    console.log(orderBy.value)
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}

const changeOrderMethod = (e:any)=>{
    console.log(orderMethod.value)
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}


// ------------- 添加频道 -------------
let addChannelForm = ref({
    name: ''
})
let showDialog = ref(false)
let nameInput = ref()

const openDialog = () => {
    showDialog.value = !showDialog.value
    nextTick(() => {
        nameInput.value.focus()
    })
}

const handleAddChannel = async () => {
    let res = await AddChannelAPI(addChannelForm.value)
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}

// ------------- 删除频道 -------------
const deleteChannel = async (e:any, record:ChannelDataType)=>{
    let res = await DeleteChannelAPI(record.id as number)
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}


// ------------- 修改频道 -------------
let showUpdateDialog = ref(false)
let updateNameInput = ref()
let updateChannelForm = ref({
    name:''
})
let currentId = 0

const updateChannel = async(e:Event, record: ChannelDataType)=>{
    showUpdateDialog.value = !showUpdateDialog.value
    currentId = record.id as number
    nextTick(async ()=>{
        updateNameInput.value.focus()
        let res = await FindChannelById(record.id as number)
        updateChannelForm.value.name = res.data.name
    })
}

const handelUpdateChannel = async()=>{
    let res = await UpdateChannelAPI({name: updateChannelForm.value.name, id: currentId})
    findAllChannel(page.value, pageSize.value, orderBy.value, orderMethod.value)
}


</script>

<template>
    <div>
        <div class="flex justify-between">
            <a-button @click="openDialog" type="primary" class="mb-4"><icon-plus class="mr-1" />添加频道</a-button>

            <div>
                排序方式：
                <a-select v-model="orderBy" @change="changeOrderBy" :style="{width:'220px'}" placeholder="选择排序方式">
                    <a-option value="name">频道名称</a-option>
                    <a-option value="updateTime">最后操作时间</a-option>
                    <a-option value="default">默认排序</a-option>
                </a-select>
                <a-radio-group @change="changeOrderMethod" v-model="orderMethod" class="ml-4">
                    <a-radio value="asc">正序</a-radio>
                    <a-radio value="desc">倒序</a-radio>
                </a-radio-group>
            </div>

        </div>
        <a-table :columns="columns" :data="data" :pagination="false" bodyCell>
            <template #optional="{ record }">
                <a-button status="warning" @click="updateChannel($event, record)" class="mr-4"><icon-edit
                        class="mr-1" />修改</a-button>

                <a-popconfirm content="确认删除吗?" type="error" @ok="deleteChannel($event, record)">
                    <a-button status="danger" class="mb-4"><icon-delete class="mr-1" />删除</a-button>
                </a-popconfirm>
            </template>
        </a-table>

        <a-pagination 
                    v-model:current="page"
                    v-model:page-size="pageSize"
                    @change="pageChange"
                    @page-size-change="pageSizeChange"
                    :total="total" show-total show-jumper 
                    show-page-size :default-page-size="6" 
                    :page-size-options="[3,6,9,12]" class="mt-4"/>

        <a-modal v-model:visible="showDialog" title="添加频道" @before-ok="handleAddChannel">
            <a-form :model="addChannelForm">
                <a-form-item field="name" label="Name">
                    <a-input ref="nameInput" v-model="addChannelForm.name" />
                </a-form-item>
            </a-form>
        </a-modal>

        <a-modal v-model:visible="showUpdateDialog" title="修改频道" @before-ok="handelUpdateChannel">
            <a-form :model="updateChannelForm">
                <a-form-item field="name" label="Name">
                    <a-input ref="updateNameInput" v-model="updateChannelForm.name" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<style scoped lang="scss"></style>