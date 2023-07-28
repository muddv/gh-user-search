export async function getDetails(url: string) {
  let data;
  const res = await fetch(url).catch((e) => {
    data = e.toString();
  });
  if (!data) data = await res!.json();
  return data;
}
