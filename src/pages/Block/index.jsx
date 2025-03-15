import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import axios from "axios"

import AuthContext from "../../context"

const Block = () => {
  let { id } = useParams()
  const { token, draftBlock, addBlockExercise, snackbar } =
    useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [block, setBlock] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/blocks/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setBlock(response.data)
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Server exercises fetch error")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id, token, setMsg, setType, setOpen])
  
  return <div>block</div>
}

export default Block
