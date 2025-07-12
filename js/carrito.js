const contenedor = document.getElementById("carrito");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (carrito.length === 0) {
  contenedor.innerHTML = "<p>Carrito vacío</p>";
} else {
  carrito.forEach(prod => {
    const item = document.createElement("div");
    item.className = "producto";
    item.innerHTML = `
      <h3>${prod.title}</h3>
      <img src="${prod.thumbnail}" width="100">
      <p>Precio: $${prod.price}</p>
    `;
    contenedor.appendChild(item);
  });
}

document.getElementById("vaciar").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  location.reload();
});

document.getElementById("finalizar").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  alert("¡Gracias por tu compra!");
  window.location.href = "index.html";
});
document.getElementById("continuar").addEventListener("click", () => {
  window.location.href = "index.html";
});