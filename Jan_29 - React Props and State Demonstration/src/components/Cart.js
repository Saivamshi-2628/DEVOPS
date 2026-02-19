import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Cart.css';

function Cart({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, totalItems, totalPrice }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h2>
                <span className="cart-icon">🛒</span>
                Shopping Cart
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </h2>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="cart-content">
              {cartItems.length === 0 ? (
                <motion.div
                  className="empty-cart"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="empty-cart-icon">🛍️</div>
                  <p>Your cart is empty</p>
                  <span>Add some products to get started!</span>
                </motion.div>
              ) : (
                <motion.div
                  className="cart-items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="cart-item-image">
                        <div className="item-image-placeholder">{item.name.charAt(0)}</div>
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                        <div className="cart-item-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {cartItems.length > 0 && (
              <motion.div
                className="cart-footer"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="cart-total">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Cart;
