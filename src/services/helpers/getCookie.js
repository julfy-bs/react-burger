export const getCookie = (name) => {
  const regex = /([\.$?*|{}\(\)\[\]\\\/\+^])/g;
  // const regex = /([.$?*|{}()[\]\\/+^])/g;
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(regex, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}