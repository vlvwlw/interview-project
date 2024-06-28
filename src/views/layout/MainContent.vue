<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useLayoutSetting } from "@/stores/setting"

const layoutSetting = useLayoutSetting()

// 控制当前组件是否销毁重建
let flag = ref(true)
watch(() => layoutSetting.isRefresh, () => {
    flag.value = false
    nextTick(() => {
        flag.value = true
        console.log(flag.value)
    })
})

</script>

<template>

    <div class="h-full p-4 overflow-hidden">
        <!-- main 组件 -->

        <!-- a-scrollbar需要唯一的子元素 -->
        <!-- <a-scrollbar style="height:calc(100vh - 50px - 32px);overflow-y: auto;"> -->
            <router-view v-slot="{ Component }" class="router-container p-8 h-full overflow-y-auto">
                <transition name="fade">
                    <!-- 渲染layout一级路由组件的子路由 -->
                    <component :is="Component" v-if="flag"></component>
                </transition>
            </router-view>
        <!-- </a-scrollbar> -->
    </div>

</template>

<style scoped lang="scss">
.router-container{
    background-color: var(--color-bg-1);
    // transition: background-color .3s;
    @include ScrollBarStyle(var(--color-neutral-6), var(--color-neutral-3));
}
.fade-enter-from {
    opacity: 0;
    transform: translate(50%);
    position: absolute;

}

.fade-enter-active {
    transition: .3s;
    // opacity: 0;
}

.fade-enter-to {
    transform: translate(0px);
}
</style>