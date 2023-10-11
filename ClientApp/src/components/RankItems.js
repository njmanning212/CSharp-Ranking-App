import { useEffect, useState } from "react";

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
      {
        (items != null) ? items.map((item, index) => 
          <h3 key={index}>
            {item.title}
          </h3>
        ) :
        <h3>Loading ...</h3>
      }
    </main>
  );
}

export default RankItems;