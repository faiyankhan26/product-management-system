from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import database_models
from models import ProductCreate

app = FastAPI(title="Product Management API")

# ==========================
# CORS Configuration
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
database_models.Base.metadata.create_all(bind=engine)


# ==========================
# Database Dependency
# ==========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================
# Home Route
# ==========================
@app.get("/")
def home():
    return {"message": "Product Management API is Running 🚀"}


# ==========================
# Initialize Default Products
# ==========================
def init_db():
    db = SessionLocal()

    if db.query(database_models.Product).count() == 0:

        products = [
            database_models.Product(
                name="Phone",
                description="Samsung Galaxy",
                price=69999,
                quantity=20
            ),
            database_models.Product(
                name="Laptop",
                description="Dell Inspiron",
                price=65000,
                quantity=10
            ),
            database_models.Product(
                name="Pen",
                description="Blue Ball Pen",
                price=10,
                quantity=100
            ),
            database_models.Product(
                name="Table",
                description="Wooden Table",
                price=4500,
                quantity=5
            )
        ]

        db.add_all(products)
        db.commit()

    db.close()


init_db()


# ==========================
# GET ALL PRODUCTS
# ==========================
@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(database_models.Product).all()


# ==========================
# GET PRODUCT BY ID
# ==========================
@app.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):

    product = (
        db.query(database_models.Product)
        .filter(database_models.Product.id == product_id)
        .first()
    )

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


# ==========================
# ADD PRODUCT
# ==========================
@app.post("/products")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):

    new_product = database_models.Product(
        name=product.name,
        description=product.description,
        price=product.price,
        quantity=product.quantity
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# ==========================
# UPDATE PRODUCT
# ==========================
@app.put("/products/{product_id}")
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    db_product = (
        db.query(database_models.Product)
        .filter(database_models.Product.id == product_id)
        .first()
    )

    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.name = product.name
    db_product.description = product.description
    db_product.price = product.price
    db_product.quantity = product.quantity

    db.commit()
    db.refresh(db_product)

    return db_product


# ==========================
# DELETE PRODUCT
# ==========================
@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):

    product = (
        db.query(database_models.Product)
        .filter(database_models.Product.id == product_id)
        .first()
    )

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}