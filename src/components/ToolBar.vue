<template>
    <div class="tool-bar">
        <div class="tool-bar-item" v-for="(item,index) in toolBarData" :key="index" @click="onchangeFragment(item,index)">
            <img :src="[index===selectItemIndex ? item.hIcon : item.nIcon]" alt="">
            <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h':index===selectItemIndex}">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    //位于页面底部 点击的时候切换 按钮分为默认和选中状态
    export default {
        data(){
            return{
                selectItemIndex:0,
                toolBarData:[
                    {
                        nIcon: require('@img/home-n.svg'),
                        hIcon: require('@img/home-h.svg'),
                        name:'首页',
                        componentName:'home'
                    },
                    {
                        nIcon: require('@img/shopping-n.svg'),
                        hIcon: require('@img/shopping-h.svg'),
                        name:'购物车',
                        componentName:'shopping'
                    },
                    {
                        nIcon: require('@img/my-n.svg'),
                        hIcon: require('@img/my-h.svg'),
                        name:'我的',
                        componentName:'my'
                    },
                ]
            }
        },
        methods:{
            onchangeFragment(item,index){
                this.selectItemIndex=index;
                this.$emit('onChangeFragment',item.componentName)
            },
            pushFragment(index){
                this.onchangeFragment(this.toolBarData[index],index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .tool-bar{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: px2rem(46);
        display: flex;
        justify-content: space-around;
        background-color: #ffffff;
        box-shadow: 0 0 px2rem(16) 0 rgba(0,0,0,.2);
        border-top: 1px solid $lineColor;
        z-index: 10;
        &-item{
            text-align: center;
            padding: px2rem(4) px2rem(12);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: px2rem(22);
                height: px2rem(22);
            }
            &-name{
                font-size: $infoSize;
                margin-top: px2rem(4);
                &-h{
                    color: $mainColor;
                }
            }
        }
    }
</style>