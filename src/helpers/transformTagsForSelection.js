function transformTagsForSelection(data) {
  const tags = data?.tags ?? [];
  if (tags.length < 1) return tags;
  return tags.map((tag) => ({ value: tag.id, label: tag.name }));
}
export default transformTagsForSelection;
