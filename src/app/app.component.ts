import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormService } from './shared/form.service';
import { FormTreeComponent } from './shared/form-tree/form-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormTreeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formData: string[] = [];

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formService.getForms().subscribe((data: string[]) => {
      this.formData = data;
    });
  }

  onFormSelected(form: string) {
    // Renvoyer le nom complet du formulaire via un événement
    console.log('Form selected:', form);
  }
}
