/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function createDiv() {
    let element = document.createElement('div'),
        clientWidth = document.documentElement.clientWidth,
        clientHeight = document.documentElement.clientHeight;

    element.style.position = 'absolute';
    element.style.width = `${getRandom(100, clientWidth - 100)}px`;
    element.style.height = `${getRandom(100, clientHeight - 100)}px`;
    element.style.top = `${getRandom(0, clientHeight - parseInt(element.style.height))}px`;
    element.style.left = `${getRandom(0, clientWidth - parseInt(element.style.width))}px`;
    element.style.background = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;

    element.className = 'draggable-div';
    element.dataset.id = new Date().getTime();
    element.setAttribute('draggable', true);

    return element;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners() {
    homeworkContainer.addEventListener('dragstart', event => {
        if (event.target.className !== 'draggable-div') {
            return false;
        }
        event.target.style.opacity = 0.4;
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.setData('id', event.target.dataset.id);
        event.dataTransfer.setData('shiftX', event.pageX - parseInt(event.target.style.left));
        event.dataTransfer.setData('shiftY', event.pageY - parseInt(event.target.style.top));
    });

    homeworkContainer.addEventListener('dragover', event => {
        event.preventDefault();
    });

    homeworkContainer.addEventListener('drop', event => {
        let element = document.querySelector(`[data-id="${event.dataTransfer.getData('id')}"]`),
            left = event.pageX - event.dataTransfer.getData('shiftX'),
            top = event.pageY - event.dataTransfer.getData('shiftY');

        event.preventDefault();
        element.style.opacity = 1;
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
    });
}

// назначить обработчики событий мыши для реализации D&D
addListeners();

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
});

export {
    createDiv
};
