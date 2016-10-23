    var example2 = new Vue({
        el: "#login",
        data: {
            panelin: true,
            panelup: false
        },
        methods: {
            signin: function () {
                this.panelin = true;
                this.panelup = false;

            },
            signup: function () {
                this.panelin = false;
                this.panelup = true;

            }
        }
    })