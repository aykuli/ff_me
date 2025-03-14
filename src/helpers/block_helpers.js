const buildRequest = (body) => {
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

export { buildRequest }
