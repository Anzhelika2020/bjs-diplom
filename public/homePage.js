"use strict";

//Выход из ЛК
let logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    };
  });
};


//Запрос данных текущего пользователя
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  };
});


//Получение текущих курсов валюты

let tableBody = new RatesBoard();

function getExchangeRates() {
  ApiConnector.getStocks(response => {
    //console.log("курс успешно обновлен");
    if (response.success) {
      tableBody.clearTable();
      tableBody.fillTable(response.data);
    };
  });
};

getExchangeRates();

setInterval(getExchangeRates, 60000);

//быстрая проверка и отключение обновления курса валют:
//const idIntervalGetExchRates = setInterval(getExchangeRates, 6000);
//clearInterval(idIntervalGetExchRates);



//Операции с деньгами:

let moneyManager = new MoneyManager();


//функция отображения профиля и отправки сообщения

function showProfileAndMessage (response, message) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  };

  moneyManager.setMessage(response.success, response.success ? message : response.error);//если первый аргумент true, то берем сообщение из второго аргумента, а но будет определяться через тернартный оператор
};

// 1. пополнение баланса

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => 
    showProfileAndMessage (response, "Пополнение баланса произведено успешно"));
};

// 2. конвертирование валюты

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => 
    showProfileAndMessage (response, "Конвертирование валюты произведено успешно"));
};

// 3. перевод валюты

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => 
    showProfileAndMessage (response, "Перевод валюты произведен успешно"));
};


//Работа с избранным

let favoritesTable = new FavoritesWidget ();


//функция очистки и заполнения данных избранного и обновление выпадающего списка пользователей

function reloadFavoritesAndUsersList(response) {
  if (response.success) {
    favoritesTable.clearTable();
    favoritesTable.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  };
};


//1. запрос начального списка избранного

ApiConnector.getFavorites(response => reloadFavoritesAndUsersList(response));


//2. добавление пользователей в список избранных

favoritesTable.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {

    reloadFavoritesAndUsersList(response);

    moneyManager.setMessage(response.success, response.success ? `Пользователь с именем: ${data.name} и id: ${data.id} успешно добавлен` : response.error);
  });
};

//3. удаление пользователей из списка избранных

favoritesTable.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, response => {
    
    reloadFavoritesAndUsersList(response);

    moneyManager.setMessage(response.success, response.success ? `Пользователь с id: ${id} успешно удален` : response.error);
  });
};





/*
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {

    if (response.success) {
      ProfileWidget.showProfile(response.data);
    };//пополнение и вывод профиля

    moneyManager.setMessage(response.success, response.success ? "Пополнение баланса произведено успешно" : response.error);
    //если первый аргумент true, то берем сообщение из второго аргумента, а но будет определяться через тернартный оператор
  });
};

// 2. конвертирование валюты

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {

    if (response.success) {
      ProfileWidget.showProfile(response.data);
    };//конвертирование и вывод профиля
  
    moneyManager.setMessage(response.success, response.success ? "Конвертирование валюты произведено успешно" : response.error);
  });
};

// 3. перевод валюты

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {

    if (response.success) {
      ProfileWidget.showProfile(response.data);
    };//перевод и вывод профиля
  
    moneyManager.setMessage(response.success, response.success ? "Перевод валюты произведен успешно" : response.error);
  });

}
*/

/*
ApiConnector.getFavorites(response => {

  if (response.success) {

    favoritesTable.clearTable();

    favoritesTable.fillTable(response.data);

    moneyManager.updateUsersList(response.data);
  };
});

favoritesTable.addUserCallback = (data) => {

  ApiConnector.addUserToFavorites(data, response => {

    if (response.success) {

      favoritesTable.clearTable();
  
      favoritesTable.fillTable(response.data);
  
      moneyManager.updateUsersList(response.data);
    };

    moneyManager.setMessage(response.success, response.success ? `Пользователь с именем: ${data.name} и id: ${data.id} успешно добавлен` : response.error);
  });
};

//удаление пользователя из избранного

favoritesTable.removeUserCallback = (id) => {

  ApiConnector.removeUserFromFavorites(id, response => {
    //console.log(response);

    if (response.success) {

      favoritesTable.clearTable();
  
      favoritesTable.fillTable(response.data);
  
      moneyManager.updateUsersList(response.data);
    };

    moneyManager.setMessage(response.success, response.success ? `Пользователь с id: ${id} успешно удален` : response.error);
  });

};

*/








