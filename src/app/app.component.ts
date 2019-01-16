import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { ListComponent } from './base/list.component';
import { LineChartComponent } from './base/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})



export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private msg: NzMessageService) {}

  @ViewChild('spider')
  spiderList: ListComponent;
  @ViewChild('lineChart')
  lineChartComponent: LineChartComponent;

  types = {'_0': true, '_1': true, '_2': true, '_3': false, '_4': false};
  date = new Date(2019, 0, 1);
  isLoadingOne = false;
  // 数据地址
  fakeDataUrl = '';

  ngOnInit(): void {
    this.loadSpidersDate('0,1,2');
  }

  loadOne(): void {
    this.isLoadingOne = true;
    let p_type = '';
    if (this.types._0) {
      p_type += '0,';
    }
    if (this.types._1) {
      p_type += '1,';
    }
    if (this.types._2) {
      p_type += '2,';
    }
    if (this.types._3) {
      p_type += '3,';
    }
    if (this.types._4) {
      p_type += '4,';
    }
    p_type = p_type.substring(0, p_type.length - 1);
    if (p_type) {
      this.loadSpidersDate(p_type);
    }
    this.isLoadingOne = false;
  }

  getData(callback: (res: any) => void): void {
    this.http.get(this.fakeDataUrl).subscribe((res: any) => callback(res));
  }

  loadSpidersDate(p_type: string): void {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    this.fakeDataUrl = '/lhc_flask/ps?types=' + p_type + '&year=' + year + '&month=' + month;
      this.getData((res: any) => {
        this.spiderList.list = res;
        this.spiderList.initLoading = false;
        this.spiderList.setFirstCC();
        this.lineChartComponent.randomize(res);
      });
  }

}


