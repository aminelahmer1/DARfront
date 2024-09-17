import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-stats',
  templateUrl: './announcement-stats.component.html',
  styleUrls: ['./announcement-stats.component.css']
})
export class AnnouncementStatsComponent implements OnInit {
  public chartData: any[] = [];
  public view: [number, number] = [700, 400];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Gouvernorat';
  public showYAxisLabel = true;
  public yAxisLabel = 'Nombre d\'annonces';

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.announcementService.countAnnouncementsByGouvernorat().subscribe(data => {
      this.chartData = Object.keys(data).map(key => ({
        name: key,
        value: data[key]
      }));
    });
  }

  goBack(): void {
    window.history.back();
  }
}
