<template>
    <div>
        <div class="register-page">
            <navigation-bar :page-name="'登录'" @onLeftClick="onBackClick"></navigation-bar>
            <div class="register-page-content">
                <div class="input-container">
                    <input v-model="username" type="text" placeholder="用户名">
                </div>
                <div class="input-container">
                    <input v-model="password" type="password" placeholder="密码">
                </div>
                <div class="input-container">
                    <input v-model="comfirmPassword" type="password" placeholder="密码">
                </div>

                <div class="register-page-content-register page-commit" @click="onRegisterClick">
                   注册
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";

    export default {
        components:{
            NavigationBar
        },
        data(){
            return {
                username:'',
                password:'',
                comfirmPassword:''
            }
        },
        methods:{
            onBackClick(){
                this.$router.go(-1)
            },
            onRegisterClick(){
                if(this.username.length===0 || this.password.length===0){
                    return;
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
    .register-page{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #ffffff;

        &-content{
            width: 100%;
            height: 100%;
            &-register{
                margin-top: 40%;
            }
        }
    }
</style>