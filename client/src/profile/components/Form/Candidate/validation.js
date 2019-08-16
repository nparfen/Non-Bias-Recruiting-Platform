import { isValidNumber } from 'libphonenumber-js';
import XRegExp from 'xregexp';
import _ from 'lodash';

const validateLocation = (location) => {
    let errors = {};
    if (location.address && !location.coords) {
        errors.address = 'Choose the address from the list'
    }
    return errors;
}

const validatePerks = (perks) => {
    let error = "";
    const total = _.reduce(perks, (sum, perk) => (sum + Number(perk.value)), 0)
    const isNotEmpty = _.some(perks, (perk) => Boolean(perk.value));
    if (isNotEmpty && total !== 100) {
        error = { _error: "Total sum must equal 100" }
    }
    return error;
}

const validate = values => {
    const errors = {}
    if(!values.firstname) {
        errors.firstname = 'Required first name'
    } else {
        const reg = new XRegExp("^[\\p{L}'][ \\p{L}'-.,]*[\\p{L}]$");
        if(!reg.test(values.firstname)){
            errors.firstname = 'Enter valid name'
        }
    }
    if(!values.lastname) {
        errors.lastname = 'Required last name'
    } else {
        const reg = new XRegExp("^[\\p{L}'][ \\p{L}'-.,]*[\\p{L}]$");
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
    if(values.mobilephone && !isValidNumber(values.mobilephone)) {
        errors.mobilephone = 'Invalid mobile phone number'
    }
    if(values.gender && values.gender === "Other" && !values.othergender) {
        errors.othergender = 'Required description of your gender'
    }
    if (values.location && values.location.address) {
        errors.location = validateLocation(values.location)
    }
    if(values.salary && !values.period){
        errors.salary = 'Choose the period of the payment';
    }
    if(values.period && (!values.salary || values.salary === "0")){
        errors.period = 'Enter amount of from salary';
    }
    if(values.perks) {
        errors.perks = validatePerks(values.perks);
    }
    return errors
}

export default validate;