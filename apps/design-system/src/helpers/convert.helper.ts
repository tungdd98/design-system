import { Node } from '../types/figma.types';

export const setColorsTheme = (data: Node) => {
  const contentNodes =
    data.children?.find((item) => item.name === 'Content')?.children ?? [];

  contentNodes.forEach((content) => {
    const paletteNodes =
      content.children?.find((val) => val.name === 'Palette')?.children ?? [];

    paletteNodes.forEach((palette) => {
      const colorDetails = palette.children?.find(
        (val) => val.type === 'RECTANGLE'
      );
      const fills = colorDetails?.fills ?? [];
      const fillColor = fills.length ? fills[0].color : null;
      const rgbColor = fillColor
        ? `${Math.round(fillColor.r * 255)} ${Math.round(
            fillColor.g * 255
          )} ${Math.round(fillColor.b * 255)}`
        : '';
      if (rgbColor) {
        document.documentElement.style.setProperty(
          `--${content.name.toLowerCase()}-${colorDetails?.name}`,
          rgbColor
        );
      }
    });
  });
};
