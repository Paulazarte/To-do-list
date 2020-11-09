/*VARIABLES GLOBALES */
const formUser = document.getElementById('formUser');
const listCards = document.getElementById('card-list')
let arrayCards = [];

/*FUNCIONES */
const createCards = (title, textarea, classify) => {
    let cards = {
        title,
        textarea,
        classify,
        state: false,
    }

    arrayCards.push(pelis);

    return cards;
}

//Guardamos en LS
const saveDB = () => {
    localStorage.setItem('tasks', JSON.stringify(arrayCards));

}

const printDB = () => {
    arrayCards = JSON.parse(localStorage.getItem('tasks'));
    if (arrayCards === null) {
        arrayCards = [];
    }else {
        arrayCards.forEach(element => {
            if (element.state) {
                listCards.innerHTML += `
            <div class="column">
                <div class="card">${element.title.textarea.classify}</div>
                <span style= "cursor: pointer;" class="material-icons mr-3">delete</span> 
                <span style= "cursor: pointer;" class="material-icons mr-3">edit</span>
                <span style= "cursor: pointer;" class="material-icons mr-3">done_all</span>
            </div>`
            }

        });
    }
}

const deleteDB = (text) => {
    let indexArray;
    arrayCards.forEach((elemento, index) => {
        if (elemento.title === text) {
            indexArray = index;
            console.log(elemento.title)
            arrayCards.splice(indexArray, 1);
        }
    })
    saveDB();
    window.location.reload();
}

const activeDB = (text) => {
    let cardArray.forEach((elemento) => {
        if (elemento.)
    })
}























// const titleInput = document.getElementById('title');
// const textAreaInput = document.getElementById('textarea');
// const classifyInput = document.getElementById('classify');

// const generateId = function () {
//     return '_' + Math.random().toString(36).substr(2, 9);
// };

// formUser.onsubmit = (e) => {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     e.preventDefault();
//     const title = titleInput.value;
//     const textarea = textAreaInput.value;
//     const classify = classifyInput.value;
    
//     tasks.push({
//         title,
//         textarea,
//         classify,
//         id: generateId().value,
//         createdAT : Date.now()
//     })
    
//     localStorage.setItem('tasks', JSON.stringify(tasks));
    
//     formUser.reset();
//     displayTask();
    
// }

// const loadForm = (taskId) => {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     const task = tasks.find((u) => u.id === taskId);

// }



