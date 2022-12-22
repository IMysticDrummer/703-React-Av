import { render } from '@testing-library/react';
import { TweetsPage } from './TweetsPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('TweetsPage', () => {
  const defaultProps = {
    onTweetsLoaded: jest.fn(),
    tweets: [],
  };
  const renderComponent = () =>
    render(
      <Router>
        <TweetsPage {...defaultProps} />{' '}
      </Router>
    );

  test('snapshot without tweets', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('snapshot with tweets', () => {
    const tweets = [
      {
        id: 1,
        content: 'hello',
        updateAt: '2022-12-20',
        likes: [],
        user: { name: 'david', username: 'david' },
      },
    ];
    const { container } = renderComponent({ tweets });
    expect(container).toMatchSnapshot();
  });

  test('should call onTweetsLoaded', () => {
    renderComponent();
    expect(defaultProps.onTweetsLoaded).toHaveBeenCalled();
  });
});
