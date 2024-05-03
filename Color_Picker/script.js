const pickBtn = document.getElementById("pick-btn");
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const hexInput = document.getElementById("hex-input");
const rgbInput = document.getElementById("rgb-input");
const pickedColor = document.getElementById("picked-color");
const colorHistory = document.getElementById("color-history");
const colorList = document.getElementById("color-list");

// Function to initialize EyeDropper
const initEyeDropper = () => {
    if ("EyeDropper" in window) {
        pickBtn.classList.remove("hide");
        const eyeDropper = new EyeDropper();
        // Event listener for color selection
        pickBtn.addEventListener("click", async () => {
            try {
                const colorValue = await eyeDropper.open();
                const hexValue = colorValue.sRGBHex.toLowerCase();
                const rgbValue = hexToRgb(hexValue);
                result.style.display = "grid";
                hexInput.value = hexValue;
                rgbInput.value = rgbValue;
                showPickedColor(hexValue);
                // Add color to history
                addColorToHistory(hexValue);
            } catch {
                alert("Your browser doesn't support Eyedropper API!");
            }
        });
    } else {
        alert("Your browser doesn't support Eyedropper API!");
    }
};

// Function to convert HEX to RGB
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};

// Event listener for file input
fileInput.addEventListener("change", () => {
    result.style.display = "none";
    const reader = new FileReader();
    reader.onload = () => image.setAttribute("src", reader.result);
    reader.readAsDataURL(fileInput.files[0]);
});

// Function to copy text to clipboard
const copyToClipboard = (textId) => {
    const textElement = document.getElementById(textId);
    textElement.select();
    document.execCommand("copy");
};

// Function to add color to history
const addColorToHistory = (color) => {
    const li = document.createElement("li");
    li.classList.add("color-history-item");
    const colorPreview = document.createElement("div");
    colorPreview.classList.add("color-preview");
    colorPreview.style.backgroundColor = color;
    li.appendChild(colorPreview);
    const codeSpan = document.createElement("span");
    codeSpan.classList.add("color-code");
    codeSpan.textContent = color;
    li.appendChild(codeSpan);
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.classList.add("tooltip");
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        colorList.removeChild(li);
    });
    const span = document.createElement("span");
    span.classList.add("tooltiptext");
    span.textContent = "Remove color";
    button.appendChild(span);
    li.appendChild(button);
    colorList.appendChild(li);
    colorHistory.classList.remove("hide");
};

// Function to show picked color
const showPickedColor = (color) => {
    pickedColor.style.backgroundColor = color;
    pickedColor.setAttribute("data-color", color);
    hexInput.value = color;
    rgbInput.value = hexToRgb(color);
};

// Initialize EyeDropper
window.onload = () => {
    showPickedColor("#ffffff"); // Default color (white)
    initEyeDropper();
};