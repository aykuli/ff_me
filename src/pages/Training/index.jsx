import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import Container from "@mui/material/Container"
import { Typography } from "@mui/joy"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { Button, Divider } from "@mui/material"
import Video from "../../components/Video"
import BlockLabel from "../../components/BlockLabel"

const training = {
  id: 1,
  title: "Trainig0",
  blocks: [
    {
      id: 1,
      title: "Stretch",
      onTime: 15,
      relaxTime: 5,
      exercises: [
        {
          id: 1,
          title: "hand strectch",
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        },
        {
          id: 2,
          title: "legs strectch",
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        {
          id: 3,
          title: "neck strectch",
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        },
      ],
    },
    {
      id: 2,
      title: "Training",
      onTime: 40,
      relaxTime: 10,
      exercises: [
        {
          id: 4,
          title: "hand strectch",
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        },
        {
          id: 5,
          title: "legs strectch",
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        {
          id: 6,
          title: "neck strectch",
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        },
      ],
    },
  ],
}

const Training = () => {
  let params = useParams()
  const [tr, setTr] = useState(null)

  useEffect(() => {
    console.log(params.id)
    setTr(training)
  }, [params.id])

  // const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  // const playerRef = useRef(null)

  const urls = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ]

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Button variant="text" href="/">
        dashboard
      </Button>
      <Button variant="text" href="/projects">
        projects
      </Button>
      <Divider style={{ marginBottom: 10 }} />

      {tr ? (
        <div>
          <Typography level="h4">{tr.title}</Typography>
          <Video urls={urls} />
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          {tr.blocks.map(({ id, title, onTime, relaxTime, exercises }) => {
            return (
              <SimpleTreeView>
                <TreeItem
                  itemId={`block-${id}`}
                  label={<BlockLabel {...{ title, onTime, relaxTime }} />}
                >
                  {exercises.map((exr) => {
                    return (
                      <TreeItem
                        itemId={`exercise-${exr.id}`}
                        label={`|-- ${exr.title}`}
                      />
                    )
                  })}
                </TreeItem>
              </SimpleTreeView>
            )
          })}
        </div>
      ) : null}
    </Container>
  )
}

export default Training
