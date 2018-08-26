/**
 * Created by mymac on 25/08/18.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableToolbar from "./TableToolbar";
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    }
});

class TablePaginationActions extends React.Component {

    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    componentWillMount() {

    }

    render() {
        const {classes, count, page, rowsPerPage, theme} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
    TablePaginationActions,
);

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        marginStart: '10%',
        marginEnd: '10%'
    },
    table: {},
    tableWrapper: {}
});

class DataList extends React.Component {
    state = {
        rows: [],
        page: 0,
        rowsPerPage: 5,
    };

    componentDidUpdate(prevProps) {

    }

    handleSelectionChange = (data) => {
        this.props.onSelectionChange(data);
    }


    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes, list} = this.props;
        const {rows, rowsPerPage, page} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <TableToolbar name={this.props.name} movies={this.props.movies}
                                  onSelectionChange={this.handleSelectionChange}/>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sl. No.</TableCell>
                                <TableCell></TableCell>
                                <TableCell component="th" scope="row">Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <PersonRow data={row}/>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={list.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }


}

const PersonRow = (props)=> {
    console.log(props.data.data);
    return (
        <TableRow key={props.data.data.id}>
            <TableCell>{props.data.data.id}</TableCell>
            <TableCell>
                <Avatar path={props.data.data.poster_path} title={''}/>
            </TableCell>
            <TableCell component="th" scope="row">{props.data.data.original_title}</TableCell>
        </TableRow>
    )
}

const Avatar = (props) => {
    return (
        <img
            src={`https://image.tmdb.org/t/p/w500${props.path}`}
            style={{maxHeight: 150}}
            alt={`${props.title}`}/>
    )
}

DataList.propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    movie: PropTypes.bool.isRequired,
    onSelectionChange: PropTypes.func.isRequired
};

export default withStyles(styles)(DataList);