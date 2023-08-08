import { user } from "@/src/domain/entities/user";

// User repository
class UserRepository {
  static loginUser = async (credentials: user) => {
    const response = await fetch('https://90fe-2a02-4780-10-d402-00-1.ngrok-free.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  };


  static registerUser = async (credentials: user) => {
    const response = await fetch('http://90fe-2a02-4780-10-d402-00-1.ngrok-free.app/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

}

export default UserRepository;
