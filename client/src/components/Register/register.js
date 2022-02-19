import React, { Fragment, useState } from "react";  
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";


const Register= ({ setAlert, register, isAuthenticated }) =>{

    const [registerData, setRegisterData] = useState({
        password: "",
        name: "",
        email: "",
        confirmPass: "",
    });
    
    const {password,name,email,confirmPass} = registerData;

    const onChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    if (password !== confirmPass) {
      console.log("Password do not match");
      setAlert("Password do not match", "danger");
    } else {
      register({ name, email, password });
    }
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
                            <label className="lable">Full Name</label>
                            <input className="input" type="text" name="name" value={name} onChange={(e) => onChange(e)}/>
                            {/* {errors.username && <p className="error">{errors.username}</p>} */}
                        </div>
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
                        <div className="title-small">
                            <label className="lable">Confirm Password</label>
                            <input className="input" type="password" name="confirmPass" value={confirmPass} onChange={(e) => onChange(e)}/>
                            {/* {errors.password && <p className="error">{errors.password}</p>} */}
                        </div>
                        <div>
                            <input className="submit" type="submit" value="Login"/>
                        </div>
                        <p className="title-2">
                            Back to <Link className="title-3" to='/'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>  
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateToProps, { setAlert, register })(Register);