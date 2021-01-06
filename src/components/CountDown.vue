<template>
    <div class="count-down">
        <span class="count-down-end-time">{{endHours}}点场</span>
        <span class="count-down-surplus">{{surplus | filterTime}}</span>
    </div>
</template>

<script>
    export default {
        props:{
            endHours:{
                type:Number,
                required:true,
                default:0
            }
        },
        data(){
            return {
                surplus:'',
                diffSeconds:0,
                interval:undefined
            }
        },
        created() {
            this.computedSurplusTime();
        },
        methods:{
            //计算展示内容
            computedSurplusTime(){
                if(this.interval){
                    clearInterval(this.interval)
                }
                const date=new Date();
                if(date.getHours() > this.endHours){
                    this.surplus='活动结束';
                    return;
                }
                if(date.getHours()===this.endHours){
                    this.surplus='活动进行中';
                    return;
                }
                const diffHours=this.endHours-date.getHours()-1
                const diffMinutes=60-date.getMinutes()-1
                const diffSeconds=60-date.getSeconds()
                this.diffSeconds=diffHours*3600+diffMinutes*60+diffSeconds;
                this.interval=setInterval(()=>{
                    this.diffSeconds-=1;
                },1000)
            }
        },
        watch:{
            diffSeconds(newvalue){
                const hours=Math.floor(newvalue/3600)
                const minutes=Math.floor(newvalue/60)%60
                const seconds=newvalue % 60;
                this.surplus=hours+":"+minutes+":"+seconds;
                if(newvalue===0){
                    this.computedSurplusTime()
                }
            },
            endHours(){
                this.computedSurplusTime();
            }
        },
        name: "CountDown"
    }
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
    .count-down{
        display: inline-block;
        font-size: $infoSize;
        margin-left: $marginSize;
        span{
            display: inline-block;
            padding: px2rem(2) px2rem(4);
        }
        &-end-time{
            background-color: $mainColor;
            border-top-left-radius: px2rem(4);
            border-bottom-left-radius: px2rem(4);
            border: px2rem(1) solid $mainColor;
            color: white;
        }
        &-surplus{
            background-color: white;
            border-top-right-radius: px2rem(4);
            border-bottom-right-radius: px2rem(4);
            border: px2rem(1) solid $mainColor;
            color: $mainColor;
        }
    }
</style>