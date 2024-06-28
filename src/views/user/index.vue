<script setup lang="ts">
import useUserHook from './hooks/useUserHook';

const {getUser} = useUserHook()

</script>

<template>
    <div class="h-full" @click="getUser">用户管理</div>
</template>

<style scoped lang="scss">

</style>