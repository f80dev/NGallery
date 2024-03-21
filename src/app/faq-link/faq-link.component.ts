import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-faq-link',
  standalone:true,
  imports: [
    MatIcon,
    RouterLink
  ],

  templateUrl: './faq-link.component.html',
  styleUrls: ['./faq-link.component.sass']
})
export class FaqLinkComponent {

  @Input('faq') faq = '';
  @Input() title="En savoir plus"

  constructor(public router: Router) { }

}
