import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Router } from '@angular/router';
import {
  Chart,
  LinearScale,
  BarController,   // Ajout de l'importation de BarController
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale // Ajout de CategoryScale pour l'axe X
} from 'chart.js';

// Enregistre tous les éléments nécessaires pour le graphique en barres
Chart.register(LinearScale, BarController, BarElement, Title, Tooltip, Legend, CategoryScale);

@Component({
  selector: 'app-announcement-stats',
  templateUrl: './announcement-stats.component.html',
  styleUrls: ['./announcement-stats.component.css']
})
export class AnnouncementStatsComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private announcementService: AnnouncementService, private router: Router) { }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.announcementService.getAnnouncementsByGovernorate().subscribe({
      next: (data) => {
        const labels = data.map((announcement: any) => announcement.governorate);
        const counts = data.map((announcement: any) => announcement.count);

        if (this.chart) {
          this.chart.destroy(); // Clean up previous chart if it exists
        }

        const canvas = this.canvasRef.nativeElement;

        this.chart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Announcements',
              data: counts,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: { // Ajoute cette ligne pour l'axe X
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      error: (err) => {
        console.error('Error loading chart data:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/previous-page']); // Replace with actual route path
  }
}
