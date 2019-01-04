import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './base/list.component';
const spidersDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})



export class AppComponent {
  @ViewChild('spider')
  spiderList: ListComponent;
  types = {'_0': true, '_1': true, '_2': true, '_3': false };
  isLoadingOne = false;

  checkChange(e: boolean): void {
    // tag改变
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
    p_type = p_type.substring(0, p_type.length - 1);
    if (p_type) {
      this.spiderList.loadData(p_type);
    }
    this.isLoadingOne = false;
  }
}
