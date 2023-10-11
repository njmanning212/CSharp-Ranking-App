import { useEffect, useState } from "react";
import MovieImageArr from "./MovieImages";

import RankingGrid from "./RankingGrid";

const RankItems = () => {

  const [items, setItems] = useState([])
  const [dataType, setDataType] = useState(1)

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    ev.preventDefault();
    const targetEl = ev.target
    if (targetEl.nodeName === "IMG") {
      return false
    }
    if (targetEl.childNodes.length === 0) {
      let data = parseInt(ev.dataTransfer.getData("text").substring(5))
      const transformedCollection = items.map((item) => (item.id === parseInt(data)) ? 
        {...item, ranking:parseInt(targetEl.id.substring(5))} :
        {...item, ranking:item.ranking})
      setItems(transformedCollection)
    }
  }

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
        <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop}/>
      <div className="items-not-ranked">
        {
          (items.length > 0) ? items.map((item, index) => 
          (item.ranking === 0) &&
          <div className="unranked-cell">
            <img id={`item-${item.id}`} src={MovieImageArr.find(o => o.id === item.imageId)?.image} alt={`${item.title} poster`}
              draggable="true" onDragStart={drag} style={{cursor: "pointer"}}
            />
          </div>
          ) :
          <h3>Loading ...</h3>
        }
      </div>
    </main>
  );
}

export default RankItems;