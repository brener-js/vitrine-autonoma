import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json([]);
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    let products = [];
    
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      products = JSON.parse(fileContents);
    }
    
    // Auto-generate ID if not provided
    if (!newProduct.id) {
      newProduct.id = `prod_${Date.now()}`;
    }
    
    products.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      let products = JSON.parse(fileContents);
      products = products.filter((p: any) => p.id !== id);
      fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
