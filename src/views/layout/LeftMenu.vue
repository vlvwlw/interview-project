<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutSetting } from "@/stores/setting"
import Logo from './Logo.vue'
import SubMenu from './SubMenu.vue'
import { useRoute, useRouter } from 'vue-router';

const $route = useRoute()

const props = defineProps(['constantRoute'])
console.log(props.constantRoute)

const layoutSetting = useLayoutSetting()

console.log($route.path)

</script>

<template>
    <div class="h-screen flex flex-col">
        <Logo />

        <a-scrollbar class="scrollbar" style="height:calc(100vh - 50px);overflow: auto;">
            <a-menu :style="{ width: '240px', height: '100%' }" 
                :default-selected-keys="[$route.path]"
                :default-open-keys="[$route.path]"
                breakpoint="xl" :collapsed-width=60
                auto-open-selected
                :selected-keys="[$route.path]"
                :collapsed="!layoutSetting.isExpand">

                <SubMenu :menuList="constantRoute[0].children"></SubMenu>
            </a-menu>
        </a-scrollbar>
    </div>
</template>

<style scoped lang="scss">
:deep(.arco-menu-icon) {
    font-size: 20px;
}

:deep(.arco-menu-inner){
    @include ScrollBarStyle(var(--color-neutral-6), var(--color-neutral-3));
}
</style>