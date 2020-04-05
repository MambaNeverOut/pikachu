import string from './css.js'

const player = {
  id: undefined,
  n: 1,
  time: 100,
  ui: {
    demo: document.querySelector('#demo'),
    demo2: document.querySelector('#demo2')
  },
  events: {
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast',
  },
  init: () => {
    player.ui.demo2.innerHTML = string.substr(0, player.n)
    player.ui.demo.innerText = string.substr(0, player.n)
    player.bindEvents()
    player.play()
  },
  bindEvents: () => {
    for (let key in player.events) { // 防御性编程
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key] // 各种事件 pause/ play / slow
        document.querySelector(key).onclick = player[value]
      }
    }
  },
  run: () => {
    player.n += 1
    if (player.n > string.length) {
      window.clearInterval(player.id)
      return
    }
    player.ui.demo2.innerHTML = string.substr(0, player.n)
    player.ui.demo.innerText = string.substr(0, player.n)
    // demo.scrollTop = 999999
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight
  },
  play: () => {
    player.id = setInterval(player.run, player.time)
  },
  pause: () => {
    window.clearInterval(player.id)
  },
  slow: () => {
    player.pause()
    player.time = 300
    player.play()
  },
  normal: () => {
    player.pause()
    player.time = 100
    player.play()
  },
  fast: () => {
    player.pause()
    player.time = 0
    player.play()
  }
}

player.init()