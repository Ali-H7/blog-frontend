import App from './App';
import Home from './components/Home/Home';
import Post from './components/Post';
import Search from './components/Search';
import Tags from './components/Tags';

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
        path: 'posts/:slug',
        element: <Post />,
      },
      {
        path: 'tags',
        element: <Tags />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
];

export default routes;
