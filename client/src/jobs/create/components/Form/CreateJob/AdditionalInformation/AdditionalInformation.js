import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import CheckboxField from './fields/Checkbox';
import TagsField from './Tags'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "24px"
    },
    subtitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "16px",
        marginTop: "24px"
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal"
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
});

const AdditionalInformationSection = ({ classes, formName, profile, addTags }) => (
    <Paper 
        id="additional-information" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Additional Information
        </Typography>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Perks and Benefits
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            Choose perks and benefits for this job for your company ones.<br/>If you need special ones, add them bellow.
        </Typography>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Work-Life Balance
        </Typography>
        <TagsField
            name="perksandbenefits.worklifebalance" 
            label="Work-Life Balance" 
            addTags={addTags}
            formName={formName}
            profile={profile}
            data={['flexible working hours','children creche','on-site childcare','dog friendly office','working from home opportunities','maternity / paternity benefits','retirement plan','personal days','sabbatical']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Compensation
        </Typography>
        <TagsField
            name="perksandbenefits.compensation" 
            label="Compensation" 
            addTags={addTags}
            formName={formName}
            profile={profile}
            data={['individual / company performance based bonus scheme','affiliate scheme','clear career development plan','promotion opportunities','overtime pay']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Environment & Community
        </Typography>
        <TagsField
            name="perksandbenefits.environmentcommunity" 
            label="Environment & Community" 
            addTags={addTags}
            formName={formName}
            profile={profile}
            data={['active apprentice program','engagement with selected charities','environmentally friendly programs','accommodation support','diversity programs']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Wealth & Health
        </Typography>
        <TagsField
            name="perksandbenefits.wealthhealth" 
            label="Wealth & Health" 
            addTags={addTags}
            formName={formName}
            profile={profile}
            data={['gym membership','free fruit in the office','office yoga','outdoor working space','medical benefits','access to life coach','health insurance','dental insurance','company products / discounts']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
           Development & Growth
        </Typography>
        <TagsField
            name="perksandbenefits.developmentgrowth" 
            label="Development & Growth" 
            addTags={addTags}
            formName={formName}
            profile={profile}
            data={['on-going training programs','paid or subsidised professional courses','one-to-one coaching and mentoring','tuition assistance / reimbursement']}
        />
        <CheckboxField 
            name="showcompany"
            label="Show company description and representative on the job page"
        />
    </Paper>
);

export default withStyles(styles)(AdditionalInformationSection);