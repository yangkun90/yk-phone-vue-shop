<template>
    <div class="my">
        <navigation-bar :pageName="'个人中心'"></navigation-bar>
        <div class="my-content">
            <div class="my-content-header">
                <img class="my-content-header-avater" src="@img/avater.png" alt="">
                <p class="my-content-header-login" @click="onLoginClick">登录/注册</p>
            </div>
            <div class="my-content-tools">
                <div class="my-content-tools-item" v-for="(item,index) in  toolsData" :key="index">
                    <p class="my-content-tools-item-name">{{item}}</p>
                    <img class="my-content-tools-item-arrow" src="@img/right-arrow.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from "./NavigationBar";
    export default {

        methods:{
            onLoginClick(){
                this.$router.push({
                    name:'login',
                    params:{
                        routerType:'push'
                    }
                })
            }
        },
        components:{
            NavigationBar
        },
        data(){
            return {
                //工具栏
                toolsData:[
                    '全部订单',
                    '我的预约',
                    '应用推荐',
                    '用户福利'
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .my{
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        background-color: $bgColor;

        &-content{
            height: 100%;
            width: 100%;
            &-header{
                margin-top: $marginSize;
                background-color: #fff;
                height: px2rem(68);
                display: flex;
                align-items: center;
                border-top: px2rem(1) solid $lineColor;
                border-bottom: px2rem(1) solid $lineColor;
                padding: $marginSize;
                &-avater{
                    width: px2rem(52);
                    height: px2rem(52);
                }

                &-login{
                    margin-left: $marginSize;
                    font-size: $titleSize;
                }
            }

            &-tools{
                &-item{
                    display: flex;
                    height: px2rem(46);
                    box-sizing: border-box;
                    align-items: center;
                    padding: $marginSize;
                    background-color: white;
                    border-bottom: px2rem(1) solid $lineColor;
                    &-name{
                        font-size: $infoSize;
                        flex-grow: 1;
                    }
                    &-arrow{
                        width: px2rem(16);
                    }
                }
            }
        }
    }


</style>