import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    chartText: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "10px"
    },
    percentageText: {
        fontSize: "16px",
        fontWeight: "bold",
        color: theme.palette.primary.main,
    },
    chartName: {
        color: theme.palette.secondary.dark,
        fontSize: "13px",
        fontWeight: "normal"
    },
    chartContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
    }
});

const Chart = ({ classes, name, percentage }) => (
    <div className={classes.chartContainer}>
        <div>
            <Doughnut 
                data={{
                    datasets: [{
                        data: [percentage, 100 - percentage],
                        backgroundColor: [
                            percentage < 60 ? '#a1a1a1' : '#666666', "#efeff4"
                        ],
                        hoverBackgroundColor: [
                            percentage < 60 ? '#a1a1a1' : '#666666', "#efeff4"
                        ],
                        borderWidth: 0,
                    }]
                }}
                height={45}
                width={45}
                options={{
                    cutoutPercentage: '65',
                    animation: {
                        animateRotate: false
                    },
                    layout: {
                        padding: 0
                    },
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        enabled: false
                    },
                    maintainAspectRatio: false
                }}
            />
        </div>
        <div className={classes.chartText}>
            <Typography className={classes.percentageText}>
                {percentage === 0 ? "N/A" : percentage+"%"}
            </Typography>
            <Typography className={classes.chartName}>
                {name}
            </Typography>
        </div>
    </div>
)

export default withStyles(styles)(Chart);