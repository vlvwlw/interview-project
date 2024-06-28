<script setup lang="ts">
import { AddAnswerAPI } from '@/api/answer'
import type { AnswerData } from '@/api/answer/type'


import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
// @ts-ignore
import { Editor, Toolbar , IEditorConfig} from '@wangeditor/editor-for-vue'
// import { IEditorConfig } from '@wangeditor/editor'

// ------------- 编辑器配置 -------------

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig>  = { placeholder: '请输入内容...' , MENU_CONF: {}}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

let mode = ref('simple')


editorConfig.MENU_CONF['codeSelectLang'] = {
    // 代码语言
    codeLangs: [
        { text: 'CSS', value: 'css' },
        { text: 'HTML', value: 'html' },
        { text: 'Javascript', value: 'javascript' },
        { text: 'Typescript', value: 'typescript' },
        { text: 'Java', value: 'java' },
        { text: 'Markdown', value: 'markdown' }
    ]
}
// -------------  -------------


let props = defineProps(['showEditor', 'questionId'])
let userinfo = JSON.parse(localStorage.getItem('userinfo') as string)


const handleSubmitAnswer = async () => {
    let answerObj: AnswerData = {
        answer: valueHtml.value,
        questionId: props.questionId,
        creatorId: userinfo.id
    }
    let res = await AddAnswerAPI(answerObj)
    console.log(res)
}

</script>

<template>
    <div v-if="showEditor" style="" class="shadow-xl">
        <Toolbar style="border-bottom: 1px solid #ccc; background-color: var(--color-bg-1);" :editor="editorRef"
            :defaultConfig="toolbarConfig" :mode="mode" />

        <Editor style="height: 500px; overflow-y: hidden;background-color: var(--color-bg-1);" v-model="valueHtml"
            :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />

        <a-button @click="handleSubmitAnswer" type="primary">提交</a-button>
    </div>
</template>

<style scoped lang="scss"></style>