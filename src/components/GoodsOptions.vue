<template>
    <div class="goods-options z-index-2">
        <ul class="goods-options-list">
            <li class="goods-options-list-item" v-for="(item,index) in optionsDatas" :key="index">
                <a href="" class="goods-options-list-item-content" @click.prevent="onOptionsItemClick(item,index)">
                    <span class="goods-options-list-item-content-name" :class="{'goods-options-list-item-content-name-active':selectOption.id===item.id}">{{item.name}}</span>
                    <span class="goods-options-list-item-content-caret caret" v-if="item.subs.length>0" :class="[isShowSubContent && selectOption.id===item.id ? 'goods-options-list-item-content-caret-open':'goods-options-list-item-content-caret-close']"></span>
                </a>
            </li>
        </ul>
        <transition name="fold-height">
            <div class="options-sub-content z-index-2" v-show="isShowSubContent">
                <ul class="options-sub-content-list">
                    <li class="options-sub-content-list-item" v-for="(item,index) in selectOption.subs" :key="index">
                        <a href="" class="options-sub-content-list-item-content" @click.prevent="onSubOptionsItemClick(item,index)">
                            <span class="options-sub-content-list-item-content-name" :class="{'options-sub-content-list-item-content-name-active':selectOption.id===item.id}">{{item.name}}</span>
                            <img src="@img/options-select.svg" class="options-sub-content-list-item-content-select" alt="" v-show="selectOption.id===item.id">
                        </a>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="cover" v-show="isShowSubContent" @click="isShowSubContent=false">

        </div>
    </div>
</template>

<script>
    export default {
        watch:{
            selectOption(newv){
                this.$emit('optionsChange',newv.id)
            }
        },
        data() {
            return {
                optionsDatas: [
                    {
                        id: '1',
                        name: '默认',
                        subs: [
                            {
                                id: '1',
                                name: '默认'
                            },
                            {
                                id: '1-2',
                                name: '价格由高到低'
                            },
                            {
                                id: '1-3',
                                name: '销量由高到低'
                            }
                        ]
                    },
                    {id: '2', name: '有货优先', subs: []},
                    {id: '3', name: '直营优先', subs: []}
                ],
                selectOption: {},
                isShowSubContent:false
            }
        },
        created() {
            this.selectOption = this.optionsDatas[0]
        },
        methods:{
            onOptionsItemClick(item,index){
                if(this.isShowSubContent){
                    this.isShowSubContent=false
                    return;
                }
                if(item.subs.length>0 && this.selectOption.id===item.id){
                    this.isShowSubContent=true;
                }
                this.selectOption=item;
            },
            onSubOptionsItemClick(item,index){
                this.selectOption=item;
                this.optionsDatas.forEach(option=>{
                    option.subs.forEach(suboption=>{
                        if(suboption.id===this.selectOption.id){
                            option.id=suboption.id;
                            option.name=suboption.name;
                        }
                    })
                });
                this.isShowSubContent=false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";

    .goods-options {
        width: 100%;
        border-bottom: 1px solid $lineColor;

        &-list {
            display: flex;
            width: 100%;
            height: px2rem(46);
            background-color: #fff;

            &-item {
                flex-grow: 1;

                &-content {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &-name {
                        font-size: $infoSize;
                        margin-right: $marginSize;
                        &-active{
                            color: $mainColor;
                        }
                    }
                    &-caret{
                        &-open{
                            transform: rotate(-180deg);
                            transition: all .3s;
                        }
                        &-close{
                            transform: rotate(0deg);
                            transition: all .3s;
                        }
                    }
                }
            }
        }

        .options-sub-content {
            position: absolute;
            width: 100%;
            max-height: px2rem(180);
            overflow: hidden;
            overflow-y: auto;
            background-color: #fff;

            &-list {

                &-item {

                    &-content {
                        display: flex;
                        align-items: center;
                        border-top: 1px solid $lineColor;
                        padding: $marginSize;
                        height: px2rem(44);
                        box-sizing: border-box;

                        &-name {
                            font-size: $infoSize;
                            display: inline-block;
                            flex-grow: 1;
                            &-active{
                                color: $mainColor;
                            }
                        }

                        &-select {
                            width: px2rem(18);
                            height: px2rem(18);
                        }
                    }
                }

            }
        }
        .fold-height-enter-active{
            animation-duration: .5s;
             animation-name: fold-height-open;
        }
        @keyframes fold-height-open {
            0%{
                max-height: 0;
            }
            100%{
                max-height: px2rem(180);
            }
        }
        .fold-height-leave-active{
            animation-duration: .5s;
            animation-name: fold-height-close;
        }
        @keyframes fold-height-close {
            0%{
                max-height: px2rem(180);
            }
            100%{
                max-height: 0;
            }
        }

    }
</style>