import blackChecker from "../assets/black-checker.svg"
import whiteChecker from "../assets/white-checker.svg"
import blackKing from "../assets/black-king.svg"
import whiteKing from "../assets/white-king.svg"

import React from "react"

// import checkerPiece from "../assets/checker.svg"
// import kingPiece from "../assets/king.svg"
// 
// import { ReactSVG } from 'react-svg'
// 
// 
// function findAndSetAttribute(svg, id, attribute, value) {
//   const element = svg.getElementById(id)
//   if (element !== null) element.setAttribute(attribute, value)
//   else console.log(id)
// }


export default class Checker extends React.Component {
  render() {
    const { king, colors, number } = this.props

    return <div>
      <img
        src={king ? (colors[0] === "white" ? whiteKing : blackKing) : (colors[0] === "white" ? whiteChecker : blackChecker)}
        alt={`A ${colors[0] === "white" ? "White" : "Black"} ${king ? "King" : "Checker"}`}
        // draggable={this.state.draggable}
        className={"piece"}
      />
      {number !== undefined ? <p style={{ textAlign: "right", margin: "-20px -10px" }}>{number}</p> : null}
    </div>

    // // dragging takes a piece of background!!!
    // return <div>
    //   <ReactSVG
    //     className="piece"
    //     draggable="true"
    //     afterInjection={(_, svg) => {
    //       findAndSetAttribute(svg, "main", "fill", colors[0])
    //       findAndSetAttribute(svg, "border", "fill", colors[1])
    //       if (king) Array.from(svg.getElementsByTagName("path")).map((path) =>
    //         path.setAttribute("stroke", colors[2]))
    //     }}
    //     src={king ? kingPiece : checkerPiece}
    //   />
    //   {number !== undefined ? <p style={{ textAlign: "right", margin: "-20px -10px" }}>{number}</p> : null}
    // </div>
  }
}
