import React, {useState} from 'react'
import axios from 'axios';
import './switch.css';


export default function Login({setIsLogin}) {
    const API_URL="https://language-learner-backend.onrender.com";
    const [user, setUser] = useState({name: '',email: '',password: '' })
    const [err, setErr] = useState('')

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post(API_URL+'/users/register',{
                username: user.name,
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post(API_URL+'/users/login',{
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const [onLogin, setOnLogin] = useState(false)
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }
    function handleCheckboxChange() {
        const element = document.getElementById('login-page') ;
        element.classList.toggle("dark-mode");
        //const table = document.querySelectorAll('.login,.register');
        //table.classList.toggle("dark-login");
      }


    return (
        
       <section className="login-page" id="login-page">
         <label className="switch">
            <input type="checkbox" onChange={handleCheckboxChange} />
          <span className="slider"></span>
          </label>
           <div className="login create-note">
                <h2 style={{fontWeight:"bold", color:'white'}}><center>Login</center></h2>
                <form onSubmit={loginSubmit}>
                    <input type="email" name="email" id="login-email"
                    placeholder="Email" required value={user.email}
                    onChange={onChangeInput} />

                    <input type="password" name="password" id="login-password"
                    placeholder="Password" required value={user.password}
                    autoComplete="true"
                    onChange={onChangeInput} />

                    <button className="LoginBtn" type="submit"><span>Translate Away</span></button>
                    <p><center>don't have an account?
                        <span id ="RegisterNow" onClick={() => setOnLogin(true)}> Register Now</span>
                    </center></p>
                    <h3 style={{color:'red'}}>{err}</h3>
                </form>
           </div>
           <div className="register create-note" style={style}>
           <h2 style={{color:'white', textAlign:'center'}}> Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" name="name" id="register-name"
                    placeholder="User Name" required value={user.name}
                    onChange={onChangeInput} />

                    <input type="email" name="email" id="register-email"
                    placeholder="Email" required value={user.email}
                    onChange={onChangeInput} />

                    <input type="password" name="password" id="register-password"
                    placeholder="Password" required value={user.password}
                    autoComplete="true" onChange={onChangeInput} />

                    <button type="submit"><span id="RegisterBtn">Register</span></button>
                    <p>You have an account?
                        <span id="RegisterNow" onClick={() => setOnLogin(false)}> Login Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
           </div>
       </section>
    )
}
