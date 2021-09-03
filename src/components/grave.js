import Square from "./square";


function GraveRow({ game, width, startWith, fallen }) {
  return <tr>
    {Array(width).fill().map((_, i) => {
      const id = -startWith - i - 1
      return <Square
        key={id}
        even={id % 2 === 0}
        game={game}
        id={id}
        draged={game.state.currentDrag === id}
        over={false}
        checker={fallen[startWith + i]}
      />
    }
    )}
  </tr>
}

export default function Grave({ gametype, game, fallen }) {
  return <table className="no-border"><tbody>
    <tr>



    </tr>
    <tr>

    </tr>
  </tbody></table>
}
