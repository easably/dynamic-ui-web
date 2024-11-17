import { useLocation, useParams } from 'react-router-dom'

export const CollectionView = () => {
  const location = useLocation()
  const { collectionName } = useParams()
  const { tableMeta } = location.state
  console.log(tableMeta)

  return (
    <div>
      <p>{collectionName}</p>
    </div>
  )
}
