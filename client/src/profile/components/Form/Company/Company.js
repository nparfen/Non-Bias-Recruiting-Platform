import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';

import { Events, scrollSpy } from 'react-scroll';

import SidebarSection from './Sidebar';
import CompanyInformationSection from './CompanyInformation';
import LocationsSection from './Locations';
import PerksAndBenefitsSection from './PerksAndBenefits';
import AssessmentSection from './Assessment';
import RepresentativeSection from './Representative';
import SocialNetworksSection from './SocialNetworks';
import PreviewSection from './Preview';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import validate from './validation';

import { changeProfilePage } from '../../../ducks/actions'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        margin: "32px auto",
        paddingLeft: '24px',
        paddingRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            paddingLeft: '0px',
            paddingRight: '0px',
        },
    },
    buttonsSection: {
        position: "sticky",
        bottom: 0,
        zIndex: 6,
        minHeight: "80px", 
        backgroundColor: "#ffffff",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems:"center",
    },
    button: {
        height: 50,
        borderRadius: 3,
        border: 0,
        marginLeft: "24px",
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        '&:disabled':{
            color: "#f9f9f9"
        },
    },
    outlinedButton: {
        height: 50,
        borderRadius: 3,
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        marginTop: "0px",
        marginLeft: "0px",
        border: "solid 2px " + theme.palette.secondary.main,
        '&:hover':{
            border: "solid 2px " + theme.palette.secondary.main,
        },
        '&:disabled':{
            border: "solid 2px"
        },
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
});

class CompanyProfileForm extends Component {
    
    componentDidMount () {
        Events.scrollEvent.register('begin', function () {})
        Events.scrollEvent.register('end', function () {})
        scrollSpy.update()
    }

    componentWillUnmount () {
        Events.scrollEvent.remove('begin')
        Events.scrollEvent.remove('end')
    }

    render() {

        const { 
            classes, redux: { page, formName }, 
            changeProfilePage, addLogo, addCover, setCoords, addPhotos, addMember, addSocial, addRepresentative, addTags,
            handleSubmit, reset, pristine, submitting, invalid 
        } = this.props;

        return (
            page === "form" ?
                <Grid 
                    container
                    direction="row"
                    className={classes.container}
                >
                    <SidebarSection />
                    <Grid 
                        item
                        xs={12}
                        sm={9}
                        className={classes.rightContainer}
                    >   
                        <form onSubmit={handleSubmit}>
                            <CompanyInformationSection 
                                previewDisabled={submitting || invalid}
                                changeToPreview={() => changeProfilePage("view")}
                                addLogo={addLogo}
                                addCover={addCover}
                                formName={formName}
                            />
                            <LocationsSection 
                                formName={formName}
                                setCoords={setCoords}
                                addPhotos={addPhotos}
                                addMember={addMember}
                            />
                            <PerksAndBenefitsSection
                                formName={formName}
                                addTags={addTags}
                            />
                            <AssessmentSection 
                                shareLink="https://aspire.io/awe7fwew6wefw7otyty8fg"
                                assessmentResult={{
                                    culture:[{type:"hierarchy", data:[{current:26.32},{preferred:29.41}]},
                                        {type:"clan", data:[{current:25.27},{preferred:25.27}]},
                                        {type:"adhocracy", data:[{current:29.41},{preferred:26.32}]},
                                        {type:"market", data:[{current:18.99},{preferred:18.99}]}],
                                    personalities:[{type:"hierarchy",value:26},
                                        {type:"clan",value:24},
                                        {type:"adhocracy",value:28},
                                        {type:"market",value:22}]
                                }}
                            />
                            <RepresentativeSection
                                formName={formName}
                                addRepresentative={addRepresentative}
                            />
                            <SocialNetworksSection 
                                formName={formName}
                                addSocial={addSocial}
                            />
                            {!(pristine || invalid) &&
                                <div className={classes.buttonsSection}>
                                    <Button 
                                        className={classes.outlinedButton}
                                        type="button"
                                        variant="outlined" 
                                        color="secondary"
                                        onClick={reset} 
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        className={classes.button}
                                        type="submit"
                                        variant="contained" 
                                        color="primary"
                                        disabled={submitting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            }
                        </form>
                    </Grid>
                </Grid>
                :
                <PreviewSection
                    submit={handleSubmit} 
                    changeToForm={() => changeProfilePage("form")}
                    formName={formName}
                    pristine={pristine} 
                    submitting={submitting}
                    assessmentResult={{
                        culture:[{type:"hierarchy", data:[{current:26.32},{preferred:29.41}]},
                            {type:"clan", data:[{current:25.27},{preferred:25.27}]},
                            {type:"adhocracy", data:[{current:29.41},{preferred:26.32}]},
                            {type:"market", data:[{current:18.99},{preferred:18.99}]}]
                    }}
                />

        );
    }
}

const mapStateToProps = (state) => ({
    redux: {
        page: state.profile.page,
        formName: "CompanyProfileForm",
    },
    initialValues: state.user.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeProfilePage: (page) => dispatch(changeProfilePage(page)),
        addLogo: (value) => dispatch(change('CompanyProfileForm', 'uploadlogo', value)),
        addCover: (value) => dispatch(change('CompanyProfileForm', 'uploadcover', value)),
        setCoords: (member, value) => dispatch(change('CompanyProfileForm', `${member}.coords`, value)),
        addPhotos: (value) => dispatch(change('CompanyProfileForm', 'ouroffice', value)),
        addMember: (value) => dispatch(change('CompanyProfileForm', 'members', value)),
        addSocial: (name, value) => dispatch(change('CompanyProfileForm', name, value)),
        addRepresentative: (value) => dispatch(change('CompanyProfileForm', 'representative', value)),
        addTags: (name, value) => dispatch(change('CompanyProfileForm', name, value))
    };
};

CompanyProfileForm = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    form: 'CompanyProfileForm',
    validate
})(CompanyProfileForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CompanyProfileForm));