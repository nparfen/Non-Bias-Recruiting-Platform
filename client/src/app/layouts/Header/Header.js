import React from 'react';

import { VisibleOnlyCompany } from '../../ducks/wrappers/company';
import { VisibleOnlyCandidate } from '../../ducks/wrappers/candidate';
import { HiddenOnlyAuth } from '../../ducks/wrappers/authentication';

import CompanyHeader from './Company';
import CandidateHeader from './Candidate';
import DefaultHeader from './Default';

const CompanyHeaderAuth = VisibleOnlyCompany(() => <CompanyHeader />);
const CandidateHeaderAuth = VisibleOnlyCandidate(() => <CandidateHeader />);
const Default = HiddenOnlyAuth(() => <DefaultHeader />)

const Header = () => (
    <>
        <CompanyHeaderAuth />
        <CandidateHeaderAuth />
        <Default />
    </>
)

export default Header;