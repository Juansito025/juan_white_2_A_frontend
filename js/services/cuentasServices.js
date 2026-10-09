const API_URL = '/api/cuentas';
export async function obtenerCuentas() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error('Error al obtener las cuentas');
        }
        const cuentas = await respuesta.json();
        return cuentas;
    } catch (error) {
        console.error('Error en obtenerCuentas:', error);

        throw error;
    }
}
export async function obtenerCuentaPorId(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) {
            throw new Error('Error al obtener la cuenta');
        }
        const cuentas = await respuesta.json();
        return cuentas;
    } catch (error) {
        console.error('Error en obtenerCuentaPorId:', error);
        throw error;
    }
}
export async function crearCuenta(cuentas) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuentas)
        });
        if (!respuesta.ok) {
            throw new Error('Error al crear la cuenta');
        }
        const nuevaCuenta = await respuesta.json();
        return nuevaCuenta;
    } catch (error) {
        console.error('Error en crearCuenta:', error);
        throw error;
    }
}
export async function actualizarCuenta(id, cuenta) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuenta)
        });
        if (!respuesta.ok) {
            throw new Error('Error al actualizar la cuenta');
        }
        const cuentaActualizada = await respuesta.json();
        return cuentaActualizada;
    } catch (error) {
        console.error('Error en actualizarCuenta:', error);
        throw error;
    }
}
export async function eliminarCuenta(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('Error al eliminar la cuenta');
        }
        return true;
    } catch (error) {
        console.error('Error en eliminarCuenta:', error);
        throw error;
    }
}