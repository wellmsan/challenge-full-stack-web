import store from "../store/";
import generalMixin from "./generalMixin";
import bus from "../config/eventHub";

var studentMixin = {
    mixins: [generalMixin],

    data: () => ({
        student: {
            id: null,
            name: '',
            email: '',
            academic_record: '',
            cpf: '',
            rules: {
                name: [
                    v => !!v || 'Name é obrigatrio!',
                    v => (v && v.length >= 10) || 'Nome precisa ter mais de 10 caracteres!',
                    v => (v && v.length <= 50) || 'O Tamanho máximo é de 50 Caracteres',
                ],
                email: [
                    v => !!v || 'E-mail é obrigatrio!',
                    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido!',
                ],
                academic_record: [
                    v => !!v || 'Registro Acadêmico é obrigatrio!',
                    v => (v && v.length <= 10) || 'O Tamanho máximo é de 10 Caracteres',
                ],
                cpf: [
                    v => !!v || 'CPF é obrigatrio!',
                    v => (v && v.length == 14) || 'O Tamanho é de 14 Caracteres',
                ],
            }
        },
    }),

    computed: {
        getStudent() {
            return store.state['Student'].object
        },
        getAllStudents() {
            return store.state['Student'].data
        },
    },

    methods: {
        async getStudentByFilter(params) {
            let loader = this.$loading.show();
            try {
                await await store.dispatch('Student/loadAll', params)
                setTimeout(function () {
                    loader.hide();
                }, 1000);
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Falha ao carregar dados " + e.message,
                });
                return null
            }
        },

        async getStudentById(id) {
            let loader = this.$loading.show();
            try {
                await store.dispatch('Student/get', id)
                /*
                this.student = {
                    id: this.getStudent.id,
                    name: this.getStudent.name,
                    email: this.getStudent.email,
                    academic_record: this.getStudent.academic_record,
                    cpf: this.getStudent.cpf,
                }
                */
                setTimeout(function () {
                    loader.hide();
                }, 1000);
                return await this.getStudent
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Falha ao carregar dados " + e.message,
                });
                return null
            }
        },

        async saveStudent() {
            let loader = this.$loading.show();
            try {
                this.student = this.$refs.formStudent.student;
                await store.dispatch('Student/save', {
                    name: this.student.name,
                    email: this.student.email,
                    academic_record: this.student.academic_record,
                    cpf: this.student.cpf,
                })
                await this.getStudentByFilter({});
                bus.$emit("success", {
                    message: "Oba! Aluno cadastrado!",
                });
                setTimeout(function () {
                    loader.hide();
                }, 1000);
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Ocorreu um erro ao salvar! " + e.message,
                });
                return null
            }
        },

        async updateStudent() {
            let loader = this.$loading.show();
            try {
                this.student = this.$refs.formStudent.student;
                await store.dispatch('Student/update', this.student.id, {
                    name: this.student.name,
                    email: this.student.email,
                    academic_record: this.student.academic_record,
                    cpf: this.student.cpf,
                })
                await this.getStudentByFilter({});
                bus.$emit("success", {
                    message: "Oba! Aluno cadastrado!",
                });
                setTimeout(function () {
                    loader.hide();
                }, 1000);
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Ocorreu um erro ao salvar! " + e.message,
                });
                return null
            }
        },

        async deleteStudent(id) {
            let loader = this.$loading.show();
            try {
                await await store.dispatch('Student/delete', id)
                bus.$emit("success", {
                    message: "Oba! Aluno Excluido!",
                });
                setTimeout(function () {
                    loader.hide();
                }, 1000);
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Falha ao carregar dados " + e.message,
                });
                return null
            }
        },

        resetUser() {
            this.student = {
                id: null,
                name: '',
                email: '',
                pass: '',
            }
        }
    }
}

export default studentMixin