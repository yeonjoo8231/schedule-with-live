import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import ical from 'ical';

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const uuid = data.user?.id;

  try {
    const { data: icalUrls, error } = await supabase
      .from('accommodation')
      .select('ical_url, id');

    if (error || !icalUrls) {
      throw new Error('Failed to fetch iCal URLs');
    }

    for (const { ical_url, id: accommodation_id } of icalUrls) {
      const response = await fetch(ical_url);

      if (!response.ok) {
        throw new Error(`Failed to fetch iCal URL: ${ical_url}`);
      }

      const icalData = await response.text();
      const data = ical.parseICS(icalData);
      for (const event of Object.values(data)) {
        const { uid, summary, start, end, description } = event;

        const { count } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('booking_uid', uid);

        if (count === 0) {
          const { error, status } = await supabase.from('bookings').insert({
            booking_uid: uid,
            host_uid: uuid,
            accommodation_id,
            summary,
            check_in_date: JSON.stringify(start),
            check_out_date: JSON.stringify(end),
            description,
          });
          if (error) {
            return NextResponse.json({ error }, { status });
          }
        }
      }
    }

    return NextResponse.json(
      {
        message: '예약 저장을 성공했습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
