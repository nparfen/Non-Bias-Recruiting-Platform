const validate = values => {
    const errors = {}
    if(!values.oldpassword) {
        errors.oldpassword = 'Required password'
    } else {
        if(values.oldpassword.length < 8){
            errors.oldpassword = 'Password must be at least 8 characters'
        }
    }
    if(!values.newpassword) {
        errors.newpassword = 'Required password'
    } else {
        if(values.newpassword.length < 8){
            errors.newpassword = 'Password must be at least 8 characters'
        }
    }
    if(!values.confirmnewpassword) {
        errors.confirmnewpassword = 'Required password'
    } else {
        if(values.confirmnewpassword.length < 8){
            errors.confirmnewpassword = 'Password must be at least 8 characters'
        } else {
            if(values.confirmnewpassword !== values.newpassword){
                errors.confirmnewpassword = 'Passwords don\'t match'
            }
        }
    }
    return errors
}

export default validate;