export function objectToBase64(obj: Record<string, unknown>) {
  const jsonString = JSON.stringify(obj);
  return Buffer.from(jsonString).toString('base64');
}

export function objFromBase64(base64String: string) {
  const jsonString = Buffer.from(base64String, 'base64').toString();
  return JSON.parse(jsonString);
}
