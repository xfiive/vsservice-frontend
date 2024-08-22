<template>
  <div class="add-category-page">
    <h1>Add New Category</h1>

    <form
      v-if="!categoryAdded"
      @submit.prevent="validateForm"
      @paste="handlePaste"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div class="form-group">
        <label for="name">Category Name</label>
        <input
          type="text"
          id="name"
          v-model="category.name"
          required
          @input="validateName"
        />
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>

      <div class="form-group">
        <label for="parentId">Select Parent Category</label>
        <select v-model="category.parentId">
          <option value="">No Parent (Root Category)</option>
          <option v-for="parentCategory in categories" :value="parentCategory.id" :key="parentCategory.id">
            {{ parentCategory.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">Category Image (Base64)</label>
        <div v-if="!imageBase64" class="dropzone">
          <input type="file" @change="onFileChange"/>
          <p>Drag and drop an image, paste it, or select a file.</p>
        </div>
        <div v-else>
          <img :src="imageBase64" alt="Category Image" class="category-image"/>
          <button @click="removeImage">Remove Image</button>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Category Description</label>
        <textarea
          id="description"
          v-model="category.description"
          placeholder="Enter category description"
        />
      </div>

      <button type="submit">Add Category</button>
      <span v-if="formError" class="error">{{ formError }}</span>
    </form>

    <div v-else class="category-details">
      <h2>Category Added Successfully!</h2>
      <div class="category-card">
        <img
          :src="addedCategory.imageBase64.startsWith('data:image/') ? addedCategory.imageBase64 : `data:image/png;base64,${addedCategory.imageBase64}`"
          alt="Category Image"/>
        <h3>{{ addedCategory.name }}</h3>
        <p><strong>ID:</strong> {{ addedCategory.id }}</p>
        <p>{{ addedCategory.description }}</p>
        <button @click="resetForm">Add Another Category</button>
        <button @click="redirectToCategories">Go to Categories List</button>
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
      category: {
        name: '',
        parentId: '',
        imageBase64: '',
        description: '',
      },
      categories: [], // Данные существующих категорий
      categoryAdded: false,
      addedCategory: null,
      imageBase64: '',
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      maxWidth: 1280,
      maxHeight: 1024,
      nameError: null,
      formError: null,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await this.$api.get('/categories/search/all');
        this.categories = response.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    },
    validateName() {
      if (!this.category.name) {
        this.nameError = 'Category name is required.';
      } else {
        this.nameError = null;
      }
    },
    validateForm() {
      this.validateName();

      if (this.nameError) {
        this.formError = 'Please fix the errors in the form before submitting.';
        return;
      }

      this.formError = null;
      this.submitCategory();
    },
    async submitCategory() {
      try {
        const category = {
          ...this.category,
          imageBase64: this.imageBase64,
        };

        const response = await this.$api.post('/categories', category);

        this.addedCategory = response.data;
        this.categoryAdded = true;

      } catch (error) {
        console.error('Failed to add category:', error.message);
      }
    },
    redirectToCategories() {
      this.$router.push('/admin/categories');
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
      this.category = {
        name: '',
        parentId: '',
        imageBase64: '',
        description: '',
      };
      this.categoryAdded = false;
      this.addedCategory = null;
      this.imageBase64 = '';
    },
  },
  async mounted() {
    await this.fetchCategories(); // Загружаем категории при монтировании компонента
  }
};
</script>

<style scoped>
.add-category-page {
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
.form-group textarea,
.form-group select {
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

.category-image {
  max-width: 600px;
  max-height: 600px;
  width: auto;
  height: auto;
  object-fit: contain;
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

.category-details {
  margin-top: 20px;
}

.category-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.category-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.category-card h3 {
  margin-bottom: 10px;
  font-size: 24px;
}

.category-card p {
  margin-bottom: 20px;
  font-size: 18px;
}

.category-card button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.category-card button:hover {
  background-color: #0056b3;
}
</style>
