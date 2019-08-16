import types from './types.js';

// const changePage = (page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education) => ({
//     type:types.SEARCH, 
//     page,
//     text,
//     status,
//     city,
//     industry,
//     jobtype,
//     senioritylevel, 
//     yearsofexperience, 
//     education
// })

// const doShortlist = (id, page, text, status, city, industry, jobtype, senioritylevel, yearsofexperience, education) => ({
//     type:types.SHORTLIST, 
//     id,
//     page,
//     text,
//     status,
//     city,
//     industry,
//     jobtype,
//     senioritylevel, 
//     yearsofexperience, 
//     education
// })

const changePage = (page) => ({
    type:types.GET_CANDIDATES_REQUEST, 
    page
})

export {
    changePage,
    // doShortlist
}