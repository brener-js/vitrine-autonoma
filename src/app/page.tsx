/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { Product, CartItem } from "@/types/product";

const CartDrawer = dynamic(() => import("@/components/CartDrawer"), { ssr: false });

export default function Home() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProductsData(data);
        } else {
          setProductsData([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProductsData([]);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Adicionado: ${product.name} ao carrinho!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total: R$ ${total.toFixed(2)}*`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <main className="container-main">
      <header className="container-header">
        <h1>Nosso Menu</h1>
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="cart-toggle" 
          aria-label={`Ver carrinho, ${cart.reduce((acc, item) => acc + item.quantity, 0)} itens`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span className="cart-badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </button>
      </header>

      <section className="container-product-list">
        {productsData.map((product) => (
          <article key={product.id} className="container-product-card">
            <div className="product-image-wrapper">
              {/* Using standard img with display block per rules */}
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-img" 
                loading="lazy" 
                decoding="async" 
              />
            </div>
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="price">R$ {product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  className="add-btn"
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
        handleCheckout={handleCheckout}
      />

      {toastMessage && (
        <div className="container-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
