const API_URL = '/api/usuarios';
export async function obtenerUsuarios() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error('Error al obtener las usuarios');
        }
        const usuarios = await respuesta.json();
        return usuarios;
    } catch (error) {
        console.error('Error en obtenerPersonas:', error);

        throw error;
    }
}
export async function obtenerUsuarioPorId(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) {
            throw new Error('Error al obtener al usuario');
        }
        const usuarios = await respuesta.json();
        return usuarios;
    } catch (error) {
        console.error('Error en obtenerUsuarioPorId:', error);
        throw error;
    }
}
export async function crearUsaurio(usuarios) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarios)
        });
        if (!respuesta.ok) {
            throw new Error('Error al crear al usuario');
        }
        const nuevoUsuario = await respuesta.json();
        return nuevoUsuario;
    } catch (error) {
        console.error('Error en crearUsuario:', error);
        throw error;
    }
}
export async function actualizarUsuarios(id, usuario) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        if (!respuesta.ok) {
            throw new Error('Error al actualizar al usuario');
        }
        const usuarioActualizado = await respuesta.json();
        return usuarioActualizado;
    } catch (error) {
        console.error('Error en actualizarUsuario:', error);
        throw error;
    }
}
export async function eliminarUsuario(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('Error al eliminar al usuario');
        }
        return true;
    } catch (error) {
        console.error('Error en eliminarUsuario:', error);
        throw error;
    }
}