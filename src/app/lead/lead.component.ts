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
  action = ' (pesquisando)';

  leadSearch = {
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

  constructor(private router: Router, private checkService: LeadService, private notifier: NotifierService) { }

  ngOnInit() {
    this.getStatusList();
  }

  getLeadSearch() {

    if (this.leadSearch.nameContain == undefined || this.leadSearch.nameContain == ''){
      this.notifier.notify('error', 'Um nome para a pesquisa deve ser preenchido.');
      return;
    }

    this.loading = true;
    this.checkService.getLeadSearch(window.localStorage["token"], this.leadSearch.nameContain).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.leadSearch.responseList = res.msgSaida;
        this.leadSearch.responseHasItem = true;
      } else {
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });

  }

  getLeadById() {
    this.loading = true;
    this.checkService.getLeadById(window.localStorage["token"], this.leadSave.id).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.leadSave.id = res.msgSaida[0].id;
        this.leadSave.name = res.msgSaida[0].name;
        this.leadSave.phone = res.msgSaida[0].phone;
        this.leadSave.email = res.msgSaida[0].email;
        this.leadSave.statusId = res.msgSaida[0].statusId;
      } else {
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
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
        this.notifier.notify('success', res.msgSaida[0]);
        this.startPage();
      } else {
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });
    
  }

  deleteLead(leadIdToDelete) {

    if (!confirm("Realmente deseja excluir o lead de id " + leadIdToDelete + "?")) {
      return;
    }

    this.loading = true;
    this.checkService.deleteLead(window.localStorage["token"], leadIdToDelete).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.leadSave.name = res.msgSaida[0].name;
        this.leadSave.id = res.msgSaida[0].id;
        this.getLeadSearch();
      } else {
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.loading = false;
    });

  }

  getStatusList() {
    this.loading = true;
    this.checkService.getStatusList(window.localStorage["token"]).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.statusList = res.msgSaida;
      } else {
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
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
    this.leadSearch.nameContain = '';
    this.leadSearch.responseList = [];
    this.leadSearch.responseHasItem = false;
    this.leadSearch.showSearchBox = true;
    this.leadSave.name = '';
    this.leadSave.id = undefined;
    this.leadSave.showFields = false;
    this.action = ' (pesquisando)';
  }

  edit = function (leadId) {
    this.leadSave.id = leadId;
    this.leadSave.showFields = true;
    this.leadSearch.showSearchBox = false;
    this.action = ' (editando)';
    this.getLeadById();
  }

  new = function () {
    this.leadSave.showFields = true;
    this.leadSearch.showSearchBox = false;
    this.action = ' (incluindo)';
  }

}