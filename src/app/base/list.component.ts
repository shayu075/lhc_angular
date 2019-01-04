import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-spiders-list',
  template: `
  <nz-list
    class="demo-loadmore-list"
    [nzDataSource]="list"
    [nzItemLayout]="'horizontal'"
    [nzLoading]="initLoading"
    [nzRenderItem]="item"
    [nzLoadMore]="">
    <ng-template #item let-item>
      <nz-list-item [nzContent]="item.loading?'':''" [nzActions]="item.loading?[]:[editAction,moreAction]">
        <nz-skeleton [nzAvatar]="true" [nzActive]="true" [nzLoading]="item.loading">
          <ng-template #editAction>
            <div style="width:30px; height:30px; border-radius:25px;" *ngIf="item.info"
              [ngStyle]="{'background-color':item.info?.bs == '红波' ? 'red' :
                (item.info?.bs == '蓝波' ? 'blue' : (item.info?.bs == '绿波' ? 'green' : 'yellow')) }">
              <span style="height:30px; line-height:30px; display:block; color:#FFF; text-align:center">{{item.info?.tm}}</span>
            </div>
          </ng-template>
          <ng-template #moreAction>
            <span style="color: red; font-size: 20px;" *ngIf="item.info?.bs == '红波'">{{item.info?.sx}}</span>
            <span style="color: blue; font-size: 20px;" *ngIf="item.info?.bs == '蓝波'">{{item.info?.sx}}</span>
            <span style="color: green; font-size: 20px;" *ngIf="item.info?.bs == '绿波'">{{item.info?.sx}}</span>
          </ng-template>
          <nz-list-item-meta
            [nzTitle]="nzTitle"
            nzAvatar="../../assets/{{item.info ? (item.bingo ? 'y.png' : 'x.png') : 'w.png'}}"
            nzDescription="{{item.cc}}">
            <ng-template #nzTitle>
              {{item.id}}
            </ng-template>
          </nz-list-item-meta>
        </nz-skeleton>
      </nz-list-item>
    </ng-template>
  </nz-list>
  `,
  styles: [ `
  :host ::ng-deep .demo-loadmore-list {
    min-height: 350px;
  }
  ` ]
})
export class ListComponent {
  initLoading = true; // bug
  list = [];
  // fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo';
  fakeDataUrl = '';

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  loadData(types: string) {
    this.fakeDataUrl = '/lhc_flask/ps?types=' + types;
    this.getData((res: any) => {
        this.list = res;
        this.initLoading = false;
      });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(this.fakeDataUrl).subscribe((res: any) => callback(res));
  }


}
