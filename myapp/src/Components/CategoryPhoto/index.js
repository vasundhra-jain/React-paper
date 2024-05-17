const CategoryPhoto=(props)=>{
    const{detail}=props
    const{urls}=detail
    const{thumb}=urls

    return(
        <li>
            <img src={thumb} alt="categoryimage" />
        </li>
    )
}

export default CategoryPhoto