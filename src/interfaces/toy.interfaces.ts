// Lo que enviamos al crear (sin ID)
export interface ToyInsert {
    nombre: string;
    descripcion: string;
    imagen: string;
}

// Lo que recibimos (con ID)
export interface Toy extends ToyInsert {
    id: number;
}

// La respuesta envoltorio del servidor ({ success: true, data: ... })
export interface ToysResponse {
    data: Toy[];
}

export interface SingleToyResponse {
    data: Toy;
}