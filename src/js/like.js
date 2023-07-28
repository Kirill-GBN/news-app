let articlesList = [];

let usersList = [];

//Информация о лайках
let likesList = [];

// let defaultArticles = [
//     {
//         id: 1,
//         title: "Мир во всём Мире",
//         content: 'Какой-то очень интересный текст',
//         date: '2023-01-10',
//         subject: "Политика",
//         rating: 1,
//     },

//     {
//         id: 2,
//         title: "Деньги всем",
//         content: 'Какой-то очень интересный текст',
//         date: '2023-02-10',
//         subject: "Экономика",
//         rating: 2,
//     },

//     {
//         id: 3,
//         title: "Льготы всем",
//         content: 'Какой-то очень интересный текст',
//         date: '2023-02-23',
//         subject: "Социальная сфера",
//         rating: 3,
//     },

//     {
//         id: 4,
//         title: "Концерты для всех",
//         content: 'Какой-то очень интересный текст',
//         date: '2023-03-01',
//         subject: "Развлечения",
//         rating: 3,
//     },

//     {
//         id: 5,
//         title: "Снятие санкций",
//         content: 'Какой-то очень интересный текст',
//         date: '2023-03-01',
//         subject: "Политика",
//         rating: 1,
//     },
// ];

// let defaultUsers = [
//     {
//         id: 1,
//         nickname: "Бэтмен",
//         email: 'bat@mail.ru',
//     },

//     {
//         id: 2,
//         nickname: "Железный человек",
//         email: 'ironman@gmail.com',
//     },

//     {
//         id: 3,
//         nickname: "Человек паук",
//         email: 'spider@mail.ru',
//     },

//     {
//         id: 4,
//         nickname: "Супермен",
//         email: 'super@mail.ru',
//     },

//     {
//         id: 5,
//         nickname: "Тор",
//         email: 'thor@gmail.com',
//     },
// ];

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
    art_numberEl.innerText = getArticleName(likeData?.art_number);;

    const user_numberEl = document.createElement("td");
    user_numberEl.innerText = getUserName(likeData?.user_number);


    //добавление ячейки "Информаци о лайках"
    const likeEl = document.createElement("td");
    const finger = document.createElement("input");
    const label = document.createElement("label");
    label.innerHTML = '&#128077';
    finger.setAttribute("type", "checkbox");
    finger.setAttribute("checked", true);
    finger.classList.add("like");
    label.classList.add("cursor");
    label.setAttribute("for", "like");
    label.setAttribute("aria-label", "like");
    likeEl.append(finger, label);

    // тут надо сделать так, чтобы при выборе ID статьи и ID пользователя отслеживалось нажатие лайка
    // if (loadedModule.finger.attr("checked") === true) {
    //     likeEl.append(finger, label);
    // } else {
    //     finger.removeAttribute("checked");
    //     likeEl.append(finger, label);
    // }

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
    row.append(idEl, art_numberEl, user_numberEl, likeEl, actionEl);

    // добавление строки в таблицу
    $("table").append(row);
}


// вызов окна для подтверждения удаления строки
function removeRowFromTable(likeData) {
    const result = confirm("Вы действительно хотите удалить информацию о лайке?");
    if (result) {
        // articlesList = articlesList.filter((item) => item.id !== articleData.id);
        localStorage.setItem('likesList', JSON.stringify(likesList));
        removeRow(likeData);
    }
}


// удаление строки
function removeRow(likeData) {
    $("#" + likeData.id + "-row").remove();
}


// функция, которая генерирует случайный id
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// функция для добавления записи в массив
function addLike(data) {
    data.id = getRandomIntInclusive(0, 1000);
    likesList.push(data);
    localStorage.setItem('likesList', JSON.stringify(likesList));
    addRow(data);
}

function updateLike(data) {
    let result = likesList.find(item => item.id.toString() === data.id);
    let index = likesList.indexOf(result);
    likesList[index] = data;
    localStorage.setItem("likes", JSON.stringify(likesList));
    updateRow(data);
}


// изменение данных в строке
function updateRow(likeData) {
    const cells = $("#" + selectedRowId + "-row").children();
    cells[1].innerText = likeData.art_number;
    cells[2].innerText = likeData.user_number;
}

// очистка формы
function clearForm() {
    $("#art_number").val(function () {
        return "";
    });
    $("#user_number").val(function () {
        return "";
    });
}

// //функция для обновления данных формы
// function updateForm(likeData) {
//     selectedRowId = likeData?.id;
//     // с помощью метода children мы получаем дочерние элемента (ячейки таблицы) строки с id '{n}-row'
//     const cells = $("#" + selectedRowId + "-row").children();
//     $("#art-number").val(function () {
//         return cells[1].innerText;
//     });
//     $("#user-number").val(function () {
//         return cells[2].innerText;
//     });

//     // изменение текста кнопки "Добавить" на "Изменить"
//     $(".sub-btn-link").val(function () {
//         return "Изменить";
//     });


//     // добавление новой кнопки для отмены
//     const cancelEl = document.createElement("input");
//     cancelEl.classList.add("sub-btn-link", "submit-btn-red");
//     cancelEl.setAttribute("type", "button");
//     cancelEl.setAttribute("value", "Отменить");
//     cancelEl.onclick = function () {
//         returnAddBtn();
//     };

//      $(".wrapper-btn").append(cancelEl);
// }


// // изменение записи в массиве
// function updateLike(data) {
//     likesList = likesList.map((item) => {
//         if (item.id === Number(data.id)) {
//             return data;
//         }
//         return item;
//     });

//     updateRow(likeData);
// }


// // изменение данных в строке
// function updateRow(likeData) {
//     const cells = $("#" + selectedRowId + "-row").children();
//     cells[1].innerText = likeData.art_number;
//     cells[2].innerText = likeData.user_number;
//     ///// возможно тут что-то поменть
// }


// // удаление кнопки "Отмена" и изменение кнопки "Изменить" на кнопку "Добавить"
// function returnAddBtn() {
//     clearForm();
//     $(".submit-btn-red").remove();
//     $(".sub-btn-link").val(function () {
//         return "Добавить";
//     });
//     selectedRowId = null;
// }



$(document).ready(function () {
    const initOne = JSON.parse(localStorage.getItem('initOne')) || false;
    if (!initOne) {
        articlesList = [
            {
                id: 1,
                title: "Мир во всём Мире",
                content: 'Какой-то очень интересный текст',
                date: '2023-01-10',
                subject: "Политика",
                rating: 1,
            },

            {
                id: 2,
                title: "Деньги всем",
                content: 'Какой-то очень интересный текст',
                date: '2023-02-10',
                subject: "Экономика",
                rating: 2,
            },

            {
                id: 3,
                title: "Льготы всем",
                content: 'Какой-то очень интересный текст',
                date: '2023-02-23',
                subject: "Социальная сфера",
                rating: 3,
            },

            {
                id: 4,
                title: "Концерты для всех",
                content: 'Какой-то очень интересный текст',
                date: '2023-03-01',
                subject: "Развлечения",
                rating: 3,
            },

            {
                id: 5,
                title: "Снятие санкций",
                content: 'Какой-то очень интересный текст',
                date: '2023-03-01',
                subject: "Политика",
                rating: 1,
            },
        ];

        localStorage.setItem('articlesList', JSON.stringify(articlesList));
        localStorage.setItem('initOne', true);
    }

    articlesList = JSON.parse(localStorage.getItem('articlesList'));

    $.each(articlesList, function (index, value) {
        $('#art_number').append('<option value="' + value.title + '">' + value.id + '</option>');
    });


    const initTwo = JSON.parse(localStorage.getItem('initTwo')) || false;
    if (!initTwo) {
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
        localStorage.setItem('initTwo', true);
    }

    usersList = JSON.parse(localStorage.getItem('usersList'));

    // $.each(articlesList, function (index, value) {
    //     $('#art_number').append('<option value="' + value.title + '">' + value.id + '</option>');
    // });

    $.each(usersList, function (index, value) {
        $('#user_number').append('<option value="' + value.nickname + '">' + value.id + '</option>');
    });
    
    // likesList = JSON.parse(localStorage.getItem('likesList'));
    addRows();
    
    $(document).ready(function () {
        // addRows();
    
        document.getElementById('reset').onclick = function () {
            window.localStorage.removeItem('likesList');
            location.reload();
        };
        // событие submit для добавления новой строчки в таблицу
        $("#form-content").submit(function (event) {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            const value = $(".sub-btn-link").val();
            if (value === "Проверить") {
                data.id = getRandomIntInclusive(0, 1000);
                addLike(data);
            }
            clearForm();
            return false;
        });
    
    });
});

// $(document).ready(function () {
  
// });

function getArticleName(title) {
    return articlesList.find(g => g.title.toString() === title.toString())?.title;
}

function getUserName(nickname) {
    return usersList.find(g => g.nickname.toString() === nickname.toString())?.nickname;
}

function getArticleLike(like) {
    return articlesList.find(g => g.like.toString() === like.toString())?.like;
}


