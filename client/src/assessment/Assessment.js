import React from 'react';

import { VisibleOnlyCompany } from '../app/ducks/wrappers/company';
import { VisibleOnlyCandidate } from '../app/ducks/wrappers/candidate';
import { HiddenOnlyAuth } from '../app/ducks/wrappers/authentication';

import NotFound from '../app/components/NotFound'
import { CompanyAssessmentTests, CandidateAssessmentTests } from './components/Tests';

const CompanyAssessmentTestsAuth = VisibleOnlyCompany(() => <CompanyAssessmentTests />);
const CandidateAssessmentTestsAuth = VisibleOnlyCandidate(() => <CandidateAssessmentTests />);
const Default = HiddenOnlyAuth(() => <NotFound />)

const AssessmentPage = () => (
    <>
        <CompanyAssessmentTestsAuth />
        <CandidateAssessmentTestsAuth />
        <Default />
    </>
);

export default AssessmentPage;