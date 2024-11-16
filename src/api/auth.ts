enum ApiEndpoints {
  signIn = '/rest/signin',
}

export interface User {
  id: number
  avatar?: string
  email: string
  firstName: string
  lastname: string
  token: string
}

export class AuthManager {
  private static instance: AuthManager | null = null
  static baseUrl: string = 'https://alerts.taqdev.com'

isAuthenticated: boolean = false

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager()
    }
    return AuthManager.instance
  }

  private setUserData(user: User): void {
    try {
      localStorage.setItem('user', JSON.stringify(user))
      this.isAuthenticated = true
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }

  private getUserData(): User | null {
    try {
      let userData = localStorage.getItem('user')
      if (userData) {
        this.isAuthenticated = true
        return JSON.parse(userData)
      } else {
        return null
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)
      return null
    }
  }

  private removeUserData(): void {
    try {
      this.isAuthenticated = false
      localStorage.removeItem('user')
      console.log(`Data removed for key: user`)
    } catch (error) {
      console.error('Error removing data from localStorage:', error)
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    const body = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch(AuthManager.baseUrl + ApiEndpoints.signIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (data['success'] === true) {
        this.setUserData(data['user'])
      }
    } catch (error) {
      console.error('Error during sign-in:', error)
    }
  }
  getCurrentUser(): User | null {
    return this.getUserData()
  }

  signOut() {
    this.removeUserData()
  }
}
