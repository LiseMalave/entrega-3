const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

//Selectores

let inputText = document.querySelector("#inputText");
let inputForm = document.querySelector("#inputForm");
let inputShow = document.querySelector("#inputShow");

const users1 = JSON.parse(localStorage.getItem("users1")) || [];

if (users1.length) {
  console.log(users1);

  let [nombreString] = users1;
  console.log(nombreString);
  inputShow.textContent += nombreString.nombre;
  let imageRender = document.createElement("img");
  imageRender.src = nombreString.image;
  inputShow.appendChild(imageRender);
  users1.splice(users1.indexOf(nombreString), 1);

  localStorage.setItem("users1", JSON.stringify(users1));
  // removeItem localStorage.users1;
  // localStorage.removeItem(nombreString);
  //delete localStorage.users1;
}
// const userss =[];
const saveToLocalStorage = () => {
  localStorage.setItem("users1", JSON.stringify(users1));
};

const validateForm = (e) => {
  e.preventDefault();

  let isTextValid = checkValue(inputText.value);

  if (isTextValid) {
    let showPizza = pizzas.map(
      (pizza) => pizza.nombre + " $" + pizza.precio + " " + pizza.imagen
    );
    let pizza = showPizza[inputText.value - 1];
    let imagenPizza = pizza.split(".");
    let nombrePizza = imagenPizza[0];
    console.log(nombrePizza);
    let imageWithPizza = document.createElement("img");
    let imagePizza = `.${imagenPizza[1]}.png`;
    imageWithPizza.src = `.${imagenPizza[1]}.png`;
    inputShow.innerHTML = imagenPizza[0].toUpperCase();
    inputShow.appendChild(imageWithPizza);
    console.log(imageWithPizza);
    users1.push({
      nombre: nombrePizza,
      image: imagePizza,
    });

    saveToLocalStorage();
  }
};

const showErrorValue = () => {
  inputShow.innerHTML = "El id no se encuentra";
};
const showErrorNumber = () => {
  inputShow.textContent = "El valor ingresado no es un número";
};

const checkPizza = (input) => {
  let valid = false;
  if (!pizzaValid(input)) {
    showErrorValue();
    return;
  }
  valid = true;
  return valid;
};

const checkValue = (input) => {
  console.log(input);
  let regex = /[0-9]+/i;
  if (!regex.test(input)) {
    showErrorNumber();
    return;
  }
  return checkPizza(input);
};

// valida si el input esta en id
const pizzaValid = (input) => {
  let pizzaValue = pizzas.some((pizza) => pizza.id == input);
  return pizzaValue;
};

// mostrar la card con los datos

const init = () => {
  inputForm.addEventListener("submit", validateForm);
};

init();
