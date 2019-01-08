import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.html'
})
export class LineChartComponent implements OnInit {
  constructor(private http: HttpClient, private msg: NzMessageService) { }
  // lineChart
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;

  public lineChartColors: Array<any>;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions: any;

  @Input() master: Array<any>;

  ngOnInit() {
    console.log('===============LineChartComponent:ngOnInit()============')
    this.lineChartData = [
      { data: [], label: '' }
    ];
    this.lineChartLabels = [];
    this.lineChartOptions = {
      responsive: true
    };
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  }

  public randomize(res: Array<any>): void {
    const _lineChartDataObject: Array<any> = new Array();
    const _lineChartLabels: Array<any> = new Array();
    let sy_tmp: any = 0;
    for (let i = res.length - 1; i > -1; i--) {
      if (res[i].info && res[i].info.tm) {
        sy_tmp = sy_tmp - res[i].cc.length;
        if (res[i].bingo) {
          sy_tmp = 49.2 + sy_tmp;
        }
        _lineChartDataObject.push(sy_tmp);
        _lineChartLabels.push(res[i].id);
      }
    }
    this.lineChartLabels = _lineChartLabels;
    const that = this;
    setTimeout(function () {
      that.lineChartData = [
        { data: _lineChartDataObject, label: '累计收益（1元/注）' }
      ];
    }, 500);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
