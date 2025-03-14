const initBody = {
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
  console.log(" titleEn ", titleEn)
  return (
    titleEn !== "" &&
    titleRu !== "" &&
    totalDuration > 0 &&
    onTime > 0 &&
    exercisesCount >= 5
  )
}

const buildRequest = (body) => {
  console.log(body.exercisesIds)
  return {
    title_en: body.titleEn,
    title_ru: body.titleRu,
    total_duration: body.totalDuration,
    on_time: body.onTime,
    relax_time: body.relaxTime,
    draft: body.draft,
    exercises_ids: body.exercisesIds,
  }
}

export { full, initBody, buildRequest }
