<script setup lang="ts">
import { FindAllQuestionAPI, DeleteQuestionAPI, type FindAllQuestionAPIParamType } from '@/api/question/index'
import { ref, shallowRef } from 'vue';
import type { QuestionType, FindByIdResponseDataType, FindAllResponseDataType } from '@/api/question/type'
import { formatPast } from '@/utils/timeFormat'
import PageHeaderCom from './components/PageHeaderCom.vue';
import AddUpdateQuestsion from './components/AddUpdateQuestsion.vue'
import SearchQuestion from './components/SearchQuestion.vue'
import type {TableColumnData} from '@arco-design/web-vue'
import { FindAllChannelAPI, FindChannelById } from '@/api/channel/index'


// ------------- 表格配置 -------------
const columns:TableColumnData[] = [
    {
        title:"操作",        
        slotName: 'optional',
        align: 'center',
        width:220
    },
    {
        title:'标题',
        dataIndex:'title',
        align:'center',
        ellipsis: true,
        tooltip: true,
        width:500
    },
    {
        title:'频道',
        dataIndex:'channel.name',
        align:'center'
    },
    {
        title:'提问者',
        dataIndex:'userInfo.username',
        align:"center"
    },
    {
        title:'更新时间',
        dataIndex:'updateTime',
        align:'center',
        sortable: {
          sortDirections: ['ascend', 'descend']
        },
        width:150
    },
    {
        title:"问题数据",
        // dataIndex:"questionData",
        slotName:'questionData',
        align:'center',
        width:300
    },
    {
        title:'描述',
        dataIndex: 'content',
        align:'center',
        ellipsis: true,
        tooltip: true,
        // width:200
    },
]

// ------------- 展示数据 -------------
let questionList = shallowRef<QuestionType[]>([])

let page = ref(1)
let pageSize = ref(6)
let total = ref(0)
let isReachBottom = ref(false)

let questionParamForm = ref<FindAllQuestionAPIParamType | any>({
    page : 1, 
    pageSize : 6, 
    keyWord : '', 
    channelId : 0, 
    begin : '2000-01-01', 
    end : '2100-01-01',
    orderBy : 'updateTime',
    orderMethod : 'desc'
})

// p: number = 1, pageSize:number = 10, keyWord: string='', channelId: number=0, begin:string='2000-01-01', end:string='2100-01-01', orderBy:string='updateTime', orderMethod: string = 'desc'
const findAllQuestion = async (
    {
        // ...questionParamForm
        page = 1, 
        pageSize = 6, 
        keyWord = '', 
        channelId = 0, 
        begin = '2000-01-01', 
        end = '2100-01-01',
        orderBy = 'updateTime',
        orderMethod = 'desc'
    }: FindAllQuestionAPIParamType
) => {
    let res = await FindAllQuestionAPI({page: page, pageSize, keyWord, channelId, begin, end, orderBy, orderMethod})
    let data = res.data.rows.map(item => {
        let time = formatPast(new Date(item.updateTime as string))
        return {...item, updateTime:time} as QuestionType
    })
    // console.log(data)
    questionList.value = data
    total.value = res.data.total
}

findAllQuestion(questionParamForm.value)
// findAllQuestion({page:page.value, pageSize: pageSize.value})

const pageChange = ()=>{
    findAllQuestion(questionParamForm.value)
    // findAllQuestion({page:page.value, pageSize: pageSize.value})
}

const pageSizeChange = ()=>{
    findAllQuestion(questionParamForm.value)
    // findAllQuestion({page:page.value, pageSize: pageSize.value})
}


// ------------- 修改数据 -------------
let updateQuestionDialog = ref(false)
let currentQuestionId = ref(0)
const openUpdateQuestionDialog = (e:Event, id:number)=>{
    updateQuestionDialog.value = true
    currentQuestionId.value = id
}

const updateSuccess = ()=>{
    findAllQuestion(questionParamForm.value)
    // findAllQuestion({page:page.value, pageSize: pageSize.value})
}

// ------------- 删除问题 -------------
const deleteQuestion = async (e:any, id:number)=>{
    await DeleteQuestionAPI(id)
    console.log(id)
    findAllQuestion(questionParamForm.value)
    // findAllQuestion({page:page.value, pageSize: pageSize.value})
}


// ------------- 搜索题目 -------------
let channelList = ref()
const findAllChannel = async () => {
    let res = await FindAllChannelAPI(1, 20)
    channelList.value = res.data.rows 
}
findAllChannel()

const handlesearchQuestionByForm = (questionForm: any)=>{

    /**
     * 把questionForm和questionParamForm共有的属性赋值给 questionParamForm，
     *  并且如果questionForm中为undefined的属性不赋值给questionParamForm
     */    
    for(let key in questionForm) {
        if(questionParamForm.value.hasOwnProperty(key) && questionForm.hasOwnProperty(key)) {
            if(questionForm[key]){
                questionParamForm.value[key] = questionForm[key];
            }
        }
        if(key == 'time' && questionForm.time){
            questionParamForm.value.begin = questionForm.time[0]
            questionParamForm.value.end = questionForm.time[1]
        }
    }
    console.log('---------->',questionParamForm.value)

    // console.log(questionForm)
    if(questionForm.keyWord && !questionForm.channelId && !questionForm.time){   // ------------- 搜索内容中只有keyWord -------------
        console.log('-------->只有keyWord')

        findAllQuestion(questionParamForm.value)

        // findAllQuestion({page:page.value, pageSize: pageSize.value, keyWord:questionForm.keyWord, orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod}) 
    }else if(!questionForm.keyWord && questionForm.channelId && !questionForm.time){   // ------------- 搜索内容中只有channelId -------------
        console.log('-------->只有channelId')
        findAllQuestion(questionParamForm.value)

        // findAllQuestion({page:page.value, pageSize: pageSize.value,  channelId: questionForm.channelId, orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod}) 
    }else if(!questionForm.keyWord && !questionForm.channelId && questionForm.time){   // ------------- 搜索内容中只有time -------------
        console.log('-------->只有time')
        findAllQuestion(questionParamForm.value)
        
        // findAllQuestion({page:page.value, pageSize: pageSize.value, begin: questionForm.time[0], end:questionForm.time[1], orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod}) 
    }else if(questionForm.keyWord && questionForm.channelId && !questionForm.time){ // ------------- 搜索内容中有keyWord 和 channelId -------------
        console.log('-------->有keyWord 和 channelId')
        findAllQuestion(questionParamForm.value)

        // findAllQuestion({page: page.value, pageSize: pageSize.value, keyWord: questionForm.keyWord, channelId: questionForm.channelId, orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod})
    }else if(!questionForm.keyWord && questionForm.channelId && questionForm.time){   // ------------- 搜索内容中有time 和channelId -------------
        console.log('-------->time 和 channelId')
        findAllQuestion(questionParamForm.value)

        // findAllQuestion({page:page.value, pageSize: pageSize.value, channelId: questionForm.channelId, begin: questionForm.time[0], end: questionForm.time[1], orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod})
    }else if(questionForm.keyWord && !questionForm.channelId && questionForm.time){   // ------------- 搜索内容中有keyWord 和 time -------------
        console.log('-------->keyWord 和 time')
        findAllQuestion(questionParamForm.value)
        
        // findAllQuestion({page:page.value, pageSize:pageSize.value, keyWord: questionForm.keyWord, begin: questionForm.time[0], end:questionForm.time[1], orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod})
    }else if(!questionForm.keyWord && !questionForm.channelId && !questionForm.time){  // ------------- 全都没有 -------------
        console.log('-------->全都没有')
        questionParamForm.value.keyWord = ''
        questionParamForm.value.channelId = 0
        questionParamForm.value.begin = '2000-01-01'
        questionParamForm.value.end = '2100-01-01'

        findAllQuestion(questionParamForm.value)
        
        // findAllQuestion({page:page.value, pageSize: pageSize.value, orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod})
    }else{ // ------------- 全部都有 -------------
        console.log('-------->全部都有')
        findAllQuestion(questionParamForm.value)

        // findAllQuestion({page:page.value, pageSize: pageSize.value, keyWord:questionForm.keyWord, channelId: questionForm.channelId, begin: questionForm.time[0], end: questionForm.time[1], orderBy: questionForm.orderBy, orderMethod: questionForm.orderMethod})
    }
}

</script>

<template>
    <div class="h-full">
        <!-- <PageHeaderCom></PageHeaderCom> -->
        <SearchQuestion :channelList="channelList" @searchQuestionByForm="handlesearchQuestionByForm"></SearchQuestion>

        <AddUpdateQuestsion 
                    :channelList="channelList"
                    @updateSuccess="updateSuccess" 
                    v-model:updateQuestionDialog="updateQuestionDialog" 
                    :currentQuestionId="currentQuestionId"></AddUpdateQuestsion>


        <a-table :columns="columns" 
                :data="questionList" 
                :scroll="{x:'120%', y:''}" 
                column-resizable :bordered="{cell:true}" 
                :pagination="false">

            <template #optional="{ record }">
                <a-button status="warning" @click="openUpdateQuestionDialog($event, record.id as number)" class="mr-4"><icon-edit
                        class="mr-1" />修改</a-button>

                <a-popconfirm content="确认删除该问题吗?" type="error" @ok="deleteQuestion($event, record.id)">
                    <a-button status="danger" class="mb-4"><icon-delete class="mr-1" />删除</a-button>
                </a-popconfirm>
            </template>

            <template #questionData="{record}">
                <div class="text-lg">
                    <span class="mr-4"><icon-eye /> {{ record.readCount }}</span>
                    <span class="mr-4"><icon-thumb-up /> {{ record.likeCount }}</span>
                    <span class="mr-4"><icon-star /> {{ record.collectionCount }}</span>    
                </div>
            </template>

        </a-table>        

        <a-pagination 
                    v-model:current="questionParamForm.page"
                    v-model:page-size="questionParamForm.pageSize"
                    @change="pageChange"
                    @page-size-change="pageSizeChange"
                    :total="total" show-total show-jumper 
                    show-page-size :default-page-size="6" 
                    :page-size-options="[3,6,9,12]" class="mt-4"/>
        
        <!-- <a-list scrollbar max-height="600px" @reach-bottom="handleReachBottom" :bordered="false">
            <a-list-item v-for="question in questionList" :key="question.id"
                class="list-item group/item items-center">
                <a-list-item-meta class="flex-initial w-[95%]">
                    <template #title>
                        <h2 class="font-bold text-[16px] line-clamp-2">{{question.id}}-{{ question.title }}</h2>
                    </template>
                    <template #description>
                        class="truncate text-ellipsis overflow-hidden ..." 单行文本溢出显示省略号

                        <div>
                            <div class="line-clamp-2">{{ question.content }}</div>
                            <div class="flex items-center justify-between">
                                <div class="mt-3 text-[16px]">
                                    <span class="mr-4">aaaaaa</span>
                                    <span class="mr-4 text-gray-300">|</span>
                                    <span class="mr-4">{{ formatPast(new Date(question.updateTime as string)) }}</span>
                                    <span class="mr-4 text-gray-300">|</span>
                                    <span class="mr-4"><icon-eye /> {{ question.readCount }}</span>
                                    <span class="mr-4"><icon-thumb-up /> {{ question.likeCount }}</span>
                                    <span class="mr-4"><icon-star /> {{ question.collectionCount }}</span>
                                </div>
                                <div class="mt-1">
                                    <a-tag class="mx-1">Default</a-tag>
                                </div>
                            </div>
                        </div>
                    </template>
                </a-list-item-meta>

                <template #extra>
                    <div class="text-lg ml-8 invisible group-hover/item:visible ">
                        <a-button @click="openUpdateQuestionDialog($event, question.id as number)" size="large" status="warning" shape="circle" class="mr-4">
                            <icon-edit />
                        </a-button>
                        <a-button size="large" status="danger" shape="circle">
                            <icon-delete />
                        </a-button>
                    </div>
                </template>
            </a-list-item>

            <template #scroll-loading>
                <div v-if="isReachBottom">已到达底部</div>
                <a-spin dot v-else/>
            </template>
        </a-list> -->
    </div>
</template>

<style scoped lang="scss">
:deep(.arco-list-item-meta-content) {
    width: 100%;
}
.list-item{
    &:hover{
        background-color: var(--color-neutral-2);
    }
}
</style>