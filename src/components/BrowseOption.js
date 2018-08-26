/**
 * Created by mymac on 25/08/18.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

class BrowseOption extends React.Component {
    state = {
        currentOption: 'trending',
    };

    /*handleSelectionChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        this.props.onSelectionChange(event.target.value);
    };*/

    handleSearchQuery = (event) => {
        this.props.onSearchQuery(event.target.value);
    };

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="search"
                    label="Search movies by title"
                    type="search"
                    className={classes.textField}
                    onChange={(text)=>this.handleSearchQuery(text)}
                />

            </form>
        );
    }
}

BrowseOption.propTypes = {
    classes: PropTypes.object.isRequired,
    onSearchQuery: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired
};

export default withStyles(styles)(BrowseOption);