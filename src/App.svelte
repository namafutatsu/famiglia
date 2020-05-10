<script>
  import pigalleCards from './cards'
  import Card from './Card.svelte'

  function shuffledCards () {
    return pigalleCards.sort(() => 0.5 - Math.random())
  }

  const items = shuffledCards().slice(0, 3)
</script>

<wrapper>
  <header></header>

  <main>
    <row>
      {#each items as item}
        <column>
          <Card name={item.name} imageModule={item.module} />
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

@media (max-width: 600px) {
  row {
    flex-direction: column;
  }
}

</style>
