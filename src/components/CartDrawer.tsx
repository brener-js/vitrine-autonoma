import { CartItem } from "@/types/product";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  total: number;
  handleCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  total,
  handleCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="container-cart-modal" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="cart-content">
        <div className="cart-header">
          <h2 id="cart-title">Seu Pedido</h2>
          <button 
            onClick={onClose} 
            className="close-btn"
            aria-label="Fechar carrinho"
          >
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
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    className="qty-btn"
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >-</button>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)} 
                    className="qty-btn"
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >+</button>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="remove-btn"
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
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
            aria-label={`Finalizar pedido no valor de R$ ${total.toFixed(2)} via WhatsApp`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Finalizar via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
