const validateSalary = salary => {
    let errors = {};
    if(salary.from && !salary.period){
        errors.from = 'Choose the period of the payment';
    }
    if(salary.period && (!salary.from || salary.from === "0")){
        errors.period = 'Enter amount of from salary';
    }
    if(salary.to && !salary.from){
        errors.to = 'Enter amount of from salary';
    } else {
        if(salary.to && (Number(salary.to) < Number(salary.from))){
            errors.to = 'To amount should be equal or greater then from';
        }
    }
     
    return errors;
}

const validateCity = city => {
    let errors = {};
    if(city.address && !city.coords){
        errors.address = 'Choose the address from the list';
    }
   
    return errors;
}
 
const validate = values => {
    const errors = {}
    if(!values.jobtitle){
        errors.jobtitle = 'Required job title'
    }
    if(!values.company) {
        errors.company = 'Required company name'
    }
    if(values.introductionforyourjob && values.introductionforyourjob.length > 400) {
        errors.introductionforyourjob = 'Must be 400 characters or less'
    }
    if(values.shortdescriptionoftherole && values.shortdescriptionoftherole.length > 400) {
        errors.shortdescriptionoftherole = 'Must be 400 characters or less'
    }
    if(values.dailyresponsibilitieswillinclude && values.dailyresponsibilitieswillinclude.length > 400) {
        errors.dailyresponsibilitieswillinclude = 'Must be 400 characters or less'
    }
    if(values.city) {
        errors.city = validateCity(values.city) 
    }
    if(values.salary) {
        errors.salary = validateSalary(values.salary) 
    }

    return errors
}

export default validate;