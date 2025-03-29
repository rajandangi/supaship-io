import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import MessageBoard from './MessageBoard'
import AllPosts from './AllPosts'
import PostView from './PostView'
import NavBar from './NavBar'
import Welcome from './Welcome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />
          },
          {
            path: "post/:postId",
            element: <PostView />
          }
        ]
      },
      {
        path: "welcome",
        element: <Welcome />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App


function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}