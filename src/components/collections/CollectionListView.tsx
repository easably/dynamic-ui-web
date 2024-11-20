import { FC } from "react"
import { TableMetaData } from "../../types/tableMetaData"
import { useNavigate } from "react-router-dom"
import { List, ListItemButton, ListItemText, ListItemIcon, Divider } from "@mui/material"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

type CollectionViewProps = {
    collectionName: string
    tableMeta: TableMetaData
    data: {
      [key: string]: any
    }[]
  }

export const CollectionListView: FC<CollectionViewProps> = ({ tableMeta, data, collectionName }) => {
    const navigate = useNavigate()
    const onPressCollectionItem = (id: number, itemIndex: number) => {
      navigate(`/collections/${collectionName}/${id}`, { state: { tableMeta: tableMeta, fields: data![itemIndex] } })
    }
  
    const primaryField = tableMeta.display_field
  
    return (
      <List disablePadding>
        {data.map((el, index) => (
          <div key={el['id'] + index}>
            <ListItemButton onClick={() => onPressCollectionItem(el['id'], index)}>
              <ListItemText primary={el[primaryField]} />
              <ListItemIcon>
                <ArrowForwardIosRoundedIcon />
              </ListItemIcon>
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    )
  }