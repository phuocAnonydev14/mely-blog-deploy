import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
// To handle a GET request to /api
export async function GET(request: any) {
  const url = request.url.split('?url=')[1];

  if (!url) {
    return NextResponse.json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const meta = dom.window.document.querySelectorAll('meta');

    const getMetaContent = (property: string) => {
      const element = Array.from(meta).find(
        (el: any) => el.getAttribute('property') === property || el.getAttribute('name') === property,
      ) as any;
      return element ? element.getAttribute('content') : null;
    };

    const previewData = {
      title: getMetaContent('og:title') || dom.window.document.title,
      description: getMetaContent('og:description') || '',
      image: getMetaContent('og:image') || '',
    };

    return NextResponse.json({ data: previewData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch preview data' }, { status: 500 });
  }
}
