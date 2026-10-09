const API_URL = '/api/movimientos';
export async function obtenerMovimientos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error('Error al obtener los movimientos');
        }
        const movimientos = await respuesta.json();
        return movimientos;
    } catch (error) {
        console.error('Error en obtenerMovimientos:', error);

        throw error;
    }
}
export async function obtenerMovimientoPorId(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) {
            throw new Error('Error al obtener el movimiento');
        }
        const movimientos = await respuesta.json();
        return movimientos;
    } catch (error) {
        console.error('Error en obtenerMovimientoPorId:', error);
        throw error;
    }
}
export async function crearMovimiento(movimientos) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimientos)
        });
        if (!respuesta.ok) {
            throw new Error('Error al crear movimiento');
        }
        const nuevoMovimiento = await respuesta.json();
        return nuevoMovimiento;
    } catch (error) {
        console.error('Error en crearMovimiento:', error);
        throw error;
    }
}
export async function actualizarMovimiento(id, movimiento) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimiento)
        });
        if (!respuesta.ok) {
            throw new Error('Error al actualizar el movimiento');
        }
        const movimientoActualizado = await respuesta.json();
        return movimientoActualizado;
    } catch (error) {
        console.error('Error en actualizarMovimiento:', error);
        throw error;
    }
}
export async function eliminarMovimiento(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('Error al eliminar el movimiento');
        }
        return true;
    } catch (error) {
        console.error('Error en eliminarMovimiento:', error);
        throw error;
    }
}