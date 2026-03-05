import App from './App';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Tags from './components/Tags/Tags';
import TagsBrowser from './components/Tags/TagsBrowser';

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
      {
        path: 'tags',
        element: <Tags />,
      },
      {
        path: 'tags/:slug',
        element: <TagsBrowser />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
];

export default routes;
