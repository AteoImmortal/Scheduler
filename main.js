const form = document.querySelector('#addForm');
const itemsList = document.querySelector('#items');
const filter = document.querySelector('#filter');

// 1. Добавление новой задачи
form.addEventListener('submit', addItem);
function addItem(event) {
    // Отменяем отправку формы
    event.preventDefault();

    // Находим инпут с текстом для новой задачи
    const newItemInput = document.querySelector('#newItemText');
    // Получаем текст из инпута
    const newItemText = newItemInput.value;

    // Создаём элемент для новой задачи
    const newElement = document.createElement('li');
    newElement.className = 'list-group-item';

    // Добавим текст в новый элемент
    const newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);


    // Создаём кнопку
    const deleteBtn = document.createElement('button');

    // Добавляем текст в кнопку
    deleteBtn.appendChild(document.createTextNode('Удалить'));
    
    // Добавляем класс в кнопку
    deleteBtn.className = 'btn btn-light btn-sm float-right';

    // Добавляем data атрибут в кнопку
    deleteBtn.dataset.action = 'delete';


    // Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn)

    // Добавляем новую задачу в список с задачами
    itemsList.prepend(newElement);

    // Чистим поле добавления новой задачи
    newItemInput.value = '';
}

// 2. Удаление элемента - прослушка клика
itemsList.addEventListener('click', removeItem);
function removeItem(event) {
    
    if (event.target.hasAttribute('data-action') && event.target.getAttribute('data-action') == 'delete' ) {
        if (confirm('Вы уверены, что хотите удалить задачу?')) {
            event.target.parentNode.remove()
        }
    }
}

// 3. Фильтрация списка дел - прослушка ввода
filter.addEventListener('keyup', filterItems);
function filterItems(event) {
    // Получаем фразу для поиска и переводим её в нижний регистр
    let searchedText = event.target.value.toLowerCase();
    console.log(searchedText);

    // 1) Получаем список всех задач
    const items = itemsList.querySelectorAll('li');

    // 2) Перебираем циклом все найденные метки li с задачами
    items.forEach(function(item) {
        // Получаем текст задачи из списка и переводим в нижний регистр 
        const itemText = item.firstChild.textContent.toLowerCase();

        // Проверяем вхождение скомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // Если входжение есть - покахываем элемент с задачей
            item.style.display = 'block';
        } else {
            // Если нет - скрываем элемент с задачей
            item.style.display = 'none';
        }
    })
}