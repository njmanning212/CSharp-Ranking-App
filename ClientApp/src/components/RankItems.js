import { useEffect, useState } from "react";
import MovieImageArr from "./MovieImages";

const RankItems = () => {

  const [items, setItems] = useState([])
  const [dataType, setDataType] = useState(1)

  useEffect(() => {
    const fetchData  = async () => {
      const response = await fetch(`item/${dataType}`)
      const data = await response.json()
      setItems(data)
    }
    fetchData()
  },[dataType])

  return ( 
    <main>
      <div className="items-not-ranked">
        {
          (items.length > 0) ? items.map((item, index) => 
          <div className="unranked-cell">
            <img id={`item-${item.id}`} src={MovieImageArr.find(o => o.id === item.imageId)?.image} alt={`${item.title} poster`}/>
          </div>
          ) :
          <h3>Loading ...</h3>
        }
      </div>
    </main>
  );
}

export default RankItems;