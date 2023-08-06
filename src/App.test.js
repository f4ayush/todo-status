import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import { store } from "./redux/store";


describe('[App]', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    render(<Provider store={store}>
      <App />
    </Provider>);
  })

  test('renders App component', async () => {
    expect(document.querySelector('.App')).toBeInTheDocument()
  });

  test('Check Group component', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('group-container')).toBeInTheDocument()
      expect(screen.getByTestId('group-item')).toBeInTheDocument();
    });
    const error = screen.queryByTestId('error');
    expect(error).not.toBeInTheDocument();
    const deleteBtn = screen.getByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();
    let from = screen.getByTestId('from');
    let to = screen.getByTestId('to');
    expect(from).toBeInTheDocument();
    expect(to).toBeInTheDocument();
    expect(from.querySelector('input')).toHaveValue("1");
    expect(to.querySelector('input')).toHaveValue("10");
    const statusBtn = screen.getByTestId('status-btn');
    expect(statusBtn).toBeInTheDocument();
    fireEvent.click(statusBtn);
    const status = screen.getByTestId('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent('(1) false,(2) false,(3) false,(4) true,(5) false,(6) false,(7) false,(8) true,(9) false,(10) true,');

    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    })

    const addBtn = screen.getByTestId('addBtn');
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);
    const groupItems = screen.queryAllByTestId('group-item');
    expect(groupItems).toHaveLength(2);
    from = screen.queryAllByTestId('from');
    to = screen.queryAllByTestId('to');
    expect(from).toHaveLength(2);
    expect(to).toHaveLength(2);
    expect(from[0].querySelector('input')).toHaveValue("1");
    expect(from[1].querySelector('input')).toHaveValue("0");
    expect(to[0].querySelector('input')).toHaveValue("10");
    expect(to[1].querySelector('input')).toHaveValue("0");

    fireEvent.change(from[1].querySelector('input'), { target: { value: "6" } });
    expect(from[1].querySelector('input')).toHaveValue("6");
    fireEvent.change(to[1].querySelector('input'), { target: { value: "10" } });
    expect(to[1].querySelector('input')).toHaveValue("10");

    fireEvent.click(statusBtn);

    await waitFor(() => {
      const error = screen.queryByTestId('error'); // checking for gap issue
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('There is a overlap in todos');
    });

    fireEvent.change(to[0].querySelector('input'), { target: { value: "5" } });
    fireEvent.click(statusBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument(); // checking for no-overlap issue
    });

    fireEvent.change(to[0].querySelector('input'), { target: { value: "4" } });
    fireEvent.click(statusBtn);
    await waitFor(() => {
      const error = screen.queryByTestId('error'); // checking for gap issue
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('There is a gap between todos')
    });

    const deleteBtns = screen.queryAllByTestId('delete-btn');
    expect(deleteBtns).toHaveLength(2);
    fireEvent.click(deleteBtns[1]);
    expect(screen.queryAllByTestId('delete-btn')).toHaveLength(1);
  })
})
