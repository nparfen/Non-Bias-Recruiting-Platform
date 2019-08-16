import React, { Component } from 'react';
import { connect } from 'react-redux';

import { VisibleOnlyCompany } from '../../app/ducks/wrappers/company';
import { HiddenOnlyAuth } from '../../app/ducks/wrappers/authentication';

import NotFound from '../../app/components/NotFound'
import CreateJobForm from './components/Form';

import { createJob } from './ducks/actions';

class CreateJobWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "active"
        };
    }

    changeStatus = (value) => this.setState({ status: value })

    render() {

        const { status } = this.state
        const { createJob } = this.props

        return (
            <CreateJobForm
                onSubmit={values => createJob(status, values, 'CreateJobForm')} 
                changeStatus={this.changeStatus}
            />
        )
    }
}

CreateJobWrapper = connect(
    null,
    {
        createJob,
    }
)(CreateJobWrapper);

const CreateJobAuth = VisibleOnlyCompany(() => <CreateJobWrapper />);
const Default = HiddenOnlyAuth(() => <NotFound />)

const CreateJobPage = () => (
    <>
        <CreateJobAuth />
        <Default />
    </> 
)

export default CreateJobPage;