<script>
  import pigalleCards from './cards'
  import Card from './Card.svelte'
  import Modal from './Modal.svelte'

  function shuffledCards () {
    return pigalleCards.sort(() => 0.5 - Math.random())
  }

  function randBool () {
    return Math.random() >= 0.5
  }

  const items = shuffledCards().slice(0, 3)
  items.forEach((card) => card.shouldFlip = randBool())
</script>

<wrapper>
  <header class="header-footer">Le Tarot de Pigalle</header>

  <main>
    <row>
      {#each items as item}
        <column>
        <Card name={item.name} imageModule={item.module} shouldFlip={item.shouldFlip} />
        </column>
      {/each}
    </row>
  </main>

  <Modal />

  <footer class="header-footer">
    <p>Cards design <a href='https://romaintige.myportfolio.com/' target='_blank'>Romain Tigé</a></p>
    <p>Texts <a href='https://victoire-vager.herokuapp.com/' target='_blank'>Victoire Vager</a></p>
  </footer>
</wrapper>

<style>
wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-footer {
  display: flex;
  align-items: center;
  height: 5rem;
  font-family: 'Dancing Script', cursive;
  color: #dedede;
  text-shadow: 3px 4px 7px rgba(120,120,100,0.8);
}

header {
  justify-content: space-evenly;
  font-size: 2rem;
}

footer {
  padding: 1rem;
  font-size: 1rem;
  flex-direction: column;
  justify-content: center;
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

@media (max-width: 600px) {
  row {
    flex-direction: column;
  }
}

</style>
