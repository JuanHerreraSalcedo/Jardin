import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe((userRole) => {
      this.isLoggedIn = !!userRole;
    });
  }
}
