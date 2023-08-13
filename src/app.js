import express from "express";

import ProductManager from "./productManager.js";

const app = express();

const PORT = 4000;

const manager = new ProductManager("./src/products.json");

app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    
    if (limit) {
        const limitProducts = products.slice(0, parseInt(limit));
        res.json(limitProducts);
    } else {
        res.json(products);
    }
});

app.get("/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await manager.getProductById(pid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ mensaje : "Producto no encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
});

