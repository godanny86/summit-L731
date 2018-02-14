import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, MenuController, NavParams, NavController} from 'ionic-angular';
import {Speakers} from "../../providers/speakers/speakers";
import {SERVER_URL} from '../../providers/config';

@IonicPage()
@Component({
    selector: 'page-summit-speakers',
    templateUrl: 'summit-speakers.html'
})
export class SummitSpeakersPage {

    public speakers: Array<{speaker: any}> = [];
    private items: any;
    public title: string;
    public text: string;
    public itemsOrder: any;
    private key: string;

    constructor(public menuCtrl: MenuController, public navParams: NavParams, public navCtrl: NavController, public translateService: TranslateService, private speakersService: Speakers) {
        console.log("In Summit Speakers constructor");
        this.speakersService.getSpeakers().map((res)=>res.json()).subscribe((res)=>{
            console.log("Items: "+JSON.stringify(res));
            this.itemsOrder = res[":items"]["root"][":itemsOrder"];
            this.items = res[":items"]["root"][":items"];
            console.log("Finished constructor in Speakers. title: "+this.items["title"]["text"]);
            this.title = this.items["title"]["text"];
            this.text = this.items["text"]["text"];
            for(var i=0; i<this.itemsOrder.length; i++){
                this.key = this.itemsOrder[i];
                if(this.key.indexOf("contentfragment") >= 0){
                    console.log("contentfragment found - "+this.key);
                    this.speakers.push({speaker: this.items[this.key]});
                }
            }
        }, (err)=>{
            console.error("Error getting Speakers: "+err.message);
        });
    }

    getImage(image: string): string{
        return SERVER_URL+image;
    }


}
