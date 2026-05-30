"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          image: image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
          category: category || "Geral",
        }),
      });

      if (res.ok) {
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("");
        fetchProducts(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleRemoveProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este produto?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchProducts(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  return (
    <main className="container-main admin-container">
      <header className="container-header">
        <h1>Painel de Gerenciamento</h1>
        <Link href="/" className="back-link">
          Voltar para Loja
        </Link>
      </header>

      <section className="admin-form-section">
        <h2>Adicionar Novo Produto</h2>
        <form onSubmit={handleAddProduct} className="admin-form">
          <div className="form-group">
            <label>Nome do Produto *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="admin-input"
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="admin-input"
              rows={3}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Preço (R$) *</label>
              <input 
                type="number" 
                step="0.01" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
                className="admin-input"
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="admin-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>URL da Imagem</label>
            <input 
              type="url" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              className="admin-input"
              placeholder="https://..."
            />
          </div>
          <button type="submit" className="admin-submit-btn">Adicionar Produto</button>
        </form>
      </section>

      <section className="admin-list-section">
        <h2>Produtos Atuais</h2>
        {isLoading ? (
          <p>Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <div className="admin-product-list">
            {products.map((product) => (
              <div key={product.id} className="admin-product-item">
                <div className="admin-product-info">
                  <strong>{product.name}</strong>
                  <span>R$ {product.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleRemoveProduct(product.id)} 
                  className="admin-remove-btn"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
