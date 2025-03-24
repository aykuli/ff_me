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

export { buildRequest }
