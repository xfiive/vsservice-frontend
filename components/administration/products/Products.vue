<template>
  <div class="products-page">
    <h1>Manage Products</h1>

    <div class="actions">
      <button @click="addProduct">Add New Product</button>

      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for products..."
          @input="searchProducts"
        />
        <button @click="searchProducts">Search</button>
      </div>
    </div>

    <div class="category-list">
      <h2>Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category.id" @click="selectCategory(category.id)">
          {{ category.name }}
        </li>
      </ul>
    </div>

    <div v-if="filteredProducts.length">
      <ul class="product-list">
        <li v-for="product in filteredProducts" :key="product.id">
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No products found</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      categories: [],
      selectedCategoryId: '',
      products: [],
      filteredProducts: [],
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
    async fetchProductsByCategory(categoryId) {
      try {
        const response = await this.$api.get(`/products/search/category?categoryId=${categoryId}`);
        this.products = response.data;
        this.filteredProducts = this.products;
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    },
    addProduct() {
      this.$router.push('/admin/products/add-product');
    },
    searchProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
      this.fetchProductsByCategory(categoryId);
    },
  },
  async mounted() {
    await this.fetchCategories();
  },
};
</script>

<style scoped>
.products-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  width: 200px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.category-list {
  margin-bottom: 20px;
}

.category-list ul {
  list-style: none;
  padding: 0;
}

.category-list li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.category-list li:hover {
  background-color: #f1f1f1;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.product-list li:hover {
  background-color: #f1f1f1;
}
</style>
