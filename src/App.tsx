import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import MessageBoard from './MessageBoard'
import AllPosts from './AllPosts'
import { PostView } from './Post'
import NavBar from './NavBar'
import Welcome, { welcomeLoader } from './Welcome'
import { SupashipUserInfo, useSession } from './useSession'
import { createContext } from 'react'

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
        element: <Welcome />,
        loader: welcomeLoader,
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

export const UserContext = createContext<SupashipUserInfo>({
  profile: null,
  session: null,
});

function Layout() {
  const supashipUserInfo = useSession();
  return (
    <>
      <UserContext.Provider value={supashipUserInfo}>
        <NavBar />
        <Outlet />
      </UserContext.Provider>
    </>
  )
}