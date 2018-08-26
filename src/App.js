import React, {Component} from "react";
import "./App.css";
import Header from "./components/Header";
import DataList from "./components/DataList";
import instance from "./api";
import * as axios from "axios";
const TMDB_API_KEY = "8cf848dfe6821af8bf066d132ae0a614";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: []
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
                return await axios.get(`https://api.themoviedb.org/3/movie/${res.ids.tmdb}?api_key=${TMDB_API_KEY}&language=en-US`);
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
                return await axios.get(`https://api.themoviedb.org/3/movie/${res.movie.ids.tmdb}?api_key=${TMDB_API_KEY}&language=en-US`);
            })
            return await Promise.all(moviesArray);
        } catch (error) {
            console.error(error);
        }
    }

    handleSearchQuery = (query)=> {
        console.log(query);
    };

    handleSelectionChange = (selection) => {
        if(selection=='popular'){
            this.getPopularMovies().then(data=>{
                this.setState({
                    dataList: data
                })
            })
        }else{
            this.setState({
                dataList: []
            })
        }
    }

    render() {
        return (
            <div className="App">

                <Header currentRoute={'Home'}/>
                {/*<LinearProgress variant="query" />*/}
                <DataList list={this.state.dataList} movie={true} onSelectionChange={this.handleSelectionChange}/>
            </div>
        );
    }
}

export default App;
