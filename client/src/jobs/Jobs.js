import React from 'react';

import { VisibleOnlyCompany } from '../app/ducks/wrappers/company';
import { VisibleOnlyCandidate } from '../app/ducks/wrappers/candidate';
import { HiddenOnlyAuth } from '../app/ducks/wrappers/authentication';

import NotFound from '../app/components/NotFound'
import CompanyJobs from './components/Company';

const CompanyJobsAuth = VisibleOnlyCompany(() => <CompanyJobs />);
const CandidateJobsAuth = VisibleOnlyCandidate(() => <NotFound />);
const Default = HiddenOnlyAuth(() => <NotFound />)

const JobsPage = () => (
    <>
        <CompanyJobsAuth />
        <CandidateJobsAuth />
        <Default />
    </> 
)

export default JobsPage;