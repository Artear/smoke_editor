export function cleanString(string) {
  return string.trim()
    .replace(/["'`,._:;|{}\[\]+=*&%^$#@!~()?<>\/\\]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

