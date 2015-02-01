var demoApp = angular.module('demo', []);

demoApp.controller('MainCtrl', ['$scope','apiWebService', function ($scope,apiWebService) {

	var vm = {};
	vm.lists = [];
	apiWebService.getItems().then(function (res) {
		vm.lists = res.data.items;
		console.log(vm.lists);
	});

	vm.addItem = function(){
		var item = { details:vm.newItemDetails };
		vm.newItemDetails = '';
		apiWebService.addItem(item).then(function(res){
			vm.lists.push({
				_id:res.data.itemId,
				details:item.details
			});
		});
	}

	vm.removeItem = function(item){
		vm.lists = vm.lists.filter(function(_item){
			return item._id != _item._id;
		});
		apiWebService.removeItem(item);
	}
	vm.newItemDetails = '';
	$scope.vm = vm;
}]);

demoApp.service('apiWebService',['$http',function($http){
	var url = '/api';
	return {
		getItems:function(){
			return $http.get(url);
		},
		addItem:function(item){
			return $http.post(url,item);
		},
		removeItem: function(item){
			return $http.delete(url + "/" + item._id);
		}
	}
}]);

/*
	Use to test for angular with static web
	*/

// demoApp.controller('MainCtrl', ['$scope','guidService', function ($scope,guidService) {

// 	$scope.bind = {
// 		"name":"foo",
// 		"clearName": function(){
// 			this.name = "";
// 		}
// 	};

// 	var vm = {

// 	};

// 	vm.lists = [
// 		{ id: guidService.createGuid(), details: 'Demo First Item' },
// 		{ id: guidService.createGuid(), details: 'Demo Second Item' }
// 	];

// 	vm.addItem = function(){
// 		vm.lists.push({
// 			id:guidService.createGuid(),
// 			details:vm.newItemDetails
// 		});
// 		vm.newItemDetails = '';
// 	};

// 	vm.removeItem = function(item){
// 		vm.lists = vm.lists.filter(function(_item){
// 			return _item.id != item.id;
// 		});
// 	};



// 	vm.newItemDetails = '';

// 	$scope.vm = vm;
// }]);

// demoApp.service('guidService',function(){
// 	return {
// 		createGuid: function () {
// 			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
// 				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
// 				return v.toString(16);
// 			});
// 		}
// 	}
// });
