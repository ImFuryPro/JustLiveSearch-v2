/*
* Live Search without AJAX on Native JS
* Author: Иван "ImFuryPro" Сапоненко
* Version: 2.0
* Description: Реализует живой поиск по содержимому блоков или таблиц.
* Variables:
* - inputList - список всех поисковых строк, которые обозначены аттрибутом [data-query]
* - searchBlock - список всех искомых блоков, которые обозначены аттрибутом [data-searchable]
* - searchElements - искомый список/элемент.
* */

document.addEventListener("DOMContentLoaded", function () { 
    let inputList      = document.querySelectorAll('input[data-query]'),
        searchBlock    = document.querySelectorAll('[data-result]'),
        searchElements = "";

    inputList.forEach(input => {
        input.addEventListener("keyup", function () {
            searchBlock.forEach(search => {
                // Проверяем совпадение поисковой строки и блока с искомыми элементами
                if (this.dataset.query === search.dataset.result) {
                    // Определяем тег искомого блока
                    // Для TABLE - ищем tr, для DIV - одноименный тег
                    switch (search.tagName) {
                        case "TABLE":
                            searchElements = search.querySelectorAll("tr");
                            break;
                        case "DIV":
                            searchElements = search.querySelectorAll("div");
                            break;
                        default:
                            searchElements = search.querySelectorAll("div");
                            break;
                    }
                    
                    searchElements.forEach(searchItem => {
                        if (this.value.length > 0) {
                            // Определяем искомые элементы, чтобы они не были в родительском теге THEAD
                            if (searchItem.parentElement.tagName !== "THEAD") {
                                searchItem.style.display = 'none'; // Скрываем все элементы

                                if (searchItem.children.length > 0) {
                                    // Пробегаемся по дочерним элементам искомого элемента, если таковы есть
                                    for (let itemChild of searchItem.children) {
                                        if (itemChild.innerHTML.toLowerCase().includes(this.value.toLowerCase())) {
                                            searchItem.style.display = null;
                                        }
                                    };
                                } else {
                                    // Иначе, сразу смотрим искомый элемент
                                    if (searchItem.innerHTML.toLowerCase().includes(this.value.toLowerCase())) {
                                        searchItem.style.display = null;
                                    }
                                }
                            }
                        } else {
                            // Показываем все элементы, если поисковая строка пуста
                            searchItem.style.display = null;
                        }
                    });
                }
            });
        });
    });
});