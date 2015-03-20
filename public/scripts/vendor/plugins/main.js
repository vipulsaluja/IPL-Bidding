
$(document).ready(function() {
        $('#loginForm')
            .on('init.form.fv', function(e, data) {
                //console.log(data);
            })
            .formValidation({
                message: 'This value is not valid',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    username: {
                        validators: {
                            notEmpty: {
                                message: 'The name is required'
                            }
                        }
                    },
                    email: {
                        message: 'The phone number is not valid',
                        validators: {
                            notEmpty: {
                                message: 'The phone number is required'
                            },
                            digits: {
                                message: 'The value can contain only digits'
                            }
                        }
                    },
                    gender: {
                        validators: {
                            notEmpty: {
                                message: 'The address is required'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'The city is required'
                            }
                        }
                    }
                }
            });
});