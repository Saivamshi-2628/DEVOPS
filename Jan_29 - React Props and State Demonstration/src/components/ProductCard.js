import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onUpdateQuantity, onRemoveFromCart, cartItem, isHovered, onHover, onLeave, index }) {
  const [isAdding, setIsAdding] = useState(false);
  const isInCart = cartItem !== undefined;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleIncrement = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    } else {
      onRemoveFromCart(product.id);
    }
  };

  const handleRemove = () => {
    onRemoveFromCart(product.id);
  };

  return (
    <motion.div
      className="product-card"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="product-card-inner"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="product-image-wrapper">
          <motion.div
            className="product-image-container"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="product-image">{product.image}</div>
            <motion.div
              className="product-badge"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
            >
              NEW
            </motion.div>
          </motion.div>
        </div>

        <div className="product-content">
          <div className="product-header">
            <motion.h3
              className="product-name"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.2 }}
            >
              {product.name}
            </motion.h3>
            <motion.p
              className="product-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.3 }}
            >
              {product.description}
            </motion.p>
          </div>

          <div className="product-footer">
            <motion.div
              className="price-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.4 }}
            >
              <span className="price">₹{product.price.toLocaleString()}</span>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isInCart ? (
                <motion.button
                  key="add-button"
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isAdding ? (
                    <motion.span
                      className="check-icon"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <>
                      <span>Add to Cart</span>
                      <motion.span
                        className="cart-plus-icon"
                        animate={isHovered ? { rotate: [0, 15, -15, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        +
                      </motion.span>
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.div
                  key="cart-controls"
                  className="cart-controls"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="cart-control-btn decrement"
                    onClick={handleDecrement}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                    whileTap={{ scale: 0.95 }}
                    disabled={quantity === 1}
                  >
                    <span>−</span>
                  </motion.button>

                  <motion.div
                    className="quantity-display"
                    key={quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {quantity}
                  </motion.div>

                  <motion.button
                    className="cart-control-btn increment"
                    onClick={handleIncrement}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>+</span>
                  </motion.button>

                  <motion.button
                    className="cart-control-btn remove"
                    onClick={handleRemove}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 59, 48, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    title="Remove from cart"
                  >
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="card-shine"
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;
