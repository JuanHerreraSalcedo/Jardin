import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  rol: string;
  userName: string;
  private userRoleSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = false;
    this.rol = '';
    this.userName = '';
    this.userRoleSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userRoleSubscription = this.authService.getUserRole().subscribe((userRole) => {
      this.isLoggedIn = true;
      this.rol = userRole;
      this.getUserName();
    });
  }

  ngOnDestroy(): void {
    this.userRoleSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/iniciar-sesion']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  private async getUserName(): Promise<void> {
    try {
      const userName = await this.authService.getUserName().toPromise();
      if (userName !== null && userName !== undefined) {
        this.userName = userName;
      }
    } catch (error) {
      console.error('Error al obtener el nombre de usuario:', error);
    }
  }
}
