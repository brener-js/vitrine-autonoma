import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase GET error:', error);
      return NextResponse.json({ error: error.message || 'Erro ao carregar produtos' }, { status: 500 });
    }

    return NextResponse.json(products || []);
  } catch (error: unknown) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    const productId = body.id || `prod_${Date.now()}`;

    const { data, error } = await supabase
      .from('products')
      .insert({
        id: productId,
        name: body.name,
        description: body.description || '',
        price: body.price,
        image: body.image || '',
        category: body.category || 'Geral',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase POST error:', error);
      return NextResponse.json(
        { error: error.message || 'Erro ao salvar produto' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno ao salvar produto' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'O ID do produto é obrigatório' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase DELETE error:', error);
      return NextResponse.json(
        { error: error.message || 'Erro ao deletar produto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar produto' },
      { status: 500 }
    );
  }
}
