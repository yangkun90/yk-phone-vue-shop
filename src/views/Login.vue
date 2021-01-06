<template>
    <div class="login-page">
        <navigation-bar :page-name="'登录'" @onLeftClick="onBackClick"></navigation-bar>
        <div class="login-page-content">
            <div class="input-container">
                <input v-model="username" type="text" placeholder="用户名">
            </div>
            <div class="input-container">
                <input v-model="password" type="password" placeholder="密码">
            </div>


            <div class="login-page-content-login page-commit" @click="onLoginClick">
                登录
            </div>
            <a class="login-page-content-register" @click="onToRegisterClick">注册用户</a>
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
            onLoginClick(){
                if(this.username.length===0 || this.password.length===0){
                    return;
                }

            },
            onToRegisterClick(){
                this.$router.push({
                    name:'register',
                    params:{
                        routerType:'push',

                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.login-page{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    &-content{
        width: 100%;
        height: 100%;
        &-login{
            margin-top: 40%;
        }
        &-register{
            font-size: $infoSize;
            color: $hintColor;
            margin-top: $marginSize;
            padding: $marginSize;
            float: right;
        }
    }
}
</style>