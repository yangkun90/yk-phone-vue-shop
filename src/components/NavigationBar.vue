<template>
    <div class="nav-bar z-index-max" :class="{'bottom-line':pageName}" :style="navBarStyle">
        <div class="left" @click="$emit('onLeftClick')">
            <img v-if="isShowBack" src="@img/back.svg" alt="">
            <slot name="nav-left"></slot>
        </div>
        <div class="center">
            <span class="page-title" v-if="pageName">{{pageName}}</span>
            <slot name="nav-center"></slot>
        </div>
        <div class="right">
            <slot name="nav-right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            pageName:{
                type:String,
                default:''
            },
            isShowBack:{
                type:Boolean,
                default: true
            },
            navBarStyle:{
                type:Object,
                default:function () {
                    return{
                        backgroundColor:'white'
                    }
                }
            }
        },
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
    .nav-bar{
        width: 100%;
        height: px2rem(44);
        line-height: px2rem(44);
        display: flex;
        justify-content: space-between;
        .left,.right{
            display: flex;
            height: 100%;
            width: px2rem(26);
            padding: 0 $marginSize;
            img{
                width: 100%;
                align-self: center;
            }
        }
        .center{
            display: flex;
            height: 100%;
            flex-grow: 1;
            .page-title{
                align-self: center;
                font-size: $titleSize;
                margin: 0 auto;
            }
        }
    }
    .bottom-line{
        border-bottom: 1px solid $lineColor;
    }
</style>