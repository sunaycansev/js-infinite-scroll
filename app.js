const imgContainer = document.querySelector(".image-container");
//* API Variables
// we shouldn't store API Keys publicly like this, but this is an exception because it is free and the data are anyways available.
const count = 15;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const query = "cat";
const apiKEY = "J4OTpWXiGy0CsoyONXttBY3cPKOUGMJRx5zjm3VJOsk";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}&query=${query}&orientation=squarish;`;

//* get photos from usplash api
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}
function imgLoaded() {
  imagesLoaded++;
  if (imagesLoaded == totalImages) {
    ready = true;
  }
}

//*helper function to set attributes  on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//* display photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photos array
  photosArray.forEach((photo) => {
    // create <a> to link in photos array
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create img for photos
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener, check when each is finished loading
    img.addEventListener("load", imgLoaded);
    // put img inside a ,then put both inside imagecontainer element
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}
// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// onload
getPhotos();
