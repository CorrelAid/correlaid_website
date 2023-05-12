function isHTMLContentTypeAccepted(request) {
  const acceptHeader = request.headers.get('Accept');
  return (
    typeof acceptHeader === 'string' && acceptHeader.indexOf('text/html') >= 0
  );
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // ignore POST requests etc
  if (event.request.method !== 'GET') return;

  async function respond() {
    const response = await fetch(event.request);

    if (response.status === 404 && isHTMLContentTypeAccepted(event.request)) {
      let errorPageResponse;
      if (event.request.url.includes('/en/')) {
        errorPageResponse = await fetch('/en/404');
      } else {
        errorPageResponse = await fetch('/404');
      }

      // New response has to be returned with the old status
      // This makes sense logically and would otherwise also trigger
      // some internal svelte logic for successful requests that would
      // then lead to errors because of the fetch change.
      const {status, statusText} = response;
      const html = await errorPageResponse.text();
      const modifiedHtml = html.replace(
        '<head>',
        `<head><base href="${errorPageResponse.url}" />`,
      );
      const {headers} = errorPageResponse;
      return new Response(modifiedHtml, {
        status,
        statusText,
        headers,
      });
    } else {
      return response;
    }
  }

  event.respondWith(respond());
});
