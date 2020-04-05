import './global.css'

// This is a shame, there is currently no rollup plugin that would interpret and
// create hashed URL for url() inside CSS files. We need to do it ourselves :(
import bodyBg from './assets/img/bg.jpg'
document.body.style.background = `url('${bodyBg}') no-repeat center center fixed`
document.body.style['background-size'] = 'cover'

import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
})
