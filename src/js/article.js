let articlesList = [];


let selectedRowId;


//функция для добавления строк в таблицу (инициализация таблицы)
function addRows() {
    articlesList.forEach((item) => {
        addRow(item);
    });
}

//функция для добавления ячейки в строку
function addRow(articleData) {
    const idEl = document.createElement("td");
    idEl.innerText = articleData?.id;

    const titleEl = document.createElement("td");
    titleEl.innerText = articleData?.title;

    const contentEl = document.createElement("td");
    contentEl.innerText = articleData?.content;

    const dateEl = document.createElement("td");
    dateEl.innerText = articleData?.date;

    const subjectEl = document.createElement("td");
    subjectEl.innerText = articleData?.subject;

    const ratingEl = document.createElement("td");
    ratingEl.innerText = articleData?.rating;


    // добавление ячейки "Лайк"
    const likeEl = document.createElement("td");
    const finger = document.createElement("input");
    const label = document.createElement("label");
    label.innerHTML = '&#128077';
    finger.setAttribute("type", "checkbox");
    // finger.setAttribute("checked", true);
    finger.classList.add("like");
    label.classList.add("cursor");
    label.setAttribute("for", "like");
    label.setAttribute("aria-label", "like");
    // likeEl.append(finger, label);

    if (articleData.id <= 5 || articleData.like !== $(finger).attr("checked") || articleData.like === "on" || $('like').prop("checked") === true) {
        finger.setAttribute("checked", true)
        likeEl.append(finger, label);
    } else {
        finger.removeAttribute("checked");
        likeEl.append(finger, label);
    }

    //доп. класс
    // label.classList.add("checked");

    //варинат через доп. класс
    // if (articleData.like === "on") {
    //     label.classList.add("checked")
    // } else {
    //     label.classList.add("unchecked")
    // }

    // likeEl.append(finger, label);

    // вариант через цикл for
    // for (let elem of articlesList) {
    //     if (elem.id <= 5 || articleData.like === "on") {
    //         elem.like = likeEl.append(finger, label);
    //     } else if (elem.id > 5){
    //         finger.removeAttribute("checked");
    //         likeEl.append(finger, label);   
    //     }
    // }

    // создание кнопки "Редактировать"
    const actionEl = document.createElement("td");
    const editEl = document.createElement("div");
    editEl.innerText = "Редактировать";
    editEl.classList.add("edit-btn");
    editEl.onclick = function () {
        $('#like').prop('click', function () {
            if ($(finger).attr("checked") || articleData.like === "on") {
                $('#like').prop("checked", true);

            } else if ($(finger).attr("checked", false) || articleData.like === "" || articleData.like !== true) {
                $('#like').prop("checked", false);

            } else if ($('#like').prop("checked", true)) {
                $(finger).attr("checked");

            } else if ($('#like').prop("checked", false)) {
                $(finger).attr("checked", false);
            }
        });
        // вызов функции для изменения строки
        updateForm(articleData);

    };

    // создание кнопки "Удалить"
    const removeEl = document.createElement("div");
    removeEl.innerText = "Удалить";
    removeEl.classList.add("remove-btn");
    removeEl.onclick = function () {
        // вызов функции для удаления строки

        removeRowFromTable(articleData);
        // window.localStorage.removeItem("articles");
    };
    actionEl.append(editEl, removeEl);

    // создание строки с id и добавление в неё ячеек
    const row = document.createElement("tr");
    row.setAttribute("id", articleData?.id + "-row");
    row.append(idEl, titleEl, contentEl, dateEl, subjectEl, ratingEl, likeEl, actionEl);

    // добавление строки в таблицу
    $("table").append(row);
}


// вызов окна для подтверждения удаления строки
function removeRowFromTable(articleData) {
    // if (CheckArticle(articleData)) {
    //     return
    // }
    const result = confirm("Вы действительно хотите удалить статью?");
    if (result) {
        articlesList = articlesList.filter((item) => item.id !== articleData.id);
        localStorage.setItem("articlesList", JSON.stringify(articlesList));
        removeRow(articleData, "articlesList");
    }
}

// /**
//  * Удаление строки
//  * @param {string} name_array
//  */

// function removeRow(articleData, name_array) {
//     $('#' + articleData.id + '-row-' + name_array).remove();
// };


// удаление строки
function removeRow(articleData) {
    $("#" + articleData.id + "-row").remove();
}


// функция, которая генерирует случайный id
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// функция для добавления записи в массив
function addArticle(data) {
    data.id = getRandomIntInclusive(0, 1000);
    articlesList.push(data);
    localStorage.setItem("articlesList", JSON.stringify(articlesList));
    addRow(data);
}


// очистка формы
function clearForm() {
    $("#title").val(function () {
        return "";
    });
    $("#content").val(function () {
        return "";
    });
    $("#date").val(function () {
        return "";
    });
    $("#subject").val(function () {
        return "";
    });
    $("#rating").val(function () {
        return "";
    });
    $("#like").val(function () {
        return $("#like").prop("checked", false);
    });
}


//функция для обновления данных формы
function updateForm(articleData) {
    // updateArticlesListToLocalStorage(articlesList);
    selectedRowId = articleData.id;
    // с помощью метода children мы получаем дочерние элемента (ячейки таблицы) строки с id '{n}-row'
    const cells = $("#" + selectedRowId + "-row").children();
    $("#title").val(function () {
        return cells[1].innerText;
    });
    $("#content").val(function () {
        return cells[2].innerText;
    });
    $("#date").val(function () {
        return cells[3].innerText;
    });
    $("#subject").val(function () {
        return cells[4].innerText;
    });
    $("#rating").val(function () {
        return cells[5].innerText;
    });
    // $("#like").prop(cells[6].innerHTML?true:false);

    $("#like").val(function () {
        return cells[6].innerHTML;
        // $('#like').prop('click', function () {
        //     if ($('#like').prop('checked', true)) {
        //         return cells[6].innerHTML.finger.removeAttribute("checked");
        //     } else {
        //         return finger.removeAttribute("checked");
        //     }
        // });


        // if ($("#like").prop("checked", true)) {
        //     return cells[6].innerHTML
        // } else {
        //     return finger.removeAttribute("checked");
        // }

        // else {
        //     return $("#like").cells[6].innerHTML;
        // };

        // if (articleData.like === 'on') {
        //     finger.removeAttribute("checked");
        //     likeEl.append(finger, label);
        //     return cells[6].innerHTML;
        // }

        // if ($('#like').is(":checked")) {
        //     return $("#like").prop(cells[6].innerHTML);
        // }

        // if (articleData.like === "on") {
        // return cells[6].innerHTML;
        // } else {
        //     finger.removeAttribute("checked");
        //     return cells[6].innerText = likeEl.append(finger, label);
        // }    

        // if ($("#like").prop("checked") === 'on') {
        //     return cells[6].innerHTML;;
        // } else {
        //     return cells[6] = "";
        // }
    });

    // if ($('.like').is(":checked")) {
    //     return $("#like").prop("checked", false);
    // } else {
    //     likeEl.append(finger, label);
    // }


    // $('#like').val('click', function () {
    //     if ($('#like').is(':checked')) {
    //         return cells[6] = likeEl
    //     } else {
    //         return "";
    //     } /// возможно тут поменять
    // });


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
    // updateArticlesListToLocalStorage(articlesList);
}


// изменение записи в массиве
function updateArticle(data) {
    let result = articlesList.find(item => item.id.toString() === data.id);
    let index = articlesList.indexOf(result);
    articlesList[index] = data;
    localStorage.setItem("articlesList", JSON.stringify(articlesList));
    updateRow(data);
    // data.id = selectedRowId;
    // articlesList = articlesList.map((item) => {
    //     if (item.id === Number(data.id)) {
    //         return data;
    //     }
    //     return item;
    // });
    // saveArticlesListToLocalStorage(articlesList);
    // updateArticlesListToLocalStorage(articlesList);
    // updateRow(articleData);
    // returnAddBtn();
}


// изменение данных в строке
function updateRow(articleData) {
    const cells = $("#" + selectedRowId + "-row").children();
    cells[1].innerText = articleData.title;
    cells[2].innerText = articleData.content;
    cells[3].innerText = articleData.date;
    cells[4].innerText = articleData.subject;
    cells[5].innerText = articleData.rating;
    cells[6].innerHTML = articleData.like = $('#like').val();
    ///// возможно тут что-то поменть
}


// function changeLike() {
//     if ($('#like').prop("checked", false)) {
//         return $(finger).attr("checked");

//     } else if ($('#like').prop("checked", false)) {
//         return $(finger).attr("checked", false);

//     } else if ($('#like').prop("checked", false)) {
//         return $(finger).attr("checked", false);

//     } else {
//         return false;
//     }
// }

// function CheckArticle(data) {
//     let result = likesList.find(item => item.articlesList.toString() === data.id.toString());
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
    const initArticles = JSON.parse(localStorage.getItem('initArticles')) || false;
    if (!initArticles) {
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

        localStorage.setItem('initArticles', true);
    };

    articlesList = JSON.parse(localStorage.getItem('articlesList'));

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
            addArticle(data);
        } else if (value === "Изменить") {
            // updateArticlesListToLocalStorage(articlesList);
            localStorage.setItem('articlesList', JSON.stringify(articlesList));
            updateRow(data);
            // updateArticlesListToLocalStorage(articlesList);
        }
        clearForm();
        returnAddBtn();
        return false;
    });
});