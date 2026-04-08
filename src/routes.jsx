import App from './App';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import Search from './components/Search/Search';
import Tags from './components/Tags/Tags';
import TagsBrowser from './components/Tags/TagsBrowser';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Login from './components/ControlPanel/Login';
import CreatePost from './components/CreatePost';
import ManageTags from './components/ControlPanel/ManageTags/ManageTags';
import Error from './components/Error';
import SignUp from './components/UserForms/SignUp';

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: 'posts/:slug',
        element: <Post />,
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
      {
        path: 'cp',
        element: <ControlPanel />,
      },

      {
        path: 'cp/post',
        element: <CreatePost />,
      },
      {
        path: 'cp/tags',
        element: <ManageTags />,
      },
    ],
    errorElement: <Error />,
  },
];

export default routes;
