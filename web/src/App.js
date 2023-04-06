import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginSignup from './components/User/LoginSignup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUser } from './redux/slices/UserSlices/FetchSlice';
import ForgetPassword from './components/User/ForgetPassword';
import SetForgottenPassword from './components/User/SetForgottenPassword';
import { ToastContainer } from 'react-toastify';
import AllUsers from './components/Admin/AllUsers';
import PageNotFound from './components/layout/PageNotFound';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import Search from './components/Request/Search';
import UserProfile from './components/Request/UserProfile';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FetchUser())
  }, [dispatch])

  const { user } = useSelector(state => state.FetchUserReducer)
  return (
    <div className='main-container'>
      <Router>
        {/* *****************Common Components For All****************** */}
        <ToastContainer />

        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/signup' element={<LoginSignup />}></Route>
          <Route exact path='/login' element={<LoginSignup />}></Route>
          <Route exact path='/forgetpassword' element={<ForgetPassword />}></Route>
          <Route exact path='/forgetpassword/:token' element={<SetForgottenPassword />}></Route>

          {/* ***********User Logged IN*********** */}
          {
            user &&

            <>
              <Route exact path='/me' element={<Profile />}></Route>
              <Route exact path='/updateprofile' element={<UpdateProfile />}></Route>
            </>
          }

          {/* ***************ADMIN************************** */}
          {
            user && user.isAdmin === true && <Route exact path='/users' element={<AllUsers />}></Route>
          }

          {/* ******************************Requests************************** */}
          <Route path='/search' element={<Search />}></Route>
          <Route path='/search/:username' element={<UserProfile />}></Route>


          {/* **************PAGE NOT FOUND 404***************** */}
          <Route path='*' element={<PageNotFound />}></Route>

        </Routes>
        <Navbar />

      </Router>
    </div>
  );
}

export default App;
