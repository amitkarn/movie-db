/**
 * Created by mymac on 26/08/18.
 */
import React from "react";
import "../App.css";
import instance from "../api";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DataList from "./DataList";
import CastList from "./CastList";
import Home from "@material-ui/icons/Home";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
const TMDB_API_KEY = "8cf848dfe6821af8bf066d132ae0a614";

class DetailsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isAMovie: true,
            dataList: []
        }
    }

    componentWillMount() {
        // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
        this.setState({
            data: this.props.location.state.data,
            isAMovie: this.props.location.state.isAMovie
        });

        this.getCastsOfAMovie(this.props.match.params.id).then(data=> {
            this.setState({
                dataList: data
            });
        });
    }


    async getCastsOfAMovie(movieId) {
        try {
            const response = await instance.get(`/movies/${movieId}/people`);
            return Promise.resolve(response);
        } catch (error) {
            console.error(error);
        }
    }

    /*
     * This will render Details of a particular movie
     *
     * */

    render() {
        return (
            <div style={{
                background: `url(https://image.tmdb.org/t/p/w500${this.state.data.backdrop_path}) no-repeat`,
                backgroundSize: 'cover'
            }}>
                <div style={{width: '100vw', background: 'rgba(0, 0, 0, 0.5)'}}>
                    <AppBar position="static" color="secondary">
                        <Toolbar>
                            <Link to={{pathname: '/'}}>
                                <IconButton
                                    aria-label="Home">
                                    <Home />
                                </IconButton>
                            </Link>
                            <IconButton
                                aria-label="Forward">
                                <KeyboardArrowRight />
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                {this.state.data.original_title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Paper style={{margin: '10% 10% 0 10%'}}>
                        <MovieDetails data={this.state.data}/>
                    </Paper>
                    {this.renderCastOrMovieList(!this.state.isAMovie)}
                </div>
            </div>
        );
    }

    renderCastOrMovieList = (isAMovie) => {
        if (isAMovie) {
            return <DataList list={this.state.dataList}/>
        } else {
            return <CastList list={this.state.dataList.data ? this.state.dataList.data.cast : [] }/>
        }
    }


}

const MovieDetails = (props) => {
    const {data} = props;
    return (
        <div style={{padding: 30, display: 'flex', flexDirection: 'row'}}>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
                     style={{maxHeight: 300, margin: 20}}/>
            </div>
            <div>
                <h1>{data.original_title}<span id="date"> ({data.release_date.split('-')[0]})</span></h1>
                <div>
                    <h2>Overview</h2>
                    <div>
                        <div>{data.overview}</div>
                    </div>
                </div>
                <div>
                    <h3 style={{color: '#f50057'}}>Runtime</h3>
                    <div>
                        <div>{`${data.runtime} minutes`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsView;