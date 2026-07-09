import { Component } from '@angular/core';
import { LafButton } from '@/app/components/laf-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [LafButton, RouterLink],
  styleUrl: '../../styles/base-host.style.css',
  templateUrl: './home.html',
})
export class Home {}
