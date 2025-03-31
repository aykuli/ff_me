import { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Divider, CircularProgress } from "@mui/material"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { SdCardAlert, TaskAlt } from "@mui/icons-material"
import { Typography } from "@mui/joy"

import AuthContext from "../context"
import BlockLabel from "../components/BlockLabel"

const BlocksList = () => {
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [list, setList] = useState([])
  const [exercises, setExercises] = useState(new Map())
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <>
      <Typography level="h1" sx={{ mb: 2 }}>
        Blocks list
      </Typography>
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        list?.map((block) => {
          return (
            <SimpleTreeView key={block.id}>
              <TreeItem
                itemId={`block-${block.id}`}
                label={<BlockLabel block={block} />}
                color="warning"
                slots={{
                  endIcon: block.draft ? SdCardAlert : TaskAlt,
                }}
                slotProps={{
                  endIcon: { color: block.draft ? "warning" : "success" },
                }}
              >
                {block.exercises?.map((exr, index) => {
                  return (
                    <>
                      <TreeItem
                        key={`${block.id}-${exr.id}-${index}`}
                        itemId={`${block.id}-${exr.id}-${index}`}
                        label={
                          <div>
                            <span>{`|-- ${exr.titleEn} `}</span>
                            {exr.side ? (
                              <span
                                style={{
                                  backgroundColor: "#bbffbb",
                                  padding: "2px 5px",
                                }}
                              >
                                {exr.side || ""}
                              </span>
                            ) : null}
                          </div>
                        }
                      />
                      <Divider />
                    </>
                  )
                })}
              </TreeItem>
            </SimpleTreeView>
          )
        })
      )}
    </>
  )
}

export default BlocksList
