import App from './App';
import Home from './components/Home/Home';
import Search from './components/Search';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
];

export default routes;
