<script>
  import cardBackground from './assets/img/card-background.png'

  function createCard (n) {
    const self = {
      id: `${n}`,
      label: `Card number ${n}`,
      src: `/${cardBackground}`,
      isClicked: false
    }
    self.onClick = function () {
      import('./assets/img/cards/TAROT-DE-PIGALLE_43_TroisBatons_RVB.jpg').then((data)=> {
        self.src = data.default
        self.isClicked = true
        items = items
      })
    }
    return self
  }

  const items = [...Array(3).keys()].map(i => createCard(i))
</script>

<wrapper>
  <header></header>

  <main>
    <row>
      {#each items as item}
        <column>
          <card>
            <img alt={item.label} src={item.src} class="{item.isClicked ? 'visible' : 'hidden'}" />
            <img alt='card background' src={cardBackground} class="{item.isClicked ? 'hidden' : 'visible'}" on:click={item.onClick}/>
          </card>
        </column>
      {/each}
    </row>
  </main>

  <footer></footer>
</wrapper>

<style>
wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  text-align: center;

  display: flex;
  flex-direction: column;
}

row {
  flex: 1;
  display: flex;
}

column {
  flex: 1;
  display: flex;
  padding: 10px;
  justify-content: space-evenly;
  align-items: center;
}

card {
  height: 400px;
  position: relative;
}

card img {
  cursor: pointer;
  position: absolute;
  /* because card is about 230px in size */
  left: -115px;
  height: 100%;
  transition: all 1s ease-in-out;
  border-radius: 12px;
  box-shadow: 0px 0px 10px black;
}

/*
@media min-width: 601px {
}
*/

@media (max-width: 600px) {
  row {
    flex-direction: column;
  }
}

.hidden {
  opacity: 0;
  transform: rotateX(360deg) scaleY(0.5);
  transform-origin: bottom;

}

.visible {
  opacity: 1;
  transform: rotateX(0deg) scaleY(1.0);
  transform-origin: bottom;
}
</style>
