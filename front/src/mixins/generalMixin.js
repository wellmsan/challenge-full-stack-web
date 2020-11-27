

var generalMixin = {
    data: () => ({
        valid: false,
        errorMessages: "",
        formHasErrors: false,
    }),

    computed: {
        caption() {
            const routes = this.$route.matched.filter((route) => {
                return route.name;
            });
            return routes[0].name;
        },
    },

    methods: {

    }
}

export default generalMixin