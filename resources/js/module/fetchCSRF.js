function fetchCSRF(url, settings) {
  let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  return fetch(url, {
      ...settings,
      headers: {
          "X-CSRF-TOKEN": token,
          "Content-Type": "application/json",
          "Accept": "application/json"
      }
  })
}

export default fetchCSRF;