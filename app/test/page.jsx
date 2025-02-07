import { createClient } from '@/utils/supabase/server';

export default async function Test() {
  const supabase = await createClient();
  const { data: test } = await supabase.from("test").select();

  return <pre>{JSON.stringify(test, null, 2)}</pre>
}