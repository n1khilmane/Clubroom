import './App.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Rooms from './pages/rooms';
import CreateRoom from './pages/rooms/create';
import JoinRoom from './pages/rooms/join';
import Meeting from './pages/meeting';
import Amplify from 'aws-amplify';

import awsExports from './aws-exports';
import Signup from './components/signUp';
import Confirmation from './components/confirmation';
import ProtectedRoute from './components/protectedRoutes';
Amplify.configure(awsExports);

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3FD064',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    button: {
      fontFamily: 'Nunito:wght@900',
      textTransform: 'lowercase',
      fontSize: '1rem',
      fontWeight: 750,
    },
    fontWeightBold: 1000,
    fontWeightRegular: 200,
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            
            <Route path="/signup" element={<Signup />}>
      
          </Route>
          <Route path='/rooms/create' element={<ProtectedRoute component={<CreateRoom />}/>}></Route>
          <Route path='/attend/meeting' element={<ProtectedRoute component={<Meeting />}/>}></Route>
          <Route path="/signin" element={<Login />}>
          </Route>
          <Route path="/confirmation" element={<Confirmation />}>
          </Route>
          <Route path="/" element={<ProtectedRoute component={<Rooms/>} />}>
          </Route>

            <Route path='/rooms' element={<ProtectedRoute component={<Rooms/>}/>}>
            </Route>
            <Route path='/rooms/join'>
              <Route path=":meetingId" element={<ProtectedRoute component={<JoinRoom/>}/>}>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
