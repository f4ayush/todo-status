import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TodoGroup from './TodoGroup';

// Mock Redux store
const mockStore = configureMockStore();

const initialState = {
  groups: {
    groups: [
      { id: '1', from: 1, to: 5, status: '' },
      { id: '2', from: 6, to: 10, status: '' },
    ],
    error: null,
  },
};

test('TodoGroup renders correctly with mock data', () => {
  // Create a mock store with the initial state
  const store = mockStore(initialState);

  // Render the TodoGroup component within the Provider with the mock store
  const { getByText, getAllByText } = render(
    React.createElement(
      Provider,
      { store },
      React.createElement(TodoGroup)
    )
  );

  // Check if the group buttons are rendered correctly
  expect(getByText('Group 1')).toBeInTheDocument();
  expect(getByText('Group 2')).toBeInTheDocument();

  // Check if the status elements are rendered correctly
  expect(getAllByText(/Status \d/)).toHaveLength(2);
});

test('TodoGroup dispatches createGroup action when "Add Items" is clicked', () => {
  // Create a mock store with the initial state
  const store = mockStore(initialState);

  // Render the TodoGroup component within the Provider with the mock store
  const { getByText } =  render(
    React.createElement(
      Provider,
      { store },
      React.createElement(TodoGroup)
    )
  );

  // Find the "Add Items" button by text
  const addItemsButton = getByText('Add Items');

  // Simulate a click event on the "Add Items" button
  fireEvent.click(addItemsButton);

  // Get the actions dispatched to the mock store
  const actions = store.getActions();

  // Check if the createGroup action was dispatched
  expect(actions).toContainEqual({
    type: 'groups/createGroup', // Replace with the actual action type
    payload: {
      id: expect.any(String), // Since we generate a random UUID, we only check if it's a string
      from: 0,
      to: 0,
    },
  });
});
