import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
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
