import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StatusButton from './StatusButton';

// Mock Redux store
const mockStore = configureMockStore();

// Mock Redux state with appropriate data for the test
const initialState = {
  groups: {
    groups: ['Group 1', 'Group 2'],
  },
  todos: ['Todo 1', 'Todo 2'],
};

test('StatusButton dispatches the correct action with the correct data', () => {
  // Create a mock store with the initial state
  const store = mockStore(initialState);

  // Render the StatusButton component within the Provider with the mock store
  const { getByText } = render(
    React.createElement(
      Provider,
      { store },
      React.createElement(StatusButton)
    )
  );

  

  // Find the StatusButton element by its text
  const statusButton = getByText('Status Button');

  // Simulate a click event on the StatusButton
  fireEvent.click(statusButton);

  // Get the actions dispatched to the mock store
  const actions = store.getActions();

  // Check if the getStatus action was dispatched with the correct payload
  expect(actions).toContainEqual({
    type: 'getStatus', // Replace with the actual action type
    payload: {
      groups: initialState.groups.groups,
      todos: initialState.todos,
    },
  });
});
