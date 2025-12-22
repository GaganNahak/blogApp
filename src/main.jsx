import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import {Login,Signup,AllPost,AddPost,EditPost,Home} from './pages/index.js'
import {AuthLayout} from './components/index.js'
import Post from './pages/Post.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      {/* <Route path='/login' element={<AuthLayout authentication={false}>
        <Login/>
      </AuthLayout>}/>
      <Route path='/signup' element={<AuthLayout authentication={false}>
        <Signup/>
      </AuthLayout>}/>
      <Route path='/all-posts' element={<AuthLayout authentication={false}>
        <AllPost/>
      </AuthLayout>}/>
      <Route path='/add-post' element={<AuthLayout authentication={false}>
        <AddPost/>
      </AuthLayout>}/> */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/all-posts' element={<AllPost/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/add-post' element={<AddPost/>}/>
      <Route path='/all-posts/post/:slug' element={<Post/>}/>
      <Route path='/edit-post/post/:slug' element={<EditPost/>}/>

    </Route>
  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
