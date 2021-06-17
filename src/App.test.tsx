import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './logic/redux/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // TODO: replace
  // old test 
  // expect(getByText(/learn/i)).toBeInTheDocument();
});
