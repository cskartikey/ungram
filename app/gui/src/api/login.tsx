export default async function login(email: string, password: string) {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Handle successful response
      const data = await response.json();
      console.log(data);
    } else {
      // Handle error response
      console.log('Error:', response.status);
    }
}
