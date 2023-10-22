document.addEventListener("DOMContentLoaded", handleDocumentLoad);
let fileInput = null;
let imageElement = null;
let processedImageElement = null;
let clearButton = null;
let saveButton = null;
let clearFilterButton = null;
let imageContainer = null;

function handleDocumentLoad() {

    // Log that the document has loaded.
    console.log("Document loaded.");

    fileInput = document.getElementById("fileInput");
    imageElement = document.getElementById("imageElement");
    processedImageElement = document.getElementById("processedImageElement");
    clearButton = document.getElementById("clearButton");
    saveButton = document.getElementById("saveButton");
    imageContainer = document.getElementById("imageContainer");
    clearFilterButton = document.getElementById("clearFilterButton");

    // Check if the file input and image element exist.
    if (!fileInput || !imageElement || !processedImageElement) {
        return;
    }

    // Log that the file input and image element exist.
    console.log("File input and image element exist.");

    // Add an event listener to the file input.
    fileInput.addEventListener("change", handleImageSelection);
    // Add an event listener to the clear button.
    clearButton.addEventListener("click", handleClearButtonClick);
    // Add an event listener to the save button.
    saveButton.addEventListener("click", handleSaveButtonClick);
    // Add an event listener to the clear filter button.
    clearFilterButton.addEventListener("click", handleClearFilterButtonClick);

    updateImageSource(""); // Clear the image source.
}

   

function handleClearFilterButtonClick(e) {

    // Log that the clear filter button was clicked.
    console.log("Clear filter button clicked.");

    // Check if the processed image element exists.
    if(imageContainer.style.display == "none") {
        alert("Please select an image first.");
        return;
    }

  

    // upload the image source to empty and then reupload the image source
    let imageSource = imageElement.src;
    updateImageSource("");
    updateImageSource(imageSource);
}


// Handle the save button click event.
function handleSaveButtonClick(e) {


    // Log that the save button was clicked.
    console.log("Save button clicked.");

    // Check if the processed image element exists.
    if(imageContainer.style.display == "none") {
        alert("Please select an image first.");
        return;
    }
    // Save the image.
    // - Create a canvas element.
    // - Set the canvas width and height to the image width and height.
    // - Draw the image onto the canvas.
    // - Convert the canvas to a data URL.
    // - Create a link element.
    // - Set the link element download attribute to the file name.
    // - Set the link element href attribute to the data URL.
    // - Click the link element.
    processedImageElement = document.getElementById("processedImageElement");
    const dataURL = processedImageElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
}

// Handle the clear button click event.
function handleClearButtonClick(e) {

    // Clear the file input.
    fileInput.value = "";

    // Clear the image source.
    updateImageSource("");
}

// Handle the image selection event.
function handleImageSelection(e) {

    const selectedFile = e.target.files[0];

    // Check if a file was selected and if the file is an image
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
        updateImageSource("");
        alert("Please select a valid image file.");
        return;
    }

    // Create a URL for the selected image and update the image source.
    const imageURL = URL.createObjectURL(selectedFile);
    console.log(imageURL);
    updateImageSource(imageURL);
}

function updateImageSource(source) {

    if (!imageElement || !processedImageElement) { return; }

    imageContainer.style.display = (source == "") ? "none" : "flex";

    imageElement.src = source;
    processedImageElement.src = source;
}
