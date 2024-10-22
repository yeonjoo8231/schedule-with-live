'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function fetchSchedule() {
  const supabase = createClient();

  const { data, error } = await supabase.from('accommodation').select('*');

  console.log('ical data', data);

  if (error) {
    redirect('/error');
  }
  return data;
  // revalidatePath('/', 'layout');
  // redirect('/');
}
