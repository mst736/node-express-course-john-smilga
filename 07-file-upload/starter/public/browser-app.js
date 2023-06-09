const url = '/api/v1/products'
const fileFormDOM = document.querySelector('.file-form')

const nameInputDOM = document.querySelector('#name')
const priceInputDOM = document.querySelector('#price')
const imageInputDOM = document.querySelector('#image')

const containerDOM = document.querySelector('.container')
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })

imageInputDOM.addEventListener('change',async (e)=>{
 let imageFile = e.target.files[0];
 
 const formData = new FormData();
 formData.append('image',imageFile)
 try {
  const {data:{image:{src}}} = await axios.post(`${url}/uploads`,formData,{
   headers:{
    'Content-Type':'multipart/form-data'
   }
  })
  imageValue = src
 } catch (error) {
   imageValue = null
  console.log(error);
 }
})


fileFormDOM.addEventListener('submit',async (e)=>{
e.preventDefault()
let nameValue = nameInputDOM.value;
let priceValue = priceInputDOM.value;
try {
 
 const product = {name:nameValue,price:priceValue,image:imageValue}
 
  await axios.post(url,product);

  fetchProducts()

  nameInputDOM.value = 'computer'
  priceInputDOM.value = 150.99,
  imageInputDOM.value = null
  
} catch (error) {
 console.log(error);
}
})



async function fetchProducts () {
 try {
  const {data:{products}} = await axios.get(url);
  
  const productsDOM = products.map((product)=>{
return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`
  }).join('')
  containerDOM.innerHTML = productsDOM
 } catch (error) {
  console.log(error);
 }
 
}

fetchProducts()