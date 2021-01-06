import Vue from 'vue'
//数字处理
Vue.filter('priceValue',function (value) {
    if(!value){
        return '0.00';
    }
    let result=parseFloat(value)
    if(Number.isInteger(result)){
        return result;
    }
    return result.toFixed(2);
})

Vue.filter('filterTime',function (value) {
    if(!value){
        return '';
    }
    if(value.indexOf(':')===-1){
        return value
    }
    let result='';
    const arr=value.split(':')
    if(parseInt(arr[0])<10){
        result ='0'+arr[0];
    }else{
        result=arr[0];
    }
    if(parseInt(arr[1])<10){
        result =result+':0'+arr[1];
    }else{
        result=result+':'+arr[1];
    }
    if(parseInt(arr[2])<10){
        result =result+':0'+arr[2];
    }else{
        result=result+':'+arr[2];
    }
    return  result;


})