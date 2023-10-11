const Item = ({ item, drag, itemImgObj }) => {
  return (
    <div className="unranked-cell">
      <img id={`item-${item.id}`} src={itemImgObj} alt={`${item.title} poster`}
        draggable="true" onDragStart={drag} style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Item;