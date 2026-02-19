import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import './ProductList.css';

const products = [
  { id: 1, name: 'Laptop', price: 55000, category: 'electronics', image: '💻', description: 'High-performance laptop for work and gaming' },
  { id: 2, name: 'Mobile', price: 25000, category: 'electronics', image: '📱', description: 'Latest smartphone with advanced features' },
  { id: 3, name: 'Headphones', price: 2000, category: 'accessories', image: '🎧', description: 'Premium wireless headphones with noise cancellation' },
  { id: 4, name: 'Smart Watch', price: 15000, category: 'electronics', image: '⌚', description: 'Fitness tracking smartwatch with health monitoring' },
  { id: 5, name: 'Wireless Mouse', price: 1500, category: 'accessories', image: '🖱️', description: 'Ergonomic wireless mouse for productivity' },
  { id: 6, name: 'Keyboard', price: 3500, category: 'accessories', image: '⌨️', description: 'Mechanical keyboard with RGB lighting' },
];

function ProductList({ onAddToCart, onUpdateQuantity, onRemoveFromCart, cartItems, searchQuery, filterCategory }) {
  const [hoveredId, setHoveredId] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filterCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="product-list-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredProducts.length === 0 ? (
        <motion.div
          className="no-products"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
                cartItem={cartItem}
                isHovered={hoveredId === product.id}
                onHover={() => setHoveredId(product.id)}
                onLeave={() => setHoveredId(null)}
                index={index}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default ProductList;
