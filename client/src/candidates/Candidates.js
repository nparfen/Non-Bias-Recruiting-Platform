import React from 'react';

import { VisibleOnlyCompany } from '../app/ducks/wrappers/company';
import { VisibleOnlyCandidate } from '../app/ducks/wrappers/candidate';
import { HiddenOnlyAuth } from '../app/ducks/wrappers/authentication';

import NotFound from '../app/components/NotFound'
import CompanyCandidates from './components/Company';

const CompanyCandidatesAuth = VisibleOnlyCompany(() => <CompanyCandidates />);
const CandidateCandidatesAuth = VisibleOnlyCandidate(() => <NotFound />);
const Default = HiddenOnlyAuth(() => <NotFound />)

const CandidatesPage = () => (
    <>
        <CompanyCandidatesAuth />
        <CandidateCandidatesAuth />
        <Default />
    </>
)

export default CandidatesPage;