# 📦 Product Management System

A full-stack Product Management System built using **FastAPI**, **PostgreSQL**, **SQLAlchemy**, **HTML**, **CSS**, and **JavaScript**. This project provides complete CRUD (Create, Read, Update, Delete) functionality through a RESTful API with a clean and responsive frontend.

---

## 🚀 Features

- ✅ Add Products
- ✅ View All Products
- ✅ Search Products
- ✅ Update Existing Products
- ✅ Delete Products
- ✅ RESTful API using FastAPI
- ✅ PostgreSQL Database Integration
- ✅ Responsive User Interface

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Psycopg

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Database
- PostgreSQL

### Version Control
- Git
- GitHub

---

## 📂 Project Structure

```
product-management-system/
│
├── frontEnd/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── database.py
├── database_models.py
├── models.py
├── main.py
├── requirements.txt
├── notesapp.sql
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/faiyankhan26/product-management-system.git
```

### 2. Move into the Project Directory

```bash
cd product-management-system
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Configure PostgreSQL

Create a PostgreSQL database named:

```
notesapp
```

Update the database connection in `database.py`:

```python
DATABASE_URL = "postgresql+psycopg://username:password@localhost:5432/notesapp"
```

---

## ▶️ Run the Application

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

Open the frontend:

```
frontEnd/index.html
```

using **Live Server** in VS Code.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Home |
| GET | `/products` | Get all products |
| GET | `/products/{id}` | Get product by ID |
| POST | `/products` | Add new product |
| PUT | `/products/{id}` | Update product |
| DELETE | `/products/{id}` | Delete product |

---

## 📸 Screenshots

Add screenshots of your project here.

Example:

```
screenshots/
├── home.png
├── add-product.png
├── edit-product.png
└── delete-product.png
```

---

## 🎯 Future Improvements

- User Authentication (JWT)
- Product Categories
- Image Upload
- Pagination
- Sorting & Filtering
- Dashboard Analytics
- Docker Support
- Deployment on Render & Vercel

---

## 👨‍💻 Author

**Faiyan Khan**

- GitHub: https://github.com/faiyankhan26

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub if you found it useful.