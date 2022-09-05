const getVotes = async () => {
  const response = await fetch(`/api/votes/getVotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else {
    return response.json();
  }
};

export default getVotes;
