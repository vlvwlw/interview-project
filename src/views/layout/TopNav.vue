<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useLayoutSetting } from "@/stores/setting"
import { useRoute, useRouter } from 'vue-router'

const props = defineProps(['constantRoute'])
// console.log(props.constantRoute[0].children)

const $route = useRoute()
const $router = useRouter()

// console.log($route.matched)

const layoutSetting = useLayoutSetting()

const expand = () => {
    layoutSetting.isExpand = !layoutSetting.isExpand
}

const goRouter = (path: string) => {
    $router.push(path)
}

if (window.innerWidth < 700) {
    layoutSetting.isExpand = false
}

window.addEventListener('resize', () => {
    if (window.innerWidth < 850) {
        layoutSetting.isExpand = false
    }
})

// ------------- 更改主题 -------------

const changeTheme = () => {
    layoutSetting.changeTheme()
    // setTheme()
}

// ------------- 刷新页面 -------------
let spinFlag = ref(false)
let timer:NodeJS.Timeout
const refreshPage =()=>{
    clearTimeout(timer)
    layoutSetting.updateRefresh()
    spinFlag.value = true

    timer = setTimeout(()=>{
        spinFlag.value = false
    },1000)
}

// ------------- 退出登录 -------------
const loginOut = ()=>{
    $router.push("/login")
}



</script>

<template>
    <div class="top-nav w-full h-[60px] shadow-sm
        p-2 flex justify-between items-center">
        <div class="left flex items-center">
            <icon-to-left v-show="layoutSetting.isExpand" @click="expand" class="mr-4 text-[24px]" />
            <icon-to-right v-show="!layoutSetting.isExpand" @click="expand" class="mr-4 text-[24px]" />

            <a-breadcrumb separator="/">
                <a-breadcrumb-item :key="item.path" v-for="item in $route.matched" @click="goRouter(item.path)">
                    {{ item.meta.title }}
                </a-breadcrumb-item>
            </a-breadcrumb>

        </div>
        <div class="right w-[200px] flex mr-10 justify-between">
            <a-button @click="refreshPage" type="outline" shape="circle">
                <template #icon>
                    <icon-refresh :spin="spinFlag"/>
                </template>
            </a-button>
            <a-button @click="changeTheme" type="outline" shape="circle">
                <template #icon>
                    <icon-sun-fill v-show="layoutSetting.isLightTheme" />
                    <icon-moon-fill v-show="!layoutSetting.isLightTheme" />
                </template>
            </a-button>
            <a-button type="outline" shape="circle">
                <template #icon>
                    <icon-settings />
                </template>
            </a-button>

            <a-dropdown :popup-max-height="false">
                <a-button>ht <icon-down /></a-button>
                <template #content>
                    <a-doption @click="loginOut">退出登录</a-doption>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<style scoped lang="scss">
.top-nav {
    background-color: var(--color-bg-1);
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
    width: 100%;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
    //   opacity: 0.5;
    transform: translateX(120%);
}

.fade-leave-active {
    position: absolute;
}
</style>