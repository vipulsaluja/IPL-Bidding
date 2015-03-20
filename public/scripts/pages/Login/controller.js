var myApp= angular.module('IPL');
myApp.controller('loginController', ['$scope','content',
function($scope,content) 
{

console.log($scope.$parent.loggedIn);
var userDetails={};
$scope.submitForm=function(values)
{
	if($scope.usernameGood && $scope.emailGood && $scope.passwordGood)
	{
		console.log(values.username+values.password+values.email+values.gender);
		 userDetails={
			username:values.username.$viewValue,
			password:values.password.$viewValue,
			email:values.email.$viewValue,
			gender:values.gender.$viewValue

		};
		content.createUser(userDetails);

	$('#loginModal').modal('hide');
	$('#otpModal').modal('show');
	}


}

$scope.submitOTPForm=function(values)
{
	var otpDetails={
			username:userDetails.username,
			OTP:values.otp.$viewValue
			};
		content.verifyUser(otpDetails);
		$('#otpModal').modal('hide');

}



	      		   
   }]);
myApp.directive('validUsername', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                // Any way to read the results of a "required" angular validator here?
                var isBlank = viewValue === ''
                var invalidChars = !isBlank && !/^[A-z0-9]+$/.test(viewValue)
                var invalidLen = !isBlank && !invalidChars && (viewValue.length < 5 || viewValue.length > 20)
                ctrl.$setValidity('isBlank', !isBlank)
                ctrl.$setValidity('invalidChars', !invalidChars)
                ctrl.$setValidity('invalidLen', !invalidLen)
                scope.usernameGood = !isBlank && !invalidChars && !invalidLen
                console.log(scope.usernameGood)
                scope.$digest();
								

               

            })

        }
    }
})
.directive('validEmail', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                // Any way to read the results of a "required" angular validator here?
                var isBlank = viewValue === '';
                var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                var invalidChars = !isBlank && !reg.test(viewValue);
                ctrl.$setValidity('isBlank', !isBlank)
                ctrl.$setValidity('invalidChars', !invalidChars)
                scope.emailGood = !isBlank && !invalidChars
                console.log(scope.emailGood)
	                  
								  scope.$digest();
								
            })
            
        }
    }
})
.directive('validPassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                var isBlank = viewValue === ''
                var invalidLen = !isBlank && (viewValue.length < 8 || viewValue.length > 20)
                var isWeak = !isBlank && !invalidLen && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/.test(viewValue)
                ctrl.$setValidity('isBlank', !isBlank)
                ctrl.$setValidity('isWeak', !isWeak)
                ctrl.$setValidity('invalidLen', !invalidLen);
                scope.passwordGood = !isBlank && !isWeak && !invalidLen
                console.log(scope.passwordGood)
                     
								  scope.$digest();
							
            })
        }
    }
})

   
