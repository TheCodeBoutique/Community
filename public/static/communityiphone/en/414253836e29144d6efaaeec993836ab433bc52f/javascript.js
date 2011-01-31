(function(){var a="community";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore","sproutcore/animation","sproutcore/table"],styles:["/static/community/en/5c33abcce10250104d0de3abe3b989993b6eb0aa/stylesheet-packed.css","/static/community/en/5c33abcce10250104d0de3abe3b989993b6eb0aa/stylesheet.css"],scripts:["/static/community/en/5c33abcce10250104d0de3abe3b989993b6eb0aa/javascript-packed.js"]}
})();Communityiphone=SC.Application.create({NAMESPACE:"Communityiphone",VERSION:"0.1.0",store:SC.Store.create({commitRecordsAutomatically:YES}).from("Communityiphone.BetaUserDataSource")});
Communityiphone.betaController=SC.ArrayController.create({summary:function(){var a=this.get("length"),b;
if(a&&a>0){b=a===1?"1 sign up":"%@ sign up's".fmt(a)}else{b="No sign up's"}return b
}.property("length").cacheable(),refresh:function(){Communityiphone.store.find(Communityiphone.USER_QUERY).refresh()
}});sc_require("models/beta_users");Communityiphone.USER_QUERY=SC.Query.local(Communityiphone.BetaUser);
Communityiphone.BetaUserDataSource=SC.DataSource.extend({fetch:function(a,b){if(b===Communityiphone.USER_QUERY){SC.Request.getUrl("/users.json").header({Accept:"application/json"}).json().notify(this,"didFetchQuery",a,b).send();
console.log("we are fetching the data");console.log(b);return YES}return NO},didFetchQuery:function(b,a,d){var c=a.loadRecords(Communityiphone.BetaUser,Communityiphone.TaskJSONProxy.normalize_task_data(b.get("body")));
if(SC.ok(b)){console.debug("didFetchTasks");console.log("we fetched the data");console.log(d);
a.loadRecords(d.primaryKey,b.get("body"));a.dataSourceDidFetchQuery(d)}else{a.dataSourceDidErrorQuery(d,b)
}},retrieveRecord:function(a,c){console.debug("retrieveRecord");if(SC.kindOf(a.recordTypeFor(c),Communityiphone.BetaUser)){var b=a.idFor(c);
console.log("Here is the url = "+b);SC.Request.getUrl(b).header({Accept:"application/json"}).json().notify(this,"didRetrieveTask",a,c).send();
return YES}else{return NO}},didRetrieveTask:function(b,a,d){if(SC.ok(b)){console.debug("true");
var c=b.get("body");console.log("Here is the dataHash = "+c);a.loadRecord(recordType,c,id)
}else{a.dataSourceDidError(d,b)}},createRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),Communityiphone.BetaUser)){SC.Request.postUrl("/users.json").header({Accept:"application/json"}).json().notify(this,this.didCreateTask,a,b).send(a.readDataHash(b));
return YES}else{return NO}},didCreateTask:function(b,a,d){if(SC.ok(b)){var e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var c=e.exec(b.header("Location"))[8];a.dataSourceDidComplete(d,null,c)}else{a.dataSourceDidError(d,b)
}},updateRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),Communityiphone.BetaUser)){SC.Request.putUrl(a.idFor(b)).header({Accept:"application/json"}).json().notify(this,this.didUpdateTask,a,b).send(a.readDataHash(b));
return YES}else{return NO}},didUpdateTask:function(b,a,c){if(SC.ok(b)){a.dataSourceDidComplete(c,b.get("body"))
}else{a.dataSourceDidError(c)}},destroyRecord:function(a,b){return NO}});Communityiphone.TaskJSONProxy=SC.Object.create({normalize_task_data:function(data){console.log("starting the if array"),result=new Array();
if(data.length==undefined){console.log("inside the first if statement array");array_name="data.user";
console.log(array_name);eval(array_name).guid=eval(array_name).id;result.push(eval(array_name))
}else{console.log("inside the second if statement array");for(var i=0;i<data.length;
i++){array_name="data[i].user	";console.log(data);eval(array_name).guid=eval(array_name).id;
result.push(eval(array_name))}}return result}});Communityiphone.BetaUser=SC.Record.extend({primaryKey:"id",name:SC.Record.attr(String),email:SC.Record.attr(String)});
Communityiphone.ExtendList=SC.View.extend(SC.ContentDisplay,{content:null,createChildViews:function(){var d=[];
var c=this.get("content");if(SC.none(c)){return}var b=this.createChildView(SC.LabelView.extend({escapeHTML:NO,layout:{left:10,top:3,width:320,height:20},content:c,isTextArea:YES,valueBinding:SC.binding(".name",c)}));
d.push(b);var a=this.createChildView(SC.LabelView.extend({escapeHTML:NO,layout:{left:10,top:19,width:320,height:20},content:c,isTextArea:YES,valueBinding:SC.binding(".email",c)}));
d.push(a);this.set("childViews",d)}});Communityiphone.mainPage=SC.Page.design({classNames:["base-view"],mainPane:SC.MainPane.design({childViews:"middleView topView bottomView".w(),topView:SC.ToolbarView.design({layout:{top:76,left:0,right:0,height:36},classNames:["dark-toolbar"],anchorLocation:SC.ANCHOR_TOP,childViews:"cloudText cloudAlone".w(),cloudText:SC.ImageView.design(SC.Animatable,{layout:{left:10,centerY:0,height:100,width:200},value:"/static/community/en/5c33abcce10250104d0de3abe3b989993b6eb0aa/resources/images/cloud_text.png",}),cloudAlone:SC.ImageView.design(SC.Animatable,{layout:{left:200,centerY:0,height:30,width:47},transitions:{opacity:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},},value:"/static/community/en/5c33abcce10250104d0de3abe3b989993b6eb0aa/resources/images/clouds_alone.png",})}),middleView:SC.ScrollView.design({classNames:["base-view"],hasHorizontalScroller:NO,layout:{top:0,bottom:0,left:0,right:0},contentView:SC.ListView.design({contentBinding:"Communityiphone.betaController.arrangedObjects",selectionBinding:"Communityiphone.betaController.selection",contentValueKey:"name",exampleView:Communityiphone.ExtendList,hasContentIcon:YES,escapeHTML:NO,fontSize:16,rowHeight:50}),}),bottomView:SC.ToolbarView.design({layout:{bottom:0,left:0,right:0,height:32},classNames:["dark-toolbar"],childViews:"summaryView refresh".w(),anchorLocation:SC.ANCHOR_BOTTOM,refresh:SC.ButtonView.design({layout:{centerY:0,height:25,left:20,width:25},classNames:["refresh-button"],title:"refresh",target:"Communityiphone.betaController",action:"refresh"}),summaryView:SC.LabelView.design({layout:{centerY:0,height:18,left:20,right:20},textAlign:SC.ALIGN_CENTER,classNames:["signup-count"],valueBinding:"Communityiphone.betaController.summary"})})})});
Communityiphone.main=function main(){Communityiphone.getPath("mainPage.mainPane").append();
var a=Communityiphone.store.find(Communityiphone.USER_QUERY);Communityiphone.betaController.set("content",a)
};function main(){Communityiphone.main()};