<script setup lang="ts">
import { ref } from 'vue';
import {formatPast} from '@/utils/timeFormat'


const props = defineProps(['answerItem'])


// 创建一个临时的DOM元素来解析HTML字符串
let tempDiv = document.createElement('div');
tempDiv.innerHTML = props.answerItem.answer;

// 使用innerText或textContent获取纯文本内容
let plainText = tempDiv.innerText || tempDiv.textContent;

let isTextFlod = ref(true)

const extendContent = ()=>{
    isTextFlod.value = !isTextFlod.value
}

console.log(props.answerItem)
</script>

<template>
    <div>
        <div class="p-4">
            <div class="mb-4">zhangsan</div>

            <div v-if="isTextFlod" class="leading-6 " :class="{'line-clamp-3':isTextFlod }">{{ plainText }}</div>
            <div v-else v-html="answerItem.answer" class="leading-6 editor-content-view my-4"></div>

            <div @click="extendContent" style="color: rgb(var(--arcoblue-6))" class="text-end cursor-pointer">
                {{ isTextFlod? '展开': '收起' }}
            </div>

            <div style="color: var(--color-neutral-6)">上次更新：{{ formatPast(answerItem.updateTime) }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>