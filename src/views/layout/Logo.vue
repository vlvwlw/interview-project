<script setup lang="ts">
import { useLayoutSetting } from "@/stores/setting"


const layoutSetting = useLayoutSetting()

</script>

<template>
    <div class="logo flex justify-center flex-col items-center py-2">
        <img class="w-[36px] aspect-auto rounded-full" src="https://p4.music.126.net/RfI9EdCHndzmc29SzNjz7g==/109951165274824133.jpg?param=30y30" alt="">
        <transition name="fade">
            <div v-show="layoutSetting.isExpand" class="py-2 text-xl">
                问答后台管理系统
            </div>
        </transition>
    </div>
</template>

<style scoped lang="scss">
.logo{
    background-color: var(--color-bg-1);
}
.fade-enter-from{
    transform:scale(0)
}
.fade-enter-active{
    transition:.3s;
}
.fade-enter-to{
    transform:scale(1)
}
</style>