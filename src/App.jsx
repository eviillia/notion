import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import HomeContent from './components/HomeContent';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import ViewNote from './components/ViewNote';
import Login from './components/Login';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {        
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    children: [
      {
        path: "/home",
        element: <HomeContent />, 
      },
      {
        path: "/home/notes",
        element: <Notes />,
      },
      {
        path: "/home/create-note",
        element: <CreateNote />,
      },
      {
        path: "edit/:id",
        element: <EditNote />,
      },
      {
        path: "view/:id",
        element: <ViewNote />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
