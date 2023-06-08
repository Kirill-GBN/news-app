
// Cписок пользователей
let likesList = [];

//функция для добавления строк в таблицу (инициализация таблицы)
function addRows() {
    likesList.forEach((item) => {
        addRow(item);
    });
}

//функция для добавления ячейки в строку
function addRow(likeData) {
    const idEl = document.createElement("td");
    idEl.innerText = likeData?.id;

    const art_numberEl = document.createElement("td");
    art_numberEl.innerText = likeData?.nickname;

    const user_numberEl = document.createElement("td");
    user_numberEl.innerText = likeData?.email;


    // добавление ячейки "Информаци о лайках"
    const likeEl = document.createElement("td");
    const finger = document.createElement("input");
    const label = document.createElement("label");
    label.innerHTML = '&#128077';
    finger.setAttribute("type", "checkbox");
    finger.classList.add("like");
    label.setAttribute("for", "like");
    label.setAttribute("aria-label", "like");

    likeEl.append(finger, label);
    
    // создание кнопки "Удалить"
    const actionEl = document.createElement("td");
    const removeEl = document.createElement("div");
    removeEl.innerText = "Удалить";
    removeEl.classList.add("remove-btn");
    removeEl.onclick = function () {
        // вызов функции для удаления строки
        removeRowFromTable(likeData);
    };

    actionEl.append(removeEl);

    // создание строки с id и добавление в неё ячеек
    const row = document.createElement("tr");
    row.setAttribute("id", likeData?.id + "-row");
    row.append(idEl, art_numberEl, user_numberEl, statusEl, actionEl);

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