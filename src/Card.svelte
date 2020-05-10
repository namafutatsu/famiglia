<script>
import cardBackground from './assets/img/card-background.png'

let src = null
let isClicked = false

export let name;
export let imageModule;

function onClick () {
  imageModule().then((data)=> {
    src = data.default
    isClicked = true
  })
}
</script>

<card>
  <img alt={name} src={src} class="{isClicked ? 'visible' : 'hidden'}" />
  <img alt='card background' src={cardBackground} class="{isClicked ? 'hidden' : 'visible'}" on:click={onClick}/>
</card>

<style>
card {
  height: 400px;
  position: relative;
}

img {
  cursor: pointer;
  position: absolute;
  /* because card is about 230px in size */
  left: -115px;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12);

  transition: all 1.5s ease-in-out;
}


.hidden {
  opacity: 0;
  transform: rotateY(180deg);
  transform-origin: 50% 0%;

}

.visible {
  opacity: 1;
  transform: rotateY(0deg);
  transform-origin: 50% 0%;
}
</style>
