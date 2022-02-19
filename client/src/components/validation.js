const valiation = (values) => {

    let errors={};
    
    if(!values.fullname){
        errors.fullname="Name is required."
    }
    if(!values.email){
        errors.email="Email is required."
    } else if(!/\S+@\S+\.\S+/. test(values.email)){
        errors.email="Email is invalid."
    }
    if(!values.username){
        errors.username="Username is required."
    }
    if(!values.password){
        errors.password="Password is required"
    }else if(values.password.lenght < 5){
        errors.password="password must be more than five characters"
    }
    if(!values.confirmpass){
        errors.confirmpass="Confirm the password"
    }else if(values.confirmpass != values.password){
        errors.confirmpass="Confirm password dose not match"
    }
    return errors;
};

export default valiation