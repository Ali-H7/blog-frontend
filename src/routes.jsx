import App from './App';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import Search from './components/Search/Search';
import Tags from './components/Tags/Tags';
import TagsBrowser from './components/Tags/TagsBrowser';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Login from './components/UserForms/Login';
import PostEditor from './components/PostEditor/PostEditor';
import EditPost from './components/PostEditor/EditPost';
import ManageTags from './components/ControlPanel/ManageTags/ManageTags';
import Error from './components/Error';
import SignUp from './components/UserForms/SignUp';
import { useLocation } from 'react-router';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

const Posts = () => {
  const location = useLocation();
  return <Home key={location.pathname} />;
};

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Posts />,
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
        element: <PostEditor />,
      },
      {
        path: 'cp/edit/:slug',
        element: <EditPost />,
      },
      {
        path: 'cp/posts',
        element: <Posts />,
      },
      {
        path: 'cp/tags',
        element: <ManageTags />,
      },
    ],
    errorElement: (
      <AuthProvider>
        <Layout>
          <Error />
        </Layout>
      </AuthProvider>
    ),
  },
];

export default routes;
