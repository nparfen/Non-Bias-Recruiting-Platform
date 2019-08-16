import types from './types.js';

// const changePage = (page, status) => ({
//     type:types.JOBS_SEARCH, 
//     page,
//     status
// })

// const doShortlist = id => ({
//     type:types.DO_SHORTLIST, 
//     id
// })

const changePage = (page, status) => ({
    type:types.GET_JOBS_REQUEST, 
    page,
    status
})

export {
    changePage,
    // doShortlist
}