import '../css/Validation.css'

const ResourceItem = ({resource, onBookHere}) => {
    return (
        <tr> 
            <td>{resource.id}</td> 
            <td>{resource.name}</td> 
            <td><button className="enabledButton" onClick={() => onBookHere(resource.id)}>Book here</button></td> 
        </tr>
    )
}

export default ResourceItem