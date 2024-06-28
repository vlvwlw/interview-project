<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { FindQuestionById } from '@/api/question'
import { ref } from 'vue';
import WriteAnswer from './WriteAnswer.vue'
import AnswerItem from './AnswerItem.vue'
import {FindAllAnswerAPI } from '@/api/answer'


const route = useRoute()
const router = useRouter()


// ------------- 问题信息 -------------

let questionTitle = ref()
let showEditor = ref(false)

const findQuestionInfo = async () => {
    let res = await FindQuestionById(+route.params.id)
    questionTitle.value = res.data.title
}
findQuestionInfo()


// ------------- 回答信息 -------------
let allAnswers = ref()
let total = ref()
let isFold = ref(true)
let currentExtendId = ref()

const findAllAnswer = async ()=>{
    let res = await FindAllAnswerAPI(+route.params.id)
    allAnswers.value = res.data.rows
    total.value = res.data.total
}
findAllAnswer()

const extendContent =(id:number)=>{
    isFold.value = !isFold.value 
    currentExtendId.value = id
}




</script>

<template>
    <div class="detail-container">
        <div style="background-color: var(--color-bg-1);" class="question-title px-4 py-6">
            <h2 class="text-xl font-bold">{{ questionTitle }}</h2>
            
            <div style="color:var(--color-neutral-6)" class="mt-4 flex items-center">
                <div>{{total}} 解答 · 130 收藏 · 3333 浏览 · 好问题 2342</div>
                <div class="ml-8">
                    <a-button @click="showEditor = !showEditor" type="primary" shape="round" class="mx-4">
                        <template #icon>
                            <icon-edit />
                        </template>
                        写回答
                    </a-button>
                    <a-button type="outline" shape="round">
                        <template #icon>
                            <icon-star />
                        </template>
                        收藏
                    </a-button>
                </div>
            </div>
        </div>

        <div class="">
            <div class="flex items-center h-16">
                <div class="mx-4">讨论解答 · {{ total }}</div>
                <a-button type="primary">最新</a-button>
            </div>

            <transition name="fade">
                <WriteAnswer v-model:showEditor="showEditor" :questionId="route.params.id" class="mb-4"/>
            </transition>

            <div class="answer-container">
                <div v-for="item in allAnswers" 
                        :key="item.id" 
                        class="answer-item mb-4">

                    <AnswerItem :answerItem="item" class="answer-item"></AnswerItem>
                    <a-divider />
                    <!-- <div class="p-4">
                        <div class="mb-4">zhangsan</div>
                        <div v-html="item.answer" class="leading-6 " :class="{'line-clamp-3':isFold && currentExtendId == item.id}"></div>
                        <div @click="extendContent(item.id)" class="mb-4 text-end cursor-pointer" style="color:rgb(var(--arcoblue-5))">
                            {{ isFold && currentExtendId == item.id ? '展开' : '收起'  }}
                        </div>
                        <div>2023-03-03</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.detail-container{
    // background-color: #f2f3f5;
    background-color: var(--color-neutral-2);

    .answer-item{
        background: var(--color-bg-1);
    }
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: .3s;
}

.fade-enter-to {
    opacity: 1;
}
.answer-item:hover{
    // background-color: var(--color-neutral-3);
}
</style>