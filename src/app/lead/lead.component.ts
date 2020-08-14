import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from '../lead/lead.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  loading = false;
  statusList: [];
  emptyStatus = {
    id: undefined,
    name: ""
  }

  statusSearch = {
    showSearchBox: true,
    nameContain: '',
    responseList: [],
    responseHasItem: false
  }

  leadSave = {
    showFields: false,
    id: undefined,
    name: '',
    phone: '',
    email: '',
    statusId: undefined
  }

  action = ' (pesquisando)';

  constructor(private router: Router, private checkService: LeadService, private notifier: NotifierService) { }

  ngOnInit() {
    this.getStatusList();
  }

  getStatusList() {
    this.loading = true;
    this.checkService.getStatusList(window.localStorage["token"]).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.loading = false;
        this.statusList = res.msgSaida;
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

  saveLead() {

    if (this.leadSave.name == undefined || this.leadSave.name == ''){
      this.notifier.notify('error', 'O nome deve ser informado.');
      return;
    }

    this.loading = true;
    this.checkService.saveLead(window.localStorage["token"], this.leadSave).subscribe(res => {
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

  startPage() {
    this.statusSearch.nameContain = '';
    this.statusSearch.responseList = [];
    this.statusSearch.responseHasItem = false;
    this.statusSearch.showSearchBox = true;
    this.leadSave.name = '';
    this.leadSave.id = undefined;
    this.leadSave.showFields = false;
    this.action = ' (pesquisando)';
  }



  edit = function (statusId) {
    this.leadSave.id = statusId;
    this.leadSave.showFields = true;
    this.statusSearch.showSearchBox = false;
    this.action = ' (editando)';
    this.getStatusById();
  }

  new = function () {
    this.leadSave.showFields = true;
    this.statusSearch.showSearchBox = false;
    this.action = ' (incluindo)';
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

  getStatusById() {
    this.loading = true;
    this.checkService.getStatusById(window.localStorage["token"], this.leadSave.id).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.loading = false;
        this.leadSave.name = res.msgSaida[0].name;
        this.leadSave.id = res.msgSaida[0].id;
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
        this.leadSave.name = res.msgSaida[0].name;
        this.leadSave.id = res.msgSaida[0].id;
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