export function getData() {
  let data = localStorage.getItem('themoviedb');
  if (!data) {
    return {};
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(`Something happened: ${error}`);
    return {};
  }
}

// Language
export function getLanguage() {
  let lang = localStorage.getItem('language');
  if (!lang) {
    setLanguage('en-US');
    return 'en-US';
  }

  return lang;
}

export function setLanguage(lang) {
  localStorage.setItem('language', String(lang));
}
