<<<<<<< HEAD
import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, UserRole, LoginCredentials, AuthResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Signal pour réactivité
  private currentUserSignal = signal<User | null>(null);
  public user = this.currentUserSignal.asReadonly();
  
  public isAuthenticated = computed(() => this.currentUserSignal() !== null);
  public isAdmin = computed(() => this.currentUserSignal()?.role === UserRole.ADMIN);
  public isUser = computed(() => this.currentUserSignal()?.role === UserRole.USER);
  
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Charger l'utilisateur depuis le localStorage au démarrage
    if (this.isBrowser) {
      this.loadUserFromStorage();
    }
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser) return;
    
    const userJson = localStorage.getItem('currentUser');
    const token = localStorage.getItem('authToken');
    
    if (userJson && token) {
      try {
        const user = JSON.parse(userJson);
        this.setCurrentUser(user);
      } catch (e) {
        this.logout();
=======
// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type UserRole = 'ADMIN' | 'USER';

export interface AuthUser {
  username: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: AuthUser | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // فقط وقتی در مرورگر هستیم از localStorage بخوان
    if (this.isBrowser()) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        this.currentUser = JSON.parse(saved);
>>>>>>> 85fe261 (Update KHA with auth & reviews)
      }
    }
  }

<<<<<<< HEAD
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simulation d'une API - À remplacer par un vrai appel HTTP
    return this.mockLogin(credentials).pipe(
      delay(500),
      tap(response => {
        this.setCurrentUser(response.user);
        if (this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout(): void {
    this.setCurrentUser(null);
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
  }

  register(credentials: { email: string; password: string; name: string }): Observable<AuthResponse> {
    // Simulation - À remplacer par un vrai appel HTTP
    return this.mockRegister(credentials.email, credentials.password, credentials.name).pipe(
      delay(500),
      tap(response => {
        this.setCurrentUser(response.user);
        if (this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  private setCurrentUser(user: User | null): void {
    this.currentUserSignal.set(user);
    this.currentUserSubject.next(user);
  }

  // Mock pour simulation - À remplacer par de vrais appels API
  private mockLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    // Utilisateurs de test
    const mockUsers: { [email: string]: { password: string; user: User } } = {
      'admin@beertavern.com': {
        password: 'admin123',
        user: {
          id: '1',
          email: 'admin@beertavern.com',
          name: 'Admin User',
          role: UserRole.ADMIN,
          createdAt: new Date()
        }
      },
      'user@beertavern.com': {
        password: 'user123',
        user: {
          id: '2',
          email: 'user@beertavern.com',
          name: 'Regular User',
          role: UserRole.USER,
          createdAt: new Date()
        }
      }
    };

    // Charger les utilisateurs enregistrés depuis le localStorage
    if (this.isBrowser) {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      if (registeredUsersJson) {
        try {
          const registeredUsers = JSON.parse(registeredUsersJson);
          Object.assign(mockUsers, registeredUsers);
        } catch (e) {
          console.error('Erreur lors du chargement des utilisateurs:', e);
        }
      }
    }

    const mockData = mockUsers[credentials.email];
    
    if (mockData && mockData.password === credentials.password) {
      return of({
        user: mockData.user,
        token: 'mock-jwt-token-' + Date.now()
      });
    }

    return throwError(() => new Error('Email ou mot de passe incorrect'));
  }

  private mockRegister(email: string, password: string, name: string): Observable<AuthResponse> {
    // Vérifier si l'email existe déjà
    if (email === 'admin@beertavern.com' || email === 'user@beertavern.com') {
      return throwError(() => new Error('Cet email est déjà utilisé'));
    }

    // Vérifier dans les utilisateurs enregistrés
    if (this.isBrowser) {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      if (registeredUsersJson) {
        try {
          const registeredUsers = JSON.parse(registeredUsersJson);
          if (registeredUsers[email]) {
            return throwError(() => new Error('Cet email est déjà utilisé'));
          }
        } catch (e) {
          console.error('Erreur lors de la vérification:', e);
        }
      }
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      role: UserRole.USER, // Par défaut, nouvel utilisateur = USER
      createdAt: new Date()
    };

    // Sauvegarder l'utilisateur dans le localStorage
    if (this.isBrowser) {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      let registeredUsers: { [email: string]: { password: string; user: User } } = {};
      
      if (registeredUsersJson) {
        try {
          registeredUsers = JSON.parse(registeredUsersJson);
        } catch (e) {
          console.error('Erreur lors du parsing:', e);
        }
      }

      registeredUsers[email] = {
        password: password,
        user: newUser
      };

      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

    return of({
      user: newUser,
      token: 'mock-jwt-token-' + Date.now()
    });
=======
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): boolean {
    // ⚠️ فقط برای تمرین: کاربران ثابت روی فرانت
    if (username === 'admin' && password === 'admin123') {
      this.setUser({ username: 'admin', role: 'ADMIN' });
      return true;
    }

    if (username === 'user' && password === 'user123') {
      this.setUser({ username: 'user', role: 'USER' });
      return true;
    }

    return false;
  }

  private setUser(user: AuthUser) {
    this.currentUser = user;
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    this.currentUser = null;
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  getRole(): UserRole | null {
    return this.currentUser?.role ?? null;
>>>>>>> 85fe261 (Update KHA with auth & reviews)
  }
}
