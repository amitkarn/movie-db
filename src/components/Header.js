/**
 * Created by mymac on 25/08/18.
 */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Home from "@material-ui/icons/Home";
import Search from "@material-ui/icons/Search";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: '#ffffff',
    },
    title: {
        flex: '0 0 auto',
    },
});

//
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchQuery = this.handleSearchQuery.bind(this);
        this.state = {
            searchText: ''
        }
    }

    handleSearchQuery = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    getSearchResults = () => {
        this.props.onQueryChange(this.state.searchText);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            <Link to={{pathname :'/'}}>
                                <IconButton
                                    aria-label="Home">
                                    <Home />
                                </IconButton>
                            </Link>
                        </Typography>
                        <div className={classes.spacer}/>
                        <div className={classes.actions}>
                            <FormControl>
                                <Input
                                    id="adornment-password"
                                    type={'text'}
                                    onChange={this.handleSearchQuery}
                                    placeholder={'Search movie by title'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Search"
                                                onClick={this.getSearchResults}>
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    }/>
                            </FormControl>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    currentRoute: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);