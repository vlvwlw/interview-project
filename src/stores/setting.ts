import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLayoutSetting = defineStore("LayoutSetting", ()=>{
    let isExpand = ref(true)
    let isLightTheme = ref(true)
    let isRefresh = ref(false)

    watch(()=> isLightTheme.value, ()=>{
        if(!isLightTheme.value){
            // 设置为暗黑主题
            document.body.setAttribute('arco-theme', 'dark')
        }else{
            // 恢复亮色主题
            document.body.removeAttribute('arco-theme');
        }
    }, {immediate:true})

    const changeTheme = ()=>{
        isLightTheme.value = !isLightTheme.value
    }

    const updateRefresh = ()=>{
        isRefresh.value = !isRefresh.value
    }

    return {
        isExpand,
        isLightTheme,
        changeTheme,
        updateRefresh,
        isRefresh
    }
})