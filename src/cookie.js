/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const isMatching = (full, chunk) => new RegExp(chunk, 'i').test(full);

const initTable = () => {
    if (document.cookie) {
        listTable.innerHTML = document.cookie.split('; ').map((cookie) => {
            let cookieArray = cookie.split('=');
            
            if (filterNameInput.value && !isMatching(cookieArray[0], filterNameInput.value)) {
                return '';
            }

            return `<tr><td>${cookieArray[0]}</td><td>${cookieArray[1]}</td><td><button>Удалить</button></td></tr>`;
        }).join('');
    } else {
        listTable.innerHTML = '';
    }
}

initTable();

filterNameInput.addEventListener('keyup', function() {
    initTable();
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    initTable();
});

listTable.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON') {
        let cookieSelected = event.target.parentNode.parentNode.querySelector('td:first-of-type').innerText;

        document.cookie = `${cookieSelected}=null; expires=${new Date(0).toUTCString()}`;
        initTable();
    }
});
