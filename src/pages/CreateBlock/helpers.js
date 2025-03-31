const initBody = {
  titleEn: "",
  titleRu: "",
  totalDuration: 10, //minutes
  onTime: 40, // seconds
  relaxTime: 20, // seconds
  draft: true,
  exercisesCount: 10,
  exercises: [],
}

const full = ({ titleEn, titleRu, totalDuration, onTime, exercisesCount }) => {
  return (
    titleEn !== "" &&
    titleRu !== "" &&
    totalDuration > 5 &&
    onTime > 5 &&
    exercisesCount >= 5
  )
}
export { full, initBody }
