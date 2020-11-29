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
        getStudentByFilter(params) {
            let loader = this.$loading.show();
            try {
                store.dispatch('Student/loadAll', params)
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
                const student = this.$refs.formStudent.student;
                await store.dispatch('Student/update', student)
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
                    message: "Ops! Ocorreu um erro ao atualizar! " + e.message,
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

        resetStudent() {
            this.student = {
                id: null,
                name: '',
                email: '',
                academic_record: '',
                cpf: '',
            }
        }
    }
}

export default studentMixin