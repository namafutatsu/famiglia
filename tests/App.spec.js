import App from 'src/App.svelte'
import { render } from '@testing-library/svelte'

it('it is rendered correctly', async () => {
  const { getByText } = render(App, {
    name: 'Foo Bar',
  })

  const counter = getByText(/Hello/)
  expect(counter.textContent).toEqual('Hello dear Foo Bar!')
})
