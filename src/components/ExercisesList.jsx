import { List } from "@mui/material"
import { Typography } from "@mui/joy"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"

import Item from "./Exercise"

const ExercisesList = ({ list, onAdd, onDelete, draftBlock, countable }) => {
  return (
    <List>
      {list?.length
        ? list?.map((exercise, idx) => {
            return (
              <SimpleTreeView key={`${exercise.id}-${idx}`} id={exercise.id}>
                <TreeItem
                  itemId={idx}
                  label={
                    <Typography>{`${countable ? `${idx + 1} --- ` : ""}${
                      exercise.titleRu
                    }`}</Typography>
                  }
                >
                  <Item
                    {...{ exercise, onAdd, onDelete }}
                    included={
                      draftBlock?.exercises
                        ? draftBlock?.exercises
                            .map((e) => e.id)
                            .includes(exercise.id)
                        : false
                    }
                  />
                </TreeItem>
              </SimpleTreeView>
            )
          })
        : null}
    </List>
  )
}

export default ExercisesList
