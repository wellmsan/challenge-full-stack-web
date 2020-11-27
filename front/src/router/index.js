import Vue from 'vue'
import VueRouter from 'vue-router'

// Index
import Index from '../App'

// Students
import StudentList from '../components/students/index'
import StudentCreate from '../components/students/create'
import StudentEdit from '../components/students/edit'

// Users
import UserList from '../components/users/index'
import UserCreate from '../components/users/create'
import UserEdit from '../components/users/edit'



Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes(),
})

function configRoutes() {
    return [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
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
        }
    ]
}