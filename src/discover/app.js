const yo = require('yo-yo')

function Plugin () {
  return yo`
    <li class="list-group-item">
      <h4 class="list-group-item-heading">Autowoot</h4>
      <p class="list-group-item-text">
        ExtPlug plugin that woots every song automatically.
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
      <ul class="list-group">
        ${Plugin()}
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
