import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/products');
      const allUsers = await fetch('http://localhost:3000/users');
      const data = await response.json();
      const userData = await allUsers.json();
      setProducts(data);
      setUsers(userData)
    };
    fetchProducts();
  }, []);

  const handleOnSubmit = (event) => {
    if(!form.username || !form.password) {
        setFormError("Please provide both your username and password");
    } else {
        setFormError("");
    }
    event.preventDefault()
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='app'>
      <h1>FashionConnect</h1>
      <div className='login-form'>
        <form className='user-login'>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          className='username-form-input'
        />
        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className='password-form-input'
        />
        {formError && <p>{formError}</p>}
        <button type='submit' className='login-button' 
        onClick={(event) => handleOnSubmit(event)}>
          Log in
          </button>
        </form>
      </div>
    </div>
    
  )
}

export default App
