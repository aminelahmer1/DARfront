
export class Announcement {
    id_announcement: number;
    title: string;
    description: string;
    date: string;
    prix: string;
    type_Announcement: string;
    codePostal: string;
    ville: string;
    adresse: string;
    gouvernorat: string;
    imagePath: string;
    phoneNumber:string;
    email:string;
    constructor(
      id_announcement: number,
      title: string,
      description: string,
      date: string,
      prix: string,
      type_Announcement: string,
      codePostal: string,
      ville: string,
      adresse: string,
      gouvernorat: string,
      imagePath: string,
      phoneNumber:string,
      email:string
    ) {
      this.id_announcement = id_announcement;
      this.title = title;
      this.description = description;
      this.date = date;
      this.prix = prix;
      this.type_Announcement = type_Announcement;
      this.codePostal = codePostal;
      this.ville = ville;
      this.adresse = adresse;
      this.gouvernorat = gouvernorat;
      this.imagePath = imagePath;
      this.phoneNumber=phoneNumber;
      this.email=email
    }
  }
  