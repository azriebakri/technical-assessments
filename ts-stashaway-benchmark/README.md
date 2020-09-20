# StashAway’s Frontend Recruitment Assignment

At StashAway, our customers have requested for a way to compare our portfolios’ performance against
market performance, for example, how did our StashAway Risk Index 14% portfolio perform against a
mix of 60% stocks (VTSMX ETF) and 40% bonds (VBMFX ETF) or 20% stocks and 80% bonds.
In this assignment, we would like you to build the following page in any framework that you are familiar
with. It should pull the data from a mock API or GraphQL, which the page will render accordingly. We
would be pulling historical performance of the current portfolio, which would have to be rendered in a
line chart. The user can specify which benchmark he/she wants to compare with: 60/40 portfolio, 20/80
portfolio (or any other benchmarks you can think of). The user can also specify for which time period and
currency to compare the performances. Links in the nav bar and header are just placeholders.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Details

This benchmark website was build on top React and using Tailwindcss as the CSS framework and deployed using Netlify (https://60a68e8290bb9c7023e2cd33--stashaway-benchmark-frontend.netlify.app/). 

Major plugins that are being used:
  1. Recharts : https://recharts.org/en-US/ (For the line chart)
  2. Material-UI : https://material-ui.com/ (For the dropdown and tabs)
  3. Momentjs : https://momentjs.com/ (For the time conversion and calculation)
  4. Axios : https://github.com/axios/axios (API calls)

Financial API source(s) for the mock data: https://twelvedata.com/docs#getting-started

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 
