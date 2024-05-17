import { Component } from "react";
import './index.css'
import CategoryPhoto from "../CategoryPhoto";

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}

class ImageSearcher extends Component {
    state = { photos: [], apiStatus: apiStatusConstants.initial, searchInput: "photos" }

    componentDidMount() {
        this.getPhotos()
    }

    getPhotos = async () => {
        this.setState({ apiStatus: apiStatusConstants.inProgress })
        const {searchInput} = this.state
        console.log(searchInput)
        const apiUrl = `https://api.unsplash.com/search/photos/?client_id=6_c8ejl6JsA1B9y5ks3JWRz1KIxAUPBf0KNqdBbEAfY&&query=${searchInput}&&orientation=landscape`

        const response = await fetch(apiUrl)
        if (response.ok) {
            const fetchedData = await response.json()
            console.log(fetchedData.results)
            const updatedData = {
                results: fetchedData.results,
            }
            this.setState({
                photos: updatedData,
                apiStatus: apiStatusConstants.success,
            })
        } else {
            this.setState({
                apiStatus: apiStatusConstants.failure,
            })
        }
    }

    onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value })
    }

    renderPhotos = () => {
        const { photos } = this.state
        const { results } = photos
        const{searchInput}=this.state
        return (
            <div>
                <div className="search-heading">
                    <p>{searchInput}</p>
                </div>
            <ul className="image-container">
                
                {results.map(each => (
                    <CategoryPhoto detail={each} key={each.id} />
                ))}
            </ul>
            </div>
        )
    }

    renderFailureView = () => {
        <h1>Something went wrong. Please try again</h1>
    }

    renderProgressView = () => {
        <h1>Loading...</h1>
    }

    renderSearchResults = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderPhotos()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderProgressView()
            default:
                return null
        }
    }

    render() {
        const{searchInput}=this.state
        return(
        <div className="web-container">
            <div className="web-container">
                <h1 className="web-heading">Image Searcher</h1>
                <div className="search-container">
                    <input className="input" type="search" onChange={this.onChangeSearchInput} value={searchInput} />
                    <button className="search-button" onClick={this.getPhotos}>Search</button>
                </div>
                <div>
                    {this.renderSearchResults()}
                </div>
            </div>
        </div>
        )    
}
}

export default ImageSearcher