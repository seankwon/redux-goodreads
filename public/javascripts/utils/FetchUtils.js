import convert from 'xml-to-json-promise';

export function goodreadsJSON(url) {
  function fetchGoodreadsXml(url) {
    return fetch(url)
      .then(response => response.text())
      .then(data => { return data} );
  }
  //TODO perhaps Promise.resolve(convert...);
  return fetchGoodreadsXml(url)
    .then(data => convert.xmlDataToJSON(data)
      .then(json => {
        return json;
      }));
}
