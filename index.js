//token per autorizzazione accesso: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q'//

const row = document.querySelector("#product-row")

const name = document.querySelector("#name")
const description = document.querySelector("#description")
const brand = document.querySelector("#brand")
const imageUrl = document.querySelector("#image-url")
const price = document.querySelector("#price")


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
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {

        method: "POST",
        body: JSON.stringify(product),
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q"
        },

        body: JSON.stringify({
            name: name.value,
            description: description.value,
            brand: brand.value,
            imageUrl: imageUrl.value,
            price: price.value,

        })
    })


    if(response.ok) {
        const data = await getProduct()
        displayProducts(data)
        for (const field of [name, description, brand, imageUrl, price]) {
            field.value = ""
        }
    } else {
        console.error("Cannot send")
    }
    displayProducts(await getProduct())
}


function displayProducts(data) {
row.innerHTML = data.map(({ name, description, brand, imageUrl, price }) => `
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
        <img src="${imageUrl}">
    </div>  
    <div class="col-2">
       EUR ${price}
    </div>
    <div class="col-1 d-flex align-items-center justify-content-between">
        <button class="btn btn-warning px-2" onclick="handleEdit('${_id}')">
            <i class="bi bi-pen"></i>
        </button>
        <button class="btn px-2" onclick="handleDelete('${_id}')"><i class="bi bi-trash3"></i></button>
    </div>
    `).join("")
}

async function handleEdit(id) {
    const product = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id)
    const productJson = await product.json()

    const { name, description, brand, imageUrl, price } = productJson

    const productRow = document.querySelector(`#_${id}`)

    productRow.innerHTML =`
    <form class="row container" onsubmit="addProduct(event, '$(id)')">
    <div class="col-3 d-flex align-items-center">
      <label>Name</label>
      <input required id ="name" type="text" class="form-control" placeholder="eg Samsung Galaxy S10 Cellphone" value="$(name)">
    </div>
    <div class="col-3 d-flex align-items-center">
      <label>Description</label>
      <input required id ="description" type="text" class="form-control" placeholder="An invincible Cellphone" value="$(description)">
    </div>
    <div class="col-2 d-flex align-items-center">
      <label>Brand</label>
      <input required id="brand" type="text" class="form-control" placeholder="eg Samsung" value="$(brand)">
    </div>
    <div class="col-2 d-flex align-items-center">
      <label>Image</label>
      <input required id ="image-url" type="text" class="form-control" placeholder="Insert the URL here" value="$(imageUrl)">
    </div>
    <div class="col-1 d-flex align-items-center">
      <label>Price</label>
      <input required id ="price" type="text" class="form-control" placeholder="EUR" $(price)>
    </div>
    <div class="col-1 d-flex align-items-center">
        <button type="submit" class="btn btn-success">
            <i class="bi bi-check-circle"></i>
        </button>
        <button type="button" class="btn btn-danger" onclick="handleEditCancel()">
            <i class="bi bi-x-circle"></i>
        </button>
    </div>
  </form>
  `
}

async function handleEditSubmit(e, id) {
    e.preventDefault();
    const name = document.querySelector(`#_${id} [name='name']`);
    const description = document.querySelector(`#_${id} [name='description']`);
    const brand = document.querySelector(`#_${id} [name='brand']`);
    const imageUrl = document.querySelector(`#_${id} [name='imageUrl']`);
    const price = document.querySelector(`#_${id} [name='price']`);

    const updatedProduct = {
            name: name.value,
            description: description.value,
            brand: brand.value,
            imageUrl: imageUrl.value,
            price: price.value,
    }
    try {

        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q"
            },
            body: JSON.stringify(updatedProduct)
        })

        if (response.ok) {
            displayProducts(await getProduct())
        } else {
            alert("Something went wrong")
        }
    } catch {
        alert("You are offline.")
    }
    async function handleEditCancel() {
        displayProducts(await getProduct())
    }

    async function handleDelete(id) {

        const response = await fetch("https://striveschool-api.herokuapp.com/api/agenda/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q"
            }
        })

        if (response.ok) {
            alert("Event " + id + " deleted!")
            displayProducts(await getProduct())
        } else {
            alert("Can't delete this event")
        }
    }

    window.onload = async function () {
        try {
            const productData = await getProduct()
            displayProducts(productDataData)
        } catch (error) {
            console.log(error)
        }
    }
  
}