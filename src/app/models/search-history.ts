export class SearchHistory {
    id: number;
    keyword: string;
    searchDate: string;
  
    constructor(id: number, keyword: string, searchDate: string) {
      this.id = id;
      this.keyword = keyword;
      this.searchDate = searchDate;
    }
  }
  