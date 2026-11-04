import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./index.css"
import App from "./App.jsx"
import AuthProvider from "./context/AuthProvider.jsx"
import RotaPrivada from "./components/RotaPrivada.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import MeuFlowPage from "./pages/MeuFlowPage.jsx"
import MateriaPage from "./pages/MateriaPage.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "meu-flow",
        element: <RotaPrivada />,
        children: [
          { index: true, element: <MeuFlowPage /> },
          { path: "materia/:id", element: <MateriaPage /> },
        ],
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
