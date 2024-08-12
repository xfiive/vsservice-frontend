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
      products: [
        {id: 1, name: 'Product 1'},
        {id: 2, name: 'Product 2'},
        {id: 3, name: 'Product 3'},
      ],
      filteredProducts: [],
    };
  },
  methods: {
    addProduct() {
      this.$router.push('/admin/products/add-product');
    },
    searchProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.filteredProducts = this.products;
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
