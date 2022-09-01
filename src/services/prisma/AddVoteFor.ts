const AddVoteFor = async (hid: number | undefined, name: string, image: string) => {
    const response = await fetch(`/api/votes/AddVoteFor/${hid}?name=${name}&image=${image}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  }

export default AddVoteFor;