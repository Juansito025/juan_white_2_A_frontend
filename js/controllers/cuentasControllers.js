import {
  obtenerCuentas,
  obtenerCuentaPorId,
  crearCuenta,
  actualizarCuenta,
  eliminarCuenta,
} from "../services/cuentasServices.js";
const tablaCuentas = document.getElementById("tablaCuentas");
const formCuenta = document.getElementById("formCuenta");
const mensaje = document.getElementById("mensaje");
const txtIdCuenta = document.getElementById("txtIdCuenta");
const txtNombre = document.getElementById("txtNombre");
const txtTipo = document.getElementById("txtTipo");
const txtActiva = document.getElementById("txtActiva");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
document.addEventListener("DOMContentLoaded", async function () {
  await cargarCuentas();
});

formCuenta.addEventListener("submit", async function (event) {
  event.preventDefault();
  const id = txtIdCuenta.value.trim();
  const nombre = txtNombre.value.trim();
  const tipo = txtTipo.value.trim();
  const saldoInicial = txtSaldoInical.value.trim();
  const activa = txtActiva.value.trim();
  if (nombre === "" || tipo === "" || saldoInicial === "" || activa === "") {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }
  const cuenta = {
    name: nombre,
    tipo: tipo,
    saldoInicial: saldoInicial,
    activa: activa,
  };
  try {
    if (id !== "") {
      await actualizarCuenta(id, cuenta);
      mostrarMensaje("Cuenta actualizada correctamente.", "success");
    } else {
      await crearCuenta(cuenta);
      mostrarMensaje("Cuenta guardada correctamente.", "success");
    }
    limpiarFormulario();
    await cargarCuentas();
  } catch (error) {
    mostrarMensaje("No se pudo guardar la cuenta.", "danger");
  }
});
btnCancelar.addEventListener("click", function () {
  limpiarFormulario();
});
async function cargarCuentas() {
  try {
    const personas = await obtenerCuentas();
    tablaPersonas.innerHTML = "";
    cuentas.forEach(function (cuenta) {
      const nombre = cuenta.name || cuenta.nombre || "Sin nombre";
      const tipo = cuenta.tipo || cuenta.tipo || "Sin tipo";
      const saldoInicial = cuenta.saldoInicial || cuenta.saldoInicial || "Sin saldo Inicial";
      const activa = cuenta.activa || cuenta.activa || "Sin activa";

      tablaCuentas.innerHTML += `
 <tr>
 <td>${cuenta.id}</td>
 <td>${nombre}</td>
 <td>${tipo}</td>
 <td>${saldoInicial}</td>
<td>${activa}</td>
 <td>
 <button type="button" class="btn btn-warning btn-sm me-2" 
onclick="colocarDatosFormulario(${cuenta.id})">
 Editar
 </button>
 <button type="button" class="btn btn-danger btn-sm" onclick="borrarCuenta($
{cuenta.id})">
 Eliminar
 </button>
 </td>
 </tr>
 `;
    });
  } catch (error) {
    mostrarMensaje("No se pudieron cargar las cuentas.", "danger");
  }
}
async function colocarDatosFormulario(id) {
  try {
    const cuenta = await obtenerCuentaPorId(id);
    txtIdCuenta.value = cuenta.id;
    txtNombre.value = cuenta.nombre || cuenta.nombre || "";
    txtTipo.value = cuenta.tipo || cuenta.tipo || "";
    txtSaldoInical.value = cuenta.saldoInicial || cuenta.saldoInicial || "";
    btnGuardar.textContent = "Actualizar cuenta";
    btnGuardar.className = "btn btn-primary";
    btnCancelar.classList.remove("d-none");
  } catch (error) {
    mostrarMensaje("No se pudo cargar la cuenta para editar.", "danger");
  }
}
async function borrarCuenta(id) {
  const confirmar = confirm("Deseas eliminar esta cuenta?");
  if (!confirmar) {
    return;
  }
  try {
    await eliminarCuenta(id);
    mostrarMensaje("Cuenta eliminada correctamente.", "success");
    limpiarFormulario();
    await cargarCuentas();
  } catch (error) {
    mostrarMensaje("No se pudo eliminar la cuenta.", "danger");
  }
}
function limpiarFormulario() {
  formCuenta.reset();
  txtIdCuenta.value = "";
  btnGuardar.textContent = "Guardar cuenta"; //Aquí el botón regresa a la normalidad
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
window.borrarCuenta = borrarCuenta;
