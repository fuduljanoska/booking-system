import "../css/Table.css"
import ResourceItem from './ResourceItem'
const Resources = ({resources, onBookHere}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{"width" : "10%" }}>Id</th>
                    <th>Name</th>
                    <th style={{"width" : "20%" }}/>
                </tr>
            </thead>
            <tbody>
                {
                    resources.map(resource => (
                        <ResourceItem 
                            key={resource.id} 
                            resource={resource} 
                            onBookHere={onBookHere}
                        />)
                    )
                }
            </tbody>
        </table>
    )
}

export default Resources