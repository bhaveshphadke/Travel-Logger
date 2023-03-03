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
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import Footer from './components/layout/Footer';
import AllUsers from './components/Admin/AllUsers';
import PageNotFound from './components/layout/PageNotFound';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FetchUser())
  }, [dispatch])

  const { user } = useSelector(state => state.FetchUserReducer)
  return (
    <>
      <Router>
        {/* *****************Common Components For All****************** */}
        <Navbar />
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


          {/* **************PAGE NOT FOUND 404***************** */}
          <Route path='*' element={<PageNotFound />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
