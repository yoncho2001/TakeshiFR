import '@testing-library/jest-dom'
import { render,screen  } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom'
import App from '../app/App'

test('demo', () => {
  expect(true).toBe(true)
})

test("Renders the main page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  expect(screen.getByText(/Yoncho Takeshi/i)).toBeInTheDocument();
})