<script setup lang="ts">
import QuestionList from './QuestionList.vue'
import HeaderContainer from './HeaderContainer.vue'
import { ref } from 'vue';

let channelId = ref(0)
let searchKeyWord = ref('')

const handleTabChange = (e: any)=>{
    channelId.value = e
}
const searchChange = (e: string)=>{
    searchKeyWord.value = e
}

</script>

<template>
    <div class="relative">
        <!-- <router-view></router-view> -->
        <HeaderContainer  @tabChange="handleTabChange" @searchChange="searchChange"></HeaderContainer>
        <QuestionList v-model:channelId="channelId" v-model:searchKeyWord="searchKeyWord"></QuestionList>
    </div>    
</template>

<style scoped lang="scss">

</style>