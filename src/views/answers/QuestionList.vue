<script setup lang="ts">
import { FindAllQuestionAPI, type FindAllQuestionAPIParamType } from '@/api/question/index'
import { onMounted, ref, shallowRef , watch} from 'vue';
import { formatPast } from '@/utils/timeFormat'
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()

const props = defineProps(['channelId','searchKeyWord'])

let questionParamForm = ref<FindAllQuestionAPIParamType | any>({
    page: 1,
    pageSize: 10,
    keyWord: '',
    channelId: props.channelId,
    begin: '2000-01-01',
    end: '2100-01-01',
    orderBy: 'updateTime',
    orderMethod: 'desc'
})
let questionList = shallowRef<any>([])
let isReachBottom = ref(false)
let total = 0

const findAllQuestion = async () => {
    console.log('初始化')
    let res = await FindAllQuestionAPI(questionParamForm.value)
    // questionList.value = res.data.rows

    questionList.value = [...questionList.value, ...res.data.rows]
    console.log(questionList.value)
    total = res.data.total

}
findAllQuestion()


// -------------  -------------

const gotoDetail = (id: number) => {
    router.push({ name: 'answersDetail', params: { id } })
}


watch(()=> props.channelId, async()=>{
    console.log('props.channelId=======> ', props.channelId)
    questionParamForm.value.channelId = props.channelId
    questionParamForm.value.page = 1
    questionList.value = []
    isReachBottom.value = false
    await findAllQuestion()
})
watch(()=> props.searchKeyWord, ()=>{
    questionParamForm.value.page = 1
    questionParamForm.value.keyWord = props.searchKeyWord
    questionList.value = []
    isReachBottom.value = false
    findAllQuestion()
})


// ------------- 监视列表是否触底 -------------
onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {

        if (questionParamForm.value.page * questionParamForm.value.pageSize > total) {
            isReachBottom.value = true
            // intersectionObserver.disconnect()
            return
        }
        if (!entries[0].isIntersecting) return;

        questionParamForm.value.page++
        
        findAllQuestion()
        console.log(questionParamForm.value.page * questionParamForm.value.pageSize)


    });
    intersectionObserver.observe(document.querySelector(".scroll-loading") as Element);
})

</script>

<template>
    <div>
        <a-list :bordered="false" hoverable :scrollbar="true">
            <a-list-item v-for="question in questionList" :key="question.id" @click="gotoDetail(question.id)"
                class="list-item group/item items-center">
                <a-list-item-meta class="w-[95%]">
                    <template #title>
                        <h2 class="font-bold text-[16px] line-clamp-2 w-full">{{ question.title }}</h2>
                    </template>
                    <template #description>
                        <div>
                            <!-- <div class="line-clamp-2">
                                class="truncate text-ellipsis overflow-hidden ..." 单行文本溢出显示省略号
                            </div> -->
                            <div class="flex items-center justify-between">
                                <div class="mt-3 text-[16px]">
                                    <span class="mr-4">{{ question.userInfo.username }}</span>
                                    <span class="mr-4 text-gray-300">|</span>
                                    <span class="mr-4">{{ formatPast(new Date(question.updateTime as string)) }}</span>
                                    <span class="mr-4 text-gray-300">|</span>
                                    <span class="mr-4"><icon-eye /> {{ question.readCount }}</span>
                                    <span class="mr-4"><icon-thumb-up /> {{ question.likeCount }}</span>
                                    <span class="mr-4"><icon-star /> {{ question.collectionCount }}</span>
                                </div>
                                <div class="mt-1">
                                    <a-tag class="mx-1">{{ question?.channel.name }}</a-tag>
                                </div>
                            </div>
                        </div>
                    </template>
                </a-list-item-meta>

                <!-- <template #extra>
                    <div class="text-lg ml-8 invisible group-hover/item:visible ">
                        <a-button size="large" status="warning" shape="circle" class="mr-4">
                            <icon-edit />
                        </a-button>
                        <a-button size="large" status="danger" shape="circle">
                            <icon-delete />
                        </a-button>
                    </div>
                </template> -->
            </a-list-item>

            <template #scroll-loading>
                <div class="scroll-loading">
                    <div v-if="isReachBottom">已到达底部</div>
                    <a-spin dot v-else />
                </div>
            </template>
        </a-list>

    </div>
</template>

<style scoped lang="scss">
:deep(.arco-list-item-meta-content){
    width: 80%;
}
</style>