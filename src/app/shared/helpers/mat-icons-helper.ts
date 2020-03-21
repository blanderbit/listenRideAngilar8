declare var require;

const IMAGES_PATH = '../../../assets/images';

// clear unnecessary characters
export const getClearSvgName = (key: string): string => {
  return key ? key.replace('./', '').replace('.svg', '') : '';
};

export const getImagesFromFolder = (type: String) => {
  // require.context's arguments must be static and not be variables.
  // webpack issue: https://github.com/webpack/webpack/issues/4772

  let images: any;

  switch (type) {
    case 'accessories':
      images = require.context(
        './../../../assets/images/icons/accessories',
        true,
        /\.(png|jpg|jpeg|svg)$/,
      );
      break;
    case 'categories':
      images = require.context(
        './../../../assets/images/icons/categories',
        true,
        /\.(png|jpg|jpeg|svg)$/,
      );
      break;
    default:
      break;
  }

  return images.keys().map((currentValue: string) => {
    let name = getClearSvgName(currentValue);
    return {
      name,
      path: `${IMAGES_PATH}/icons/${type}/${name}.svg`,
    };
  });
};
