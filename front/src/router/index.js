import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Login
import Login from '../components/login'

// Home
import Home from '../container/Home'

// Index
// import Index from '../App'

// Students
import StudentList from '../components/students/index'
import StudentCreate from '../components/students/create'
import StudentEdit from '../components/students/edit'

// Users
import UserList from '../components/users/index'
import UserCreate from '../components/users/create'
import UserEdit from '../components/users/edit'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
    try {
        const auth = store.state['Auth'].object
        if (auth != null) {
            if (auth.auth) {
                next()
                return
            } else {
                next('/login')
            }
        } else {
            next('/login')
        }
    } catch (e) {
        next('/login')
    }
}

export default new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes(),
})

function configRoutes() {
    return [

        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: ifAuthenticated,
            children: [
                {
                    path: '/students',
                    name: 'Aluno',
                    redirect: 'students',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: '',
                            name: 'Listar Alunos',
                            component: StudentList,
                        },
                        {
                            path: 'add',
                            name: 'Cadastrar Aluno',
                            component: StudentCreate,

                        },
                        {
                            path: ':id',
                            name: 'Editar Aluno',
                            component: StudentEdit,
                            props: true,
                        }
                    ]
                },
                {
                    path: '/users',
                    name: 'Usuário',
                    redirect: 'users',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: '',
                            name: 'Listar Usuário',
                            component: UserList,
                        },
                        {
                            path: 'add',
                            name: 'Cadastrar Usuário',
                            component: UserCreate,

                        },
                        {
                            path: ':id',
                            name: 'Editar Usuário',
                            component: UserEdit,
                            props: true,
                        }
                    ]
                },
            ]
        },
        // otherwise redirect to home
        { path: '*', redirect: '/' },
    ]
}