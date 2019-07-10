import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: 'black',
        color: 'white',
        padding: theme.spacing(6),
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Grid container component="footer" className={classes.footer}>
            <Grid xs={12} md={6}>
                <Typography variant="h6" align="center" gutterBottom>
                    Explore Diary
                </Typography>
                <Typography variant="subtitle1" align="center" component="p">
                    Some Links here
                 </Typography>
            </Grid>
            <Grid xs={12} md={6}>
                <Typography variant="h6" align="center" gutterBottom>
                    About Diary
                </Typography>
                <Typography variant="subtitle1" align="center" component="p">
                    Some words about the Diary app
                 </Typography>
            </Grid>
        </Grid>
    )
};

export default Footer;