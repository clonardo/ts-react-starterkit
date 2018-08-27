function createHash () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function cssModulesNameGenerator (loaderContext, localIdentName, localName, options) {
  const fileName = path.basename(loaderContext.resourcePath);
  if (fileName.indexOf('.global.scss') !== -1) {
    return localName;
  } else {
    const name = fileName.replace(/\.[^/.]+$/, '');
    return `${localName}__${createHash()}`;
  }
}
