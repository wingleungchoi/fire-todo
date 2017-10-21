export function renderResponse(res, content, headerStatus, contentType) {
  res.writeHead(headerStatus, contentType);
  res.end(content);
}

export function renderJsonResponse(res, content, headerStatus) {
  const json = JSON.stringify(content);
  renderResponse(res, json, headerStatus, { 'Content-Type': 'application/json' });
}
