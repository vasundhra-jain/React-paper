import './index.css'

const CategoryPhoto = (props) => {
    const { detail } = props
    const { urls, description } = detail
    const { thumb } = urls

    return (
        <li>
            <img src={thumb} className='image' alt="categoryimage" />
            <a className="anchor" href={thumb}>{description}</a>
        </li>
    )
}

export default CategoryPhoto