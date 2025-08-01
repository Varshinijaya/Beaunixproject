
let isEditing = false;
let editingProductId = null;




    function openModal(product = null) {
  const modal = document.getElementById("addProductModal");
  document.getElementById("add-product-form").reset();
  document.getElementById("modal-title").textContent = product ? "Edit Product" : "Add Product";
  document.getElementById("save-btn").textContent = product ? "Save" : "Add";

  isEditing = !!product;
  editingProductId = product ? product._id : null;

  if (product) {
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock_quantity;
 
 if (product && product.image) {
  const imagePreview = document.getElementById("productImagePreview");
  if (imagePreview) {
    imagePreview.src = `/img/${product.image}`;
  }
}

 
  }

  modal.style.display = "block";
}

    function closeModal() {
  document.getElementById("addProductModal").style.display = "none";
  isEditing = false;
  editingProductId = null;
}




// js/productAdmin.js
const API_URL = "http://localhost:5000/api/products";
const productTableBody = document.getElementById("product-table-body");
const pagination = document.getElementById("pagination");
const addForm = document.getElementById("add-product-form");
const modal = document.querySelector(".modal");
const openModalBtn = document.getElementById("add-btn");
const closeModalBtn = document.querySelector(".close-btn");

let currentPage = 1;
let totalPages = 1;





// CREATE
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = addForm.name.value.trim();
  const description = addForm.description.value.trim();
  const price = parseFloat(addForm.price.value);
  const stock = parseInt(addForm.stock.value, 10);
  const imageInput = addForm.image;
  const imageFile = imageInput.files[0];
  let imagePath = "";

  if (!name || price <= 0 || stock < 0) {
    alert("Invalid product data");
    return;
  }

  if (imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        alert("Image upload failed: " + errorData.message);
        return;
      }

      const uploadData = await uploadRes.json();
      imagePath = uploadData.imagePath;
    } catch (err) {
      alert("Failed to upload image");
      return;
    }
  }

  const productData = {
    name,
    description,
    price,
    stock_quantity: stock,
  };

  if (imagePath) productData.image = imagePath;

  try {
    if (isEditing) {
      // UPDATE
      const res = await fetch(`${API_URL}/${editingProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Update failed");
    } else {
      // CREATE
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Creation failed");
    }

    closeModal();
    loadProducts(currentPage);
  } catch (err) {
    alert("Error: " + err.message);
  }
});



// READ & Render
async function loadProducts(page = 1) {
  try {
    const res = await fetch(`${API_URL}`);
    const { products } = await res.json(); // ✅ Remove pagination destructuring

    let filteredProducts = [...products];

    // Filter logic
    if (filterQuery) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(filterQuery) ||
        String(p.price).includes(filterQuery) ||
        String(p.stock_quantity).includes(filterQuery)
      );
    }

    // Sort logic
    if (sortBy === "name") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "stock") {
      filteredProducts.sort((a, b) => a.stock_quantity - b.stock_quantity);
    }

    // Render product table
    productTableBody.innerHTML = "";
    filteredProducts.forEach((p, index) => {
      productTableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${p.name}</td>
          <td>₹${p.price}</td>
          <td>${p.stock_quantity}</td>
          <td>
            <button class="action-btn edit" onclick="editProduct('${p._id}')">Edit</button>
            <button class="action-btn delete" onclick="deleteProduct('${p._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

    totalPages = 1;
  } catch (err) {
    console.error("Failed to fetch products");
  }
}



// DELETE
async function deleteProduct(id) {
  if (!confirm("Are you sure to delete?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadProducts(currentPage);
  } catch (err) {
    alert("Failed to delete");
  }
}
//EDIT
async function editProduct(id) {
  try {
    console.log("Fetching product with ID:", id);
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      const errData = await res.json();
      console.error("Server error:", errData);
      alert("Failed to load product: " + errData.message);
      return;
    }

    const product = await res.json();
    console.log("Product received:", product);
    openModal(product);
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Failed to load product (Network error)");
  }
}


// PAGINATION
function renderPagination() {
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      loadProducts(currentPage);
    };
    pagination.appendChild(btn);
  }
}

loadProducts(currentPage);


// Filter & Sort State
let filterQuery = "";
let sortBy = "";

// FILTER: Search products
document.querySelector(".search-bar input").addEventListener("input", (e) => {
  filterQuery = e.target.value.trim().toLowerCase();
  loadProducts(currentPage);
});

// SORT: Sort dropdown
document.querySelector(".sort-dropdown").addEventListener("change", (e) => {
  sortBy = e.target.value;
  loadProducts(currentPage);
});


// Close modal on ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Close modal if background clicked
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});



 function openSidebar() {
      document.getElementById("sidebar").style.right = "0";
      document.getElementById("overlayh").style.display = "block";
    }

    function closeSidebar() {
      document.getElementById("sidebar").style.right = "-250px";
      document.getElementById("overlayh").style.display = "none";
    }