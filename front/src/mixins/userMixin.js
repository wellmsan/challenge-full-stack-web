import store from "../store/";
import generalMixin from "./generalMixin";
import bus from "../config/eventHub";
import md5 from "js-md5";

var userMixin = {
    mixins: [generalMixin],

    data: () => ({
        user: {
            id: null,
            name: '',
            email: '',
            pass: '',
        },
    }),

    computed: {
        getUser() {
            return store.state['User'].object
        },
        getAllUsers() {
            return store.state['User'].data
        }
    },

    methods: {
        async getUserByFilter(params) {
            let loader = this.$loading.show();
            try {
                await await store.dispatch('User/loadAll', params)
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

        async getUserById(id) {
            let loader = this.$loading.show();
            try {
                await store.dispatch('User/get', id)
                this.user = {
                    id: this.getUser.id,
                    name: this.getUser.name,
                    email: this.getUser.email,
                    pass: this.getUser.pass,
                }
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

        async saveUser() {
            let loader = this.$loading.show();
            try {
                this.user = this.$refs.formUser.user;
                await store.dispatch('User/save', {
                    name: this.user.name,
                    email: this.user.email,
                    pass: md5(this.user.pass),
                })
                await this.getUserByFilter({});
                bus.$emit("success", {
                    message: "Oba! Usuário cadastrado!",
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

        async updateUser() {
            let loader = this.$loading.show();
            try {
                this.user = this.$refs.formUser.user;
                await store.dispatch('User/update', this.user.id, {
                    name: this.user.name,
                    email: this.user.email,
                    pass: md5(this.user.pass),
                })
                await this.getUserByFilter({});
                bus.$emit("success", {
                    message: "Oba! Usuário cadastrado!",
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

        async deleteUser(id) {
            let loader = this.$loading.show();
            try {
                await await store.dispatch('User/delete', id)
                bus.$emit("success", {
                    message: "Oba! Usuário Excluido!",
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

export default userMixin