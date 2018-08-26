/**
 * Created by mymac on 25/08/18.
 */
import React from "react";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        flexGrow: 1,
    }
};

//
const Header = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Movies DB
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    currentRoute: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);