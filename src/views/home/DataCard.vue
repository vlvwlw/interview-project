<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps(['cardData'])

const gotoRouter =()=>{
    router.push(props.cardData.path)
}

</script>

<template>
    <div @click="gotoRouter" class="card h-24 w-full mr-8 cursor-pointer rounded-lg border border-solid border-gray-200
                flex overflow-hidden hover:shadow-md transition-shadow">
        <div :style="{background: cardData.bgcolor}" class='icon h-full aspect-square flex justify-center items-center text-3xl text-white'>
            <component :is="cardData.icon"></component>
        </div>
        <div class="w-full flex flex-col justify-center items-center">
            <a-statistic 
                        :style="{color: cardData.bgcolor}" 
                        :value="cardData.value" 
                        :value-from="0" animation>
                <!-- <template #suffix>
                    <span class="suffix-content"><icon-arrow-rise />12</span>
                </template> -->
            </a-statistic>
            <div class="desc text-sm">{{cardData.title}}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    background-color: var(--color-bg-1);
    .icon{
        background:rgb(var(--green-5));
    }
    .desc{
        color:var(--color-neutral-8);
    }
    .suffix-content{
        color:rgb(var(--green-5))
    }
}
</style>