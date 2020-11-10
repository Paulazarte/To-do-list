// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  formularioUI.reset();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    formularioUI.reset();
  }
}

//Efectos del Formulario

var inputs = document.getElementsByClassName("formulario__input");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.nextElementSibling.classList.add("fijar");
    } else {
      this.nextElementSibling.classList.remove("fijar");

    }

  })

}


//LOCALSTORAGE E INGRESO DE DATOS HACIA LA TABLA

/*VARIABLES GLOBALES */
const formularioUI = document.querySelector('#formulario');
const listaPeliculasUI = document.getElementById('tabla');
let arrayPelis = [];



/*FUNCIONES */
const CrearPelis = (codigo, titulo, descripcion, categoria) => {
  let pelis = {
    codigo: codigo,
    titulo: titulo,
    descripcion: descripcion,
    categoria: categoria,
    estado: false
  }

  arrayPelis.push(pelis);

  return pelis;

}

const GuardarDB = () => {
  localStorage.setItem('peliculas', JSON.stringify(arrayPelis));

  // PintarDB();

}

const PintarDB = () => {
  //Esto limpia el HTML ¡!
  // listaPeliculasUI.innerHTML = '';
  arrayPelis = JSON.parse(localStorage.getItem('peliculas'));
  if (arrayPelis === null) {
    arrayPelis = [];
  } else {
    arrayPelis.forEach(element => {

      if (element.estado) {
        listaPeliculasUI.innerHTML += `
  <tr>
        <td style= "background-color:rgba(38, 226, 85, 0.4);">${element.codigo}</td> 
        <td style= "background-color:rgba(38, 226, 85, 0.4);">${element.titulo}</td> 
        <td style= "background-color:rgba(38, 226, 85, 0.4);">${element.descripcion}</td> 
        <td style= "background-color:rgba(38, 226, 85, 0.4);">${element.categoria}</td> 
        <td style= "background-color:rgba(38, 226, 85, 0.4);">
          <span class="material-icons float-left mr-2"></span>
          Estado - <b>${element.estado}</b>
        </td>  
        <td style= "background-color:rgba(38, 226, 85, 0.4);">
          <span style= "cursor: pointer;" class="material-icons mr-3">delete</span> 
          <span style= "cursor: pointer;" class="material-icons mr-3">edit</span>
          <span style= "cursor: pointer;" class="material-icons mr-3">done_all</span>
        </td>
    </tr>`
      } else {
        listaPeliculasUI.innerHTML += `
  <tr>
        <td>${element.codigo}</td> 
        <td>${element.titulo}</td> 
        <td>${element.descripcion}</td> 
        <td>${element.categoria}</td> 
        <td>
          <span class="material-icons float-left mr-2"></span>
          Estado - <b>${element.estado}</b>
        </td>  
        <td>
          <span style= "cursor: pointer;" class="material-icons mr-3">delete</span> 
          <span style= "cursor: pointer;" class="material-icons mr-3">edit</span>
          <span style= "cursor: pointer;" class="material-icons mr-3">done_all</span>
        </td>
  </tr>`
      }

    });
  }
}

const EliminarDB = (texto) => {
  let indexArray;
  arrayPelis.forEach((elemento, index) => {
    if (elemento.codigo === texto) {
      indexArray = index;
      console.log(elemento.codigo)
      arrayPelis.splice(indexArray, 1);
    }
  });
  GuardarDB();
  window.location.reload();
}

const ActivarDB = (texto) => {
  // let indexArray = arrayPelis.findIndex((elemento) => {
  //   return elemento.pelis === pelis
  // });
  // console.log(arrayPelis[indexArray]);
  // arrayPelis[indexArray].estado = true;
  // GuardarDB();

  let pelisArray = JSON.parse(localStorage.getItem('peliculas'));
  pelisArray.forEach((elemento) => {
    if (elemento.codigo == texto && elemento.estado == false) {
      elemento.estado = true;
      console.log('coincide: ' + elemento.estado);
      localStorage.setItem('peliculas', JSON.stringify(pelisArray))
      window.location.reload();
    }
  })

}

let editando = false;

const EditarDB = (texto) => {
  let pelisArray = JSON.parse(localStorage.getItem('peliculas'));
  pelisArray.forEach((elemento) => {
    if (elemento.codigo == texto) {
      document.getElementById('codigo').value = elemento.codigo;
      document.getElementById('codigo').setAttribute("disabled", "");
      document.getElementById('titulo').value = elemento.titulo;
      document.getElementById('descripcion').value = elemento.descripcion;
      document.getElementById('categoria').value = elemento.categoria;
      editando = true;
    }
  })
  modal.style.display = "block";
}


//EVENTLISTENER
formularioUI.addEventListener('submit', (e) => {
  let enUso = false;
  // e.preventDefault();
  let codigoForm = document.querySelector('#codigo').value;
  let tituloForm = document.querySelector('#titulo').value;
  let descripcionForm = document.querySelector('#descripcion').value;
  let categoriaForm = document.querySelector('#categoria').value;
  if (codigoForm == "" || tituloForm == "" || descripcionForm == "" || categoriaForm == "") {
    alert('Llene la totalidad de los campos')
  } else {

    let pelis = JSON.parse(localStorage.getItem('peliculas'));
    if (pelis === null) {
      pelis = [];
    }
    pelis.forEach((elemento) => {
      if (elemento.codigo == codigoForm && editando == false) {
        enUso = true;
      }
    });

    if (enUso) {
      alert('Este codigo ya está en uso')
    } else if (editando) {
      pelis.forEach((elemento) => {
        if (elemento.codigo === codigoForm) {
          elemento.categoria = categoriaForm;
          elemento.descripcion = descripcionForm;
          elemento.titulo = tituloForm;
          localStorage.setItem('peliculas', JSON.stringify(pelis));
          document.getElementById('codigo').removeAttribute("disabled");
        }
      })
      formularioUI.reset();
    } else {
      CrearPelis(codigoForm, tituloForm, descripcionForm, categoriaForm);
      GuardarDB();
      formularioUI.reset();
    }
  }

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaPeliculasUI.addEventListener('click', (e) => {

  e.preventDefault();

  if (e.target.innerHTML === 'done_all' || e.target.innerHTML === 'delete' || e.target.innerHTML === 'edit') {
    // let texto = e.target.parentNode.parentNode.childNodes[2].innerText;
    let texto = e.target.parentNode.parentNode.childNodes[1].innerText;
    if (e.target.innerHTML === 'delete') {
      //Acción de eliminar
      console.log(e.target.innerHTML);
      EliminarDB(texto);
    }
    if (e.target.innerHTML === 'done_all') {
      //Acción de activar y desactivar
      let texto = e.target.parentNode.parentNode.childNodes[1].firstChild.data;
      console.log(e.target.parentNode.parentNode.childNodes[1].firstChild.data)
      ActivarDB(texto)
    }
    if (e.target.innerHTML === 'edit') {
      //Acción de abrir formulario
      let texto = e.target.parentNode.parentNode.childNodes[1].innerText;
      EditarDB(texto)
    }
  }
});






