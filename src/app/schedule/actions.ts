'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

async function insertSchedule() {
  const token = cookies().get('sb-halwpuhmgzertviljfrn-auth-token');
  const response = await fetch('http://localhost:3000/api/fetch-ical', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      cookie: `${token?.name}=${token?.value}`,
    },
  });
  if (!response.ok) {
    console.error('Error:', response.status, response.statusText);
    const text = await response.text();
    console.log('Response Text:', text);
    throw new Error('Network response was not ok');
  }
}

export async function fetchSchedule() {
  const supabase = createClient();
  await insertSchedule();
  const { data, error } = await supabase.from('bookings').select('*');

  if (error) {
    redirect('/error');
  }

  return data;
}
