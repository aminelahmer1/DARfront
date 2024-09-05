
export class Announcement {
    id_announcement: number;
    title: string;
    description: string;
    date: string;
    prix: string;
    type_announcement: string;
    codePostal: string;
    ville: string;
    adresse: string;
    gouvernorat: string;
    imagePath: string;
    PhoneNumber:string;
    constructor(
      id_announcement: number,
      title: string,
      description: string,
      date: string,
      prix: string,
      type_announcement: string,
      codePostal: string,
      ville: string,
      adresse: string,
      gouvernorat: string,
      imagePath: string,
      PhoneNumber:string
    ) {
      this.id_announcement = id_announcement;
      this.title = title;
      this.description = description;
      this.date = date;
      this.prix = prix;
      this.type_announcement = type_announcement;
      this.codePostal = codePostal;
      this.ville = ville;
      this.adresse = adresse;
      this.gouvernorat = gouvernorat;
      this.imagePath = imagePath;
      this.PhoneNumber=PhoneNumber
    }
  }
  