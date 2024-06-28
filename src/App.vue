<script setup lang="ts">
import { onMounted } from 'vue';

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

darkThemeMq.addListener(e => {
	if (e.matches) {
		document.body.setAttribute('arco-theme', 'dark');
	} else {
		document.body.removeAttribute('arco-theme');
	}
});

onMounted(() => {
	console.log(darkThemeMq)
	// 页面加载时立即检查并应用一次
	if (darkThemeMq.matches) {
		document.body.setAttribute('arco-theme', 'dark');
	} else {
		document.body.removeAttribute('arco-theme');
	}
})
</script>

<template>
	<router-view></router-view>
</template>

<style scoped lang="scss"></style>
