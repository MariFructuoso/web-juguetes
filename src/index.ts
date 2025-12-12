import { ToysService } from "./classes/toys.service";
import type { Toy } from "./interfaces/toy.interfaces";

// 1. Selección de elementos (OJO: Ahora buscamos "toys-list")
const listContainer = document.getElementById("toys-list") as HTMLUListElement;
const template = document.getElementById("toyTemplate") as HTMLTemplateElement;

const toysService = new ToysService();

// 2. Función para pintar UNA FILA (List Item)
function addToyRow(toy: Toy): void {
    // Clonamos el <li>
    const clone = (template.content.cloneNode(true) as DocumentFragment).firstElementChild!;

    // Buscamos dentro del <li>
    const img = clone.querySelector(".toy-img") as HTMLImageElement;
    const title = clone.querySelector(".toy-title") as HTMLHeadingElement;
    const desc = clone.querySelector(".toy-desc") as HTMLParagraphElement;
    const btnDelete = clone.querySelector(".btn-delete") as HTMLButtonElement;

    // Rellenamos
    img.src = toy.imagen;
    img.alt = toy.nombre;
    title.textContent = toy.nombre;
    desc.textContent = toy.descripcion;

    // Evento Borrar
    btnDelete.addEventListener("click", async () => {
        if (confirm(`¿Borrar ${toy.nombre}?`)) {
            try {
                await toysService.deleteToy(toy.id);
                clone.remove(); 
            } catch (error) {
                console.error(error);
                alert("Error al borrar");
            }
        }
    });

    // Añadimos a la lista <ul>
    listContainer.append(clone);
}

// 3. Cargar todo
async function getToys() {
    try {
        const toys = await toysService.getToys();

        if (toys.length === 0) {
            listContainer.innerHTML = '<p style="text-align:center; color: white;">La lista está vacía 🎅</p>';
            return;
        }

        listContainer.innerHTML = "";
        
        // Ahora llamamos a addToyRow
        toys.forEach(addToyRow);

    } catch (error) {
        console.error(error);
        listContainer.innerHTML = '<p style="text-align:center; color: red;">Error de conexión</p>';
    }
}

getToys();