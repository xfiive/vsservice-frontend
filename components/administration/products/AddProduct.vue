<template>
  <div class="add-product-page">
    <h1>Add New Product</h1>

    <form
        v-if="!productAdded"
        @submit.prevent="validateForm"
        @paste="handlePaste"
        @dragover.prevent
        @drop.prevent="handleDrop"
    >
      <div class="form-group">
        <label for="name">Product Name</label>
        <input
            type="text"
            id="name"
            v-model="product.name"
            required
            @input="validateName"
        />
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>

      <div class="form-group">
        <label for="price">Product Price</label>
        <input
            type="text"
            id="price"
            v-model="product.price"
            @input="validatePrice"
            required
        />
        <span v-if="priceError" class="error">{{ priceError }}</span>
      </div>

      <div class="form-group">
        <label for="image">Product Image (Base64)</label>
        <div v-if="!imageBase64" class="dropzone">
          <input type="file" @change="onFileChange"/>
          <p>Drag and drop an image, paste it, or select a file.</p>
        </div>
        <div v-else>
          <img :src="imageBase64" alt="Product Image" class="product-image"/>
          <button @click="removeImage">Remove Image</button>
        </div>
      </div>

      <div class="properties">
        <h3>Properties</h3>
        <div v-for="(property, index) in properties" :key="index" class="property-group">
          <input
              type="text"
              v-model="property.name"
              placeholder="Property Name"
              required
              @input="validateProperty(index)"
          />
          <span> : </span>
          <input
              type="text"
              v-model="property.description"
              placeholder="Property Description"
              required
              @input="validateProperty(index)"
          />
          <button @click.prevent="removeProperty(index)">Remove</button>
          <span v-if="propertyErrors[index]" class="error">{{ propertyErrors[index] }}</span>
        </div>
        <button @click.prevent="addProperty">Add Property</button>
      </div>

      <button type="submit">Add Product</button>
      <span v-if="formError" class="error">{{ formError }}</span>
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
        <button @click="redirectToProducts">Go to Products List</button>
      </div>
    </div>

  </div>
</template>

<script>
import Pica from 'pica';

export default {
  layout: 'admin',
  data() {
    return {
      product: {
        name: '',
        price: '',
        imageBase64: '',
      },
      properties: [
        {name: '', description: ''},
      ],
      productAdded: false,
      addedProduct: null,
      imageBase64: '',
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      maxWidth: 1280,
      maxHeight: 1024,
      nameError: null,
      priceError: null,
      propertyErrors: [],
      formError: null,
    };
  },
  methods: {
    validateName() {
      if (!this.product.name) {
        this.nameError = 'Product name is required.';
      } else {
        this.nameError = null;
      }
    },
    validatePrice() {
      const price = this.product.price;
      if (price === '') {
        this.priceError = 'Price is required.';
      } else if (!/^\d*\.?\d*$/.test(price)) {
        this.priceError = 'Price must be a positive number.';
      } else if (parseFloat(price) < 0) {
        this.priceError = 'Price cannot be negative.';
      } else {
        this.priceError = null;
      }
    },
    validateProperty(index) {
      const property = this.properties[index];
      if (!property.name || !property.description) {
        this.propertyErrors[index] = 'Both name and description are required.';
      } else {
        this.$set(this.propertyErrors, index, null);
      }
    },
    validateForm() {
      this.validateName();
      this.validatePrice();
      this.properties.forEach((_, index) => this.validateProperty(index));

      if (this.nameError || this.priceError || this.propertyErrors.some(error => error !== null)) {
        this.formError = 'Please fix the errors in the form before submitting.';
        return;
      }

      this.formError = null;
      this.submitProduct();
    },
    async submitProduct() {
      try {
        const propertiesList = this.properties.map(
            (prop) => `${prop.name} : ${prop.description}`
        );

        const product = {
          ...this.product,
          properties: propertiesList,
          imageBase64: this.imageBase64,
        };

        console.log('Properties list created:', propertiesList);

        const response = await this.$api.post('/products', product);

        console.log('Product added successfully:', response.data);  // Добавляем вывод всех данных продукта

        this.addedProduct = response.data;
        this.productAdded = true;

      } catch (error) {
        console.error('Failed to add product:', error.message);
      }
    },
    redirectToProducts() {
      this.$router.push('/admin/products');
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!this.supportedFormats.includes(file.type)) {
        alert('Please select a valid image file (jpg, png, gif, bmp, webp).');
        e.target.value = null;
        return;
      }
      this.resizeImage(file);
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (!this.supportedFormats.includes(file.type)) {
            alert('Please paste a valid image file (jpg, png, gif, bmp, webp).');
            return;
          }
          this.resizeImage(file);
        }
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        if (!this.supportedFormats.includes(file.type)) {
          alert('Please drop a valid image file (jpg, png, gif, bmp, webp).');
          return;
        }
        this.resizeImage(file);
      } else {
        alert('Please drop a valid image file (jpg, png, gif, bmp, webp).');
      }
    },
    resizeImage(file) {
      const pica = Pica();

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const targetWidth = 1280;
          const targetHeight = 1024;

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          pica.resize(img, canvas)
              .then(result => pica.toBlob(result, 'image/png', 1.0))
              .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  this.imageBase64 = reader.result;
                };
                reader.readAsDataURL(blob);
              })
              .catch(error => {
                console.error("Error resizing image:", error);
              });
        };
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.imageBase64 = '';
    },
    resetForm() {
      this.product = {
        name: '',
        price: '',
        imageBase64: '',
      };
      this.properties = [{name: '', description: ''}];
      this.productAdded = false;
      this.addedProduct = null;
      this.imageBase64 = '';
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

.dropzone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
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

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
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

.product-image {
  max-width: 600px;
  max-height: 600px;
  width: auto;
  height: auto;
  object-fit: contain;
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
