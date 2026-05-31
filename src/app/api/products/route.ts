import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Função auxiliar para validar se o Supabase está propriamente configurado
function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && !url.includes('seu-projeto') && key && !key.includes('sua-chave');
}

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase não está configurado. Por favor, ajuste o seu arquivo .env.local com credenciais válidas.' },
        { status: 500 }
      );
    }

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(products || []);
  } catch (error: any) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos no banco de dados' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase não está configurado. Por favor, ajuste o seu arquivo .env.local.' },
        { status: 500 }
      );
    }

    const newProduct = await request.json();
    
    // Auto-gerar ID se não for fornecido
    if (!newProduct.id) {
      newProduct.id = `prod_${Date.now()}`;
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          id: newProduct.id,
          name: newProduct.name,
          description: newProduct.description || '',
          price: newProduct.price,
          image: newProduct.image,
          category: newProduct.category || 'Geral'
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json(data ? data[0] : newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao salvar produto no banco de dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase não está configurado. Por favor, ajuste o seu arquivo .env.local.' },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'O ID do produto é obrigatório' }, { status: 400 });
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json({ error: 'Erro ao deletar produto no banco de dados' }, { status: 500 });
  }
}
