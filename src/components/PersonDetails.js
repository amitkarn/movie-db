/**
 * Created by mymac on 26/08/18.
 */
import React from "react";
import PropTypes from "prop-types";
class PersonDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: {}
        }
    }

    componentWillMount(){
        this.setState({
            profileData : this.props.profileData
        })
    }

    /*
    * This will render Details of a particular cast of a movie
    *
    * */
    render() {
        const {profileData} = this.state;
        return (
            <div style={{padding: 30, display: 'flex', flexDirection: 'row'}}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${profileData['data'].profile_path}`}
                          style={{maxHeight: 300, margin: 20}}/>
                </div>
                {<div>
                    <h1>{profileData['data'].name}</h1>
                    <div>
                        <h2>Biography</h2>
                        <div>
                            <div>{profileData['data'].biography}</div>
                        </div>
                    </div>
                    <div>
                        <h3 style={{color: '#f50057'}}>Date Of Birth</h3>
                        <div>
                            <div>{profileData['data'].birthday}</div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

PersonDetails.propTypes = {
    //Props Object for receiving data from other components
    profileData: PropTypes.object.isRequired
};
export default PersonDetails;