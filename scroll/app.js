const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplashed API
const count = 30;
const apiKey = 'GyXvgV6WKdR8oqrXWSBCrfOOyCs7nPg4_xkfXUghC6Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to help set attribute on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// check if image was loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log(`Ready = ${ready}`);
    }
}


// Create Elements for links and photos and add to dom.
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(`total images = ${totalImages}`)
    // Run function for each photo in the Array
    photosArray.forEach((photo) => {
        // Creating <a> element to link to unsplashed
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Creating  <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener to check the when photos have loaded
        img.addEventListener('load', imageLoaded);
        // Put <img> inside the <a>, then put both inside the imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplashed API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error){
        // Catch Error Here
        console.log(error)
    }
}

// Check to see if scroll is near the bottom and add more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//Onload 
getPhotos();