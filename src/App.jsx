import React, { useState } from "react"; import { motion } from "framer-motion"; import { ShoppingCart, Heart, User, X } from "lucide-react";

export default function NoraeStore() { const [cart, setCart] = useState([]); const [wishlist, setWishlist] = useState([]); const [showCart, setShowCart] = useState(false); const [showCheckout, setShowCheckout] = useState(false); const [showLogin, setShowLogin] = useState(false); const [user, setUser] = useState(null);

const products = [ { id: 1, name: "Luxury Satin Dress", price: 49, image: "https://images.unsplash.com/photo-1520975922327-9c2cdddb0b31?q=80&w=800", }, { id: 2, name: "Elegant Gold Necklace", price: 29, image: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?q=80&w=800", }, { id: 3, name: "Soft Beauty Handbag", price: 39, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800", }, ];

const addToCart = (product) => { setCart([...cart, product]); };

const toggleWishlist = (product) => { if (wishlist.find((item) => item.id === product.id)) { setWishlist(wishlist.filter((item) => item.id !== product.id)); } else { setWishlist([...wishlist, product]); } };

const total = cart.reduce((sum, item) => sum + item.price, 0);

return ( <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-100 to-rose-50"> {/* Header */} <div className="flex justify-between items-center p-6"> <h1 className="text-2xl font-semibold tracking-wide">♡NORAE♡</h1>

<div className="flex gap-4">
      <button
        onClick={() => setShowLogin(true)}
        className="p-2 rounded-full bg-white shadow"
      >
        <User size={18} />
      </button>

      <button
        onClick={() => setShowCart(true)}
        className="p-2 rounded-full bg-white shadow relative"
      >
        <ShoppingCart size={18} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  </div>

  {/* Hero */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <h2 className="text-4xl font-light">Luxury Beauty & Fashion</h2>
    <p className="text-gray-600 mt-2">
      Soft feminine aesthetic collection curated for elegance
    </p>
  </motion.div>

  {/* Products */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    {products.map((product) => (
      <motion.div
        whileHover={{ y: -5 }}
        key={product.id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
      >
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          <Heart
            size={16}
            className={
              wishlist.find((item) => item.id === product.id)
                ? "fill-black"
                : ""
            }
          />
        </button>

        <img
          src={product.image}
          className="w-full h-64 object-cover"
        />

        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-lg mt-1">${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-3 w-full bg-black text-white py-2 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Cart */}
  {showCart && (
    <div className="fixed inset-0 bg-black/30 flex justify-end">
      <div className="bg-white w-80 h-full p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Your Cart</h2>
          <button onClick={() => setShowCart(false)}>
            <X />
          </button>
        </div>

        {cart.map((item, index) => (
          <div key={index} className="mb-3 border-b pb-2">
            {item.name} - ${item.price}
          </div>
        ))}

        <div className="mt-4 font-medium">Total: ${total}</div>

        <button
          onClick={() => {
            if (!user) {
              setShowLogin(true);
            } else {
              setShowCheckout(true);
            }
          }}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl"
        >
          Checkout
        </button>
      </div>
    </div>
  )}

  {/* Login Modal */}
  {showLogin && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <button
          onClick={() => {
            setUser({ name: "User" });
            setShowLogin(false);
          }}
          className="w-full bg-black text-white py-2 rounded-xl mb-2"
        >
          Continue with Google
        </button>

        <button
          onClick={() => setShowLogin(false)}
          className="w-full border py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  )}

  {/* Checkout */}
  {showCheckout && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-96">
        <h2 className="text-xl mb-4">Shipping Address</h2>

        <input
          placeholder="Full Name"
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          placeholder="Address"
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          placeholder="City"
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          placeholder="Phone"
          className="w-full border p-2 mb-3 rounded"
        />

        <div className="text-sm text-gray-500 mb-3">
          Pay securely using PayPal or Payoneer
        </div>

        <button className="w-full bg-black text-white py-2 rounded-xl mb-2">
          Pay with PayPal
        </button>

        <button className="w-full border py-2 rounded-xl">
          Pay with Payoneer
        </button>
      </div>
    </div>
  )}

  {/* Footer */}
  <div className="text-center py-8 text-gray-500">
    © 2026 ♡NORAE♡ Luxury Feminine Store
  </div>
</div>

); }
