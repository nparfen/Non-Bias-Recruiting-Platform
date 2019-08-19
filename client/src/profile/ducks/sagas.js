import { call, select, put, take } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';
import axios from "axios";

import { default as commonTypes } from '../../app/ducks/types';
import { default as assessmentTypes } from '../../assessment/ducks/types';
import types from './types';

import { toast } from 'react-toastify';

const me = (token) => {
    return axios({
        method: "get",
        url: process.env.REACT_APP_API_URL+"/me",
        headers: {
            'authorization': token
        }
    });
}

const update = (token, email, data) => {
    return axios({
        method: "put",
        url: process.env.REACT_APP_API_URL+"/me",
        headers: {
            'authorization': token
        },
        data: {
            email: email,
            data: {
                ...data
            }
        }
    });
}

const candidate = {
    dateofbirth: null,
    relocation: false,
    location:{
        address: "",
        coords: ""
    },
    hardskills: [],
    softskills: [],
    preferredcompanyculture: true,
    preferredperksandbenefits: true,
    perks: [
        {value:"",title: "… makes sure their team has a good work-life balance", description: "(e.g. flexible working hours, children creche, on-site childcare, dog friendly office, working from home opportunities, maternity and paternity benefits)"},
        {value:"",title: "… provides plenty of opportunities to ensure financial freedom", description: "(individual and company performance based bonus scheme, affiliate scheme, clear career development plan, promotion opportunities, overtime pay)"},
        {value:"",title: "… passionates about making a positive difference to our community and the world", description: "(e.g. active apprentice program, engagement with selected charities, environmentally friendly programs)"},
        {value:"",title: "… invests in our team’s healthy lifestyle", description: "(e.g. gym membership, free fruit in the office, office yoga, outdoor working space, medical benefits, access to life coach)"},
        {value:"",title: "… ensures plenty of opportunities to develop their team’s professional and personal skills", description: "(e.g. on-going training programs, paid or subsidised professional courses, one-to-one coaching and mentoring)"}
    ],
    experience: [],
    education: [],
    courses: []
}

const company = {
    locations: [
        {
            address: "",
            coords: ""
        }
    ],
    members:[],
    ouroffice:[],
    perksandbenefits: {
        worklifebalance:[],
        compensation:[],
        environmentcommunity:[],
        wealthhealth:[],
        developmentgrowth:[]
    },
    currentcompanyculture: true,
    preferredcompanyculture: true,
    representative:{}
}

const defaultAssessment = {
    data: {
        culture: null,
        personalities: null,
        values: null
    }
}

function* getMeFlow(){
    while (true) {
        yield take(commonTypes.GET_ME_REQUEST);
        yield put({ type: commonTypes.GET_ME_LOADING });
        try {
            const state = yield select();
            const meResult = yield call(me, state.auth.token);
            
            if(meResult.data.data.assessment) {
                if(meResult.data.data.assessment.data.culture) {
                    yield put({ 
                        type: assessmentTypes.SET_CULTURE_ASSESSMENT, 
                        culture: meResult.data.data.assessment.data.culture 
                    })
                }
                if(meResult.data.data.assessment.data.personalities) {
                    yield put({ 
                        type: assessmentTypes.SET_PERSONALITIES_ASSESSMENT, 
                        personalities: meResult.data.data.assessment.data.personalities 
                    })
                }
                if(meResult.data.data.assessment.data.values) {
                    yield put({ 
                        type: assessmentTypes.SET_VALUES_ASSESSMENT, 
                        values: meResult.data.data.assessment.data.values 
                    })
                }
            }

            yield put({
                type: commonTypes.GET_ME_SUCCESS,
                role: meResult.data.role,
                id: meResult.data.id,
                data: {
                    ...(meResult.data.role === 'company' ? company : candidate),
                    email: meResult.data.email,
                    ...meResult.data.data,
                    assessment: meResult.data.data.assessment ? meResult.data.data.assessment : defaultAssessment
                }
            })

        } catch (error) {
            toast.error(error.response.data.message);
            yield put({type: commonTypes.GET_ME_FAILURE})
        }
    }
}

function* setProfileFlow(){
    while (true) {
        let { data: { email, ...data}, formId } = yield take(types.SET_PROFILE_REQUEST);
        yield put(startSubmit(formId));
        try {
            const state = yield select();
            const updateResult = yield call(update, state.auth.token, email, data);
            
            yield put({
                type: commonTypes.GET_ME_SUCCESS,
                role: updateResult.data.role,
                id: updateResult.data.id,
                data: {
                    ...(updateResult.data.role === 'company' ? company : candidate),
                    email: updateResult.data.email,
                    ...updateResult.data.data
                }
            })

            yield put(reset(formId))
            toast.success("🥳 Profile is changed!");
            yield put(stopSubmit(formId));
        } catch (error) {
            toast.error(error.response.data.message);
            yield put(stopSubmit(formId));
        }
    }
}

export {
    setProfileFlow,
    getMeFlow
};