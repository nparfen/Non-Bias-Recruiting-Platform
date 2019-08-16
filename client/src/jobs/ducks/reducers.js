import types from './types';
import { default as commonTypes } from '../../app/ducks/types';

// const jobs = [
//     { id: 1, status: "active", jobtitle: "Editor", company: "Forbes", salary: "£50 000 – £75 000 per year", city: "Washington, DC", date: "15 Aug 2018"},
//     { id: 2, status: "draft", jobtitle: "Senior Editor", company: "Forbes", salary: "£70 000 – £100 000 per year", city: "London", date: "26 Jul 2018"},
//     { id: 3, status: "closed", jobtitle: "Editor", company: "Forbes", salary: "£40 000 – £60 000 per year", city: "London", date: "26 Jul 2018"},
//     { id: 4, status: "active", jobtitle: "Editor", company: "Forbes", salary: "£50 000 – £75 000 per year", city: "Washington, DC", date: "15 Aug 2018"},
//     { id: 5, status: "draft", jobtitle: "Senior Editor", company: "Forbes", salary: "£70 000 – £100 000 per year", city: "London", date: "26 Jul 2018"},
//     { id: 6, status: "closed", jobtitle: "Editor", company: "Forbes", salary: "£40 000 – £60 000 per year", city: "London", date: "26 Jul 2018"},
//     { id: 7, status: "active", jobtitle: "Editor", company: "Forbes", salary: "£50 000 – £75 000 per year", city: "Washington, DC", date: "15 Aug 2018"},
//     { id: 8, status: "draft", jobtitle: "Senior Editor", company: "Forbes", salary: "£70 000 – £100 000 per year", city: "London", date: "26 Jul 2018"},
//     { id: 9, status: "closed", jobtitle: "Editor", company: "Forbes", salary: "£40 000 – £60 000 per year", city: "London", date: "26 Jul 2018"}
// ]

// const candidates = [
//     {id: 1, skills: 50, culture: 90, values: 60, education: "No education", yearsofexperience: "No experience", senioritylevel: "Low middle", jobtype: "Full-time", industry: "Industry 1", status: "applied", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 2, skills: 30, culture: 40, values: 43, education: "Education 4", yearsofexperience: "No experience", senioritylevel: "Trainee", jobtype: "Permanent", industry: "Industry 2", status: "applied", city: "Madrid", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 3, skills: 60, culture: 20, values: 59, education: "Education 4", yearsofexperience: "Less than 1 year", senioritylevel: "Low Junior", jobtype: "Full-time", industry: "Industry 4", status: "interviewing", city: "Rome", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 4, skills: 80, culture: 30, values: 23, education: "Education 1", yearsofexperience: "3–5 years", senioritylevel: "Low middle", jobtype: "Permanent", industry: "Industry 5", status: "no-status", city: "New York", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 5, skills: 20, culture: 50, values: 89, education: "No education", yearsofexperience: "3–5 years", senioritylevel: "Low Junior", jobtype: "Full-time", industry: "Industry 2", status: "applied", city: "Rome", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 6, skills: 50, culture: 20, values: 45, education: "Education 1", yearsofexperience: "No experience", senioritylevel: "High Junior", jobtype: "Contract", industry: "Industry 3", status: "applied", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 7, skills: 80, culture: 70, values: 90, education: "No education", yearsofexperience: "No experience", senioritylevel: "Middle Junior", jobtype: "Contract", industry: "Industry 4", status: "no-status", city: "Madrid", name: "Senior Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 8, skills: 90, culture: 60, values: 60, education: "Education 2", yearsofexperience: "Less than 1 year", senioritylevel: "Trainee", jobtype: "Part-time", industry: "Industry 1", status: "hired", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 9, skills: 10, culture: 40, values: 30, education: "Education 2", yearsofexperience: "1–3 years", senioritylevel: "Trainee", jobtype: "Temporary", industry: "Industry 1", status: "applied", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 10, skills: 60, culture: 80, values: 20, education: "No education", yearsofexperience: "1–3 years", senioritylevel: "Middle Junior", jobtype: "Part-time", industry: "Industry 5", status: "declined", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 11, skills: 70, culture: 20, values: 76, education: "Education 3", yearsofexperience: "More than 5 years", senioritylevel: "High Junior", jobtype: "Temporary", industry: "Industry 4", status: "no-status", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."},
//     {id: 12, skills: 40, culture: 90, values: 14, education: "Education 3", yearsofexperience: "More than 5 years", senioritylevel: "Trainee", jobtype: "Full-time", industry: "Industry 3", status: "no-status", city: "New York", name: "Editor", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et."}
// ]

// const paginate = (items, page = 1, itemsPerPage = 7) => {
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
    pageCount: 0,
    page: 1,
    loading: false,
    error: null,
    jobs: [],
    candidates: [],
}

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.GET_JOBS_LOADING: {
        return {
            ...state,
            error: null,
            loading: true
        }
    }
    case types.GET_JOBS_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    case types.GET_JOBS_SUCCESS: {
        return {
            ...state,
            loading: false,
            jobs: action.data.docs,
            page: action.data.page,
            pageCount: action.data.totalPages,
        }
    }
    // case types.JOBS_SEARCH:{

    //     const newJobs = jobs.filter(obj => {

    //         const haveStatus = action.status !== "jobs" ?
    //             obj.status === action.status
    //             :
    //             obj.status === "active" || obj.status === "draft" || obj.status === "closed"

    //         return haveStatus
    //     })

    //     const pagination = paginate(newJobs, action.page)

    //     return {
    //         ...state,
    //         data: pagination.data,
    //         pageCount: pagination.totalPages,
    //         page: pagination.page
    //     }
    // }
    // case types.DO_SHORTLIST:{

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
    //         candidates: state.candidates.map(obj => obj.id === action.id ? { ...obj, inShortlist: !obj.inShortlist } : obj)
    //     }
    // }
    case commonTypes.RESET_DATA:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default jobsReducer;