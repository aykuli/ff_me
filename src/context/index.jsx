import { createContext } from "react"

const AuthContext = createContext()

export const initContext = {
  token: null,
  setToken: null,
  draftBlock: null,
  addBlockExercise: (id) => {
    this.draftBlock.exercisesIds.push(id)
  },
}

export default AuthContext
