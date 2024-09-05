import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-front-search-bar',
  templateUrl: './front-search-bar.component.html',
  styleUrls: ['./front-search-bar.component.css']
})
export class FrontSearchBarComponent {
onSubmit() {
throw new Error('Method not implemented.');
}

  searchForm!: FormGroup; // Formulaire de recherche
  events: Event[] = []; // Tableau pour stocker les événements
  
  constructor(private formBuilder: FormBuilder, 
           /*   private eventService: EventService, 
              private dialog: MatDialog*/) { }

  ngOnInit(): void {
    // Initialisation du formulaire de recherche avec les champs vides
    this.searchForm = this.formBuilder.group({
      id_event: [''],
      date_event: [''],
      name_event: [''],
      theme_event: [''],
      location_event: [''],
      regulations: [''],
      nb_competitions: [''],
      sales_counters_event: [''],
      public_capacity: [''],
      sound_system_event: [''],
      typeevent: [''],
      kids: [''] // Si c'est un champ booléen, vous pouvez initialiser à une chaîne vide ou à false
    });
  }

 /* searchEvents() {
    const searchCriteria = this.searchForm.value;
    console.log('Search criteria:', searchCriteria); // Vérifiez les critères de recherche dans la console
    this.eventService.findByCriteria(searchCriteria).subscribe(
      (res: Event[]) => {
        console.log('Search results:', res); // Affichez les résultats dans la console
        this.events = res;
        this.openDialog(res); // Appel de la méthode openDialog avec les résultats de la recherche
      },
      (error) => {
        console.error('Error while searching:', error); // Affichez les erreurs dans la console
      }
    );
  }

  onSubmit() {
    this.searchEvents(); // Appel de la fonction de recherche lors de la soumission du formulaire
  }*/

 /* openDialog(events: Event[]) {
    const dialogRef = this.dialog.open(SearchResultDialogEventComponent, {
      data: { events } // Passage des résultats à la boîte de dialogue via la propriété 'data'
    });
  
    // Vous pouvez ajouter un écouteur d'événements pour gérer les actions de l'utilisateur sur la boîte de dialogue si nécessaire
  }*/

}
