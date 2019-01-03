import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    [nzLoadMore]="loadMore">
    <ng-template #item let-item>
      <nz-list-item [nzContent]="item.nat" >
        <nz-skeleton [nzAvatar]="true" [nzActive]="true" [nzTitle]="false" [nzLoading]="item.loading">
          <nz-list-item-meta
            [nzTitle]="nzTitle"
            nzAvatar="../../assets/x.png"
            nzDescription="{{item.email}}">
            <ng-template #nzTitle>
              {{item.name.last}}
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
  :host ::ng-deep .loadmore {
    text-align: center;
    margin-top: 12px;
    height: 32px;
    line-height: 32px;
  }
  ` ]
})
export class ListComponent implements OnInit {
  initLoading = true; // bug
  data = [];
  list = [];
  fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo';

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.loadData('5');
  }

  loadData(types: string) {
    this.fakeDataUrl = 'https://randomuser.me/api/?results=' + types + '&inc=name,gender,email,nat&noinfo';
    this.getData((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(this.fakeDataUrl).subscribe((res: any) => callback(res));
  }


}
