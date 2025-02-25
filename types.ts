// /projects page
interface ProjectShort {
  id: number
  title: string
}

// /projects/:id page
interface Project {
  id: number
  title: string
  blocks: Array<Block>
}

interface Block {
  id: number
  title: string
  onTime: number
  relaxTime: number
  exercises: Array<Exercise>
}

interface Exercise {
  id: number
  title: string
  url: string
}
