function generateColor(colorName: string) {
  return ({ opacityVariable, opacityValue }: any) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--vmu-color-${colorName}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--vmu-color-${colorName}), var(${opacityVariable}, 1))`;
    }

    return `rgb(var(--vmu-color-${colorName}))`;
  };
}

export const tailwindColors = {
  primary: generateColor("primary"),
  "on-primary": generateColor("on-primary"),
  "primary-container": generateColor("primary-container"),
  "on-primary-container": generateColor("on-primary-container"),
  secondary: generateColor("secondary"),
  "on-secondary": generateColor("on-secondary"),
  "secondary-container": generateColor("secondary-container"),
  "on-secondary-container": generateColor("on-secondary-container"),
  tertiary: generateColor("tertiary"),
  "on-tertiary": generateColor("on-tertiary"),
  "tertiary-container": generateColor("tertiary-container"),
  "on-tertiary-container": generateColor("on-tertiary-container"),
  error: generateColor("error"),
  "on-error": generateColor("on-error"),
  "error-container": generateColor("error-container"),
  "on-error-container": generateColor("on-error-container"),
  warning: generateColor("warning"),
  "on-warning": generateColor("on-warning"),
  "warning-container": generateColor("warning-container"),
  "on-warning-container": generateColor("on-warning-container"),
  success: generateColor("success"),
  "on-success": generateColor("on-success"),
  "success-container": generateColor("success-container"),
  "on-success-container": generateColor("on-success-container"),
  info: generateColor("info"),
  "on-info": generateColor("on-info"),
  "info-container": generateColor("info-container"),
  "on-info-container": generateColor("on-info-container"),
  background: generateColor("background"),
  "on-background": generateColor("on-background"),
  surface: generateColor("surface"),
  "on-surface": generateColor("on-surface"),
  "surface-variant": generateColor("surface-variant"),
  "on-surface-variant": generateColor("on-surface-variant"),
  outline: generateColor("outline"),
  shadow: generateColor("shadow"),
  "inverse-surface": generateColor("inverse-surface"),
  "inverse-on-surface": generateColor("inverse-on-surface"),
  "inverse-primary": generateColor("inverse-primary"),
  disabled: generateColor("disabled")
};
