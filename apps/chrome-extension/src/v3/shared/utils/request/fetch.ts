interface IReqParams {
  url: string;
  params?: URLSearchParams;
  options?: RequestInit;
}

export const requestAPI = <T>({
  url,
  params,
  options,
}: IReqParams): Promise<T> => {
  const fullUrl = params ? `${url}?${params.toString()}` : `${url}`;
  return new Promise((resolve, reject) => {
    fetch(fullUrl, options)
      .then((response) => {
        return response.json();
      })
      .then((data: T) => resolve(data));
  });
};
