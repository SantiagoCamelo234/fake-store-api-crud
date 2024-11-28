
/* API */

const API = "https://api.escuelajs.co/api/v1";

/* DOM */
const postAPI = document.getElementById('post');
const updateAPI = document.getElementById('update');
const deleteAPI = document.getElementById('delete');
const postContainer = document.querySelector('.post-container');
const updateIdContainer = document.querySelector('.update-id-container');
const updateContainer = document.querySelector(".update-container");
const deleteContainer = document.querySelector('.delete-container');
const postForm = document.getElementById('post-form');
const updateForm = document.querySelector('.update-form');
const updateIdForm = document.getElementById('update-id-form');
const deleteForm = document.getElementById('delete-form');

postAPI.addEventListener('click', (e) => {
    e.preventDefault();

    updateIdContainer.style.display = "none";
    deleteContainer.style.display = "none";
    updateForm.style.display = "none";

    if (postContainer.style.display === 'block') {
        postContainer.style.display = 'none';
    } else {
    postContainer.style.display = 'block';
    }

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        if(title && price && description && category) {
            postData(title, price, description, category);
        }
        else{
            console.error('Puta madre abuela')
        }
    })

})


updateAPI.addEventListener('click', (e) => {

    e.preventDefault();

    postContainer.style.display = "none"; 
    deleteContainer.style.display = "none";
    if (updateIdContainer.style.display === 'block') {
        updateIdContainer.style.display = 'none';
    } else {
        updateIdContainer.style.display = 'block';
    }

     updateIdForm.addEventListener("submit", async (e) => {
       e.preventDefault();
       const id = document.getElementById("id").value;
       try {
         const data = await getData(id);
         const title = document.getElementById("update-title");
         const price = document.getElementById("update-price");
         const description = document.getElementById("update-description");
         const category = document.getElementById("update-category");
         title.value = data.title;
         price.value = data.price;
         description.value = data.description;
         category.value = data.categoryId;
         updateContainer.style.display = "block";
         updateIdContainer.style.display = "none";
         updateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById('update-title').value;
            const price = document.getElementById('update-price').value;
            const description = document.getElementById('update-description').value;
            const category = document.getElementById('update-category').value;

            updateData(id, title, price, description, category);

         })

       } catch (error) {
         console.error("Error fetching data:", error);
       }
     });

})


deleteAPI.addEventListener('click', (e) => {
    e.preventDefault();

    updateIdContainer.style.display = "none";
    postContainer.style.display = "none";
    updateForm.style.display = "none";
    
    if (deleteContainer.style.display === 'block') {
        deleteContainer.style.display = 'none';
    } else {
        deleteContainer.style.display = 'block';
    }

    deleteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("delete-id").value;
        if(id) {
          console.log("ID: ", id);
          deleteData(id);}
        else{
            console.error('Puta madre abuela')
        }
    })
})

/* Fetch functions */
function postData(title, price, description, category){
    fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        categoryId: category,
        images: ["https://placeimg.com/640/480/any"],
      })
    })

    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert('Producto creado con éxito')
    })

    .catch((error) => {
      console.error("Error:", error);
      alert('Error al crear el producto')
    });
}

function deleteData(id){
    fetch(`${API}/products/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Producto eliminado con éxito')
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al eliminar el producto')
    })
}



async function getData(id) {
  const response = await fetch(`${API}/products/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

function updateData(id, title, price, description, category){
    fetch(`${API}/products/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        categoryId: category,
        images: ["https://placeimg.com/640/480/any"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert('Producto actualizado con éxito')
      })
      .catch((error) => {
        console.error("Error:", error);
        alert('Error al actualizar el producto')
      });
}