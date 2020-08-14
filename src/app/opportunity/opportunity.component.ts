import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpportunityService } from './opportunity.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {

  loading = false;
  opportunityList: [];

  opportunitySearch = {
    showSearchBox: true,
    descriptionContain: '',
    leadId: undefined,
    responseList: [],
    responseHasItem: false
  }

  opportunitySave = {
    showFields: false,
    description: '',
    leadId: undefined,
    id: undefined
  }

  action = ' (pesquisando)';

  constructor(private router: Router, private checkService: OpportunityService, private notifier: NotifierService) { }

  ngOnInit() {
    this.getLeadList();
  }

  getOpportunitySearch() {

    if ((this.opportunitySearch.descriptionContain == undefined || this.opportunitySearch.descriptionContain == '')
        && (this.opportunitySearch.leadId == undefined)){
      this.notifier.notify('error', 'Pelo menos um dos campos de pesquisa deve ser preenchido.');
      return;
    }

    this.loading = true;
    this.checkService.getOpportunitySearch(window.localStorage["token"], this.opportunitySearch).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.opportunitySearch.responseList = res.msgSaida;
        this.opportunitySearch.responseHasItem = true;
      } else {
        this.opportunitySearch.responseList = [];
        this.notifier.notify('error', res.error[0].message);
      }
      this.loading = false;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notifier.notify('error', error.message);
      }
      this.opportunitySearch.responseList = [];
      this.loading = false;
    });

  }

  getOpportunityById() {
    this.loading = true;
    this.checkService.getOpportunityById(window.localStorage["token"], this.opportunitySave.id).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.opportunitySave.description = res.msgSaida[0].description;
        this.opportunitySave.leadId = res.msgSaida[0].leadId;
        this.opportunitySave.id = res.msgSaida[0].id;
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

  saveOpportunity() {

    if (this.opportunitySave == undefined || this.opportunitySave.description == '' || this.opportunitySave.leadId == ''){
      this.notifier.notify('error', 'Preencha todos os campos obrigatórios.');
      return;
    }

    this.loading = true;
    this.checkService.saveOpportunity(window.localStorage["token"], this.opportunitySave).subscribe(res => {
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

  deleteOpportunity(opportunityIdToDelete) {

    if (!confirm("Realmente deseja excluir a oportunidade de id " + opportunityIdToDelete + "?")) {
      return;
    }
    
    this.loading = true;
    this.checkService.deleteOpportunity(window.localStorage["token"], opportunityIdToDelete).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.opportunitySave.description = res.msgSaida[0].name;
        this.opportunitySave.id = res.msgSaida[0].id;
        this.getOpportunitySearch();
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

  getLeadList() {
    this.loading = true;
    this.checkService.getLeadList(window.localStorage["token"]).subscribe(res => {
      if(res.result == 'SUCCESS') {
        this.opportunityList = res.msgSaida;
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

  edit = function (opportunityId) {
    this.opportunitySave.id = opportunityId;
    this.opportunitySave.showFields = true;
    this.opportunitySearch.showSearchBox = false;
    this.action = ' (editando)';
    this.getOpportunityById();
  }

  new = function () {
    this.opportunitySave.showFields = true;
    this.opportunitySearch.showSearchBox = false;
    this.action = ' (incluindo)';
  }

  startPage() {
    this.opportunitySearch.descriptionContain = '';
    this.opportunitySearch.responseList = [];
    this.opportunitySearch.responseHasItem = false;
    this.opportunitySearch.showSearchBox = true;
    this.opportunitySave.description = '';
    this.opportunitySave.id = undefined;
    this.opportunitySave.showFields = false;
    this.action = ' (pesquisando)';
  }

}