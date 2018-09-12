export default () => {
  return fetch(
    "https://api.github.com/repos/facebook/react/issues",
    {
      headers: { Accept: "application/json" },
      method: "GET"
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Impossible to fetch the information.");
    }
    return response.json();
  }).then((result) => {
    return result;
  });
}
