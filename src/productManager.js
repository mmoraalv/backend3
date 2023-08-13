import { promises as fs } from 'fs';

export default class ProductManager{
  constructor(filePath) {
    this.path = filePath;
  }

  generateId = async () => {
    const products = await this.getProducts();
    const counter = products.length;
    if (counter === 0) {
      return 1;
    } else {
      return products[counter - 1].id + 1;
    }
  };

  getProducts = async () => {
    const data = await fs.readFile(this.path, 'utf8');

    if (data) {
      return JSON.parse(data);
    } else {
      console.error("Error al leer el archivo de productos.");
      return [];
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    return products.find(product => product.id === id) || null;
  };

  updateProduct = async (id, updatedFields) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    await fs.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const products = await this.getProducts();
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO");
      return;
    } else {
      const codigorepetido = products.find(
        (elemento) => elemento.code === code
      );
      if (codigorepetido) {
        console.error("EL CODIGO DEL PRODUCTO QUE DESEA AGREGAR ES REPETIDO");
        return;
      } else {
        const id = await this.generateId();
        const productnew = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        products.push(productnew);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      }
    }
  };
}

