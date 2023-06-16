
// Cписок комментариев, которые будут в таблице изначально
let commentsList = [
    {
        id: 1,
        comment: "Статья понравилась",
        date: '2023-01-10',
        author: 1,
        article_number: 1
    },

    {
        id: 2,
        comment: "Статья понравилась",
        date: '2023-01-10',
        author: 2,
        article_number: 2
    },

    {
        id: 3,
        comment: "Статья понравилась",
        date: '2023-01-10',
        author: 3,
        article_number: 3
    },

    {
        id: 4,
        comment: "Статья понравилась",
        date: '2023-01-10',
        author: 4,
        article_number: 4
    },

    {
        id: 5,
        comment: "Статья понравилась",
        date: '2023-01-10',
        author: 5,
        article_number: 5
    },
];

let selectedRowId;

//функция для добавления строк в таблицу (инициализация таблицы)
function addRows() {
    commentsList.forEach((item) => {
        addRow(item);
    });
}

//функция для добавления ячейки в строку
function addRow(commentData) {
    const idEl = document.createElement("td");
    idEl.innerText = commentData?.id;

    const commentEl = document.createElement("td");
    commentEl.innerText = commentData?.comment;

    const dateEl = document.createElement("td");
    dateEl.innerText = commentData?.date;

    const authorEl = document.createElement("td");
    authorEl.innerText = commentData?.author;

    const article_numberEl = document.createElement("td");
    article_numberEl.innerText = commentData?.article_number;

    
    // создание кнопки "Редактировать"
    const actionEl = document.createElement("td");
    const editEl = document.createElement("div");
    editEl.innerText = "Редактировать";
    editEl.classList.add("edit-btn");
    editEl.onclick = function () {
        // вызов функции для изменения строки
        updateForm(commentData);
    };

    // создание кнопки "Удалить"
    const removeEl = document.createElement("div");
    removeEl.innerText = "Удалить";
    removeEl.classList.add("remove-btn");
    removeEl.onclick = function () {
        // вызов функции для удаления строки
        removeRowFromTable(commentData);
    };
    actionEl.append(editEl, removeEl);

    // создание строки с id и добавление в неё ячеек
    const row = document.createElement("tr");
    row.setAttribute("id", commentData?.id + "-row");
    row.append(idEl, commentEl, dateEl, authorEl, article_numberEl, actionEl);

    // добавление строки в таблицу
    $("table").append(row);
}


// вызов окна для подтверждения удаления строки
function removeRowFromTable(commentData) {
    const result = confirm("Вы действительно хотите удалить комментарий?");
    if (result) {
        // articlesList = articlesList.filter((item) => item.id !== articleData.id);
        removeRow(commentData);
    }
}


// удаление строки
function removeRow(commentData) {
    $("#" + commentData.id + "-row").remove();
}


// функция, которая генерирует случайный id
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// функция для добавления записи в массив
function addComment(data) {
    data.id = getRandomIntInclusive(0, 1000);
    commentsList.push(data);
    addRow(data);
}


// очистка формы
function clearForm() {
    $("#comment").val(function () {
        return "";
    });
    $("#date").val(function () {
        return "";
    });
    $("#author").val(function () {
        return "";
    });
    $("#article_number").val(function () {
        return "";
    });
}

//функция для обновления данных формы
function updateForm(commentData) {
    selectedRowId = commentData?.id;
    // с помощью метода children мы получаем дочерние элемента (ячейки таблицы) строки с id '{n}-row'
    const cells = $("#" + selectedRowId + "-row").children();
    $("#comment").val(function () {
        return cells[1].innerText;
    });
    $("#date").val(function () {
        return cells[2].innerText;
    });
    $("#author").val(function () {
        return cells[3].innerText;
    });
    $("#article_number").val(function () {
        return cells[4].innerText;
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
function updateComment(data) {
    data.id = selectedRowId;
    commentsList = commentsList.map((item) => {
        if (item.id === Number(data.id)) {
            return data;
        }
        return item;
    });

    updateRow(commentData);
}


// изменение данных в строке
function updateRow(commentData) {
    const cells = $("#" + selectedRowId + "-row").children();
    cells[1].innerText = commentData.comment;
    cells[2].innerText = commentData.date;
    cells[3].innerText = commentData.author;
    cells[4].innerText = commentData.article_number;
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
            addComment(data);
        } else if (value === "Изменить") {
            updateRow(data);
            returnAddBtn();
        }
        clearForm();
        return false;
    });

});