// All your global supportive function are here --->

export function capitalizeFirstLetter(text: string): string {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const isNotNullAndUndefined = <T>(
  value: T | null | undefined
): value is T => value !== null && value !== undefined;

export const customConsole = (...message: any[]) => {
  const environment = process.env.NODE_ENV;
  if (environment === 'development') {
    console.log(...message);
  }
};
