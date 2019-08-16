import { isValidNumber } from 'libphonenumber-js'

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
};

const validateLocation = (location, locationIndex) => {
    let errors = {};
    if (locationIndex === 0){
        if(location.address && !location.coords){
            errors.address = 'Choose the address from the list';
        }
    } else {
        if(!location.address){
            errors.address = 'Enter the address';
        } else {
            if(!location.coords){
                errors.address = 'Choose the address from the list';
            }
        }
    }
   
    return errors;
}
/*
const validateIndustry = (industry) => {
    let errors = {};
    if (industry.name && !industry.status) {
        errors.name = 'Select industry from the list'
    }
    return errors;
}*/

const validate = values => {
    const errors = {}
    if(!values.companyname) {
        errors.companyname = 'Required company name'
    }
    if(values.website && !isValidURL(values.website)) {
        errors.website = 'Invalid website url'
    }
    if(values.phone && !isValidNumber(values.phone)) {
        errors.phone = 'Invalid phone number'
    }
    if(values.whatwedo && values.whatwedo.length > 400) {
        errors.whatwedo = 'Must be 400 characters or less'
    }
    if(values.whywedowhatwedo && values.whywedowhatwedo.length > 400) {
        errors.whywedowhatwedo = 'Must be 400 characters or less'
    }
    if(values.weareproudof && values.weareproudof.length > 400) {
        errors.weareproudof = 'Must be 400 characters or less'
    }
    if (!values.locations || !values.locations.length) {
        errors.locations = { _error: 'At least one location must be entered' }
    } else {
        const locationsArrayErrors = []
        values.locations.forEach((location, locationIndex) => {
            locationsArrayErrors[locationIndex] = validateLocation(location, locationIndex)
        });
        if (locationsArrayErrors.length) {
            errors.locations = locationsArrayErrors
        }
    }
    /*if (values.industry && values.industry.name) {
        errors.industry = validateIndustry(values.industry)
    }*/
    return errors
}

export default validate;