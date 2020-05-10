<script>
  import cardBackground from './assets/img/card-background.png'
  import pigalleCards from './cards'

  function shuffledCards () {
    console.log(pigalleCards)
    return pigalleCards.sort(() => 0.5 - Math.random())
  }

  // This should be a real Svelte Card component
  function cardComponent (card) {
    const self = {
      ...card,
      src: null,
      isClicked: false
    }
    self.onClick = function () {
      card.module().then((data)=> {
        self.src = data.default
        self.isClicked = true
        items = items
      })
    }
    return self
  }

  const items = shuffledCards().slice(0, 3).map((card) => cardComponent(card))
</script>

<wrapper>
  <header></header>

  <main>
    <row>
      {#each items as item}
        <column>
          <card>
            <img alt={item.name} src={item.src} class="{item.isClicked ? 'visible' : 'hidden'}" />
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
  border-radius: 12px;
  box-shadow: 0px 0px 10px #ddd;
  /* box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12); */

  transition: all 1.5s ease-in-out;
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
  transform: rotateY(180deg);
  transform-origin: 50% 0%;

}

.visible {
  opacity: 1;
  transform: rotateY(0deg);
  transform-origin: 50% 0%;
}
</style>
