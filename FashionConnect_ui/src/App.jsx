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
import CreateCollection from './components/CreateCollection/CreateCollection';

function App() {

  const [user, setUser] = useState(() => {
    try {
      // Retrieve the user data from storage or set it to null if not found
      const storedUser = localStorage.getItem('user');

      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      throw error

    }
  })
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = user.id;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const user_collections = await fetch(`http://localhost:3000/collections/${userId}`);
        const data = await user_collections.json();
        setCollections(data);
      } catch (error) {
        throw error;
      }
    };

    fetchCollections();
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = collections.flatMap((collection) =>
        collection.ProductID.map((productId) => fetchProductDetails(productId))
      );
      const finalProducts = await Promise.all(productPromises);
      setProducts(finalProducts);
    };

    fetchProducts();
  }, [collections]);

  const fetchProductDetails = async (productId) => {
    try {
      const diff_products = await fetch(`http://localhost:3000/products/${productId}`);
      const product = await diff_products.json();
      return product;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="app">
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={ <Main /> } /> */}
            <Route path="/" element={user ? <Main collections={collections} setCollections={setCollections} /> : <LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<ProfileView user={user} />} />
            <Route path="/collections/:userId" element={user ? <Collections collections={collections} products={products} setCollections={setCollections} /> : null} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/newcollection" element={<CreateCollection userId={userId}/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;