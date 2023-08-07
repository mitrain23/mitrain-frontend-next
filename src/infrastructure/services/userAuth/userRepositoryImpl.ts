import { user } from "@/src/domain/entities/user";

// User repository
class UserRepository {
  static loginUser = async (credentials: user) => {
    const response = await fetch('http://62.72.0.207:2000/api/login', {
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
    const response = await fetch('http://62.72.0.207:2000/api/register', {
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
