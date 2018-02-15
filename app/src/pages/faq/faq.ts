import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, MenuController, NavParams, NavController} from 'ionic-angular';
import {SERVER_URL} from '../../providers/config';
import {FAQ} from "../../providers/faq/faq";

@IonicPage()
@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html'
})
export class FAQPage {

    public faqs: Array<{speaker: any}> = [];
    private items: any;
    public title: string;
    public text: string;
    public itemsOrder: any;

    constructor(public menuCtrl: MenuController, public navParams: NavParams, public navCtrl: NavController, public translateService: TranslateService, private faqService: FAQ) {
        console.log("In FAQ constructor");
        this.faqService.getFAQs().map((res)=>res.json()).subscribe((res)=>{
            console.log("Items: "+JSON.stringify(res));
            this.itemsOrder = res[":items"]["root"][":itemsOrder"];
            this.items = res[":items"]["root"][":items"];
            this.title = this.items["title"]["text"];
            this.text = this.items["text"]["text"];

            this.itemsOrder.forEach(function(itemKey) {
                var currItem = this.items[itemKey];
                if(currItem[":type"] === 'weretail/components/content/contentfragment'){
                    this.faqs.push({faq: currItem});
                }
            }, this);

        }, (err)=>{
            console.error("Error getting Speakers: "+err.message);
        });
    }

    getImage(image: string): string{
        return SERVER_URL+image;
    }

}
