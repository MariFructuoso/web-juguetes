import { ToysService } from "./classes/toys.service";
import type { ToyInsert } from "./interfaces/toy.interfaces";

const toysService = new ToysService();

const form = document.getElementById('form-toy') as HTMLFormElement;
const imgInput = document.getElementById('t-image') as HTMLInputElement;
const imgPreview = document.getElementById('img-preview') as HTMLImageElement;
const nameInput = document.getElementById('t-name') as HTMLInputElement;
const descInput = document.getElementById('t-desc') as HTMLTextAreaElement;

let currentImageBase64 = ""; 

// 1. Manejo de la imagen
imgInput.addEventListener('change', () => {
    const file = imgInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImageBase64 = e.target?.result as string;
            imgPreview.src = currentImageBase64;
            imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// 2. Envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newToy: ToyInsert = {
        nombre: nameInput.value,
        descripcion: descInput.value,
        imagen: currentImageBase64
    };

    try {
        await toysService.postToy(newToy);
        location.assign("index.html"); 
    } catch (error) {
        console.error(error);
        alert('Error al guardar el juguete');
    }
});