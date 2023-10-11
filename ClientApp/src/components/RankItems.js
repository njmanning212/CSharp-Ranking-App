import { useEffect, useState } from "react";

const RankItems = () => {

  const [items, setItems] = useState([])
  const dataType = 1

  useEffect(() => {
    fetch(`item/${dataType}`)
      .then( (results) => {
        return results.json()
      })
      .then(data => {
        setItems(data)
      })
  },[])

  return ( 
    <main>
      {
        (items != null) ? items.map((item) => 
          <h3>
            {item.title}
          </h3>
        ) :
        <h3>Loading ...</h3>
      }
    </main>
  );
}

export default RankItems;