import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fallback amigável se as variáveis de ambiente não estiverem configuradas ainda
if (!supabaseUrl || supabaseUrl.startsWith('https://seu-projeto')) {
  console.warn(
    'AVISO: A variável de ambiente NEXT_PUBLIC_SUPABASE_URL não está configurada corretamente no seu arquivo .env.local.'
  );
}

if (!supabaseServiceKey || supabaseServiceKey.startsWith('sua-chave-service-role')) {
  console.warn(
    'AVISO: A variável de ambiente SUPABASE_SERVICE_ROLE_KEY não está configurada corretamente no seu arquivo .env.local.'
  );
}

// Inicializando o cliente do Supabase
// Usamos a service_role key no backend para ter permissões administrativas nas rotas da API
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key'
);
