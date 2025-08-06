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
 
<\/head>
<body class="h-100">
  <div class="home">
    <article class='hexlet-typography overflow-hidden'>`;

const footer = `<\/article><\/div><\/body><\/html>`;

// выводим шапку и футер страницы

 $(document).ready(function() {
     $("#head").text(head_html);
     $("#footer").text(footer);
 });
 
 // создаем пустые переменные для динамического заполения, нажатием кнопки "добавить"
 
 let menu_txt = '';
 let style_txt = '';
 let menuObj = {};
 let contentObj = {};
 let styleObj = {};
 let title = '';
 
 // Функция добавляем в обьекты свойства: Название документа, название статьи, контент, стили скрытия статей
 
 const creatObj = () => {
         if (Object.keys(contentObj).length == 0) {
             i = 1
         } else {
             i = Object.keys(contentObj).length + 1;
         }
         title = document.getElementById("name_kurs").value;
         menuObj[`art${i}`] = document.getElementById("punkt_menu").value;
         contentObj[`art${i}`] = document.getElementById("lesson").value;
         if (i == 1) {
             style_txt += `#art_${i}{display:block}`
         } else {
             style_txt = `#art_${i}{display:none}`;
         }
         styleObj[`art${i}`] = style_txt;
         i += 1;
         console.log(title);
         console.log(menuObj);
         console.log(contentObj);
         console.log(styleObj);
         addArticlesPage();
         remove();
     }

// функция вывода статей и меню при загрузки сохраненного документа в редакторе

 const crObj = () => {
     menuObj = menuObj2;
     contentObj = contentObj2;
     styleObj = styleObj2;
     document.getElementById("name_kurs").value = title2;
     document.getElementById("punkt_menu").value = menuObj2.art1;
     document.getElementById("lesson").value = contentObj2.art1;
 }
 const addArticlesPage = () => {
     menuObj3 = {};
     contentObj3 = {};
     styleObj3 = {};
     let creatMenu = '';
     let creatCourse = '';
     let creatStyle = '';
     let cretScript = '';
     let creatMenuObj = '';
     let creatContentObj = '';
     let creatStyleObj = '';
     let creatMenuCourse = '';
     index = 1;
     
	 // Добавляем пункты в меню страницы курса
     for (key in menuObj) {
         creatMenu += `<\div id="menu_${index}"><\a href="#" >${index}. ${menuObj[key]}</a></div>`;
         creatMenuObj += `art${index}: '${menuObj[key]}',`;
         creatMenuCourse += `<li onclick="add(contentObj.art${index}, menuObj.art${index}); punkt = ${index}" >${index}. ${menuObj[key]} &nbsp;&nbsp; <input type="button" onclick="addArticlesPage(); delete menuObj['art${index}']; delete contentObj['art${index}']; delete  styleObj['art${index}']; addArticlesPage();" value="X" /></li>`
         menuObj3[`art${index}`] = `${menuObj[key]}`;
         index += 1;
     }
    
     $("#menu").text("<di" + "v class='menu'><di" + "v class='dropdown'><but" + "ton class='dropbtn'>Меню</" + "button><di" + "v class='dropdown-content'>" + creatMenu + "</" + "div></" + "div></" + "div>");
     
    // Добавляем статьи на страницу курса, стили не актывных статей, скрипт работы меню и сохраняем объекты

     index2 = 1;
     for (key in contentObj) {
         creatCourse += `<div id="art_${index2}" class="art">${contentObj[key]}</div>`;
         creatContentObj += `art${index2}: \`${contentObj[key]}\`,`;
         contentObj3[`art${index2}`] = `${contentObj[key]}`;
         if (index2 == 1) {
             creatStyle += `#art_${index2}{display:block}`;
             creatStyleObj += `art${index2}: '#art_${index2}{display:block}',`;
             styleObj3[`art${index2}`] = `{display:block}`;
         } else {
             creatStyle += `#art_${index2}{display:none}`;
             creatStyleObj += `art${index2}: '#art_${index2}{display:none}',`;
             styleObj3[`art${index2}`] = `{display:none}`;
         }
         cretScript += ` menu_${index2}.addEventListener("click", () => showDiv('art_${index2}')); `
         $("#script").text("<sc" + "ript> const showDiv = (id) => {$('.art').hide();$('#' + id).show();} \n	" + cretScript + "\n" + "title2 = '" + title + "'\n" + "menuObj2 = {" + creatMenuObj + "};\n" + "contentObj2 = {" + creatContentObj + "};\n" + "styleObj2 = {" + creatStyleObj + "};\n" + "let checkObj = 1;\n" + "</" + "script>");
         index2 += 1;
     }
     $("#article").text(creatCourse);
     $("#style").text('<style>' + creatStyle + '</style>');
     
	 // Создание меню с текстом статей в редакторе
	 
     $("#menu_kursa").html('<ul>' + creatMenuCourse + '</ul>');
     menuObj = menuObj3;
     contentObj = contentObj3;
     styleObj = styleObj3;
 }
 const remove = () => {
     document.getElementById("punkt_menu").value = '';
     document.getElementById("lesson").value = '';
 }
 const add = (id, number) => {
         document.getElementById("lesson").value = id;
         document.getElementById("punkt_menu").value = number;
     }
     
// функция изменения текста статьи

 punkt = 1;
 const addNew = () => {
     contentObj[`art${punkt}`] = document.getElementById("lesson").value;
     menuObj[`art${punkt}`] = document.getElementById("punkt_menu").value;
     addArticlesPage();
 }
 btn.addEventListener("click", creatObj);
 
// сохранение в html файл, подумать как пересохранять файл при его изменении в тоже места и с тем же именем

 const saveFile = () => {
         let url = document.getElementById("name_kurs").value;
         let textToWrite = document.getElementById("divcopy").innerText;
         let textFileAsBlob = new Blob([textToWrite], {
             type: 'text/plain'
         });
         let downloadLink = document.createElement("a");
         downloadLink.download = url + ".html";
         downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
         downloadLink.click();
     }

// функция загрузки html файла для редактирования
	
 $("#file-input").change(function() {
     let file = this.files[0];
     let url = URL.createObjectURL(file);
     $.ajax({
         url: url,
         dataType: "html",
         success: function(data) {
             $("#data").html(data);
         }
     });
     setTimeout(crObj, 2000);
     setTimeout(addArticlesPage, 3000);
 });
