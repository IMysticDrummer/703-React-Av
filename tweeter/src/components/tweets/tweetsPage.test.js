import { render } from '@testing-library/react';
import TweetsPage from './TweetsPage';
import { BrowserRouter as Router } from 'react-router-dom';
describe('TweetsPage', () => {
  const defaultProps = {
    onTweetsLoaded: jest.fn(),
    tweets: [],
  };
  const renderComponent = () =>
    render(
      <Router>
        <TweetsPage {...defaultProps} />
      </Router>
    );

  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchInlineSnapshot();
  });

  test('should call onTweetsLoaded', () => {
    renderComponent();
    expect(defaultProps.onTweetsLoaded).toHaveBeenCalled();
  });
});
