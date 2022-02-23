console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded',() => {
    dogPictures()
    dogBreeds()
    
})

function dogPictures() {
    fetch (imgUrl)
    .then (response => response.json())
    .then (json => json.message.forEach(im => img(im)));
}
//put pictures on dom
function img(im){
    let dogImage = document.getElementById('dog-image-container');
    let newImg = document.createElement('img');
    newImg.src = im;
    dogImage.append(newImg);
}

function dogBreeds(){
    fetch (breedUrl)
    .then (response => response.json())
    .then (json => Object.keys(json.message).forEach(breed => dogBreed(breed)));
}

//list dogs
function dogBreed(breed){
    let breedList = document.getElementById('dog-breeds');
    let breeds = document.createElement('li');
    breeds.innerText = breed;
    breedList.append(breeds);
    colorChange()
}

//color change
function colorChange(){
    const listElements = document.querySelectorAll('li')
    listElements.forEach(el => {
        el.addEventListener('click', () => {
            el.style.color = 'green'}) 
    })
}

//filter
const dropDownSelect = document.querySelector("#breed-dropdown")
dropDownSelect.addEventListener('change', (e) => {
        dogBreeds()
        .then(response =>{
            let dogArray = Object.keys(response.message)
            let filtered = dogArray.filter(breed => {
                return breed.startsWith(e.target.value)
            })
            filtered.forEach(dogBreed)
        })
    })

