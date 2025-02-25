import React, { useState, useEffect } from "react"
import { NavLink } from "react-router"
import { Container } from "@mui/material"

const trainigList = [
  {
    id: 1,
    title: "Trainig1",
  },
  { id: 2, title: "Trainig2" },
]

const List = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    setList(trainigList)
  }, [])

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <ul>
        {list.map(({ id, title }) => {
          return (
            <li id={id}>
              <NavLink to={`/projects/${id}`} end>
                {title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default List
