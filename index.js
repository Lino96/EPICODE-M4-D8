//token per autorizzazione accesso: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q'//

const row = document.querySelector("#product-row")


const description = document.querySelector("#description")
const brand = document.querySelector("#brand")
const image = document.querySelector("#image")
const price = document.querySelector("#price")

let product = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    image: image.value,
    price: price.value,
}

async function getProduct() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",{
        headers:{
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q"
        }
    })
    const data = await response.json()
    console.log(data)
    return data
}

async function addProduct(event) {
    event.preventDefault()
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",{
        
        method: "POST",
        body: JSON.stringify(product),
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q"
        }
    })


    if(response.ok) {
        const data = await getProduct()
        displayProducts(data)
        for (const field of [name, description, brand, image, price]) {
            field.value = ""
        }
    }
}



function displayProducts(data) {
row.innerHTML = data.map(({ name, description, brand, image, price }) => `
    <div class="col-2">
        ${name}
    </div>
    <div class="col-3">
        ${description}
    </div>
    <div class="col-2">
        ${brand}
    </div>        
    <div class="col-3">
        <img src="${image}">
    </div>  
    <div class="col-2">
       EUR ${price}
    </div>
    `).join("")
}


window.onload = async function () {
    try {
        const productData = await getProduct()
        displayProducts(productData)
    } catch (error) {
        console.log(error)
    }
}


