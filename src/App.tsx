import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import AppProvider from './redux/provider/app-provider'
import { Suspense } from 'react'
import AppLoading from './components/Loadings/AppLoading/loading'

function App() {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Suspense>
  )
}

export default App
