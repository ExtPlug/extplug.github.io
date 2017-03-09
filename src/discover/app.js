const yo = require('yo-yo')
const fetch = require('unfetch')
const debounce = require('debounce')

let searchResults = []

const API_URL = 'https://api.npms.io/v2'
function search (query) {
  fetch(`${API_URL}/search?q=keywords:extplug-plugin ${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((results) => {
      searchResults = results.results
      render()
    })
}

const searchDebounced = debounce(search, 200)

function onSearchInput (event) {
  searchDebounced(event.target.value)
}

function SearchInput () {
  return yo`
    <input
      autofocus
      class="form-control"
      type="text"
      oninput=${onSearchInput} />
  `
}

function Plugin ({ package }) {
  return yo`
    <li class="list-group-item">
      <h4 class="list-group-item-heading">${package.name}</h4>
      <p class="list-group-item-text">
        ${package.description}
      </p>
      <p class="list-group-item-text">
        <button class="btn btn-primary">Install</button>
      </p>
    </li>
  `
}

function App () {
  return yo`
    <div class="container">
      <ul class="list-group" style="margin-top: 20px">
        ${searchResults.map(Plugin)}
      </ul>
    </div>
  `
}

function render () {
  yo.update(el, App())
}

const root = document.getElementById('discover')
const el = App()
root.appendChild(el)

search('')

const searchRoot = document.getElementById('discover-search')
searchRoot.appendChild(SearchInput())
