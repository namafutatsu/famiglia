<script>
  import { fade } from 'svelte/transition'
  import { displayModal, modalText } from './stores'
</script>

{#if $displayModal }
  <modal transition:fade>
    <modal-content>
      <close on:click={e => $displayModal = false}>&times;</close>
      <div class="title">{ $modalText }</div>
      <content>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.<br>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. <br>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <br>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</content>
    </modal-content>
  </modal>
{/if}
<style>
modal {
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

modal-content {
  position: relative;
  background-color: #fafafa;
  padding: 1rem;
  width: 60%;
  border-radius: 12px;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12);
}

@media (max-width: 600px) {
  modal-content {
    width: 80%;
  }
}

/* The Close Button */
close {
  position: absolute;
  top: 0px;
  right: 10px;
  color: #aaa;
  font-size: 2rem;
  font-weight: bold;
}

close:hover, close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.title {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  margin-bottom: 1rem;
}

content {
  color: #333;
}
</style>
