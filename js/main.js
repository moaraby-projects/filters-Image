//select the filters
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

//select upload button
let upload = document.getElementById('upload');


//select download button
let download = document.getElementById('download');
//select reset button
let reset = document.querySelector('span');


//select img button
let img = document.getElementById('img');
//select img box
let imgBox = document.querySelector('.img-box');
//select canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



//function reset value
function resetValue () {
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100'
    sepia.value = '0';
    grayscale.value = '0'
    blur.value = '0';
    hueRotate.value = '0';
}


//window onload
window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

//change upload value
upload.onchange = function () {
    resetValue()
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = function () {
        img.src = file.result;
    }
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none';
    }
}

//select and click on filters
let filters = document.querySelectorAll('ul li input');

filters.forEach(filter => {
    filter.addEventListener('input', function () {

        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)

        `
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    })
})

reset.onclick = function () {
    resetValue();
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

download.onclick = function (){
    download.href = canvas.toDataURL();
}