import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import CropFree from '@material-ui/icons/CropFree';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import OfficeField from './Office';
import TeamField from './Team';

import { FaLinkedinIn, FaFacebookF, FaTwitter, FaTelegram, FaPinterest, FaYoutube, FaInstagram, FaAngellist, FaGlobe } from 'react-icons/fa';

import { Doughnut } from 'react-chartjs-2';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        marginBottom: "32px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: '24px',
        paddingRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            paddingLeft: '0px',
            paddingRight: '0px',
        },
    },
    buttonsSection: {
        width: "100%",
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
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
    imageContainer: {
        marginTop:"24px",
        borderTop: "solid 2px #d8d8d8",
        borderBottom: "solid 2px #d8d8d8",
        maxHeight: "100%",
        maxWidth: "100%", 
        objectFit: "cover",
        width: "100%",
        height: "280px",
        position: "absolute",
        zIndex: "-1",
        "&$fakeImageContainer": {
            backgroundColor: "#f9f9f9"
        }
    },
    fakeImageContainer: {},
    headerContainer: {
        flex: 1
    },
    previewHeader: {
        marginTop: "190px",
        marginBottom: "36px",
        display: "flex"
    },
    avatarContainer: {
        border: "solid 2px #d8d8d8",
        borderRadius: "3px",
        maxHeight: "100%",
        maxWidth: "100%", 
        objectFit: "cover",
        width: "171px",
        height: "171px",
        position: "relative",
        zIndex: "-1",
        "&$fakeAvatarContainer": {
            backgroundColor: "#f9f9f9"
        }
    },
    fakeAvatarContainer: {},
    descTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "12px"
    },
    description: {
        wordBreak: "break-word",
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: "32px",
        "&$lastDescription": {
            marginBottom: "0px"
        }
    },
    lastDescription: {},
    companyName: {
        wordBreak: "break-word",
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "24px",
        marginLeft: "24px"
    },
    industry: {
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "500",
        marginLeft: "24px",
        color: theme.palette.secondary.dark
    },
    titleBottomSection:{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "48px",
    },
    titleDescSection: {
        display: "inline-block",
        marginLeft: "24px"
    },
    subtitleDesc: {
        fontSize: "12px",
        fontWeight: "normal",
    },
    titleDesc: {
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "500",
        color: theme.palette.secondary.dark
    },
    socialButton: {
        display: "inline-block",
        cursor: "pointer",
        borderRadius: "50%",
        margin: "2px",
        marginLeft: "16px",
        padding: "11px",
        width: "40px",
        height: "40px",
        backgroundColor: "#c8c7cc",
        color: "#fff"
    },
    socialIcon:{
        fontSize:"18px"
    },
    perksTitle: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    perksSubtitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "24px",
        marginBottom: "16px"
    },
    tag: {
        wordBreak: "break-word",
        borderRadius: "2px",
        fontWeight: 500,
        display: "inline-block",
        padding: "10px 15px",
        marginRight: "12px",
        marginBottom: "12px",
        whiteSpace: "normal",
        color: theme.palette.primary.main,
        backgroundColor: "#efeff4",
    },
    reprTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "16px"
    },
    reprAvatarContainer:{
        border: "solid 2px #d8d8d8",
        borderRadius: "3px",
        maxHeight: "100%",
        maxWidth: "100%", 
        objectFit: "cover",
        width: "190px",
        height: "140px",
        position: "relative",
        marginBottom: "12px",
        "&$fakeReprAvatarContainer": {
            backgroundColor: "#f9f9f9"
        }
    },
    fakeReprAvatarContainer:{},
    reprName: {
        wordBreak: "break-word",
        fontSize: "18px",
        fontWeight: "500",
    },
    reprPosition:{
        wordBreak: "break-word",
        fontSize: "16px",
        fontWeight: "normal",
    },
    cultureTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "12px"
    },
    cultureDesc: {
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: "24px"
    },
    rootForTable: {
        marginTop: "32px",
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
    },
    tableFooterCell: {
        fontSize: "16px",
        fontWeight: "bold",
        padding: "10px 0",
        borderBottom: "none",
        "&:last-child": {
            paddingRight: "0px"
        },
    },
    tableBodyCell: {
        verticalAlign: "middle",
        fontSize: "16px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark,
        padding: "10px 0",
        borderBottom: "1px solid #efeff4",
        "&:last-child": {
            paddingRight: "0px"
        },
    },
    numericCell: {
        paddingLeft: "24px",
        paddingRight: "16px",
    }
});

class PreviewSection extends Component {

    state = {
        anchorEl: null,
    }

    handleClick = event => this.setState({ anchorEl: event.currentTarget });
    handleClose = () => this.setState({ anchorEl: null });

    render() {

        let { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        let { classes, formValues, changeToForm, submit, assessmentResult: { culture }, pristine, submitting } = this.props;

        let backgroundImage = _.get(formValues, "uploadcover", "");
        let avatar = _.get(formValues, "uploadlogo", "");
        let companyname = _.get(formValues, "companyname", "N/A");
        let industry = _.get(formValues, "industry", "N/A");
        let numberOfEmployees = _.get(formValues, "numberofemployees", "N/A");
        let phone = _.get(formValues, "phone", "N/A");
        let headquaters = _.get(formValues, "locations[0].address", "");

        let whatWeDo = _.get(formValues, "whatwedo", "N/A") ? _.get(formValues, "whatwedo", "N/A") : "N/A";
        let whyWeDoWhatWeDo = _.get(formValues, "whywedowhatwedo", "N/A") ? _.get(formValues, "whywedowhatwedo", "N/A") : "N/A";
        let weAreProudOf = _.get(formValues, "weareproudof", "N/A") ? _.get(formValues, "weareproudof", "N/A") : "N/A";

        let website = _.get(formValues, "website", "");
        let linkedin = _.get(formValues, "linkedin", "");
        let facebook = _.get(formValues, "facebook", "");
        let twitter = _.get(formValues, "twitter", "");
        let pinterest = _.get(formValues, "pinterest", "");
        let youtube = _.get(formValues, "youtube", "");
        let instagram = _.get(formValues, "instagram", "");
        let telegram = _.get(formValues, "telegram", "");
        let angel = _.get(formValues, "angel", "");
        let glassdoor = _.get(formValues, "glassdoor", "");

        let socialLinks = _.reduce([
            [{"name":"website"},{"link":website}],
            [{"name":"linkedin"},{"link":linkedin}],
            [{"name":"twitter"},{"link":twitter}],
            [{"name":"facebook"},{"link":facebook}],
            [{"name":"pinterest"},{"link":pinterest}],
            [{"name":"youtube"},{"link":youtube}],
            [{"name":"instagram"},{"link":instagram}],
            [{"name":"telegram"},{"link":telegram}],
            [{"name":"angel"},{"link":angel}],
            [{"name":"glassdoor"},{"link":glassdoor}]
        ], function(data, element) {
            if(element[1].link !== ""){
                if (data[0].length < 4){
                    data[0].push(element);
                } else {
                    data[1].push(element);
                }
            }
            return data
        }, [[],[]]);

        let worklifeBalance = _.get(formValues, "perksandbenefits.worklifebalance", []);
        let compensation = _.get(formValues, "perksandbenefits.compensation", []);
        let environmentCommunity = _.get(formValues, "perksandbenefits.environmentcommunity", []);
        let wealthHealth = _.get(formValues, "perksandbenefits.wealthhealth", []);
        let developmentGrowth = _.get(formValues, "perksandbenefits.developmentgrowth", []);

        let ourOffice = _.get(formValues, "ouroffice", []);
        let members = _.get(formValues, "members", []);

        let representativeAvatar = _.get(formValues, "representative.avatar", "");
        let representativeFirstname = _.get(formValues, "representative.firstname", "N/A");
        let representativeLastname= _.get(formValues, "representative.lastname", "");
        let representativePosition = _.get(formValues, "representative.position", "N/A");

        let currentCompanyCulture = _.get(formValues, "currentcompanyculture", true);
        let preferredCompanyCulture = _.get(formValues, "preferredcompanyculture", true);

        const getRandomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let currentCultureData = _.reduce(culture, function(data, n) {
            data.push({type:n.type.charAt(0).toUpperCase() + n.type.slice(1), color:getRandomColor(), number:n.data[0].current});
            return data
        }, []);

        let preferredCultureData = _.reduce(culture, function(data, n) {
            data.push({type:n.type.charAt(0).toUpperCase() + n.type.slice(1), color:getRandomColor(), number:n.data[1].preferred});
            return data
        }, []);

        const capitalize = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        return (
            <Fragment>
                {backgroundImage ? 
                    <img className={classes.imageContainer} src={backgroundImage} alt="background"/>
                    : 
                    <div className={classNames(classes.imageContainer, classes.fakeImageContainer)}/>
                }
                <Grid 
                    container
                    direction="row"
                    className={classes.container}
                >
                    <Grid 
                        item
                        xs={12}
                    > 
                        <div className={classes.previewHeader}>
                            <div>
                                {avatar ? 
                                    <img className={classes.avatarContainer} src={avatar} alt="background"/>
                                    : 
                                    <div className={classNames(classes.avatarContainer, classes.fakeAvatarContainer)}/>
                                }
                            </div>
                            <div className={classes.headerContainer}>
                                <Typography
                                    color="primary"
                                    className={classes.companyName}
                                >
                                    {companyname}
                                </Typography>
                                <Typography className={classes.industry}>
                                    {industry}
                                </Typography>
                                <div className={classes.titleBottomSection}>
                                    <div>
                                        <div className={classes.titleDescSection}>
                                            <Typography
                                                color="secondary"
                                                className={classes.subtitleDesc}
                                            >
                                                Number of employees
                                            </Typography>
                                            <Typography className={classes.titleDesc}>
                                                {numberOfEmployees}
                                            </Typography>
                                        </div> 
                                        <div className={classes.titleDescSection}>
                                            <Typography
                                                color="secondary"
                                                className={classes.subtitleDesc}
                                            >
                                                Phone
                                            </Typography>
                                            <Typography className={classes.titleDesc}>
                                                {phone}
                                            </Typography>
                                        </div>
                                        <div className={classes.titleDescSection}>
                                            <Typography
                                                color="secondary"
                                                className={classes.subtitleDesc}
                                            >
                                                Headquaters
                                            </Typography>
                                            <Typography className={classes.titleDesc}>
                                                {_.isEmpty(headquaters) ? "N/A" : headquaters}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div>
                                        {!_.isEmpty(socialLinks[0]) && socialLinks[0].map((element, index) => 
                                            <a 
                                                key={index} 
                                                href={!_.includes(element[1].link,"https://") ? "https://"+element[1].link : element[1].link} 
                                                target="_blank"
                                                rel='noopener noreferrer'
                                                className={classes.socialButton}
                                            >
                                                {element[0].name === "website" && <FaGlobe size={18}/>}
                                                {element[0].name === "linkedin" && <FaLinkedinIn size={18}/>}
                                                {element[0].name === "facebook" && <FaFacebookF size={18}/>}
                                                {element[0].name === "twitter" && <FaTwitter size={18}/>}
                                                {element[0].name === "pinterest" && <FaPinterest size={18}/>}
                                                {element[0].name === "youtube" && <FaYoutube size={18}/>}
                                                {element[0].name === "instagram" && <FaInstagram size={18}/>}
                                                {element[0].name === "telegram" && <FaTelegram size={18}/>}
                                                {element[0].name === "angel" && <FaAngellist size={18}/>}
                                                {element[0].name === "glassdoor" && <CropFree className={classes.socialIcon}/>}
                                            </a>
                                        )}
                                        {!_.isEmpty(socialLinks[1]) &&
                                        <Fragment>
                                            <span 
                                                className={classes.socialButton}
                                                onClick={this.handleClick}
                                                onKeyDown={this.handleClick}
                                            >
                                                <MoreVert className={classes.socialIcon} />
                                            </span>
                                            <Menu
                                                id="long-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={this.handleClose}
                                                MenuListProps={{
                                                    disablePadding: true
                                                }}
                                                PaperProps={{
                                                    style: {
                                                        width: 200,
                                                        margin: 0
                                                    },
                                                }}
                                            >
                                                {socialLinks[1].map((element, index) =>
                                                    <MenuItem 
                                                        key={index} 
                                                        component="a" 
                                                        target="_blank" 
                                                        href={element[1].link} 
                                                        onClick={this.handleClose}
                                                    >
                                                        <Typography color="primary">
                                                            {capitalize(element[0].name)}
                                                        </Typography>
                                                    </MenuItem>
                                                )}
                                            </Menu>
                                        </Fragment>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid 
                        item
                        xs={12}
                        sm={8}
                        className={classes.leftContainer}
                    > 
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.descTitle}
                            >
                                What we do
                            </Typography>
                            <Typography
                                color="secondary"
                                className={classes.description}
                            >
                                {whatWeDo}
                            </Typography>
                            <Typography
                                color="primary"
                                className={classes.descTitle}
                            >
                                Why we do what we do
                            </Typography>
                            <Typography
                                color="secondary"
                                className={classes.description}
                            >
                                {whyWeDoWhatWeDo}
                            </Typography>
                            <Typography
                                color="primary"
                                className={classes.descTitle}
                            >
                                We are proud of
                            </Typography>
                            <Typography
                                color="secondary"
                                className={classNames(classes.description, classes.lastDescription)}
                            >
                                {weAreProudOf}
                            </Typography>
                        </Paper>
                        {(!_.isEmpty(worklifeBalance) || !_.isEmpty(compensation)  || !_.isEmpty(environmentCommunity)  || !_.isEmpty(wealthHealth)  || !_.isEmpty(developmentGrowth)) &&
                            <Paper className={classes.paper}>
                                <Typography 
                                    className={classes.perksTitle}
                                    color="primary"
                                >
                                    Perks and Benefits
                                </Typography>
                                {!_.isEmpty(worklifeBalance) &&
                                    <Fragment>
                                        <Typography 
                                            className={classes.perksSubtitle}
                                            color="primary"
                                        >
                                            Work-Life Balance
                                        </Typography>
                                        <div>
                                            {worklifeBalance.map((tag, key) => 
                                                <Typography className={classes.tag} key={key}>
                                                    {tag}
                                                </Typography>
                                            )}
                                        </div>
                                    </Fragment>
                                }
                                {!_.isEmpty(compensation) &&
                                    <Fragment>
                                        <Typography 
                                            className={classes.perksSubtitle}
                                            color="primary"
                                        >
                                            Compensation
                                        </Typography>
                                        <div>
                                            {compensation.map((tag, key) => 
                                                <Typography className={classes.tag} key={key}>
                                                    {tag}
                                                </Typography>
                                            )}
                                        </div>
                                    </Fragment>
                                }
                                {!_.isEmpty(environmentCommunity) &&
                                    <Fragment>
                                        <Typography 
                                            className={classes.perksSubtitle}
                                            color="primary"
                                        >
                                            Environment & Community
                                        </Typography>
                                        <div>
                                            {environmentCommunity.map((tag, key) => 
                                                <Typography className={classes.tag} key={key}>
                                                    {tag}
                                                </Typography>
                                            )}
                                        </div>
                                    </Fragment>
                                }
                                {!_.isEmpty(wealthHealth) &&
                                    <Fragment>
                                        <Typography 
                                            className={classes.perksSubtitle}
                                            color="primary"
                                        >
                                            Wealth & Health
                                        </Typography>
                                        <div>
                                            {wealthHealth.map((tag, key) => 
                                                <Typography className={classes.tag} key={key}>
                                                    {tag}
                                                </Typography>
                                            )}
                                        </div>
                                    </Fragment>
                                }
                                {!_.isEmpty(developmentGrowth) &&
                                    <Fragment>
                                        <Typography 
                                            className={classes.perksSubtitle}
                                            color="primary"
                                        >
                                            Development & Growth
                                        </Typography>
                                        <div>
                                            {developmentGrowth.map((tag, key) => 
                                                <Typography className={classes.tag} key={key}>
                                                    {tag}
                                                </Typography>
                                            )}
                                        </div>
                                    </Fragment>
                                }
                            </Paper>
                        }
                        {(!_.isEmpty(members) || !_.isEmpty(ourOffice)) &&
                            <Paper className={classes.paper}>
                                {!_.isEmpty(ourOffice) &&
                                    <OfficeField ourOffice={ourOffice} />
                                }
                                {!_.isEmpty(members) &&
                                    <TeamField members={members} />
                                }
                            </Paper>
                        }
                    </Grid>
                    <Grid 
                        item
                        xs={12}
                        sm={4}
                        className={classes.rightContainer}
                    > 
                        <Paper className={classes.paper}>
                            <Typography
                                color="primary"
                                className={classes.reprTitle}
                            >
                                Company Representative
                            </Typography>
                            {representativeAvatar ? 
                                <img className={classes.reprAvatarContainer} src={representativeAvatar} alt="background"/>
                                : 
                                <div className={classNames(classes.reprAvatarContainer, classes.fakeReprAvatarContainer)}/>
                            }
                            <Typography
                                color="primary"
                                className={classes.reprName}
                            >
                                {representativeFirstname + " " + representativeLastname}
                            </Typography>
                            <Typography
                                color="secondary"
                                className={classes.reprPosition}
                            >
                                {representativePosition}
                            </Typography>
                        </Paper>
                        {currentCompanyCulture &&
                            <Paper className={classes.paper}>
                                <Typography
                                    color="primary"
                                    className={classes.cultureTitle}
                                >
                                    Company Culture (current)
                                </Typography>
                                <Typography
                                    color="secondary"
                                    className={classes.cultureDesc}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Typography>
                                <Doughnut height={180} options={{
                                    legend: {
                                        display: false
                                    },
                                    responsive: true
                                }} data={{
                                    labels: _.reduce(currentCultureData, function(data, labels) {data.push(labels.type.toUpperCase());return data}, []),
                                    datasets: [
                                        {
                                            backgroundColor:_.reduce(currentCultureData, function(data, colors) {data.push(colors.color);return data}, []),
                                            hoverBackgroundColor:_.reduce(currentCultureData, function(data, colors) {data.push(colors.color);return data}, []),
                                            data: _.reduce(currentCultureData, function(data, numbers) {data.push(numbers.number); return data}, [])
                                        }
                                    ]
                                }} />
                                <div className={classes.rootForTable}>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            {_.orderBy(currentCultureData, ['number'], ['desc']).map((item, index) => 
                                                <TableRow key={index}>
                                                    <TableCell className={classNames(classes.tableBodyCell, classes.numericCell)}>
                                                        <div style={{width:"10px",height:"10px",backgroundColor:item.color}}/>
                                                    </TableCell>
                                                    <TableCell className={classes.tableBodyCell}>
                                                        {item.type}
                                                    </TableCell>
                                                    <TableCell className={classes.tableBodyCell}>
                                                        {item.number}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell className={classNames(classes.tableFooterCell, classes.numericCell)}/>
                                                <TableCell className={classes.tableFooterCell}>
                                                    Total
                                                </TableCell>
                                                <TableCell className={classes.tableFooterCell}>
                                                    {_.reduce(culture, function(sum, n) {return sum + n.data[0].current;}, 0)}
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Paper>
                        }
                        {preferredCompanyCulture &&
                            <Paper className={classes.paper}>
                                <Typography
                                    color="primary"
                                    className={classes.cultureTitle}
                                >
                                    Company Culture (preferred)
                                </Typography>
                                <Typography
                                    color="secondary"
                                    className={classes.cultureDesc}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Typography>
                                <Doughnut height={180} options={{
                                    legend: {
                                        display: false
                                    },
                                    responsive: true
                                }} data={{
                                    labels: _.reduce(preferredCultureData, function(data, labels) {data.push(labels.type.toUpperCase());return data}, []),
                                    datasets: [
                                        {
                                            backgroundColor:_.reduce(preferredCultureData, function(data, colors) {data.push(colors.color);return data}, []),
                                            hoverBackgroundColor:_.reduce(preferredCultureData, function(data, colors) {data.push(colors.color);return data}, []),
                                            data: _.reduce(preferredCultureData, function(data, numbers) {data.push(numbers.number); return data}, [])
                                        }
                                    ]
                                }} />
                                <div className={classes.rootForTable}>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            {_.orderBy(preferredCultureData, ['number'], ['desc']).map((item, index) => 
                                                <TableRow key={index}>
                                                    <TableCell className={classNames(classes.tableBodyCell, classes.numericCell)}>
                                                        <div style={{width:"10px",height:"10px",backgroundColor:item.color}}/>
                                                    </TableCell>
                                                    <TableCell className={classes.tableBodyCell}>
                                                        {item.type}
                                                    </TableCell>
                                                    <TableCell className={classes.tableBodyCell}>
                                                        {item.number}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell className={classNames(classes.tableFooterCell, classes.numericCell)}/>
                                                <TableCell className={classes.tableFooterCell}>
                                                    Total
                                                </TableCell>
                                                <TableCell className={classes.tableFooterCell}>
                                                    {_.reduce(culture, function(sum, n) {return sum + n.data[1].preferred;}, 0)}
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Paper>
                        }
                    </Grid>
                    <div className={classes.buttonsSection}>
                        <Button 
                            className={classes.outlinedButton}
                            type="button"
                            variant="outlined" 
                            color="secondary"
                            onClick={changeToForm} 
                            disabled={submitting}
                        >
                            Back
                        </Button>
                        <Button 
                            className={classes.button}
                            type="submit"
                            variant="contained" 
                            color="primary"
                            onClick={submit}
                            disabled={submitting || pristine}
                        >
                            Save
                        </Button>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(PreviewSection));