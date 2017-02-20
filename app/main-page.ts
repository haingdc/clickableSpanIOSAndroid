
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import {Label} from "ui/label";
import {TextView} from "ui/text-view";
import {isAndroid} from "platform";
import {isIOS} from "platform"
import formattedStringModule = require("text/formatted-string");
import spanModule = require("text/span");
import colorModule = require("color");
var delegateModule;

declare var android:any;

if(isIOS){
    delegateModule = require("./delegate/delegate");
}

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;


}


export function textViewloaded(args){
    var textview:TextView = <TextView>args.object;


    console.log("---------------ios view-----------------");
        console.log(textview.ios);
    if(isAndroid){

    
        var ss = new 	android.text.SpannableString("Android is a Software stack");
        var ClickableSpanClass = android.text.style.ClickableSpan.extend({
            onClick: function(view) {
                console.log("on span click");
            },
            updateDrawState: function(tp) {
                this.super.updateDrawState(tp);
                tp.setUnderlineText(false);
            }
        });

        var ClickableSpanClass2 = android.text.style.ClickableSpan.extend({
            onClick: function(view) {
                console.log("on span click2");
                
            },
            updateDrawState: function(tp) {
                this.super.updateDrawState(tp);
                tp.setUnderlineText(false);
            }
        });
        var clickablespan = new ClickableSpanClass();
        var clickablespan2 = new ClickableSpanClass2();

        console.log("-----------------------click span-------------------------");
        console.dump(clickablespan);
        
        
        ss.setSpan(clickablespan, 0, 7, 33);
        ss.setSpan(clickablespan2, 13, 21, 33);

        textview.android.setText(ss);
        textview.android.setMovementMethod(android.text.method.LinkMovementMethod.getInstance());
    }
    else{
        var tv =<any>textview;
        var attrsting = NSMutableAttributedString.alloc().initWithString("test test1 @test2 ");
        attrsting.addAttributeValueRange(NSLinkAttributeName, "test", { location: 0, length: 4 });
        tv.ios.attributedText=attrsting;

        setTimeout(()=>{
            var uiTextView = tv.ios;
            let newDelegate = delegateModule.newUITextViewDelegateImpl.initWithOriginalDelegate(tv._delegate);
            tv._delegate = newDelegate;
            uiTextView.delegate=newDelegate;
        }, 100);
    }
}

