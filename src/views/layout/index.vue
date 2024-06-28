<script setup lang="ts">
import MainContent from './MainContent.vue';
import LeftMenu from './LeftMenu.vue';
import TopNav from './TopNav.vue';
import {constantRoute} from '@/router/routes'

console.log(constantRoute)



</script>

<template>
    <div class=" h-screen w-screen flex ">
        <LeftMenu :constantRoute="constantRoute"/>
        
        <div class="w-full flex flex-col">
            <TopNav :constantRoute="constantRoute"/>
    
            <MainContent />

        </div>
    </div>
</template>

<style scoped lang="scss">

</style>