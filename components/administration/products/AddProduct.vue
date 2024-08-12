<template>
  <div class="add-product-page">
    <h1>Add New Product</h1>

    <form v-if="!productAdded" @submit.prevent="submitProduct">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input type="text" id="name" v-model="product.name" required/>
      </div>

      <div class="form-group">
        <label for="price">Product Price</label>
        <input type="number" id="price" v-model="product.price" required/>
      </div>

      <div class="form-group">
        <label for="image">Product Image (Base64)</label>
        <textarea id="image" v-model="product.imageBase64" required></textarea>
      </div>

      <div class="properties">
        <h3>Properties</h3>
        <div v-for="(property, index) in properties" :key="index" class="property-group">
          <input
            type="text"
            v-model="property.name"
            placeholder="Property Name"
            required
          />
          <span> : </span>
          <input
            type="text"
            v-model="property.description"
            placeholder="Property Description"
            required
          />
          <button @click.prevent="removeProperty(index)">Remove</button>
        </div>
        <button @click.prevent="addProperty">Add Property</button>
      </div>

      <button type="submit">Add Product</button>
    </form>

    <div v-else class="product-details">
      <h2>Product Added Successfully!</h2>
      <div class="product-card">
        <img :src="`data:image/png;base64,${addedProduct.imageBase64}`" alt="Product Image"/>
        <h3>{{ addedProduct.name }}</h3>
        <p>Price: BYN{{ addedProduct.price }}</p>
        <ul>
          <li v-for="(property, index) in addedProduct.properties" :key="index">
            {{ property }}
          </li>
        </ul>
        <button @click="resetForm">Add Another Product</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      product: {
        name: '',
        price: 0,
        imageBase64: '',
      },
      properties: [
        {name: '', description: ''},
      ],
      productAdded: false,
      addedProduct: null,
    };
  },
  methods: {
    addProperty() {
      this.properties.push({name: '', description: ''});
    },
    removeProperty(index) {
      this.properties.splice(index, 1);
    },
    async submitProduct() {
      try {
        const propertiesList = this.properties.map(
          (prop) => `${prop.name} : ${prop.description}`
        );

        const product = {
          ...this.product,
          properties: propertiesList,
        };

        console.log('Properties list created:', propertiesList);

        const response = await this.$api.post('/products', product);

        console.log('Product added successfully');

        this.addedProduct = response.data;
        this.productAdded = true;

      } catch (error) {
        console.error('Failed to add product:', error.message);
      }
    },
    resetForm() {
      this.product = {
        name: '',
        price: 0,
        imageBase64: '',
      };
      this.properties = [{name: '', description: ''}];
      this.productAdded = false;
      this.addedProduct = null;
    },
  },
};
</script>

<style scoped>
.add-product-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.properties {
  margin-bottom: 20px;
}

.property-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.property-group input {
  width: calc(50% - 10px);
}

.property-group button {
  background-color: #e74c3c;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}

.property-group button:hover {
  background-color: #c0392b;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.product-details {
  margin-top: 20px;
}

.product-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.product-card h3 {
  margin-bottom: 10px;
  font-size: 24px;
}

.product-card p {
  margin-bottom: 20px;
  font-size: 18px;
}

.product-card ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.product-card li {
  font-size: 16px;
  margin-bottom: 5px;
}

.product-card button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.product-card button:hover {
  background-color: #0056b3;
}
</style>
