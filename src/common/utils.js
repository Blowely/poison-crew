export const collectionQueryProps = (type) => ({
  providesTags: (result) => result.items.map(({_id}) => ({type, id: _id})),
  transformResponse: (response, meta) => ({
    items: response.items || response || [],
    totalCount: Number(meta?.response?.headers?.get('X-Total-Count') || response.total_count || 0),
  })
})

export const customUrlBuilder = (url, params) => {
  const searchParams = new URLSearchParams(params);
  let newUrl = `${url}?`;
  const arrayParams= [];
  Object.entries(params).forEach(([key, value]) => {
    if (value instanceof Array) {
      searchParams.delete(key);
      // if (value.length) {
      //   newUrl += `${key}=${value.join(',')}&`;
      // }
      if (value.length) {
        arrayParams.push(...value.map((v) => `${key}=${v}`));
      }
    } else if (!value) {
      searchParams.delete(key);
    }
  });
  newUrl += arrayParams.join('&');

  const searchString = searchParams.toString();

  const result = [newUrl];

  if (searchString) {
    result.push(decodeURIComponent(searchParams.toString()));
  }

  return result.join('&');
};