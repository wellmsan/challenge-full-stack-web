import store from "../store";
import bus from "../config/eventHub";
import generalMixin from "./generalMixin";
import md5 from "js-md5";

var userMixin = {
    mixins: [generalMixin],

    data: () => ({
        login: {
            username: '',
            password: '',
            rules: {
                username: [
                    v => !!v || 'E-mail é obrigatrio!',
                    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido!',
                ],
                password: [
                    v => !!v || 'Senha é obrigatrio!',
                ],
            }
        },
    }),

    computed: {
        getLoguedUser() {
            return store.state['Auth'].object
        },
    },

    methods: {
        async onLogin() {
            let loader = this.$loading.show();
            try {
                const params = {
                    username: this.login.username,
                    password: md5(this.login.password)
                }
                await store.dispatch('Auth/login', params)
                setTimeout(function () {
                    loader.hide();
                }, 1000);
                if (this.getLoguedUser != null) this.$router.push("/students");
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Email/Senha inválidos",
                });
                return null
            }
        },

        async onLogout() {
            let loader = this.$loading.show();
            try {
                await store.dispatch('Auth/logout')
                setTimeout(function () {
                    loader.hide();
                }, 1000);
                this.showModalClose = false;
                this.$router.push("/login");
            } catch (e) {
                loader.hide();
                bus.$emit("error", {
                    message: "Ops! Email/Senha inválidos",
                });
                return null
            }
        },

        resetUser() {
            this.login = {
                username: '',
                password: '',
            }
        }
    }
}

export default userMixin