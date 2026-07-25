const API_URL = "http://127.0.0.1:8000/products";

const productTable = document.getElementById("productTable");
const productForm = document.getElementById("productForm");
const searchInput = document.getElementById("search");
const refreshBtn = document.getElementById("refreshBtn");

const editModal = document.getElementById("editModal");
const updateBtn = document.getElementById("updateBtn");
const closeBtn = document.getElementById("closeBtn");

// ===========================
// Load Products
// ===========================
async function loadProducts() {

    try {

        const response = await fetch(API_URL);

        const products = await response.json();

        displayProducts(products);

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to FastAPI.");

    }

}

// ===========================
// Display Products
// ===========================
function displayProducts(products) {

    productTable.innerHTML = "";

    products.forEach(product => {

        productTable.innerHTML += `

        <tr>

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.description}</td>

            <td>₹${product.price}</td>

            <td>${product.quantity}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="openEditModal(${product.id},'${product.name}','${product.description}',${product.price},${product.quantity})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===========================
// Add Product
// ===========================
productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value,

        description: document.getElementById("description").value,

        price: Number(document.getElementById("price").value),

        quantity: Number(document.getElementById("quantity").value)

    };

    await fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(product)

    });

    productForm.reset();

    loadProducts();

});

// ===========================
// Delete Product
// ===========================
async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    loadProducts();

}

// ===========================
// Open Edit Modal
// ===========================
function openEditModal(id, name, description, price, quantity) {

    editModal.style.display = "flex";

    document.getElementById("editId").value = id;

    document.getElementById("editName").value = name;

    document.getElementById("editDescription").value = description;

    document.getElementById("editPrice").value = price;

    document.getElementById("editQuantity").value = quantity;

}

// ===========================
// Close Modal
// ===========================
closeBtn.addEventListener("click", () => {

    editModal.style.display = "none";

});

// ===========================
// Update Product
// ===========================
updateBtn.addEventListener("click", async () => {

    const id = document.getElementById("editId").value;

    const product = {

        name: document.getElementById("editName").value,

        description: document.getElementById("editDescription").value,

        price: Number(document.getElementById("editPrice").value),

        quantity: Number(document.getElementById("editQuantity").value)

    };

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(product)

    });

    editModal.style.display = "none";

    loadProducts();

});

// ===========================
// Search Product
// ===========================
searchInput.addEventListener("keyup", async () => {

    const response = await fetch(API_URL);

    const products = await response.json();

    const keyword = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.description.toLowerCase().includes(keyword)

    );

    displayProducts(filteredProducts);

});

// ===========================
// Refresh
// ===========================
refreshBtn.addEventListener("click", loadProducts);

// ===========================
// Load on Startup
// ===========================
loadProducts();