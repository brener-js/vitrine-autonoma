"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const whatsappNumber = "5511999999999"; // Placeholder

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProductsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
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
        <button onClick={() => setIsCartOpen(true)} className="cart-toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span className="cart-badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </button>
      </header>

      <section className="container-product-list">
        {productsData.map((product) => (
          <article key={product.id} className="container-product-card">
            <div className="product-image-wrapper">
              {/* Using standard img with display block per rules */}
              <img src={product.image} alt={product.name} className="product-img" />
            </div>
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="price">R$ {product.price.toFixed(2)}</span>
                <button onClick={() => addToCart(product)} className="add-btn">
                  Adicionar
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {isCartOpen && (
        <div className="container-cart-modal">
          <div className="cart-content">
            <div className="cart-header">
              <h2>Seu Pedido</h2>
              <button onClick={() => setIsCartOpen(false)} className="close-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="empty-cart">O carrinho está vazio.</p>
            ) : (
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <span className="item-name">{item.quantity}x {item.name}</span>
                    <div className="cart-item-actions">
                      <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                      <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="cart-footer">
              <div className="cart-total">Total: R$ {total.toFixed(2)}</div>
              <button 
                onClick={handleCheckout} 
                className="checkout-btn"
                disabled={cart.length === 0}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Finalizar via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
