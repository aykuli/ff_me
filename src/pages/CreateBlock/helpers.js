const initBody = {
  id: 0,
  titleEn: "",
  titleRu: "",
  totalDuration: 10, //minutes
  onTime: 40, // seconds
  relaxTime: 20, // seconds
  draft: true,
  exercisesCount: 10,
  exercisesIds: [],
}

const full = ({ titleEn, titleRu, totalDuration, onTime, exercisesCount }) => {
  return (
    titleEn !== "" &&
    titleRu !== "" &&
    totalDuration > 0 &&
    onTime > 0 &&
    exercisesCount >= 5
  )
}
export { full, initBody }
