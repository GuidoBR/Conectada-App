import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';

import { Modal } from '../modal/modal';
import { Opportunity } from '../../services/opportunities/types';
import { OpportunitiesService } from '../../services/opportunities/opportunities';

@IonicPage()
@Component({
  selector: 'page-opportunity-modal',
  templateUrl: 'opportunityModal.html',
})
export class OpportunityModal {
  opportunity: Opportunity;
  title: String;

  constructor (
    public viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private OpportunitiesService: OpportunitiesService,
    public params: NavParams) {
    this.opportunity = {
      id: params.get('id'),
      opportunityType: params.get('opportunityType'),
      title: params.get('title'),
      description: params.get('description'),
    };
    if (this.opportunity.opportunityType === 0) {
      this.title = 'Estágio';
    }
    if (this.opportunity.opportunityType === 1) {
      this.title = 'Pesquisa';
    }
  }

  sendInterest() {
    this.viewCtrl.dismiss();
    this.OpportunitiesService.sendInterest()
      .then(response => {
        const modal = this.modalCtrl.create(Modal, response);
        modal.present();
      });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
