import React, { Fragment, useState } from "react";  
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../actions/auth";


const Login= ({ login, isAuthenticated }) =>{

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    
    const {email,password} = loginData;

    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        console.log(email)
        console.log(password)
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/home' />;
    }
    return(

        <Fragment>
            <div className="container">
                <div className="app-wrapper">
                    <div>
                        <h2 className="title">LOGIN</h2>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="title-small">
                            <label className="lable">Email</label>
                            <input className="input" type="email" name="email" value={email} onChange={(e) => onChange(e)}/>
                            {/* {errors.username && <p className="error">{errors.username}</p>} */}
                        </div>
                        <div className="title-small">
                            <label className="lable">Password</label>
                            <input className="input" type="password" name="password" value={password} onChange={(e) => onChange(e)}/>
                            {/* {errors.password && <p className="error">{errors.password}</p>} */}
                        </div>
                        <div>
                            <input className="submit" type="submit" value="Login"/>
                        </div>
                        <p className="title-2">
                           Don't have a acount ? <Link className="title-3" to='/register'>Register</Link>
                        </p>
                    </form>
                </div>
            </div>  
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateToProps, { login })(Login);