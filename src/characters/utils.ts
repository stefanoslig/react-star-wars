/**
 * From this url https://swapi.dev/api/people/n/
 * get the part after the `api/`
 * @param urls
 */
export const splitCharactersUrls = (urls: string[]): string[] => {
  return urls.map((url) => url.split('api/')[1]);
};
