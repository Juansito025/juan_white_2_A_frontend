import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsaurio,
  actualizarUsuario,
  eliminarUsuario,
} from "services/usuariosService.js";
const tablaUsuarios = document.getElementById("tablaUsuarios");
const formUsuario = document.getElementById("formUsuario");
const mensaje = document.getElementById("mensaje");
const txtIdUsuario = document.getElementById("txtIdUsuario");
const txtNombre = document.getElementById("txtNombre");
const txtCorreo = document.getElementById("txtCorreo");
const txtFechaRegistro = document.getElementById("txtFechaRegistro");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
document.addEventListener("DOMContentLoaded", async function () {
  await cargarUsuarios();
});

formUsuario.addEventListener("submit", async function (event) {
  event.preventDefault();
  const id = txtIdUsuario.value.trim();
  const nombre = txtNombre.value.trim();
  const correo = txtCorreo.value.trim();
  const fechaRegistro = txtFechaRegistro.value.trim();
  if (nombre === "" || correo === "" || fechaRegistro === "") {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }
  const usuario = {
    name: nombre,
    correo: correo,
    fechaRegistro: fechaRegistro,
  };
  try {
    if (id !== "") {
      await actualizarUsuario(id, usuario);
      mostrarMensaje("Usuario actualizado correctamente.", "success");
    } else {
      await crearUsaurio(usuario);
      mostrarMensaje("Usuario guardado correctamente.", "success");
    }
    limpiarFormulario();
    await crearUsaurio();
  } catch (error) {
    mostrarMensaje("No se pudo guardar el Usuario.", "danger");
  }
});
btnCancelar.addEventListener("click", function () {
  limpiarFormulario();
});
async function cargarUsuarios() {
  try {
    const personas = await obtenerUsuarios();
    tablaUsuarios.innerHTML = "";
    usuarios.forEach(function (usuario) {
      const nombre = usuario.name || usuario.nombre || "Sin nombre";
      const correo = usuario.emial || usuario.correo || "Sin correo";
      const fechaRegistro = usuario.fechaRegistro || usuario.fechaRegistro || "Sin fecha de registro";

      tablaUsuarios.innerHTML += `
 <tr>
 <td>${usuario.id}</td>
 <td>${nombre}</td>
 <td>${correo}</td>
 <td>${fechaRegistro}</td>
 <td>
 <button type="button" class="btn btn-warning btn-sm me-2" 
onclick="colocarDatosFormulario(${usuario.id})">
 Editar
 </button>
 <button type="button" class="btn btn-danger btn-sm" onclick="borrarUsuario($
{usuario.id})">
 Eliminar
 </button>
 </td>
 </tr>
 `;
    });
  } catch (error) {
    mostrarMensaje("No se pudieron cargar los usuarios.", "danger");
  }
}
async function colocarDatosFormulario(id) {
  try {
    const usuario = await obtenerUsuarioPorId(id);
    txtIdUsuario.value = usuario.id;
    txtNombre.value = usuario.name || usuario.nombre || "";
    txtCorreo.value = usuario.type || usuario.correo || "";
    txtFechaRegistro.value = usuario.fechaRegistro || usuario.fechaRegistro || "";
    btnGuardar.textContent = "Actualizar Usuario";
    btnGuardar.className = "btn btn-primary";
    btnCancelar.classList.remove("d-none");
  } catch (error) {
    mostrarMensaje("No se pudo cargar el Usuario para editar.", "danger");
  }
}
async function borrarUsuario(id) {
  const confirmar = confirm("Deseas eliminar este usuario?");
  if (!confirmar) {
    return;
  }
  try {
    await eliminarUsuario(id);
    mostrarMensaje("Usuario eliminado correctamente.", "success");
    limpiarFormulario();
    await cargarUsuarios();
  } catch (error) {
    mostrarMensaje("No se pudo eliminar el usuario .", "danger");
  }
}
function limpiarFormulario() {
  formUsuario.reset();
  txtIdUsuario.value = "";
  btnGuardar.textContent = "Guardar usuario"; //Aquí el botón regresa a la normalidad
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
window.borrarUsuario = borrarUsuario;
