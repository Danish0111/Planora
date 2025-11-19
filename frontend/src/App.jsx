import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Loader, Loader2 } from 'lucide-react'
import Layout from './pages/admin/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateTasks from './pages/admin/CreateTasks'
import ManageTasks from './pages/admin/ManageTasks'
import TeamMembers from './pages/admin/TeamMembers'
import UserLayout from './pages/user/UserLayout'
import MyTasks from './pages/user/MyTasks'
import UserDashboard from './pages/user/UserDashboard'
import TaskDetails from './pages/user/TaskDetails'

function App() {
  const { authUser, checkAuth, isCheckingAuth, checkAdmin, logout } = useAuthStore();

  const isAdmin = authUser?.role === 'admin';
  useEffect(() => {
    checkAuth();
    // checkAdmin();
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className="flex h-screen justify-center items-center">
      <Loader2 className='size-10 animate-spin text-blue-600' />
    </div>
  )
  
  return (
    <>
      <Routes>
        <Route path='/admin/*' element={authUser && isAdmin ? <Layout /> : <Navigate to="/login" />} >
          <Route index element={<AdminDashboard/>}/>
          <Route path='create-tasks' element={<CreateTasks/>}/>
          <Route path='manage-tasks' element={<ManageTasks/>}/>
          <Route path='team-members' element={<TeamMembers/>}/>
        </Route>
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={isAdmin ? '/admin' : '/'} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={isAdmin ? '/admin' : '/'} />} />
        <Route path='/*' element={authUser && !isAdmin ? <UserLayout /> : <Navigate to="/login" />} >
          <Route index element={<UserDashboard/>}/>
          <Route path='my-tasks' element={<MyTasks/>}/>
          <Route path='task-details/:id' element={<TaskDetails/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
