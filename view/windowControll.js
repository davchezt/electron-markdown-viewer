// Context menu init()
const initContextMenu = () => {
  menus = new Menu()
  menus.append(new MenuItem({
    label: 'Copy',
    role: 'copy'
    // click: copy
  }))
  /*
  menus.append(new MenuItem({
    label: 'Cut',
    role: 'cut'
    // click: cut
  }))
  menus.append(new MenuItem({
    label: 'Paste',
    role: 'paste'
    // click: paste
  }))
  menus.append(new MenuItem({
    label: 'Select All',
    role: 'selectAll'
    // click: selectAll
  }))
  */
  window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault()
    menus.popup(remote.getCurrentWindow(), ev.x, ev.y)
  }, false)
}

// Window Control [_][+][x] Buttons
const windowClicks = () => {
  document.getElementById('min-button').addEventListener('click', function (e) {
    remote.getCurrentWindow().minimize()
  })

  document.getElementById('max-button').addEventListener('click', function (e) {
    if (!remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().maximize()
    } else {
     remote.getCurrentWindow().unmaximize()
    }
  })

  document.getElementById('close-button').addEventListener('click', function (e) {
    remote.getCurrentWindow().close()
  })
}

// 'View' Menu Buttons
const viewMenu = () => {
  document.getElementById('reload').addEventListener('click', () => {
    remote.getCurrentWindow().reload()
  })
  document.getElementById('dev').addEventListener('click', () => {
    remote.getCurrentWindow().toggleDevTools()
  })
  document.getElementById('full').addEventListener('click', () => {
     if (!remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().maximize()
    } else {
     remote.getCurrentWindow().unmaximize()
    }
  })
}

// Help Menu
const helpMenu = () => {
  // Open links in the 'Help' menu in the default browser
  var helpa = document.getElementById('help-menu').getElementsByTagName('a')
  for (var i = 0; i < helpa.length; i++) {
    helpa[i].addEventListener('click', function (e) {
      e.preventDefault()
      shell.openExternal(this.href)
    })
  }
}

const handleNew = (i) => {
  if (false) {
    newFile()
    editor[i].setValue('')
  } else {
    window.open(path.join('file://', __dirname, '/index.html'))
  }
}

const fileMenu = () => {
  document.getElementById('open').addEventListener('click', openFilePicker)
  document.getElementById('new').addEventListener('click', handleNew)
  document.getElementById('close-window').addEventListener('click', function (e) {
    window.close()
  })
}

const shortcuts = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
      if (!remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().maximize()
      } else {
      remote.getCurrentWindow().unmaximize()
      }
    }
    if (e.key === 'F5') {
      remote.getCurrentWindow().reload()
    }
    if (e.key === 'F12') {
      remote.getCurrentWindow().toggleDevTools()
    }
    if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
      menu.handleNew()
    }
    if (e.ctrlKey && (e.key === 'w' || e.key === 'W')) {
      remote.getCurrentWindow().close()
    }
    if (e.ctrlKey && (e.key === 'o' || e.key === 'O')) {
      openFilePicker()
    }
  })
}

module.exports = {
  initContextMenu,
  windowClicks,
  viewMenu,
  helpMenu,
  fileMenu,
  handleNew,
  shortcuts
}