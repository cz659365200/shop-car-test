var vm = new Vue({
    el: "#app",
    data: {
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    filters: {
        formatMoney: function(value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            //保证this.$el已经插入文档
            this.cartView();
        });


    },
    methods: {
        cartView: function() {
            let _this = this;
            // this.$http.get('data/cartData.json', { 'id': 123 }).then(function(res) {
            //     _this.productList = res.data.result.list;
            //     //_this.totalMoney = res.data.result.totalMoney;
            // });
            this.$http.get('data/cartData.json', { 'id': 123 }).then(res => {
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function(product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true);
                //向vue内部注册一个checked属性，值为true
                // this.$set(item, "checked", true)
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(Flag) {
            this.checkAllFlag = Flag;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    // Vue.set(item, "checked", true);
                    //向vue内部注册一个checked属性，值为true
                    _this.$set(item, "checked", true)
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productQuantity * item.productPrice;
                }
            });
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function() {
            var index = this.productList.indexOf(this.currProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        },
    },
    // watch: { //深度 watcher
    //     'checkboxModel': {
    //         handler: function(val, oldVal) {
    //             if (this.checkboxModel.length === this.productList.length) {
    //                 this.checked = true;
    //             } else {
    //                 this.checked = false;
    //             }
    //         },
    //         deep: true
    //     }
    // },
});
Vue.filter("money", function(value, type) {
    return "￥" + value.toFixed(2) + type;
});