import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, userupdate } from "../../actions/auth";
import swal from 'sweetalert';

const Home = ({
  auth: { isAuthenticated, loading, user },
  logout,
  userupdate,
}) => {
  const [updateData, setUpdateData] = useState({
    name: user.name,
    email: user.email,
    confirmPass: "",
    newpass: "",
  });

  const { name, email, confirmPass, new_password, newpass } = updateData;

  const onChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const onLogoutHandler = (e) => {
    console.log("logging out");
    e.preventDefault();
    logout();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(newpass==confirmPass){
      userupdate(name, email, confirmPass);
      swal("Success", "Updated successfully", "success");
      console.log("Updated success")
    }else{
      swal ( "Oops" ,  "Confirm Password dose not match" ,  "error" )
      console.log("Password dose not match")
    }
  };

  return (
    <div className='container'>
      <div className='app-wrapper'>
        <div>
          <center>
            <h2 className='topic'>Welcome Back!</h2>
            <h3 className="topic">{user.name}</h3>
          </center>
        </div>
        <div>
          <h2 className='title'>Profile Details</h2>
        </div>
        <div>
          <h3 className="topic">Full Name: {user.name}</h3><br />
          <h3 className="topic">Email: {user.email}</h3>
        </div>
      </div>

      <div className='app-wrapper'>
        <div>
          <h2 className='title'>Update Details</h2>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='title-small'>
            <label className='lable'>Name</label>
            <input
              required
              className='input'
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='title-small'>
            <label className='lable'>New password</label>
            <input
              required
              className='input'
              type='password'
              name='newpass'
              value={newpass}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='title-small'>
            <label className='lable'>Confirm New Password</label>
            <input
              required
              className='input'
              type='password'
              name='confirmPass'
              value={confirmPass}
              onChange={(e) => onChange(e)}
            />
            <input
              type='hidden'
              name='email'
            />
          </div>
          <div>
            <input className='submit' type='submit' value='Update Details' />
          </div>
        </form>
      </div>
      <div className='app-wrapper-small'>
        {!loading && (
          <a onClick={(e) => onLogoutHandler(e)} href='#' className='logout'>
            {" "}
            Logout
          </a>
        )}
      </div>
    </div>
  );
};

Home.porpTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userupdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, userupdate })(Home);
