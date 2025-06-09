document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const saturationSlider = document.getElementById('saturation');
    const hueSlider = document.getElementById('hue');
    const resetButton = document.getElementById('resetButton');
    const downloadButton = document.getElementById('downloadButton');

    let originalImage = null;
    let currentImage = null;

    // Función para cargar la imagen
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    originalImage = img;
                    currentImage = img;
                    resetCanvas();
                    applyFilters();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Función para redimensionar el canvas
    function resetCanvas() {
        const maxWidth = canvas.parentElement.clientWidth;
        const maxHeight = 400;
        let width = originalImage.width;
        let height = originalImage.height;

        if (width > maxWidth) {
            height = (maxWidth * height) / width;
            width = maxWidth;
        }

        if (height > maxHeight) {
            width = (maxHeight * width) / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
    }

    // Función para aplicar los filtros
    function applyFilters() {
        if (!originalImage) return;

        ctx.filter = `
            brightness(${brightnessSlider.value}%)
            contrast(${contrastSlider.value}%)
            saturate(${saturationSlider.value}%)
            hue-rotate(${hueSlider.value}deg)
        `;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    }

    // Event listeners para los controles
    brightnessSlider.addEventListener('input', applyFilters);
    contrastSlider.addEventListener('input', applyFilters);
    saturationSlider.addEventListener('input', applyFilters);
    hueSlider.addEventListener('input', applyFilters);

    // Botón de restablecer
    resetButton.addEventListener('click', () => {
        brightnessSlider.value = 100;
        contrastSlider.value = 100;
        saturationSlider.value = 100;
        hueSlider.value = 0;
        applyFilters();
    });

    // Botón de descargar
    downloadButton.addEventListener('click', () => {
        if (!originalImage) return;

        const link = document.createElement('a');
        link.download = 'imagen-editada.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}); 