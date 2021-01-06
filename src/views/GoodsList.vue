<template>
    <div class="goods-list-page">
        <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
            <template v-slot:nav-right>
                <img :src="layoutType.icon" alt="" @click="onChangeLayoutTypeClick">
            </template>
        </navigation-bar>
        <div class="goods-list-page-content">
            <goods-options @optionsChange="onGoodsOptionschange"></goods-options>
            <goods :layoutType="layoutType.type" :sort="sortType"></goods>
        </div>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";
    import GoodsOptions from "../components/GoodsOptions";
    import Goods from "../components/Goods";
    export default {
        name:'goodslist',
        data(){
            return {
                layoutTypeDatas:[
                    {
                        type:'1',
                        icon:require('@img/list-type.svg')
                    },
                    {
                        type:'2',
                        icon:require('@img/grid-type.svg')
                    },
                    {
                        type:'3',
                        icon:require('@img/waterfall-type.svg')
                    },
                ],
                layoutType:{},
                sortType:'1'
            }
        },
        created() {
            this.layoutType=this.layoutTypeDatas[0]
        },
        components:{
            NavigationBar,
            GoodsOptions,
            Goods
        },
        methods:{
            onBackClick(){
                this.$router.go(-1)
            },
            onChangeLayoutTypeClick(){
                if(this.layoutType.type==='1'){
                    this.layoutType=this.layoutTypeDatas[1]
                }else if(this.layoutType.type==='2'){
                    this.layoutType=this.layoutTypeDatas[2]
                }else{
                    this.layoutType=this.layoutTypeDatas[0]
                }
            },
            onGoodsOptionschange(sortType){
                this.sortType=sortType
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
    .goods-list-page{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: $bgColor;
        display: flex;
        flex-direction: column;

        &-content{
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }
</style>