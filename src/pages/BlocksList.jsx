import { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Box, List, CircularProgress } from "@mui/material"
import { Typography } from "@mui/joy"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { SdCardAlert, TaskAlt } from "@mui/icons-material"
import { useMediaQuery } from "@mui/material"

import AuthContext from "../context"
import BlockLabel from "../components/BlockLabel"

const BlocksList = () => {
  const { token, draftBlock, addBlockExercise, snackbar } =
    useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [list, setList] = useState([])
  const [exercises, setExercises] = useState(new Map())
  const [isLoading, setIsLoading] = useState(false)
  const [openIds, setOpenIds] = useState(Array(list.length).fill(false))

  useEffect(() => {
    if (!token) {
      return
    }
    setIsLoading(true)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/blocks/list`,
      data: { updatedAt: "desc" },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => setList(response.data))
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Blocks fetch error")
      })
      .finally(() => setIsLoading(false))
  }, [token, setMsg, setType, setOpen])

  const handleClick = (blockId) => {
    setIsLoading(true)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/exercises/list`,
      data: { blockIds: [blockId] },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setExercises((prev) => {
          return { ...prev, [blockId]: response.data }
        })
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Exercises fetch error")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {list.map((block) => {
        return (
          <SimpleTreeView key={block.id}>
            <TreeItem
              itemId={`block-${block.id}`}
              label={
                <BlockLabel {...block} onClick={() => handleClick(block.id)} />
              }
              color="warning"
              slots={{
                endIcon: block.draft ? SdCardAlert : TaskAlt,
              }}
              slotProps={{
                endIcon: { color: block.draft ? "warning" : "success" },
              }}
            >
              {exercises[block.id]?.map((exr, index) => {
                return (
                  <TreeItem
                    key={exr.id}
                    itemId={`${block.id}-${exr.id}-${index}`}
                    label={`|-- ${exr.titleEn}`}
                  />
                )
              })}
            </TreeItem>
          </SimpleTreeView>
        )
      })}
    </>
  )
}

export default BlocksList
