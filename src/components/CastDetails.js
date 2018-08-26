/**
 * Created by mymac on 26/08/18.
 */
/**
 * Created by mymac on 26/08/18.
 */
import React from "react";
import "../App.css";
import * as axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PersonDetails from "./PersonDetails";
import ListOfWorkedMovies from "./ListofWorkedMovies";
import instance from "../api";
const TMDB_API_KEY = "8cf848dfe6821af8bf066d132ae0a614";

class CastDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            profileData: {},
            listOfMovies: []
        }
    }

    componentWillMount() {
        // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
    }

    componentDidMount() {

        const data = this.props.location.state.data;
        this.setState({
            data: data
        });

        this.getCastDetails(data.person.ids.tmdb).then(data=> {
            this.setState({
                profileData: data
            });

            this.getListOfMovies().then(data=> {
                this.setState({
                    listOfMovies: data
                });
            });
        });


    }

    async getCastDetails(tmdbId) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`);
            return Promise.resolve(response);
        } catch (error) {
            console.error(error);
        }
    }

    async getListOfMovies() {
        try {
            const response = await instance.get(`/people/${this.state.data.person.ids.slug}/movies`);
            return Promise.resolve(response);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div style={{width: '100vw',height:'100%', background: 'rgba(0, 0, 0, 0.5)'}}>
                <div>
                    <AppBar position="static" color="secondary">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                {}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Paper style={{margin: '10% 10% 0 10%'}}>
                        {this.state.profileData.data ? <PersonDetails profileData={this.state.profileData}/> : null}
                    </Paper>
                </div>
                {this.state.listOfMovies.data ? <ListOfWorkedMovies list={this.state.listOfMovies.data}/> : null}
            </div>
        );
    }
}

export default CastDetails;