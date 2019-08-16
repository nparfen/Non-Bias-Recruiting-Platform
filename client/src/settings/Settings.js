import React from 'react';
import { connect } from 'react-redux';

import { changeSettings } from './ducks/actions';

import { VisibleOnlyAuth, HiddenOnlyAuth } from '../app/ducks/wrappers/authentication';

import NotFound from '../app/components/NotFound'
import SettingsForm from './components/Form';

let SettingsWrapper = ({ changeSettings }) => 
    <SettingsForm onSubmit={(values) => changeSettings("SettingsForm")} />

SettingsWrapper = connect(null, { changeSettings })(SettingsWrapper);

const SettingsAuth = VisibleOnlyAuth(() => <SettingsWrapper />);
const Default = HiddenOnlyAuth(() => <NotFound />)

const SettingsPage = () => (
    <>
        <SettingsAuth />
        <Default />
    </>
);

export default SettingsPage;