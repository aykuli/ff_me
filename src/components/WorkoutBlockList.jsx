import { useState, useEffect } from "react"

import { Divider } from "@mui/material"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { SdCardAlert, TaskAlt } from "@mui/icons-material"

import BlockLabel from "../components/BlockLabel"

const BlocksList = ({ blocks }) => {
  const [exercises, setExercises] = useState(new Map())

  useEffect(() => {
    if (blocks?.length) {
      blocks.forEach((b) => {
        setExercises((prev) => {
          return { ...prev, [b.id]: b.exercises }
        })
      })
    }
  }, [blocks])

  return (
    <>
      {blocks?.length &&
        blocks.map((block, idx) => {
          return (
            <SimpleTreeView key={`${block.id}-${idx}`}>
              <TreeItem
                itemId={`block-${block.id}`}
                label={<BlockLabel {...block} />}
                color="warning"
                slots={{
                  endIcon: block.draft ? SdCardAlert : TaskAlt,
                }}
                slotProps={{
                  endIcon: { color: block.draft ? "warning" : "success" },
                }}
              >
                {exercises[block.id] && exercises[block.id].length
                  ? exercises[block.id]?.map((exr, index) => {
                      return (
                        <>
                          <TreeItem
                            key={`${block.id}-${exr.id}-${index}`}
                            itemId={`${block.id}-${exr.id}-${index}`}
                            label={`|-- ${exr.titleRu}`}
                          />
                          <Divider />
                        </>
                      )
                    })
                  : null}
              </TreeItem>
            </SimpleTreeView>
          )
        })}
    </>
  )
}

export default BlocksList
