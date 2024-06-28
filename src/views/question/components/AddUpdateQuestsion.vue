<script setup lang="ts">
import { ref, watch, type Ref } from "vue"
import { useUserLoginStore } from '@/stores/userLogin'
import { FindAllChannelAPI, FindChannelById } from '@/api/channel/index'
import { AddQuestionAPI, FindQuestionById, UpdateQuestionAPI, RestoreDeletedAPI } from '@/api/question/index'
import type { QuestionType } from '@/api/question/type'

const userLoginStore = useUserLoginStore()

// const props = defineProps(['channelList'])

// ------------- 添加问题 -------------
let userinfo = JSON.parse(localStorage.getItem('userinfo') as string)

let showDialog = ref(false)
// let channelList = ref()
let addQuestionForm = ref<QuestionType>({
    title: '',
    channelId: undefined,
    // creatorId: userLoginStore.userinfo.id as number,
    creatorId: userinfo.id,
    content: ''
})
let addQuestionFormRef = ref()
let updateQuestionFormRef = ref()

const openDialog = () => {
    showDialog.value = !showDialog.value
}

const $emit = defineEmits(['updateSuccess'])

// const findAllChannel = async () => {
//     let res = await FindAllChannelAPI(1, 20)
//     channelList.value = res.data.rows
// }
// findAllChannel()

const handleBeforeOk = async () => {
    let res = await AddQuestionAPI(addQuestionForm.value)
    console.log(res)
    console.log(addQuestionForm.value)
    $emit('updateSuccess')
    addQuestionFormRef.value.resetFields()
}

// ------------- 修改问题 -------------
let updateQuestionDialog = defineModel<boolean, string>('updateQuestionDialog')
const props = defineProps(['currentQuestionId', 'channelList'])

let updateQuestionForm = ref<QuestionType>({
    title: '',
    channelId: undefined,
    creatorId: userLoginStore.userinfo.id as number,
    content: ''
})
watch(() => updateQuestionDialog.value, async () => {
    if (updateQuestionDialog.value) {
        let res = await FindQuestionById(props.currentQuestionId)

        for (let key in res.data) {
            if (res.data.hasOwnProperty(key) && updateQuestionForm.value.hasOwnProperty(key)) {
                updateQuestionForm.value = res.data;
            }
        }
    }
})

const handleUpdateQuestion = async ()=>{
    let res = await UpdateQuestionAPI(updateQuestionForm.value)
    if(res.code != 0){
        $emit('updateSuccess')
    }
    console.log(res)
}

const restoreDeleted = async()=>{
    let res = await RestoreDeletedAPI()
    if(res.code != 0){
        $emit('updateSuccess')
    }
}

</script>

<template>
    <div>
        <a-button @click="openDialog" type="primary" class="mb-4 mr-4"><icon-plus class="mr-1" />添加问题</a-button>

        
        <a-popconfirm content="确认要恢复已删除的问题吗?" type="error" @ok="restoreDeleted()">
            <a-button type="outline" class="mb-4">恢复已删除的问题</a-button>
        </a-popconfirm>


        <a-modal v-model:visible="showDialog" width="550px" title="添加问题" @before-ok="handleBeforeOk">
            <a-form ref="addQuestionFormRef" :model="addQuestionForm">
                <a-form-item field="title" label="问题" required>
                    <a-textarea v-model="addQuestionForm.title" allow-clear
                            :auto-size="{
                                minRows: 2,
                                maxRows: 5
                            }"  />
                </a-form-item>
                <a-form-item field="channelId" label="频道" required>
                    <a-select v-model="addQuestionForm.channelId" placeholder="选择频道">
                        <a-option v-for="item in channelList" :key="item.id" :value="item.id">{{ item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="content" label="问题描述">
                    <a-textarea v-model="addQuestionForm.content" placeholder="问题描述" allow-clear 
                            :auto-size="{
                                minRows: 2,
                                maxRows: 5
                            }" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 修改问题对话框 -->
        <a-modal v-model:visible="updateQuestionDialog" width="550px" title="添加问题" @before-ok="handleUpdateQuestion">
            <a-form ref="updateQuestionFormRef" :model="updateQuestionForm">
                <a-form-item field="title" label="问题" required>
                    <a-textarea v-model="updateQuestionForm.title" allow-clear
                            :auto-size="{
                                minRows: 2,
                                maxRows: 5
                            }"  />
                </a-form-item>
                <a-form-item field="channelId" label="频道" required>
                    <a-select v-model="updateQuestionForm.channelId" placeholder="选择频道">
                        <a-option v-for="item in channelList" :key="item.id" :value="item.id">{{ item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="content" label="问题描述">
                    <a-textarea v-model="updateQuestionForm.content" placeholder="问题描述" allow-clear 
                            :auto-size="{
                                minRows: 2,
                                maxRows: 5
                            }" />
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>

<style scoped lang="scss"></style>