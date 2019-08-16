import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
    },
    subtitle: {
        marginTop: "24px",
        fontSize: "16px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: "16px"
    },
});

const PerksAndBenefitsSection = ({ classes, addTags, formName }) => (
    <Paper 
        id="perks-and-benefits" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Perks and Benefits
        </Typography>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Work-Life Balance
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            We make sure our team has a good work-life balance
        </Typography>
        <TagsField
            name="perksandbenefits.worklifebalance" 
            label="Work-Life Balance" 
            addTags={addTags}
            formName={formName}
            data={['flexible working hours','children creche','on-site childcare','dog friendly office','working from home opportunities','maternity / paternity benefits','retirement plan','personal days','sabbatical']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Compensation
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            We provide plenty of opportunities to ensure financial freedom
        </Typography>
        <TagsField
            name="perksandbenefits.compensation" 
            label="Compensation" 
            addTags={addTags}
            formName={formName}
            data={['individual / company performance based bonus scheme','affiliate scheme','clear career development plan','promotion opportunities','overtime pay']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Environment & Community
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            We are passionate about making a positive difference to our community and the world
        </Typography>
        <TagsField
            name="perksandbenefits.environmentcommunity" 
            label="Environment & Community" 
            addTags={addTags}
            formName={formName}
            data={['active apprentice program','engagement with selected charities','environmentally friendly programs','accommodation support','diversity programs']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Wealth & Health
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            We invest in our team’s healthy lifestyle
        </Typography>
        <TagsField
            name="perksandbenefits.wealthhealth" 
            label="Wealth & Health" 
            addTags={addTags}
            formName={formName}
            data={['gym membership','free fruit in the office','office yoga','outdoor working space','medical benefits','access to life coach','health insurance','dental insurance','company products / discounts']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
           Development & Growth
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            We ensure plenty of opportunities to develop our team’s professional and personal skills
        </Typography>
        <TagsField
            name="perksandbenefits.developmentgrowth" 
            label="Development & Growth" 
            addTags={addTags}
            formName={formName}
            data={['on-going training programs','paid or subsidised professional courses','one-to-one coaching and mentoring','tuition assistance / reimbursement']}
        />
    </Paper>
);

export default withStyles(styles)(PerksAndBenefitsSection);