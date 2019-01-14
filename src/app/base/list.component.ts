import { Component, AfterViewInit, ElementRef } from '@angular/core';


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
            <div style="width:30px; height:30px; border-radius:25px;" *ngIf="item.info?.tm;else other_content"
              [ngStyle]="{'background-color':item.info?.bs == '红波' ? 'red' :
                (item.info?.bs == '蓝波' ? 'blue' : (item.info?.bs == '绿波' ? 'green' : 'yellow')) }">
              <span style="height:30px; line-height:30px; display:block; color:#FFF; text-align:center">{{item.info?.tm}}</span>
            </div>
            <ng-template #other_content><span style="font-size:60px">{{item.tm}}%</span></ng-template>
          </ng-template>
          <ng-template #moreAction>
            <span style="color: red; font-size: 20px;" *ngIf="item.info?.bs == '红波'">{{item.info?.sx}}</span>
            <span style="color: blue; font-size: 20px;" *ngIf="item.info?.bs == '蓝波'">{{item.info?.sx}}</span>
            <span style="color: green; font-size: 20px;" *ngIf="item.info?.bs == '绿波'">{{item.info?.sx}}</span>
          </ng-template>
          <nz-list-item-meta
            [nzTitle]="nzTitle"
            nzAvatar="../../assets/{{item.info?.tm ? (item.bingo ? 'y.png' : 'x.png') : 'w.png'}}"
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
export class ListComponent implements AfterViewInit {
  initLoading = true; // bug
  list = [];

  constructor(private elementRef: ElementRef) { }

  setFirstCC() {
    setTimeout(() => {
      const tmp = this.elementRef.nativeElement.querySelector('.ant-list-item-meta-description');
      const cc = tmp.outerText;
      let outTmp = '<div class="ant-list-item-meta-description ng-star-inserted">';
      for (let i = 0; i < cc.length; i = i + 15) {
        outTmp += '<span style="color:blue; font-size:20px">' + cc.substring(i, i + 14) + '</span> - ';
      }
      outTmp += '</div>';
      tmp.outerHTML = outTmp;
    }, 100);
  }

  ngAfterViewInit() {
    console.log('=============ListComponent:ngAfterViewInit============');
  }

}
