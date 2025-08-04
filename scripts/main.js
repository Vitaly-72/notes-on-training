// Константы шапки и футера
const head_html = `<!DOCTYPE html>
<html lang="ru" prefix="og: https://ogp.me/ns#">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"><\/script>
  <title><\/title>
  <style>
    .home { width: 750px; margin: 0 auto; }
    .text-contents {
      text-align: center;
      font-weight: bold;
    }
    .menu {
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .dropbtn {
      background-color: #4CAF50;
      color: white;
      padding: 16px;
      font-size: 14px;
      border: none;
    }
    .dropdown {
      position: relative;
      display: inline-block;
      z-index: 9999;
    }
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
    .dropdown-content a:hover {background-color: #ddd;}
    .dropdown:hover .dropdown-content {display: block;}
    .dropdown:hover .dropbtn {background-color: #3e8e41;}
  <\/style>
  <link rel="stylesheet" href="../application.css" media="all">
<\/head>
<body class="h-100">
  <div class="home">
    <article class='hexlet-typography overflow-hidden'>`;

const footer = `<\/article><\/div><\/body><\/html>`;

// Переменные для динамического контента
let menu_txt = '';
let style_txt = '';
let menuObj = {};
let contentObj = {};
let styleObj = {};
let title = '';
let punkt = 1;

// Инициализация документа
$(document).ready(function() {
    // Создаем контейнеры если их нет
    if ($("#head").length === 0) {
        $("body").prepend('<div id="head"></div>');
    }
    if ($("#footer").length === 0) {
        $("body").append('<div id="footer"></div>');
    }
    
    // Вставляем шапку и футер
    $("#head").html(head_html);
    $("#footer").html(footer);
    
    // Назначаем обработчики событий
    $("#btn").on("click", creatObj);
    $("#file-input").on("change", handleFileUpload);
});

// Функции
function creatObj() {
    const i = Object.keys(contentObj).length === 0 ? 1 : Object.keys(contentObj).length + 1;
    
    title = $("#name_kurs").val();
    menuObj[`art${i}`] = $("#punkt_menu").val();
    contentObj[`art${i}`] = $("#lesson").val();
    
    style_txt = i === 1 ? `#art_${i}{display:block}` : `#art_${i}{display:none}`;
    styleObj[`art${i}`] = style_txt;
    
    console.log({title, menuObj, contentObj, styleObj});
    addArticlesPage();
    clearInputs();
}

function crObj() {
    if (typeof menuObj2 !== 'undefined') menuObj = menuObj2;
    if (typeof contentObj2 !== 'undefined') contentObj = contentObj2;
    if (typeof styleObj2 !== 'undefined') styleObj = styleObj2;
    if (typeof title2 !== 'undefined') $("#name_kurs").val(title2);
    if (menuObj.art1) $("#punkt_menu").val(menuObj.art1);
    if (contentObj.art1) $("#lesson").val(contentObj.art1);
}

function addArticlesPage() {
    let creatMenu = '';
    let creatCourse = '';
    let creatStyle = '';
    let cretScript = '';
    let creatMenuObj = '';
    let creatContentObj = '';
    let creatStyleObj = '';
    let creatMenuCourse = '';
    
    // Генерация меню
    Object.keys(menuObj).forEach((key, index) => {
        const i = index + 1;
        creatMenu += `<div id="menu_${i}"><a href="#">${i}. ${menuObj[key]}</a></div>`;
        creatMenuObj += `art${i}: '${menuObj[key]}',`;
        creatMenuCourse += `<li onclick="add(contentObj.art${i}, menuObj.art${i}); punkt = ${i}">
            ${i}. ${menuObj[key]} &nbsp;&nbsp;
            <input type="button" onclick="deleteArticle(${i})" value="X" />
        </li>`;
        cretScript += `$("#menu_${i}").on("click", () => showDiv('art_${i}'));`;
    });
    
    // Генерация контента
    Object.keys(contentObj).forEach((key, index) => {
        const i = index + 1;
        creatCourse += `<div id="art_${i}" class="art">${contentObj[key]}</div>`;
        creatContentObj += `art${i}: \`${contentObj[key].replace(/`/g, '\\`')}\`,`;
        creatStyle += i === 1 ? `#art_${i}{display:block}` : `#art_${i}{display:none}`;
        creatStyleObj += `art${i}: '#art_${i}{display:${i === 1 ? 'block' : 'none}'},`;
    });
    
    // Вставка сгенерированного HTML
    $("#menu").html(`<div class="menu">
        <div class="dropdown">
            <button class="dropbtn">Меню</button>
            <div class="dropdown-content">${creatMenu}</div>
        </div>
    </div>`);
    
    $("#article").html(creatCourse);
    $("#style").html(`<style>${creatStyle}</style>`);
    $("#menu_kursa").html(`<ul>${creatMenuCourse}</ul>`);
    
    // Генерация скрипта
    $("#script").html(`<script>
        const showDiv = (id) => {
            $(".art").hide();
            $("#" + id).show();
        }
        ${cretScript}
        title2 = '${title.replace(/'/g, "\\'")}';
        menuObj2 = {${creatMenuObj}};
        contentObj2 = {${creatContentObj}};
        styleObj2 = {${creatStyleObj}};
        let checkObj = 1;
    <\/script>`);
}

function clearInputs() {
    $("#punkt_menu").val('');
    $("#lesson").val('');
}

function add(content, menuText) {
    $("#lesson").val(content);
    $("#punkt_menu").val(menuText);
}

function addNew() {
    contentObj[`art${punkt}`] = $("#lesson").val();
    menuObj[`art${punkt}`] = $("#punkt_menu").val();
    addArticlesPage();
}

function deleteArticle(index) {
    delete menuObj[`art${index}`];
    delete contentObj[`art${index}`];
    delete styleObj[`art${index}`];
    addArticlesPage();
}

function saveFile() {
    const fileName = $("#name_kurs").val() || "untitled";
    const htmlContent = $("#divcopy").html();
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        $("#data").html(e.target.result);
        setTimeout(crObj, 2000);
        setTimeout(addArticlesPage, 3000);
    };
    reader.readAsText(file);
}
