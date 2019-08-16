// import types from './types';
import { default as commonTypes } from '../../app/ducks/types';

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


// const paginate = (items, page = 1, itemsPerPage = 9) => {
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
    candidates: [],
    pageCount: 0,
    page: 1,
}

const shortlistReducer = (state = initialState, action) => {
    switch (action.type) {
    // case types.SHORTLIST_SEARCH:{

    //     let newCandidates = []

    //     if(localStorage.getItem('shortlist') !== null) {

    //         const shortlistArray= JSON.parse(localStorage.getItem('shortlist'))
    //         const inShortlist = candidates.filter(obj => shortlistArray.includes(obj.id))

    //         newCandidates = inShortlist.filter(obj => {
                
    //             const haveStatus = action.status !== "" ?
    //                 obj.status === action.status
    //                 :
    //                 obj.status === "applied" || obj.status === "no-status" || obj.status === "interviewing" || obj.status === "declined" || obj.status === "hired"

    //             return haveStatus
    //         })
    //     }

    //     const pagination = paginate(newCandidates, action.page)

    //     return {
    //         data: pagination.data,
    //         pageCount: pagination.totalPages,
    //         page: pagination.page
    //     }
    // }
    // case types.REMOVE_FROM_SHORTLIST:{

    //     if(localStorage.getItem('shortlist') !== null) {
    //         const shortlistArray= JSON.parse(localStorage.getItem('shortlist'))
    //         const newShortlist = shortlistArray.filter(id => action.id !== id)
    //         localStorage.setItem('shortlist', JSON.stringify(newShortlist));
    //     }

    //     return {
    //         ...state,
    //         data: state.data.filter(obj => action.id !== obj.id)
    //     }
    // }
    case commonTypes.RESET_DATA:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default shortlistReducer;