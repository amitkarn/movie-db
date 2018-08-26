/**
 * Created by mymac on 26/08/18.
 */
import React from "react";
import "../App.css";
import Header from "./Header";
import DataList from "./DataList";
import LinearProgress from "@material-ui/core/LinearProgress";
import instance from "../api";
import * as axios from "axios";
const TMDB_API_KEY = "8cf848dfe6821af8bf066d132ae0a614";
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: null
        }
        this.handleSearchQuery = this.handleSearchQuery.bind(this);
    }

    componentWillMount() {
        this.getTrendingMovies().then(data => {

            this.setState({
                dataList: data
            });
        });
    }

    async getPopularMovies() {
        try {
            const response = await instance.get('/movies/popular');
            const moviesArray = response.data.map(async res=> {
                let movieObj = axios.get(`https://api.themoviedb.org/3/movie/${res.ids.tmdb}?api_key=${TMDB_API_KEY}&language=en-US`);
                movieObj.traktId = res.ids.trakt;
                return await movieObj;
            })
            return await Promise.all(moviesArray);
        } catch (error) {
            console.error(error);
        }
    }

    async getTrendingMovies() {
        try {
            const response = await instance.get('/movies/trending');
            const moviesArray = response.data.map(async res=> {
                let movieObj = await axios.get(`https://api.themoviedb.org/3/movie/${res.movie.ids.tmdb}?api_key=${TMDB_API_KEY}&language=en-US`);
                movieObj.traktId = res.movie.ids.trakt;
                return movieObj;
            })
            return await Promise.all(moviesArray);
        } catch (error) {
            console.error(error);
        }
    }

    handleSearchQuery = (query)=> {
        if (query !== null && query != '') {
            this.searchMovieByTitle(query).then(data=> {
                console.log(data);
                this.setState({
                    dataList: data
                });
                console.log(this.state.dataList);
            })
        }
    };

    handleSelectionChange = (selection) => {
        if (selection == 'popular') {
            this.getPopularMovies().then(data=> {
                console.log(data);
                this.setState({
                    dataList: data
                })
            })
        } else {
            this.getTrendingMovies().then(data=> {
                this.setState({
                    dataList: data
                })
            })
        }
    }

    render() {
        return (
            <div className="App">

                <Header currentRoute={'Home'} onQueryChange={this.handleSearchQuery}/>
                {this.state.dataList ?
                    <DataList list={this.state.dataList} movieIds={this.state.ids} isAMovie={true}
                              onSelectionChange={this.handleSelectionChange}/> : <LinearProgress variant="query"/>
                }
            </div>
        );
    }

    async searchMovieByTitle(title) {
        console.log(title);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8cf848dfe6821af8bf066d132ae0a614&page=1&query=${title}`);
            return Promise.resolve(response);
        } catch (error) {
            console.error(error);
        }
    }
}

export default Home;
