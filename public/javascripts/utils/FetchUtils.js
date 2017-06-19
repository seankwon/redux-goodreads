import convert from 'xml-to-json-promise'
import fetch from 'isomorphic-fetch'

export function goodreadsJSON (url) {
  function fetchGoodreadsXml (url) {
    return fetch(url)
      .then(response => response.text())
      .then(data => data)
  }
  // TODO perhaps Promise.resolve(convert...);
  return fetchGoodreadsXml(url)
    .then(data => convert.xmlDataToJSON(data, { 
      tagNameProcessors: [(name) => { return name.replace('\n', '') }] 
    })
    .then(json => { return json }))
}
