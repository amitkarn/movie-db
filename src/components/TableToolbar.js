/**
 * Created by mymac on 26/08/18.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: theme.palette.type === 'light'
        ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    }
        : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

class TableToolbar extends React.Component {
    state = {
        currentOption: 'trending',
        currentLabel: 'Trending'
    };

    constructor(props) {
        super(props);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    handleSelectionChange = event => {
        this.setState({
            currentOption: event.target.value,
            currentLabel: event.target.name
        });
        this.props.onSelectionChange(event.target.value);
    };

    /*
     * This will render toolbar for Tables with heading and Selection dropdown
     *
     * */

    render() {
        const {classes} = this.props;
        return (
            <Toolbar>
                <div className={classes.title}>
                    <Typography variant="title" id="tableTitle">
                        {this.state.currentOption.toLocaleUpperCase()}
                    </Typography>
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    <Select
                        value={this.state.currentOption}
                        onChange={this.handleSelectionChange}>
                        <MenuItem value={'trending'}>Trending</MenuItem>
                        <MenuItem value={'popular'}>Popular</MenuItem>
                    </Select>
                </div>
            </Toolbar>
        );
    }
}

TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelectionChange: PropTypes.func.isRequired
};

export default withStyles(styles, {withTheme: true})(TableToolbar);