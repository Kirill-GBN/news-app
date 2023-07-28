let usersList = [];

let selectedRowId;

// function saveUsersListToLocalStorage(array) {
//     const arrayString = JSON.stringify(array);
//     window.localStorage.setItem("users", arrayString);
//   }

//   function getUsersListFromLocalStorage() {
//     const value = window.localStorage.getItem("users");
//     let result = JSON.parse(value);

//     if (result === null) {
//       result = defaultUsersList;
//     }
//     return result;
//   }


//функция для добавления строк в таблицу (инициализация таблицы)
function addRows() {
    usersList.forEach((item) => {
        addRow(item);
    });
};

//функция для добавления ячейки в строку
function addRow(userData) {
    const idEl = document.createElement("td");
    idEl.innerText = userData?.id;

    const nicknameEl = document.createElement("td");
    nicknameEl.innerText = userData?.nickname;

    const emailEl = document.createElement("td");
    emailEl.innerText = userData?.email;


    // добавление ячейки "Статус"
    const statusEl = document.createElement("td");
    const online = document.createElement("input");
    const label = document.createElement("label");
    online.setAttribute("type", "checkbox");
    // online.setAttribute("checked", true);
    online.classList.add("status");
    label.setAttribute("for", "status");
    label.setAttribute("data-onlabel", "В сети");
    label.setAttribute("data-offlabel", "Не в сети");
    label.classList.add("lb", "lb_table", "view");

    if (userData.id <= 5 || userData.status !== $(online).attr("checked")) {
        online.setAttribute("checked", true)
        statusEl.append(online, label);
    } else {
        online.removeAttribute("checked");
        statusEl.append(online, label);
    }


    // создание кнопки "Редактировать"
    const actionEl = document.createElement("td");
    const editEl = document.createElement("div");
    editEl.innerText = "Редактировать";
    editEl.classList.add("edit-btn");
    editEl.onclick = function () {
        $('#status').prop('click', function () {
            if ($(online).attr("checked")) {
                return $('#status').prop("checked", true);

            } else if ($(online).attr("checked", false)) {
                return $('#status').prop("checked", false);

            } else if ($('#status').prop("checked", false)) {
                return $(online).attr("checked", false);

            } else if ($('#status').prop("checked")) {
                return $(online).attr("checked", true);
            }
        });
        // вызов функции для изменения строки
        updateForm(userData);
    };

    // создание кнопки "Удалить"
    const removeEl = document.createElement("div");
    removeEl.innerText = "Удалить";
    removeEl.classList.add("remove-btn");
    removeEl.onclick = function () {
        // вызов функции для удаления строки
        removeRowFromTable(userData);
    };
    actionEl.append(editEl, removeEl);

    // создание строки с id и добавление в неё ячеек
    const row = document.createElement("tr");
    row.setAttribute("id", userData?.id + "-row");
    row.append(idEl, nicknameEl, emailEl, statusEl, actionEl);

    // добавление строки в таблицу
    $("table").append(row);
}


// вызов окна для подтверждения удаления строки
function removeRowFromTable(userData) {
    // if (CheckUser(userData)) {
    //     return
    // }
    const result = confirm("Вы действительно хотите удалить пользователя?");
    if (result) {
        usersList = usersList.filter((item) => item.id !== userData.id);
        localStorage.setItem("usersList", JSON.stringify(usersList));
        removeRow(userData, "usersList");
    }
    // if (result) {
    //     // articlesList = articlesList.filter((item) => item.id !== articleData.id);
    //     removeRow(userData);
    // }
}


// удаление строки
function removeRow(userData) {
    $("#" + userData.id + "-row").remove();
}


// функция, которая генерирует случайный id
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// функция для добавления записи в массив
function addUser(data) {
    data.id = getRandomIntInclusive(0, 1000);
    usersList.push(data);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    addRow(data);
}


// очистка формы
function clearForm() {
    $("#nickname").val(function () {
        return "";
    });
    $("#email").val(function () {
        return "";
    });
    $("#status").val(function () {
        return $("#status").prop("checked", false);
    });
}


//функция для обновления данных формы
function updateForm(userData) {
    selectedRowId = userData?.id;
    // с помощью метода children мы получаем дочерние элемента (ячейки таблицы) строки с id '{n}-row'
    const cells = $("#" + selectedRowId + "-row").children();
    $("#nickname").val(function () {
        return cells[1].innerText;
    });
    $("#email").val(function () {
        return cells[2].innerText;
    });
    $('#status').val(function () {
        return cells[3].innerHTML;
        // if ($('#status').prop("checked", true)) {
        //     return cells[3].innerHTML === $(online).attr('checked')
        // } else {
        //     return "";
        // } 
    });


    // изменение текста кнопки "Добавить" на "Изменить"
    $(".sub-btn-link").val(function () {
        return "Изменить";
    });

    if ($(".submit-btn-red").length > 0) {
        return;
    }


    // добавление новой кнопки для отмены
    const cancelEl = document.createElement("input");
    cancelEl.classList.add("submit-btn-red", "cancel-btn");
    cancelEl.setAttribute("type", "button");
    cancelEl.setAttribute("value", "Отменить");
    cancelEl.onclick = function () {
        returnAddBtn();
    };

    $(".wrapper-btn").append(cancelEl);
}


// изменение записи в массиве
function updateUser(data) {
    let result = usersList.find(item => item.id.toString() === data.id);
    let index = usersList.indexOf(result);
    usersList[index] = data;
    localStorage.setItem("usersList", JSON.stringify(usersList));
    updateRow(data);
    // data.id = selectedRowId;
    // usersList = usersList.map((item) => {
    //     if (item.id === Number(data.id)) {
    //         return data;
    //     }
    //     return item;
    // });
    // updateRow(userData);
}


// изменение данных в строке
function updateRow(userData) {
    const cells = $("#" + selectedRowId + "-row").children();
    cells[1].innerText = userData.nickname;
    cells[2].innerText = userData.email;
    cells[3].innerHTML = $("#status").val();;
    ///// возможно тут что-то поменть
};

// function CheckUser(data) {
//     let result = likesList.find(item => item.usersList.toString() === data.id.toString());
//     if (result !== undefined) {
//         alert("Вы не можете удалить эти данные, поскольку они используются в другой таблице");
//         return true
//     }
//     else {
//         return false
//     }
// };


// удаление кнопки "Отмена" и изменение кнопки "Изменить" на кнопку "Добавить"
function returnAddBtn() {
    clearForm();
    $(".submit-btn-red").remove();
    $(".sub-btn-link").val(function () {
        return "Добавить";
    });
    selectedRowId = null;
}




$(document).ready(function () {
    const initUsers = JSON.parse(localStorage.getItem('initUsers')) || false;
    if (!initUsers) {
        usersList = [
            {
                id: 1,
                nickname: "Бэтмен",
                email: 'bat@mail.ru',
            },

            {
                id: 2,
                nickname: "Железный человек",
                email: 'ironman@gmail.com',
            },

            {
                id: 3,
                nickname: "Человек паук",
                email: 'spider@mail.ru',
            },

            {
                id: 4,
                nickname: "Супермен",
                email: 'super@mail.ru',
            },

            {
                id: 5,
                nickname: "Тор",
                email: 'thor@gmail.com',
            },
        ];

        localStorage.setItem('usersList', JSON.stringify(usersList));

        localStorage.setItem('initUsers', true);
    };

    usersList = JSON.parse(localStorage.getItem('usersList'));

    addRows();

    document.getElementById('reset').onclick = function () {
        localStorage.clear();
        location.reload();
    };

    // событие submit для добавления новой строчки в таблицу
    $("#form-content").submit(function (event) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const value = $(".sub-btn-link").val();
        if (value === "Добавить") {
            data.id = getRandomIntInclusive(0, 1000);
            addUser(data);
        } else if (value === "Изменить") {
            updateRow(data);
            returnAddBtn();
        }
        clearForm();
        returnAddBtn();
        return false;
    });

});