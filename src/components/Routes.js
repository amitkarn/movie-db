/**
 * Created by mymac on 26/08/18.
 */
import React from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Home from "./Home";
import DetailsView from "./DetailsView";
import CastDetails from "./CastDetails";

//Routes for Home and Details view of Movies and Cast
export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/movie/:id' render={props => <DetailsView {...props}/>}/>
            <Route path='/person/:id' render={props => <CastDetails {...props}/>}/>
            <Redirect from='*' to='/'/>
        </Switch>
    </BrowserRouter>
)