import List from './components/List.vue'
import User from './components/User.vue'
import Content from './components/Content.vue'

export default  {
    routes:[
        {path:'/list',component:List},
        {path:'/user',component:User},
        {path:'/topic/:id',component:Content},
        {path:'/',redirect:'/list'}
    ]
}