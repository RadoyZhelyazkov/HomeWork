var images = document.querySelectorAll('img');
var banner = document.getElementById('banner');

for (let i = 0; i < images.length; i++) {
    images[i] = document.addEventListener('click', function(e) {
        img = banner.querySelector('img');
        img.src = e.target.currentSrc;
    });
}

function onInit() {
    img = document.createElement('img');
    img.src = images[0].currentSrc;
    banner.appendChild(img); 
}



// function imageChange() {
//     console.log(this.images.cl);
// }

onInit();

console.log(images);
