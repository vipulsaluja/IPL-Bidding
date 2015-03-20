angular
    .module("IPL")
    .service('content', ["$http", "$q",
        function(http, q) {
			
			
            return {
            	createUser:createUser,
            	verifyUser:verifyUser

					}

					 function createUser(userDetails){
				
    				/*http.post('http://localhost:4242/createUser', {msg:userDetails}).then(function (response) {
                       
                        return "Done";
                    }, function(error) {
                        return q.reject(error.data);
                    });*/


                    http({
                        method: "post",
                        url: "http://localhost:4242/createUser",
                        params: {
                            action: "add"
                        },
                        data: {
                            name: userDetails
                        }
                    }).then(function (response) {
                       
                        return "Done";
                    }, function(error) {
                        return q.reject(error.data);
                    });

							}




					 function verifyUser(userDetails){
                    http({
                        method: "post",
                        url: "http://localhost:4242/verifyUser",
                        data: {
                            name: userDetails
                        }
                    }).then(function (response) {
                       
                        return "Done";
                    }, function(error) {
                        return q.reject(error.data);
                    });

							}		
        }
    ]);