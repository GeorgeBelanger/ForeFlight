import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders loading `spinner` before call to get feature data', () => {
  const { getByText } = render(<App />);
  const loadingElement = getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});

it('renders table after the api returns data', async () => {
  const { findAllByLabelText } = render(<App />);
  const timeRows = await findAllByLabelText(/Observation Timestamp/);
  expect(timeRows.length).toBeGreaterThan(2);
});

