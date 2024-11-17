import { useLocation, useParams } from "react-router-dom"
import { TableMetaData } from "../types/tableMetaData"

export const CollectionItemView = () => {
    const location = useLocation()
    const { id } = useParams()
    const { tableMeta, fields } = location.state as { tableMeta: TableMetaData, fields: {[key: string]: any} }
    console.log(fields);
    // console.log(data);
    
    
    return (

        <div>
            <p>Hello!</p>
            <p>{id}</p>
        </div>
    )
}