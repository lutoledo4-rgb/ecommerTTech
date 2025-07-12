const contenedor = document.getElementById("productos");

const categorias = [ "womens-dresses", "tops"];



categorias.forEach(cat => {
  fetch(`https://dummyjson.com/products/category/${cat}`)
    .then(res => res.json())
    .then(data => {
      data.products.forEach(prod => {
        const card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
          <h3>${prod.title}</h3>
          <img src="${prod.thumbnail}" width="100">
          <p>Precio: $${prod.price}</p>
          <button data-id="${prod.id}">Agregar al carrito</button>
        `;
        contenedor.appendChild(card);
      });

      document.querySelectorAll("button[data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = parseInt(btn.dataset.id);
          agregarAlCarrito(id);
        });
      });
    });
});

function agregarAlCarrito(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(producto => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Producto agregado al carrito");
      actualizarContadorCarrito(); // <--- actualizamos el contador
    });
}


function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

// Llamamos la función al cargar la página
actualizarContadorCarrito();


