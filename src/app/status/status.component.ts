import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { StatusService } from './status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  loading = false;

  statusSearch = {
    showSearchBox: true,
    nameContain: '',
    responseList: [],
    responseHasItem: false
  }

  statusSave = {
    showFields: false,
    name: '',
    id: undefined
  }

  action = ' (pesquisando)';

  constructor(private router: Router, private checkService: StatusService, private notifier: NotifierService) { }

  ngOnInit() {
  }

  edit = function (statusId) {
    this.statusSave.id = statusId;
    this.statusSave.showFields = true;
    this.statusSearch.showSearchBox = false;
    this.action = ' (editando)';
    this.getStatusById();
  }

  new = function () {
    this.statusSave.showFields = true;
    this.statusSearch.showSearchBox = false;
    this.action = ' (incluindo)';
  }

  startPage() {
    this.statusSearch.nameContain = '';
    this.statusSearch.responseList = [];
    this.statusSearch.responseHasItem = false;
    this.statusSearch.showSearchBox = true;
    this.statusSave.name = '';
    this.statusSave.id = undefined;
    this.statusSave.showFields = false;
    this.action = ' (pesquisando)';
  }

  getStatusSearch() {
    this.loading = true;
    this.checkService.getStatusSearch(window.localStorage["token"], this.statusSearch.nameContain).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.loading = false;
        this.statusSearch.responseList = res.msgSaida;
        this.statusSearch.responseHasItem = true;
      } else {
        this.loading = false;
        this.notifier.notify('error', res.error[0].message);
      }
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });
  }

  saveStatus() {
    this.loading = true;
    this.checkService.saveStatus(window.localStorage["token"], this.statusSave).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.loading = false;
        this.notifier.notify('success', res.msgSaida[0]);
        this.startPage();
      } else {
        this.loading = false;
        this.notifier.notify('error', res.error[0].message);
      }
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });
  }

  getStatusById() {
    this.loading = true;
    this.checkService.getStatusById(window.localStorage["token"], this.statusSave.id).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.loading = false;
        this.statusSave.name = res.msgSaida[0].name;
        this.statusSave.id = res.msgSaida[0].id;
      } else {
        this.loading = false;
        this.notifier.notify('error', res.error[0].message);
      }
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });
  }

  deleteStatus(statusIdToDelete) {
    this.loading = true;
    this.checkService.deleteStatus(window.localStorage["token"], statusIdToDelete).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.loading = false;
        this.statusSave.name = res.msgSaida[0].name;
        this.statusSave.id = res.msgSaida[0].id;
        this.getStatusSearch();
      } else {
        this.loading = false;
        this.notifier.notify('error', res.error[0].message);
      }
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });
  }

}