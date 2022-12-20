import { Provider } from 'react-redux';
//import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

export default function Root({ store, router }) {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
