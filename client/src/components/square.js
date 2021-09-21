import Checker from "./pieces"

export default function Square({ id, even, over, dragged, game, checker }) {
  return <td
    key={id}
    className={"square"}
    onDragStart={() => game.handleStartDrag(id)}
    onDragEnter={() => game.handleOver(id)}
    onDragEnd={() => game.handleEndDrag(id)}
    onDoubleClick={() => game.handleDoubleClick(id)}
    // style={{ backgroundColor: over ? (game.canMovePieceTo(id) ? "blue" : "red") : (even ? "#FFCE9E" : "#D18B47") }}>
    style={{
      backgroundColor: over && game.canMovePieceTo(id) ? "blue"
        : (even ? "#FFCE9E" : "#D18B47")
    }}>
    <div style={{ opacity: dragged ? 0 : 1 }}>  {/* remove if try with ReactSVG */}
      {checker === null ? id : <Checker colors={checker.colors} king={checker.king} />}
    </div>
  </td>
}