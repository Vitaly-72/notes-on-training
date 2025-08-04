
// Константы шапки и футера
const headHtml = `<!DOCTYPE html><html lang="ru" prefix="og: https://ogp.me/ns#">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
  <title></title>
  <style>
    .home { width: 750px; margin: 0 auto; }
    .text-contents { text-align: center; font-weight: bold; }
    .menu { position: absolute; top: 20px; left: 20px; }
    .dropbtn {
      background-color: #4CAF50;
      color: white;
      padding: 16px;
      font-size: 14px;
      border: none;
    }
    .dropdown { position: relative; display: inline-block; z-index: 9999; }
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 320px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }
    .dropdown-content a {
      font-size: 12px;
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .dropdown-content a:hover { background-color: #ddd; }
    .dropdown:hover .dropdown-content { display: block; }
    .dropdown:hover .dropbtn { background-color: #3e8e41; }
  </style>
  <link rel="stylesheet" href="../application.css" media="all">
</head>
<body class="h-100">
  <div class="home">
    <article class='hexlet-typography overflow-hidden'>`;

const footerHtml = `</article></div></body></html>`;

// Инициализация переменных
let menuTxt = '';
let styleTxt = '';
let menuObj = {};
let contentObj = {};
let styleObj = {};
let title = '';
let currentArticle = 1;

// DOM готов
$(document).ready(function() {
  $("#head").text(headHtml);
  $("#footer").text(footerHtml);
  
  // Обработчики событий
  $("#btn").click(createArticle);
  $("#apply-btn").click(updateArticle);
  $("#clear-btn").click(clearFields);
  $("#save-btn").click(saveFile);
  $("#file-input").change(loadFile);
});

// Создание новой статьи
function createArticle() {
  const articleTitle = $("#punkt_menu").val().trim();
  const articleContent = $("#lesson").val().trim();
  
  if (!articleTitle || !articleContent) {
    alert("Заполните название и содержание статьи");
    return;
  }
  
  const articleId = Object.keys(contentObj).length + 1;
  
  title = $("#name_kurs").val();
  menuObj[`art${articleId}`] = articleTitle;
  contentObj[`art${articleId}`] = articleContent;
  
  if (articleId === 1) {
    styleTxt = `#art_1{display:block}`;
  } else {
    styleTxt = `#art_${articleId}{display:none}`;
  }
  
  styleObj[`art${articleId}`] = styleTxt;
  currentArticle = articleId;
  
  updateArticlesView();
  clearFields();
}

// Обновление существующей статьи
function updateArticle() {
  const articleTitle = $("#punkt_menu").val().trim();
  const articleContent = $("#lesson").val().trim();
  
  if (!currentArticle || !articleTitle || !articleContent) {
    alert("Выберите статью для редактирования");
    return;
  }
  
  menuObj[`art${currentArticle}`] = articleTitle;
  contentObj[`art${currentArticle}`] = articleContent;
  
  updateArticlesView();
}

// Очистка полей ввода
function clearFields() {
  $("#punkt_menu").val('');
  $("#lesson").val('');
}

// Обновление отображения статей и меню
function updateArticlesView() {
  let menuHtml = '';
  let articlesHtml = '';
  let styleHtml = '';
  let scriptHtml = '';
  let menuItemsHtml = '';
  
  // Генерация HTML для меню и статей
  Object.keys(menuObj).forEach((key, index) => {
    const id = index + 1;
    
    // Меню для экспортируемого файла
    menuHtml += `<div id="menu_${id}"><a href="#">${id}. ${menuObj[key]}</a></div>`;
    
    // Статьи
    articlesHtml += `<div id="art_${id}" class="art">${contentObj[key]}</div>`;
    
    // Стили
    styleHtml += id === 1 
      ? `#art_${id}{display:block}`
      : `#art_${id}{display:none}`;
    
    // Скрипт
    scriptHtml += `menu_${id}.addEventListener("click", () => showDiv('art_${id}'));`;
    
    // Меню для редактора
    menuItemsHtml += `
      <li onclick="loadArticle(${id})">
        ${id}. ${menuObj[key]}
        <button type="button" onclick="deleteArticle(${id})">X</button>
      </li>`;
  });
  
  // Обновление DOM
  $("#menu").html(`<div class='menu'>
    <div class='dropdown'>
      <button class='dropbtn'>Меню</button>
      <div class='dropdown-content'>${menuHtml}</div>
    </div>
  </div>`);
  
  $("#article").html(articlesHtml);
  $("#style").html(`<style>${styleHtml}</style>`);
  
  // Генерация скрипта для экспортируемого файла
  const scriptContent = `
    const showDiv = (id) => {
      $('.art').hide();
      $('#' + id).show();
    }
    ${scriptHtml}
    let title2 = '${title}';
    let menuObj2 = ${JSON.stringify(menuObj)};
    let contentObj2 = ${JSON.stringify(contentObj)};
    let styleObj2 = ${JSON.stringify(styleObj)};
    let checkObj = 1;
  `;
  
  $("#script").text(`<script>${scriptContent}</script>`);
  $("#menu_kursa").html(`<ul>${menuItemsHtml}</ul>`);
}

// Загрузка статьи для редактирования
function loadArticle(id) {
  currentArticle = id;
  $("#punkt_menu").val(menuObj[`art${id}`]);
  $("#lesson").val(contentObj[`art${id}`]);
}

// Удаление статьи
function deleteArticle(id) {
  event.stopPropagation();
  
  if (confirm("Удалить эту статью?")) {
    delete menuObj[`art${id}`];
    delete contentObj[`art${id}`];
    delete styleObj[`art${id}`];
    
    // Перенумеровываем оставшиеся статьи
    const newMenuObj = {};
    const newContentObj = {};
    const newStyleObj = {};
    
    Object.keys(menuObj).forEach((key, index) => {
      const newKey = `art${index + 1}`;
      newMenuObj[newKey] = menuObj[key];
      newContentObj[newKey] = contentObj[key];
      newStyleObj[newKey] = styleObj[key];
    });
    
    menuObj = newMenuObj;
    contentObj = newContentObj;
    styleObj = newStyleObj;
    
    updateArticlesView();
    clearFields();
    currentArticle = null;
  }
}

// Сохранение в файл
function saveFile() {
  if (!title) {
    alert("Введите название документа");
    return;
  }
  
  const textToWrite = document.getElementById("divcopy").innerText;
  const blob = new Blob([textToWrite], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Загрузка файла для редактирования
function loadFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    $("#data").html(e.target.result);
    setTimeout(parseLoadedFile, 1000);
  };
  reader.readAsText(file);
}

// Парсинг загруженного файла
function parseLoadedFile() {
  try {
    title = title2;
    menuObj = menuObj2;
    contentObj = contentObj2;
    styleObj = styleObj2;
    
    $("#name_kurs").val(title);
    loadArticle(1);
    updateArticlesView();
  } catch (e) {
    alert("Ошибка загрузки файла: " + e.message);
  }
}
