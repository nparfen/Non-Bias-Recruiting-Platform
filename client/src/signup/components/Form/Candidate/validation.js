import XRegExp from 'xregexp';

const validate = values => {
    const errors = {}
    if(!values.firstname) {
        errors.firstname = 'Required first name'
    } else {
        const reg = new XRegExp("^[\\p{L}'][ \\p{L}'-]*[\\p{L}]$");
        if(!reg.test(values.firstname)){
            errors.firstname = 'Enter valid name'
        }
    }
    if(!values.lastname) {
        errors.lastname = 'Required last name'
    } else {
        const reg = new XRegExp("^[\\p{L}'][ \\p{L}'-]*[\\p{L}]$");
        if(!reg.test(values.lastname)){
            errors.lastname = 'Enter valid name'
        }
    }
    if(!values.email) {
        errors.email = 'Required email'
    } else {
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(values.email)){
            errors.email = 'Invalid email address'
        }
    }
    if(!values.password) {
        errors.password = 'Required password'
    } else {
        if(values.password.length < 8){
            errors.password = 'Password must be at least 8 characters'
        }
    }
    return errors
}

export default validate;