import { Component } from '@angular/core';
import { LafButton } from '@/app/components/laf-button';

@Component({
  selector: 'app-home',
  imports: [LafButton],
  styleUrl: '../../styles/base-host.style.css',
  templateUrl: './home.html',
})
export class Home {}
