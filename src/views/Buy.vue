<template>
     <div class="buy-page">
        <navigation-bar :page-name="'立即购物'" @onLeftClick="onBackClick"></navigation-bar>
         <div class="buy-page-content">
            <div class="buy-page-content-goods">
                <img :src="goodsData.img" class="buy-page-content-goods-img"  alt="">
                <div class="buy-page-content-goods-desc">
                    <p class="buy-page-content-goods-desc-name">{{goodsData.name}}</p>
                    <p class="buy-page-content-goods-desc-price">{{goodsData.price | priceValue}}</p>
                </div>
            </div>
             <ul class="buy-page-content-list">
                <li class="buy-page-content-list-item" v-for="(item) in paymentDatas" :key="item.id" @click="onPaymentItemClick(item)">
                    <img :src="item.icon" class="buy-page-content-list-item-icon" alt="">
                    <div class="buy-page-content-list-item-desc">
                        <p class="buy-page-content-list-item-desc-name">{{item.name}}</p>
                        <p class="buy-page-content-list-item-desc-desc">{{item.desc}}</p>
                    </div>
                    <img class="buy-page-content-list-item-check" :src="getCheckIcon(selectPayment.id===item.id)" alt="">
                </li>
             </ul>
         </div>
         <div class="pay page-commit">
             立即购买
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
            return{
                goodsData:{},
                paymentDatas:[
                    {
                        id:'1',
                        name:'支付宝支付',
                        desc:'数亿用户，都在使用支付宝',
                        icon:require('@img/alipay.svg')
                    },
                    {
                        id:'2',
                        name:'微信支付',
                        desc:'亿万用户，都在使用支付宝',
                        icon:require('@img/weichat.png')
                    }
                ],
                selectPayment:{}
            }
        },
        created() {
            this.selectPayment=this.paymentDatas[0]
            this.loadGoodsData()
        },
        methods:{
            loadGoodsData(){
                this.axios.get('/json/goodsDetail.json',{
                    params:{
                        goodsId:this.$route.query.goodId
                    }
                }).then(data=>{
                    data.forEach(item=>{
                        if(item.id===this.$route.query.goodsId){
                            this.goodsData=item;
                        }
                    })
                })
            },
            onBackClick(){
                this.$router.go(-1)
            },
            onPaymentItemClick(item){
                this.selectPayment=item;
            },
            getCheckIcon(isCheck){
                return isCheck ? require('@img/check.svg'):require('@img/no-check.svg');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .buy-page{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: $bgColor;
        &-content{
            overflow: hidden;
            height: 100%;
            &-goods{
                background-color: #fff;
                padding:$marginSize;
                display:flex;
                border-bottom: px2rem(1) solid $lineColor;
                border-top: px2rem(1) solid $lineColor;
                margin-top: $marginSize;

                &-img{
                    width: px2rem(100);
                    height: px2rem(100);
                }
                &-desc{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0 $marginSize;
                    &-name{
                        font-size: $infoSize;
                        line-height: px2rem(18);
                    }
                    &-price{
                        font-size: $titleSize;
                        color: $mainColor;
                        font-weight: 500;
                    }
                }
            }
            &-list{
                margin-top: $marginSize;
                &-item{
                    display: flex;
                    background-color: #fff;
                    border-bottom: px2rem(1) solid $lineColor;
                    padding: $marginSize;
                    align-items: center;

                    &-icon{
                        height: px2rem(30);

                    }
                    &-desc{
                        margin-left: px2rem(12);
                        flex-grow: 1;
                        &-name{
                            font-size: $infoSize;
                        }
                        &-desc{
                            font-size: $minInfoSize;
                            margin-top: px2rem(6);
                            color: $hintColor;
                        }
                        &-check{
                            width: px2rem(16);
                            height: px2rem(16);

                        }
                    }
                }
            }
        }
        .pay{
            position: absolute;
            bottom: px2rem(52);
        }
    }
</style>