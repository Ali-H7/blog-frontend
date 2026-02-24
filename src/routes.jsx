import App from './App';
import Search from './components/Search';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: '',
      // },
      {
        path: 'search',
        element: <Search />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
];

export default routes;
