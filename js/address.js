new Vue({
    el: '.container',
    data: {
	addressList:[],
	limitNum: 3,
	currentIndex:0,
	shipingMethod:1,
	delFlag: false,
	alertFlag:false,
	curAddress: ''
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList();
        });
    },
     computed:{
     	filterAddress:function(){
     		return this.addressList.slice(0,this.limitNum);
     	}
     },
    methods: {
        getAddressList: function() {
//          this.$http.get('data/address.json').then(response => { //EC6
//              var res = response.data;
//              if (res.status == '0') {
//                  this.addressList = res.result;
//              }
//          });
			var _this = this;
            this.$http.get('data/address.json').then(function(response){
                var res = response.data;
                if (res.status == '0') {
                    _this.addressList = res.result;
                }
           	});
       },
       loadMore:function(){
       		if(this.limitNum == 3){
       			this.limitNum = this.addressList.length;
       		}else{
       			this.limitNum = 3;
       		}
       		
       },
       setDefault: function(addressId) {
        //遍历
         this.addressList.forEach(function(item, index) {
              if(item.addressId == addressId) {
                  item.isDefault = true;
              }else {
                  item.isDefault = false;
              }
         });
	    },
	    delConfirm :function(item){
	    	this.delFlag = true;
	    	this.curAddress = item;
	    },	
	    delAddress :function(){
	    	var index = this.addressList.indexOf(this.curAddress);
	    	this.addressList.splice(index,1);
	    	this.delFlag = false;
	    },
	    addAdress :function(item){
	    	var index = this.addressList.indexOf(this.curAddress);
	    	this.addreddList.push(item);
	    	this.alertFlag = false;
	    }
    }
});