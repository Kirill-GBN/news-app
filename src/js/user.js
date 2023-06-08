
// Cписок пользователей, которые будут в таблице изначально
let usersList = [
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

//функция для добавления строк в таблицу (инициализация таблицы)
function addRows() {
    usersList.forEach((item) => {
        addRow(item);
    });
}

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
    online.setAttribute("checked", true);
    online.classList.add("status");
    label.setAttribute("for", "status");
    label.setAttribute("data-onlabel", "В сети");
    label.setAttribute("data-offlabel", "Не в сети");
    label.classList.add("lb", "lb_table", "view");

    if (userData.id <= 5 || userData.status === "on") {
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
    const result = confirm("Вы действительно хотите удалить пользователя?");
    if (result) {
        // articlesList = articlesList.filter((item) => item.id !== articleData.id);
        removeRow(userData);
    }
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
    $("#status").html(function () {
        return "";
        //////возможно здесть что-то поменять
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
    $('#status').on('click', function () {
        if ($('#status').is(':checked')) {
            return statusEl
        } else {
            return "";
        } /// возможно тут поменять
    });


    // изменение текста кнопки "Добавить" на "Изменить"
    $(".sub-btn-link").val(function () {
        return "Изменить";
    });


    // добавление новой кнопки для отмены
    const cancelEl = document.createElement("input");
    cancelEl.classList.add("sub-btn-link", "submit-btn-red");
    cancelEl.setAttribute("type", "button");
    cancelEl.setAttribute("value", "Отменить");
    cancelEl.onclick = function () {
        returnAddBtn();
    };
    
     $(".wrapper-btn").append(cancelEl);
}


// изменение записи в массиве
function updateUser(data) {
    usersList = usersList.map((item) => {
        if (item.id === Number(data.id)) {
            return data;
        }
        return item;
    });

    updateRow(userData);
}


// изменение данных в строке
function updateRow(userData) {
    const cells = $("#" + selectedRowId + "-row").children();
    cells[1].innerText = userData.nickname;
    cells[2].innerText = userData.email;
    cells[3].innerText = userData.status;
    ///// возможно тут что-то поменть
}


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
    addRows();

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
        return false;
    });

});