import bus from "../config/eventHub";

var generalMixin = {
    data: () => ({
        valid: true,
        errorMessages: "",
        formHasErrors: false,
        showAlert: false,
        alertType: 'error',
        alertMessage: '',
    }),

    computed: {
        caption() {
            const routes = this.$route.matched.filter((route) => {
                return route.name;
            });
            return routes[1].name;
        },
    },

    mounted() {
        bus.$on("error", (alert) => {
            this.showAlert = true;
            this.alertType = "error";
            this.alertMessage = alert.message;
        });
        bus.$on("success", (alert) => {
            this.showAlert = true;
            this.alertType = "success";
            this.alertMessage = alert.message;
        });
    },
}

export default generalMixin