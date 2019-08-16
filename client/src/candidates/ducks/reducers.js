// import _ from 'lodash';
import types from './types';
import { default as commonTypes } from '../../app/ducks/types';

// const candidates = [
//     {id: 1, inShortlist: false, skills: 50, culture: 90, values: 60, education: "No education", yearsofexperience: "No experience", senioritylevel: "Low middle", jobtype: "Full-time", industry: "Industry 1", status: "applied", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 2, inShortlist: false, skills: 30, culture: 40, values: 43, education: "Education 4", yearsofexperience: "No experience", senioritylevel: "Trainee", jobtype: "Permanent", industry: "Industry 2", status: "applied", city: "Madrid", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 3, inShortlist: false, skills: 60, culture: 20, values: 59, education: "Education 4", yearsofexperience: "Less than 1 year", senioritylevel: "Low Junior", jobtype: "Full-time", industry: "Industry 4", status: "interviewing", city: "Rome", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 4, inShortlist: false, skills: 80, culture: 30, values: 23, education: "Education 1", yearsofexperience: "3–5 years", senioritylevel: "Low middle", jobtype: "Permanent", industry: "Industry 5", status: "no-status", city: "New York", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 5, inShortlist: false, skills: 20, culture: 50, values: 89, education: "No education", yearsofexperience: "3–5 years", senioritylevel: "Low Junior", jobtype: "Full-time", industry: "Industry 2", status: "applied", city: "Rome", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 6, inShortlist: false, skills: 50, culture: 20, values: 45, education: "Education 1", yearsofexperience: "No experience", senioritylevel: "High Junior", jobtype: "Contract", industry: "Industry 3", status: "applied", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 7, inShortlist: false, skills: 80, culture: 70, values: 90, education: "No education", yearsofexperience: "No experience", senioritylevel: "Middle Junior", jobtype: "Contract", industry: "Industry 4", status: "no-status", city: "Madrid", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 8, inShortlist: false, skills: 90, culture: 60, values: 60, education: "Education 2", yearsofexperience: "Less than 1 year", senioritylevel: "Trainee", jobtype: "Part-time", industry: "Industry 1", status: "hired", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 9, inShortlist: false, skills: 10, culture: 40, values: 30, education: "Education 2", yearsofexperience: "1–3 years", senioritylevel: "Trainee", jobtype: "Temporary", industry: "Industry 1", status: "applied", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 10, inShortlist: false, skills: 60, culture: 80, values: 20, education: "No education", yearsofexperience: "1–3 years", senioritylevel: "Middle Junior", jobtype: "Part-time", industry: "Industry 5", status: "declined", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 11, inShortlist: false, skills: 70, culture: 20, values: 76, education: "Education 3", yearsofexperience: "More than 5 years", senioritylevel: "High Junior", jobtype: "Temporary", industry: "Industry 4", status: "no-status", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 12, inShortlist: false, skills: 40, culture: 90, values: 14, education: "Education 3", yearsofexperience: "More than 5 years", senioritylevel: "Trainee", jobtype: "Full-time", industry: "Industry 3", status: "no-status", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."}
// ]

// const paginate = (items, page = 1, itemsPerPage = 10) => {
//     const offset = (page - 1) * itemsPerPage;
//     const paginatedItems = items.slice(offset).slice(0, itemsPerPage);
//     const totalPages = Math.ceil(items.length / itemsPerPage);
//     return {
//         page: page,
//         perPage: itemsPerPage,
//         total: items.length,
//         totalPages: totalPages,
//         data: paginatedItems
//     };
// }

const initialState = {
    data: [],
    pageCount: 0,
    page: 1,

    loading: false,
    error: null,
    candidates: []
}

const candidatesReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.GET_CANDIDATES_LOADING: {
        return {
            ...state,
            error: null,
            loading: true
        }
    }
    case types.GET_CANDIDATES_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    case types.GET_CANDIDATES_SUCCESS: {
        return {
            ...state,
            loading: false,
            candidates: action.data.docs,
            page: action.data.page,
            pageCount: action.data.totalPages,
        }
    }
    // case types.SEARCH:{

    //     const activeIndustryCount = _.reduce(action.industry, function(result, value) {
    //         if(_.values(value)[0] === true) {
    //             return result + 1
    //         }
    //         return result
    //     }, 0);

    //     const activeJobTypeCount = _.reduce(action.jobtype, function(result, value) {
    //         if(_.values(value)[0] === true) {
    //             return result + 1
    //         }
    //         return result
    //     }, 0);

    //     const activeSeniorityLevelCount = _.reduce(action.senioritylevel, function(result, value) {
    //         if(_.values(value)[0] === true) {
    //             return result + 1
    //         }
    //         return result
    //     }, 0);

    //     const activeYearsOfExperienceCount = _.reduce(action.yearsofexperience, function(result, value) {
    //         if(_.values(value)[0] === true) {
    //             return result + 1
    //         }
    //         return result
    //     }, 0);

    //     const activeEducationCount = _.reduce(action.education, function(result, value) {
    //         if(_.values(value)[0] === true) {
    //             return result + 1
    //         }
    //         return result
    //     }, 0);
        
    //     const newCandidates = candidates.filter(obj => {
            
    //         const haveStatus = action.status !== "" ?
    //             obj.status === action.status
    //             :
    //             obj.status === "applied" || obj.status === "no-status" || obj.status === "interviewing" || obj.status === "declined" || obj.status === "hired"

    //         const fromCity = action.city !== "" ?
    //             obj.city === action.city
    //             :
    //             obj.city === "Rome" || obj.city === "New York" || obj.city === "Madrid"
            
    //         const industry1 = action.industry[0].industry1 && obj.industry === "Industry 1"
    //         const industry2 = action.industry[1].industry2 && obj.industry === "Industry 2"
    //         const industry3 = action.industry[2].industry3 && obj.industry === "Industry 3"
    //         const industry4 = action.industry[3].industry4 && obj.industry === "Industry 4"
    //         const industry5 = action.industry[4].industry5 && obj.industry === "Industry 5"

    //         const involveIndustry = activeIndustryCount > 0 ? 
    //             industry1 || industry2 || industry3 || industry4 || industry5
    //             :
    //             true

    //         const fulltime = action.jobtype[0].fulltime && obj.jobtype === "Full-time"
    //         const permanent = action.jobtype[1].permanent && obj.jobtype === "Permanent"
    //         const contract = action.jobtype[2].contract && obj.jobtype === "Contract"
    //         const temporary = action.jobtype[3].temporary && obj.jobtype === "Temporary"
    //         const parttime = action.jobtype[4].parttime && obj.jobtype === "Part-time"

    //         const involveJobType = activeJobTypeCount > 0 ? 
    //             fulltime || permanent || contract || parttime || temporary
    //             :
    //             true

    //         const trainee = action.senioritylevel[0].trainee && obj.senioritylevel === "Trainee"
    //         const lowjunior = action.senioritylevel[1].lowjunior && obj.senioritylevel === "Low Junior"
    //         const middlejunior = action.senioritylevel[2].middlejunior && obj.senioritylevel === "Middle Junior"
    //         const highjunior = action.senioritylevel[3].highjunior && obj.senioritylevel === "High Junior"
    //         const lowmiddle = action.senioritylevel[4].lowmiddle && obj.senioritylevel === "Low middle"
    
    //         const involveSeniorityLevel= activeSeniorityLevelCount > 0 ? 
    //             trainee || lowjunior || middlejunior || highjunior || lowmiddle
    //             :
    //             true
            
    //         const noexperience = action.yearsofexperience[0].noexperience && obj.yearsofexperience === "No experience"
    //         const lessthanoneyear = action.yearsofexperience[1].lessthanoneyear && obj.yearsofexperience === "Less than 1 year"
    //         const onethreeyears = action.yearsofexperience[2].onethreeyears && obj.yearsofexperience === "1–3 years"
    //         const threefiveyears = action.yearsofexperience[3].threefiveyears && obj.yearsofexperience === "3–5 years"
    //         const morethanfiveyears = action.yearsofexperience[4].morethanfiveyears && obj.yearsofexperience === "More than 5 years"
    
    //         const involveYearsOfExperience = activeYearsOfExperienceCount > 0 ? 
    //             noexperience || lessthanoneyear || onethreeyears || threefiveyears || morethanfiveyears
    //             :
    //             true
    
    //         const noeducation = action.education[0].noeducation && obj.education === "No education"
    //         const education1 = action.education[1].education1 && obj.education === "Education 1"
    //         const education2 = action.education[2].education2 && obj.education === "Education 2"
    //         const education3 = action.education[3].education3 && obj.education === "Education 3"
    //         const education4 = action.education[4].education4 && obj.education === "Education 4"
    
    //         const involveEducation = activeEducationCount > 0 ? 
    //             noeducation || education1 || education2 || education3 || education4
    //             :
    //             true

    //         return (
    //             (obj.name.toLowerCase().indexOf(action.text.toLowerCase()) !== -1 ||
    //             obj.desc.toLowerCase().indexOf(action.text.toLowerCase()) !== -1) &&
    //             haveStatus && fromCity && involveIndustry && involveJobType && involveSeniorityLevel && involveYearsOfExperience && involveEducation
    //         )
    //     })

    //     let shortlistedCandidates = []

    //     if(localStorage.getItem('shortlist') !== null) {
    //         const shortlistArray= JSON.parse(localStorage.getItem('shortlist'))
    //         shortlistedCandidates = newCandidates.map(obj => shortlistArray.includes(obj.id) ? { ...obj, inShortlist: true } : obj)
    //     }

    //     const pagination = paginate(shortlistedCandidates.length === 0 ? newCandidates : shortlistedCandidates, action.page)

    //     return {
    //         data: pagination.data,
    //         pageCount: pagination.totalPages,
    //         page: pagination.page
    //     }
    // }
    // case types.SHORTLIST: {

    //     if(localStorage.getItem('shortlist') !== null) {
    //         const shortlistArray= JSON.parse(localStorage.getItem('shortlist'))
    //         if (shortlistArray.includes(action.id)) {
    //             const newShortlist = shortlistArray.filter(id => action.id !== id)
    //             localStorage.setItem('shortlist', JSON.stringify(newShortlist));
    //         } else {
    //             shortlistArray.push(action.id)
    //             localStorage.setItem('shortlist', JSON.stringify(shortlistArray));
    //         }    
    //     } else {
    //         const newShortlist = [action.id]
    //         localStorage.setItem('shortlist', JSON.stringify(newShortlist));
    //     }

    //     return {
    //         ...state,
    //         data: state.data.map(obj => obj.id === action.id ? { ...obj, inShortlist: !obj.inShortlist } : obj)
    //     }
    // }
    case commonTypes.RESET_DATA:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default candidatesReducer;