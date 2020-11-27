import { required } from "vuelidate/lib/validators";
import store from "../store/";
import generalMixin from "./generalMixin";

var userMixin = {
    mixins: [generalMixin],

    data: () => ({
        user: {
            id: null,
            name: '',
            email: '',
            pass: '',
            rules: {
                name: [
                    v => !!v || 'Nome é obrigatrio!',
                    v => (v && v.length >= 10) || 'Nome precisa ter mais de 10 caracteres!',
                ],
                email: [
                    v => !!v || 'E-mail é obrigatrio!',
                    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido!',
                ],
                pass: [
                    v => !!v || 'Senha é obrigatrio!',
                    v => (v && v.length >= 6) || 'Senha precisa ter mais de 6 caracteres!',
                ],
            }
        },
        users: {
            count: 0,
            perPage: 0,
            page: 0,
            rows: []
        },
    }),

    validations: {
        user: {
            nome: { required },
            email: { required }
        }
    },

    computed: {
        getUser() {
            return store.state['User'].user
        },
        getAllUsers() {
            return store.state['User'].users
        },
    },

    created() {
        this.getUserByFilter({})
    },

    methods: {
        getUserByFilter(params) {
            store.dispatch('User/loadAll', params)
        },

        getUserById(id) {
            store.dispatch('User/get', id)
        },

        saveUser(body) {
            store.dispatch('User/save', body)
        },

        updateUser(id, body) {
            store.dispatch('User/update', id, body)
        },

        deleteUser(id) {
            store.dispatch('User/delete', id)
        }
    }
}

export default userMixin