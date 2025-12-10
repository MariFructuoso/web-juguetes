import { ToysService } from "./classes/toys.service";
import type { Toy } from "./interfaces/toy.interfaces";

const toysService = new ToysService();
const container = document.getElementById('toys-container') as HTMLDivElement;

// Función principal
async function loadToys() {
    try {
        const toys = await toysService.getToys();
        renderToys(toys);
    } catch (error) {
        console.error("Error cargando juguetes:", error);
        container.innerHTML = '<p class="text-center text-red-500">Error al cargar la carta.</p>';
    }
}

// Función para pintar el HTML (separada para que quede limpio)
function renderToys(toys: Toy[]) {
    container.innerHTML = '';

    if (toys.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No hay juguetes todavía.</p>';
        return;
    }

    toys.forEach((toy) => {
        // Creamos la tarjeta usando estilos de Tailwind (si los tienes) o CSS normal
        const card = document.createElement('div');
        card.className = "bg-white rounded-lg shadow-md p-4 flex flex-col gap-2";
        
        card.innerHTML = `
            <img src="${toy.imagen}" alt="${toy.nombre}" class="w-full h-48 object-cover rounded-md">
            <h3 class="text-xl font-bold text-red-600">${toy.nombre}</h3>
            <p class="text-gray-600 flex-grow">${toy.descripcion}</p>
            <button class="btn-delete bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition" data-id="${toy.id}">
                Borrar
            </button>
        `;

        // Añadimos evento de borrado al botón
        const btnDelete = card.querySelector('.btn-delete') as HTMLButtonElement;
        btnDelete.addEventListener('click', () => handleDelete(toy.id));

        container.appendChild(card);
    });
}

async function handleDelete(id: number) {
    if (confirm("¿Borrar este juguete?")) {
        try {
            await toysService.deleteToy(id);
            loadToys(); // Recargar la lista
        } catch (error) {
            console.error(error);
            alert("Error al borrar");
        }
    }
}

// Iniciar
loadToys();