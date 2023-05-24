const fetchUsername = async () => {
    const response = await fetch("http://localhost:8000/username", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("Error:", response.status);
    }
  };
  export default fetchUsername;
  