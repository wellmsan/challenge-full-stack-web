import store from "../store/";
import generalMixin from "./generalMixin";

var studentMixin = {
    mixins: [generalMixin],

    data: () => ({
        student: {
            id: null,
            nome: '',
            email: '',
            registroAcademico: '',
            cpf: '',
            rules: {
                nome: [
                    v => !!v || 'Nome é obrigatrio!',
                    v => (v && v.length >= 10) || 'Nome precisa ter mais de 10 caracteres!',
                ],
                email: [
                    v => !!v || 'E-mail é obrigatrio!',
                    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido!',
                ],
                registroAcademico: [
                    v => !!v || 'Registro Acadêmico é obrigatrio!',
                ],
                cpf: [
                    v => !!v || 'CPF é obrigatrio!',
                ],
            }
        },
        students: {
            count: 0,
            perPage: 0,
            page: 0,
            rows: []
        },
    }),

    watch: {
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
        }
    },

    computed: {
        getStudent() {
            return store.state['Student'].student
        },
        getAllStudents() {
            return store.state['Student'].students
        },
    },

    methods: {
        getStudentById(id) {
            store.dispatch('Student/get', id)
        },

        saveStudent(body) {
            store.dispatch('Student/save', body)
        },

        updateStudent(id, body) {
            store.dispatch('Student/update', id, body)
        },

        deleteStudent(id) {
            store.dispatch('Student/delete', id)
        },

        resetStudent() {
            this.student = {
                id: null,
                nome: '',
                email: '',
                registroAcademico: '',
                cpf: ''
            }
        }
    }
}

export default studentMixin