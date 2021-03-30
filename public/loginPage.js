"use strict";

let userForm = new UserForm();

//попытка авторизоваться
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, response => {
    if (response.success) {
      location.reload();

    } else {
      userForm.setLoginErrorMessage(response.error);
    };
  });
};

//попытка зарегистрироваться
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();

    } else {
      userForm.setRegisterErrorMessage(response.error);
    };
  });
};





