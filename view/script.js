const electron = require('electron')
const shell = electron.shell
const remote = electron.remote
const fs = require('fs')
const marked = require('marked')
const hljs = require('highlight.js')
const path = require('path')
const {
  dialog,
  Menu,
  MenuItem
} = remote
const menu = require('./windowControll');

const readFile = (file) => {
  fs.readFile(file, (err, data) => {
    document.querySelector('.md').innerHTML = marked(data.toString())
    Array.from(document.querySelectorAll('pre code')).forEach(block => hljs.highlightBlock(block))
    Array.from(document.querySelectorAll('.md a')).forEach((link, index) => {
      // console.log(document.querySelectorAll('.md a').item(index))
      document.querySelectorAll('.md a').item(index).addEventListener('click', (ev) => {
        let url;
        if (ev.target.localName === 'img' || ev.target.localName === 'span') {
          url = ev.target.parentElement.href;
        }
        else {
          url = ev.target.href;
        }
        shell.openExternal(url, {}, (err) => {
          if (err) {
            throw err;
          }
          shell.beep();
          console.log("visit: ", url);
        })
        ev.preventDefault();
        // return false;
      });
      /*
      link.addEventListener('click', (ev) => {
        ev.preventDefault();
        shell.openExternal(ev.target.href, {}, (err) => {
          if (err) {
            throw err;
          }
          shell.beep();
          console.log("visit: ", ev.target.href);
        })
      })
      */
    })
  })
}

const filters = { filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }] }

const openFilePicker = () => {
  dialog.showOpenDialog(filters, fileNames => {
    if (fileNames) {
      readFile(fileNames[0])
    }
  })
}

const close = e => {
  const window = remote.getCurrentWindow()
  window.close()
}

onload = () => {
  // document.querySelector('.close').addEventListener('click', close)
  // document.querySelector('.select-file').addEventListener('click', openFilePicker);

  document.getElementById('dropZone').addEventListener('click', openFilePicker);

  document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault()
  }
  
  document.body.ondrop = (ev) => {
    // console.log(ev.dataTransfer.files[0].path.split('.').pop())
    if (ev.dataTransfer.files[0].path.split('.').pop() === 'md') {
      readFile(ev.dataTransfer.files[0].path)
    }
    else {
      dialog.showErrorBox('Invalid markdown file', 'Please make sure you are pick .md file');
    }

    ev.preventDefault()
  }
  
  menu.initContextMenu();
  menu.windowClicks();
  menu.fileMenu();
  menu.helpMenu();
  menu.viewMenu();
  menu.shortcuts();
}