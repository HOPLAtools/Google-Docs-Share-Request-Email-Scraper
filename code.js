function startScrape() {
  const searchResults = GmailApp.search('Share request for');
  const data = [];
  searchResults.forEach(entry => {
    const result = handleEntry(entry);
    if (result) data.push(result);
  });
  console.log('data', data);
}

function handleEntry(entry) {
  const date = entry.getLastMessageDate();
  const year = date.getFullYear();
  if (year !== 2022 && year !== 2023) return;
  let body = entry.getMessages()[0];
  body = body.getBody();
  const match = body.match(/ style="padding-top:12px;">(.+?) \(<a href="mailto:(.+?)" style/);
  if (match) {
    const name = match[1];
    const email = match[2];
    return {name, email};
  }
}