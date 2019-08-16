import React from 'react';

import { VisibleOnlyCompany } from '../app/ducks/wrappers/company';
import { VisibleOnlyCandidate } from '../app/ducks/wrappers/candidate';
import { HiddenOnlyAuth } from '../app/ducks/wrappers/authentication';

import NotFound from '../app/components/NotFound'
import CompanyShortlist from './components/Company';

const CompanyShortlistAuth = VisibleOnlyCompany(() => <CompanyShortlist />);
const CandidateShortlistAuth = VisibleOnlyCandidate(() => <NotFound />);
const Default = HiddenOnlyAuth(() => <NotFound />)

const ShortlistPage = () => (
    <>
        <CompanyShortlistAuth />
        <CandidateShortlistAuth />
        <Default />
    </>
);

export default ShortlistPage;