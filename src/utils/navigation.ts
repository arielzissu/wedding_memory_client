export const getUrlSearchParams = (paramName: string): any => {
  const { search } = window.location;
  const queryParams = new URLSearchParams(search);
  return queryParams.get(paramName);
};
