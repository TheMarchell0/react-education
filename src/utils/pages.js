export default function getPagesCount(totalCount, limit) {
  return Math.ceil(totalCount / limit);
}
