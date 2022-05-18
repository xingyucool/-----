import service from '../index.js'
//获取首页轮播图数据
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2'
    }) //返回promise对象
}

export function getMusicList(){
    return service({
        method:'GET',
        url:'/personalized?limit=10'
    })
}

//搜索歌曲
export function searchMusic(keyword){
    return service({
        method:'GET',
        url:`/cloudsearch?keywords=${keyword}`
    })
}

//获取登录数据
export function getAccount(data){
    return service({
        method:'GET',
        url:`/login?email=${data.account}@163.com&password=${data.password}`
    })
}

export function getLoginUser(uid){
    return service({
        method:'GET',
        url:`/user/detail?uid=${uid}`
    })
}