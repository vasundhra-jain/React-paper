import { Component } from "react";
import CategoryPhoto from "../CategoryPhoto";

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}

class ImageSearcher extends Component {
    state = { photos: [], apiStatus: apiStatusConstants.initial }

    componentDidMount() {
        this.getPhotos()
    }

    getPhotos = async () => {
        this.setState({ apiStatus: apiStatusConstants.inProgress })
        const apiUrl = `https://api.unsplash.com/search/photos/?client_id=6_c8ejl6JsA1B9y5ks3JWRz1KIxAUPBf0KNqdBbEAfY&&query=mountain&&orientation=landscape`
        
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

    renderPhotos = () => {
        const{photos}=this.state
        const{results}=photos
        return(
        <div>
            <div>
                <h1>Image Searcher</h1>
                <div>
                    <input type="text" />
                    <button>Search</button>
                </div>
                <div>
                <ul>
            {results.map(each => (
             <CategoryPhoto detail={each} key={each.id} />
            ))}
          </ul>
                </div>
            </div>
        </div>)
    }

    renderFailureView=()=>{
        <h1>Failed</h1>
    }

    renderProgressView=()=>{
        <h1>Progress</h1>
    }

    render() {
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
}

export default ImageSearcher