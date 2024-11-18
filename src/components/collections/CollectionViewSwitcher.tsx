import { FC } from "react"
import { TableMetaData } from "../../types/tableMetaData"
import { CollectionListView } from "./CollectionListView"

type CollectionViewProps = {
    collectionName: string
    tableMeta: TableMetaData
    data: {
      [key: string]: any
    }[]
  }

export const CollectionViewSwitcher: FC<CollectionViewProps> = ({ tableMeta, data, collectionName }) => {
    switch (tableMeta.display_template) {
      case 'list':
        return <CollectionListView collectionName={collectionName} data={data} tableMeta={tableMeta} />
      case 'table':
        return <CollectionListView collectionName={collectionName} data={data} tableMeta={tableMeta} />
    }
  }