import {Button,Swipe, SwipeItem,Popup} from 'vant'

//把组件放入数组中
let plugins = [
    Swipe,SwipeItem,Button,Popup
]

//批量引入vant组件
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}