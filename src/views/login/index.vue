<script setup lang="ts">
import { ref } from 'vue';
import { userLoginAPI, userRegisterAPI } from '@/api/login'
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserLoginStore } from '@/stores/userLogin'

const userLoginStore = useUserLoginStore()


const $route = useRoute()
const $router = useRouter()

let isLoginForm = ref(true)
// let registerFormRef = ref()
let userForm = ref({
    username: "aaaaaa",
    password: "123123",
    isRead: true
})
let registerForm = ref({
    username: '',
    password: '',
    rePassword: '',
})

const handleLogin = async (e: any) => {
    if(e.errors != null){
        return false;
    }
    try {
        await userLoginStore.userLogin(e.values)
        console.log('=============>',$route.query.route)
        let lastRoute = $route.query.route
        if(lastRoute){
            $router.push(lastRoute as string)
        }else {
            $router.push('/home')
        }

        // $router.push("/home")
    } catch (error) {
        console.log(error)
    }
    // let res = await userLoginAPI(e.values)
    // if(res.code != 0){
    //     $router.push("/home")
    //     localStorage.setItem("token", res.data)
    // }
    // console.log(res)
}

const handleRegister = async (e: any) => {
    if(e.errors != null){
        // 表单填写错误
        return false;
    }
    let res = await userRegisterAPI({
        username: e.values.username,
        password: e.values.password
    })    
    if(res.code != 0){
        isLoginForm.value = true
        userForm.value.username = e.values.username
        userForm.value.password = e.values.password
    }
}

// ------------- 定义表单校验规则 -------------
const rules = {
    username:[
        {
          required: true,
          message:'password is required',
        },
    ],
    password: [
        {
          required: true,
          message:'password is required',
        },
      ],
      rePassword: [
        {
          required: true,
          message:'password is required',
        },
        {
          validator: (value:any, cb:any) => {
            if (value !== registerForm.value.password) {
              cb('两次输入的密码不相同')
            } else {
              cb()
            }
          }
        }
      ],
    }

// ------------- 定义表单校验规则 -------------
</script>

<template>
    <div class="login-container flex justify-center items-center h-[100vh]">
        <div class="form-container bg-gray-50 rounded-lg p-10 shadow-xl ">
            <transition name="fade">
                <div v-show="isLoginForm" class="login">
                    <h2 class="text-center mb-4 text-xl">登录</h2>
                    <a-form :model="userForm" :style="{ width: '350px' }" size="large" auto-label-width @submit="handleLogin">
                        <a-form-item   
                                    :rules="[{minLength:6,message:'用户名长度不小于6'}, {maxLength: 20, message:'用户名长度不超过20'}]"
                                    :validate-trigger="['change']"
                                    hide-asterisk required field="username" label="用户名">
                            <a-input v-model="userForm.username" placeholder="请输入用户名" />
                        </a-form-item>

                        <a-form-item
                                    :rules="[{minLength:6,message:'密码长度不小于6'}, {maxLength: 20, message:'密码长度不超过20'}]"
                                    :validate-trigger="['change']" 
                                    hide-asterisk required field="password" label="密码">
                            <a-input v-model="userForm.password" placeholder="请输入密码" />
                        </a-form-item>

                        <a-form-item hide-asterisk required field="isRead">
                            <a-checkbox v-model="userForm.isRead">
                                我已阅读并同意用户协议
                            </a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-button no-style html-type="submit">登录</a-button>
                            <a-button @click="() => { isLoginForm = !isLoginForm }" class="ml-16">去注册</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </transition>
            <transition name="fade">
                <div v-show="!isLoginForm" class="register">
                    <h2 class="text-center mb-4 text-xl">注册</h2>
                    <a-form :rules="rules" :model="registerForm" :style="{ width: '350px' }" auto-label-width @submit="handleRegister">
                        <a-form-item 
                                    :rules="[{minLength:6,message:'用户名长度不小于6'}, {maxLength: 20, message:'用户名长度不超过20'}]"
                                    :validate-trigger="['change']"
                                    hide-asterisk 
                                    required 
                                    field="username" label="用户名">
                            <a-input v-model="registerForm.username" placeholder="请输入用户名" />
                        </a-form-item>

                        <a-form-item
                                    :rules="[{minLength:6,message:'密码长度不小于6'}, {maxLength: 20, message:'密码长度不超过20'}]"
                                    :validate-trigger="['change']"
                                    hide-asterisk required field="password" label="密码">
                            <a-input-password v-model="registerForm.password" placeholder="请输入密码" />
                        </a-form-item>

                        <a-form-item
                                    :validate-trigger="['change']"
                                    hide-asterisk required field="rePassword" label="确认密码">
                            <a-input-password v-model="registerForm.rePassword" placeholder="确认密码" />
                        </a-form-item>

                        <a-form-item class="mt-4">
                            <a-button html-type="submit" class="mr-16">注册</a-button>
                            <a-button @click="() => { isLoginForm = !isLoginForm }">去登录</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}

.fade-enter-from {
    opacity: 0;
    transform: translate(-50px);
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