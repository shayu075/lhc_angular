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
    this.lineChartData = [
      { data: [], label: '1248累计收益（1元/注）' },
      { data: [], label: '定投累计收益（1元/注）' }
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

  public randomize(res: Array<any>, p_type: string): void {
    const _lineChartDataObject: Array<any> = new Array();
    const _1248lineChartDataObject: Array<any> = new Array();
    const _lineChartLabels: Array<any> = new Array();
    let sy_tmp: any = 0;
    const _1248_ru = [1, 2, 4, 8];
    let _1248_step = 0;
    let _1248_sy = 0;
    let sy_pl = 49;
    if(p_type=='1'){
      sy_pl = 9;
    }else if(p_type=='2'){
      sy_pl = 2.7;
    }else if(p_type=='3'){
      sy_pl = 1.9;
    }else if(p_type=='4'){
      sy_pl = 4.6;
    }
    for (let i = res.length - 1; i > -1; i--) {
      if (res[i].info && res[i].info.tm) {
        sy_tmp = sy_tmp - res[i].cc.length;
        _1248_sy = _1248_sy - (res[i].cc.length * _1248_ru[_1248_step]);
        if (res[i].bingo) {
          sy_tmp = sy_pl + sy_tmp;
          _1248_sy = _1248_ru[_1248_step] * sy_pl + _1248_sy;
          if (_1248_step > 0) {
            _1248_step -= 1;
          }
        } else {
          if (_1248_step < 3) {
            _1248_step += 1;
          }
        }
        _lineChartDataObject.push(sy_tmp);
        _1248lineChartDataObject.push(_1248_sy);
        _lineChartLabels.push(res[i].id.slice(-3));
      }
    }
    this.lineChartLabels = _lineChartLabels;
    const that = this;
    setTimeout(function () {
      that.lineChartData = [
        { data: _1248lineChartDataObject, label: '1248累计收益（1元/注）' },
        { data: _lineChartDataObject, label: '定投累计收益（1元/注）' }
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
