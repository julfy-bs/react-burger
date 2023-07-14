type Props = {
  expires: string | number | Date;
}

type CookieData = {
  name: string;
  value: string | number;
  props: Props;
}

export const setCookie = (cookieData: CookieData) => {
  let { name, value, props } = cookieData || {};
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date && exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof Props];
    if (!!propValue) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};