//token per autorizzazione accesso: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q'//

const row = document.querySelector("#main-row")

async function getProduct() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",{
        headers:{
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2ZDgxNzBiZGRlZDAwMTg5YTc5NDAiLCJpYXQiOjE2OTcwNDQ1MDMsImV4cCI6MTY5ODI1NDEwM30._TP5YFCbRw75Bl49Ibe-6aEPI2t7TqVA3KPRtx9BP-Q"
        }
    })
    const data = await response.json()

    return data
}

function displayProducts(data) {
row.innerHTML = data,map(({ name, description, brand, image, price}) => `
    <div class="col-2">
        ${name}
    </div>
    <div class="col-2">
        ${description}
    </div>
    <div class="col-2">
        ${brand}
    </div>        
    <div class="col-2">
        ${image}
    </div>  
    <div class="col-2">
       EUR ${price}
    </div>
    `).join("")
}

Window.onload = async function () {
    try {
        const productData = await getProduct()
        displayProducts(productData)
    }
    catch(error) {
        console.log(error)
    }
}

