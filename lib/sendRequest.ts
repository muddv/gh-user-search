export async function sendRequest(
  userName: string,
  page?: number,
  desc?: boolean,
  perPage?: number,
) {
  // TODO trim username
  const order = desc ? "desc" : "asc";
  if (!page) page = 1;
  if (!perPage) perPage = 30;
  let data;
  const res = await fetch(
    `https://api.github.com/search/users?q=${userName}&page=${page}&per_page=${perPage}&sort=repositories&order=${order}`,
  ).catch((e) => {
    data = e.toString();
  });
  if (res && !res.ok) data = res.text;
  if (!data) data = await res!.json();
  if (typeof data === "function") data = "Something went wrong, try again later"
  return data;
}
