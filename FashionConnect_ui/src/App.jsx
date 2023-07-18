import './App.css';
import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main'
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignUpForm/SignupForm';
import EditProfile from './components/EditProfile/EditProfile';
import ProfileView from './components/ProfileView/ProfileView';
import Collections from './components/Collections/Collections';

function App() {

  const [user, setUser] = useState(() => {
    try {
      // Retrieve the user data from storage or set it to null if not found
      const storedUser = localStorage.getItem('user');

      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);

    }
  })
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
 
  return (
    <div className="app">
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={ <Main /> } /> */}
            <Route path="/" element={user ? <Main /> : <LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<ProfileView user={user} />} />
            <Route path="/collections/:userId" element={user ? <Collections userId={user.id}/>: null} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;