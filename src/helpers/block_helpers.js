const buildRequest = (body) => {
  return {
    titleEn: body.titleEn,
    titleRu: body.titleRu,
    totalDuration: Number(body.totalDuration),
    onTime: body.onTime,
    relaxTime: body.relaxTime,
    draft: body.draft,
    exercisesIds: body.exercisesIds,
  }
}

const relaxExercise = {
  relax: true,
  filename: "ffiles/relax.mp4",
  titleEn: "relax",
  titleRu: "отдых",
}

const cover = {
  filename: "ffiles/cover.mp4",
  titleEn: "cover",
  titleRu: "заставка",
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export { buildRequest, relaxExercise, cover, sleep }
