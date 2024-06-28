<script setup lang="ts">
// import { constantRoute } from '@/router/routes'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const props = defineProps(['menuList'])
// console.log(props.menuList)



const goRouter = (path: string) => {
    // console.log(path)
    router.push(path)
}


</script>
<script lang="ts">
export default {
    name: "SubMenu",
};
</script>

<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <a-menu-item v-if="!item.meta.hidden" :key="item.path" @click="goRouter(item.path)">
                <template #icon>
                    <component :is="'icon-' + item.meta.icon"></component>
                </template>
                {{ item.meta?.title }}
            </a-menu-item>
        </template>

        <!-- 只有一个子路由 -->
        <template v-if="item.children && item.children?.length == 1">
            <a-menu-item v-if="!item.children[0].meta.hidden" :key="item.children[0].path"
                @click="goRouter(item.children[0].path)">
                <template #icon>
                    <component :is="'icon-' + item.meta.icon"></component>
                </template>
                {{ item.meta?.title }}
            </a-menu-item>
        </template>

        <!-- 子路由数量大于1 -->
        <a-sub-menu v-if="item.children && item.children.length >= 2" :key="item.path">
            <template #icon>
                <component :is="'icon-' + item.meta.icon"></component>
            </template>
            <template #title>
                {{ item.meta?.title }}
            </template>
            <SubMenu :menuList="item.children"></SubMenu>
        </a-sub-menu>

    </template>
</template>

<style scoped lang="scss"></style>