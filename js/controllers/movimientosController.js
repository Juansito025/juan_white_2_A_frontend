import {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento,
} from "../services/movimientosServices.jss";
const tablaMovimientos = document.getElementById("tablaMovimientos");
const formMovimientos = document.getElementById("formMovimientos");
const mensaje = document.getElementById("mensaje");
const txtIdMovimiento= document.getElementById("txtIdMovimiento");
const txtFecha = document.getElementById("txtFecha");
const txtTipo = document.getElementById("txtTipo");
const txtCategoria = document.getElementById("txtCategoria");
const txtDescripcion = document.getElementById("txtDescripcion");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
document.addEventListener("DOMContentLoaded", async function () {
  await cargarMovimientos();
});

formMovimientos.addEventListener("submit", async function (event) {
  event.preventDefault();
  const id = txtIdMovimiento.value.trim();
  const fecha = txtFecha.value.trim();
  const tipo = txtTipo.value.trim();
  const categoria = txtCategoria.value.trim();
  const descripcion = txtDescripcion.value.trim();
  if (fecha === "" || tipo === "" || categoria === "" || descripcion === "") {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }
  const movimiento = {
    fecha: fecha,
    tipo: tipo,
    categoria: categoria,
  };
  try {
    if (id !== "") {
      await actualizarMovimiento(id, movimiento);
      mostrarMensaje("movimiento actualizado correctamente.", "success");
    } else {
      await crearMovimiento(movimiento);
      mostrarMensaje("Moviento guardado correctamente.", "success");
    }
    limpiarFormulario();
    await crearMovimiento();
  } catch (error) {
    mostrarMensaje("No se pudo guardar el movimiento.", "danger");
  }
});
btnCancelar.addEventListener("click", function () {
  limpiarFormulario();
});
async function cargarMovimiento() {
  try {
    const personas = await obtenerMovimientos();
    tablaMovimientos.innerHTML = "";
    movimientos.forEach(function (movimiento) {
      const fecha = movimiento.date || movimiento.fecha || "Sin fecha";
      const tipo = movimiento.type || movimiento.tipo || "Sin tipo";
      const categoria = movimiento.categoria || movimiento.categoria || "Sin categoria de registro";
    const descripcion = movimiento.descripcion || movimiento.descripcion || "Sin descripcion de registro";
tablaMovimientos.innerHTML += `
 <tr>
 <td>${movimiento.id}</td>
 <td>${fecha}</td>
 <td>${tipo}</td>
 <td>${categoria}</td>
 <td>${descripcion}</td>
 <td>
 <button type="button" class="btn btn-warning btn-sm me-2" 
onclick="colocarDatosFormulario(${movimiento.id})">
 Editar
 </button>
 <button type="button" class="btn btn-danger btn-sm" onclick="borrarMovimiento($
{movimiento.id})">
 Eliminar
 </button>
 </td>
 </tr>
 `;
    });
  } catch (error) {
    mostrarMensaje("No se pudieron cargar los movimientos.", "danger");
  }
}
async function colocarDatosFormulario(id) {
  try {
    const movimiento = await obtenerMovimientoPorId(id);
    txtIdMovimiento.value = movimiento.id;
    txtFecha.value = movimiento.date || movimiento.fecha || "";
    txtTipo.value = movimiento.type || movimiento.tipo || "";
    txtCategoria.value = movimiento.categoria || movimiento.movimiento || "";
    btnGuardar.textContent = "Actualizar Movimiento";
    btnGuardar.className = "btn btn-primary";
    btnCancelar.classList.remove("d-none");
  } catch (error) {
    mostrarMensaje("No se pudo cargar el Usuario para editar.", "danger");
  }
}
async function borrarMovimiento(id) {
  const confirmar = confirm("Deseas eliminar esta movimiento?");
  if (!confirmar) {
    return;
  }
  try {
    await eliminarMovimiento(id);
    mostrarMensaje("movimiento eliminado correctamente.", "success");
    limpiarFormulario();
    await cargarMovimiento();
  } catch (error) {
    mostrarMensaje("No se pudo eliminar el movimiento .", "danger");
  }
}
function limpiarFormulario() {
  formMovimientos.reset();
  txtIdMovimientoo.value = "";
  btnGuardar.textContent = "Guardar movimiento"; //Aquí el botón regresa a la normalidad
  btnGuardar.className = "btn btn-success";
  btnCancelar.classList.add("d-none");
}
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `alert alert-${tipo}`;
  setTimeout(function () {
    mensaje.className = "alert d-none";
    mensaje.textContent = "";
  }, 3000);
}
window.colocarDatosFormulario = colocarDatosFormulario;
window.borrarMovimiento = borrarMovimiento;
