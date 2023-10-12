import { useEffect, useState } from "react";
import MovieImageArr from "./MovieImages";

import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";

const RankItems = ({items, setItems, dataType, imgArr, localStorageKey}) => {
  
  const [reload, setReload] = useState(false)

  function Reload() {
    setReload(true)
  }
  
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
    if (items === null) fetchData()
    if (reload) {
      setReload(false)
      fetchData()
    }
  },[dataType, setItems, items, reload])

  useEffect(() => {
    if (items !== null){
      localStorage.setItem(localStorageKey, JSON.stringify(items))
    }
  },[items, localStorageKey])


  return ( 
    (items !== null) ?
    <main>
        <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop}/>
        <ItemCollection items={items} drag={drag} imgArr={imgArr}/>
        <button onClick={() => Reload()} style={{"marginTop":"10px"}}>Reload</button>
    </main>
    : <main>Loading ...</main>
  );
}

export default RankItems;