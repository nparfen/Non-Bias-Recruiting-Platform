import React from 'react';
import { connect } from 'react-redux';

import { VisibleOnlyCompany } from '../app/ducks/wrappers/company';
import { VisibleOnlyCandidate } from '../app/ducks/wrappers/candidate';

import { CompanyProfileForm, CandidateProfileForm } from './components/Form';
import { setProfile } from './ducks/actions';

let CompanyProfileWrapper = ({ setProfile }) => 
    <CompanyProfileForm onSubmit={values => setProfile(values, 'CompanyProfileForm')} />

CompanyProfileWrapper = connect(null, { setProfile })(CompanyProfileWrapper);

let CandidateProfileWrapper = ({ setProfile }) => 
    <CandidateProfileForm onSubmit={values => setProfile(values, 'CandidateProfileForm')} />

CandidateProfileWrapper = connect(null, { setProfile })(CandidateProfileWrapper);

const CompanyProfileAuth = VisibleOnlyCompany(() => <CompanyProfileWrapper />);
const CandidateProfileAuth = VisibleOnlyCandidate(() => <CandidateProfileWrapper />)

const ProfilePage = () => (
    <>
        <CompanyProfileAuth />
        <CandidateProfileAuth />
    </> 
)

export default ProfilePage;