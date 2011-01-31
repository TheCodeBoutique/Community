(function(){var a="community";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore","sproutcore/animation"],styles:["/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/stylesheet-packed.css","/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/stylesheet.css"],scripts:["/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/javascript-packed.js"]}
})();ScCommunityMarketing=SC.Application.create({NAMESPACE:"ScCommunityMarketing",VERSION:"0.1.0",store:SC.Store.create({commitRecordsAutomatically:YES}).from("ScCommunityMarketing.BetaUserDataSource")});
ScCommunityMarketing.betaController=SC.ArrayController.create({newSignUp:"",newName:"",alertPaneDidDismiss:function(b,a){switch(a){case SC.BUTTON1_STATUS:this.exit();
break;case SC.BUTTON2_STATUS:break;case SC.BUTTON3_STATUS:break}},showBetaUsers:function(){console.log("showing the users ");
ScCommunityMarketing.getPath("betaUserPage.mainPane").append()},exit:function(){ScCommunityMarketing.getPath("signupPage.signupPane").remove()
},addTask:function(){var c=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
if(!this.newSignUp.match(c)){SC.AlertPane.error("Invalid Email Address.","Please use a valid email format")
}else{var a;var b=this.set(this.newSignUp);var d=this.set(this.newName);console.log(b);
a=ScCommunityMarketing.store.createRecord(ScCommunityMarketing.BetaUsers,{email:b.newSignUp,name:d.newName});
SC.AlertPane.info("Thank you for signing up","We will notify you via email when SC Comunnity is ready","The Code Boutique","ok",ScCommunityMarketing.betaController);
ScCommunityMarketing.betaController.set("newSignUp","");ScCommunityMarketing.betaController.set("newName","");
return YES}}});ScCommunityMarketing.BetaUsers=SC.Record.extend({primaryKey:"id",name:SC.Record.attr(String),email:SC.Record.attr(String)});
sc_require("models/beta_users");ScCommunityMarketing.BetaUsers.FIXTURES=[{guid:1,name:"Kyle ",email:"kcarriedo@thecodeboutique.com"},{guid:2,name:"Chad",email:"ceubanks@thecodeboutique.com"},{guid:3,name:"contact",email:"contact@thecodeboutique.com"},{guid:4,name:"Martius",email:"martius@thecodeboutique.com"},{guid:5,name:"erich",email:"erich@thecodeboutique.com"},];
ScCommunityMarketing.betaExtend=SC.ListItemView.extend({});ScCommunityMarketing.moduleController=SC.ObjectController.create({contentBinding:"ScCommunityMarketing.modulesController.selection",nowShowing:"ScCommunityMarketing.aboutPage.aboutView",contentBindingDefault:SC.Binding.single("ScCommunityMarketing.modulesController.selection"),delayShow:function(){this.invokeLater(this.set,50,"nowShowing",this.get("show"))
}.observes("show"),showDemo:function(){this.set("nowShowing","ScCommunityMarketing.demoPage.demoView")
}});ScCommunityMarketing.groups=[SC.Object.create({name:"About The Project",show:"ScCommunityMarketing.aboutPage.aboutView",description:"SC Community is an application designed for sproutcore engineers to post developer profiles, company profiles, and allow them to reach out to other community members.  Within sc community, recruiters will be able to find a developers profile or team profile to hire, developers and teams will be able to express tips on SproutCore, and community members will be able to post press-releases on new product launches.<br></br><br></br>We hope to encourage community camaraderie and build a place for community members to network with eachother."}),SC.Object.create({name:"Progress",show:"ScCommunityMarketing.progressPage.progressView",description:"As the project grows, we will be posting news updates for everyone to keep track of.  We also encourage you to apply for the beta.  This is to ensure that you stay up to date on milestones reached and our official launch. <br></br> <br> </br>There will be a sub domain: live.sccommunityapp.com that you will be able to watch.  As we add new functionality and push commits to our git this section will be updated.   We believe this will be a fun opportunity to create a project in the wild for the community to watch grow.  The code for the project will be open source and available at github.com/TheCodeBoutique. "}),SC.Object.create({name:"Developers",show:"ScCommunityMarketing.developersPage.developersView"}),SC.Object.create({name:"Demo",show:"ScCommunityMarketing.demoPage.demoView"})];
ScCommunityMarketing.modulesController=SC.ArrayController.create({});sc_require("models/beta_users");
ScCommunityMarketing.USER_QUERY=SC.Query.local(ScCommunityMarketing.BetaUsers);ScCommunityMarketing.BetaUserDataSource=SC.DataSource.extend({fetch:function(a,b){if(b===ScCommunityMarketing.USER_QUERY){SC.Request.getUrl("/users.json").header({Accept:"application/json"}).json().notify(this,"didFetchQuery",a,b).send();
console.log("we are fetching the data");console.log(b);return YES}return NO},didFetchQuery:function(b,a,d){var c=a.loadRecords(ScCommunityMarketing.BetaUsers,ScCommunityMarketing.TaskJSONProxy.normalize_task_data(b.get("body")));
if(SC.ok(b)){console.log("we fetched the data");console.log(d);a.loadRecords(d.primaryKey,b.get("body"));
a.dataSourceDidFetchQuery(d)}else{a.dataSourceDidErrorQuery(d,b)}},retrieveRecord:function(a,c){console.debug("retrieveRecord");
if(SC.kindOf(a.recordTypeFor(c),ScCommunityMarketing.BetaUsers)){var b=a.idFor(c);
console.log("Here is the url = "+b);SC.Request.getUrl(b).header({Accept:"application/json"}).json().notify(this,"didRetrieveTask",a,c).send();
return YES}else{return NO}},didRetrieveTask:function(b,a,d){if(SC.ok(b)){var c=b.get("body");
console.log("Here is the dataHash = "+c);a.loadRecord(recordType,c,id)}else{a.dataSourceDidError(d,b)
}},createRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),ScCommunityMarketing.BetaUsers)){SC.Request.postUrl("/users.json").header({Accept:"application/json"}).json().notify(this,this.didCreateTask,a,b).send(a.readDataHash(b));
return YES}else{return NO}},didCreateTask:function(b,a,d){if(SC.ok(b)){var e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var c=e.exec(b.header("Location"))[8];a.dataSourceDidComplete(d,null,c)}else{a.dataSourceDidError(d,b)
}},updateRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),ScCommunityMarketing.BetaUsers)){SC.Request.putUrl(a.idFor(b)).header({Accept:"application/json"}).json().notify(this,this.didUpdateTask,a,b).send(a.readDataHash(b));
return YES}else{return NO}},didUpdateTask:function(b,a,c){if(SC.ok(b)){a.dataSourceDidComplete(c,b.get("body"))
}else{a.dataSourceDidError(c)}},destroyRecord:function(a,b){return NO}});ScCommunityMarketing.TaskJSONProxy=SC.Object.create({normalize_task_data:function(data){console.log("starting the if array"),result=new Array();
if(data.length==undefined){console.log("inside the first if statement array");array_name="data.user";
console.log(array_name);eval(array_name).guid=eval(array_name).id;result.push(eval(array_name))
}else{console.log("inside the second if statement array");for(var i=0;i<data.length;
i++){array_name="data[i].user	";console.log(data);eval(array_name).guid=eval(array_name).id;
result.push(eval(array_name))}}return result}});ScCommunityMarketing.membersController=SC.ArrayController.create({});
ScCommunityMarketing.members=[SC.Object.create({name:"Chad Eubanks",photo:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/clouds_alone.png",descriptionTop:"Chad Eubanks is the Founder and Lead UI Engineer of The Code Boutique.  He is an experienced software engineer with a proven track record for engineering cloud based applications (desktop,  tablet, mobile), and iOS applications (native and traditional web). Chad has a keen eye for",description:"creating clean user interfaces that are intuitive, polished, and minimalist in design; yet unique, powerful and pragmatic infunctionality. He specializes in business/team management, business/team development, and intellectual property with an emphasis on software.  Chad received formal and informal training from industry leaders such as Apple Incs. WWDC 2009, WWDC 2010, The Big Nerd Ranch, The Art Institute, and University California of San Diego for software engineering, web development, web design, and law.",}),SC.Object.create({name:"Kyle Carriedo",photo:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/clouds_alone.png",descriptionTop:"Kyle Carriedo is a Founding Partner and the Lead Software Engineer for The Code Boutique.  He passionately and effortlessly writes progressive code.  Kyle handles day to day engineering tasks and contributes innovative sproutcore applications to the community. Kyle has received his BA ",description:"in Computer Science from San Francisco State and is currently pursuing his Masters in Computer Science.  Kyle is also receiving his Unix System Administration certification from University California of San Diego.  Kyle was one of the first engineers to have an iPhone app in the app store.  He has extensive knowledge on software engineering and has a deep understanding of creating iOS and OSx applications.  Kyle enjoys writing SproutCore training material and helping the communty grow.",}),SC.Object.create({name:"Maurits Lamers",photo:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/clouds_alone.png",descriptionTop:"Maurits Lamers is the newest member to The Code Boutique.  He is a SproutCore DataSource expert, a trainer at The Code Boutique, and the architect of Thoth: a database front end application that lives on a server for SproutCore applications.  Thoth supports authentication,",description:"<p> roles, custom policies and automatic data distribution between connected clients, as well as representing one or more different databases as one remote storage for SproutCore applications.  Maurits enjoys teaching complex concepts in a clear and straightforward manner. As a musician, composer and computer programmer he likes to create software that revolves around sound, music and music education.  Maurits is a core member of the SproutCore framework. </p>",}),];
ScCommunityMarketing.developersListViewExtend=SC.View.extend(SC.ContentDisplay,{content:null,createChildViews:function(){var f=[];
var e=this.get("content");if(SC.none(e)){return}var c=this.createChildView(SC.ImageView.extend({classNames:["photos"],escapeHTML:NO,layout:{left:10,top:35,width:120,height:75},content:e,isTextArea:YES,valueBinding:SC.binding(".photo",e)}));
f.push(c);var a=this.createChildView(SC.LabelView.extend({classNames:["description"],escapeHTML:NO,layout:{left:140,top:55,right:10,bottom:134},content:e,isTextArea:YES,valueBinding:SC.binding(".descriptionTop",e)}));
f.push(a);var d=this.createChildView(SC.LabelView.extend({classNames:["description"],escapeHTML:NO,layout:{left:53,top:112,right:10,bottom:0},content:e,isTextArea:YES,valueBinding:SC.binding(".description",e)}));
f.push(d);var b=this.createChildView(SC.LabelView.extend({classNames:["content-text"],escapeHTML:NO,layout:{top:15,width:200,height:30,left:10},content:e,isTextArea:YES,valueBinding:SC.binding(".name",e)}));
f.push(b);this.set("childViews",f)}});ScCommunityMarketing.COMMUNITYICON=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){if(ScCommunityMarketing.openingcreditsPage.mainPane.mainLogo.style.opacity===0){this.invokeLater(this.showCommunityIcon,1000)
}},willLoseFirstResponder:function(){},showCommunityIcon:function(){ScCommunityMarketing.openingcreditsPage.mainPane.iconLogo.adjust("opacity",1);
this.invokeLater(this.showMainPage,5000)},showMainPage:function(){ScCommunityMarketing.openingcreditsPage.mainPane.iconLogo.adjust("opacity",0);
ScCommunityMarketing.getPath("mainPage.mainPane").append();console.log("we are now in the main view")
}});ScCommunityMarketing.OPENINGCREDITS=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){console.log("Opening Credits State")
},willLoseFirstResponder:function(){},someAction:function(){}});ScCommunityMarketing.PRELOADER=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){console.log("Preloader State");
ScCommunityMarketing.getPath("openingcreditsPage.mainPane").append();ScCommunityMarketing.openingcreditsPage.mainPane.iconLogo.adjust("opacity",0);
this.invokeLater(this.setupAnimations,4000);ScCommunityMarketing.modulesController.set("content",ScCommunityMarketing.groups);
ScCommunityMarketing.membersController.set("content",ScCommunityMarketing.members)
},willLoseFirstResponder:function(){},setupAnimations:function(){ScCommunityMarketing.openingcreditsPage.mainPane.mainLogo.adjust("opacity",0);
ScCommunityMarketing.openingcreditsPage.mainPane.iconLogo.set("isVisible",true);ScCommunityMarketing.makeFirstResponder(ScCommunityMarketing.COMMUNITYICON)
},});ScCommunityMarketing.PRESENTS=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){console.log("Presents State")
},willLoseFirstResponder:function(){},someAction:function(){}});ScCommunityMarketing.aboutPage=SC.Page.design({aboutView:SC.View.design({layout:{left:0,right:0,top:0,bottom:0},childViews:"aboutContentBase betaButton demoButton".w(),aboutContentBase:SC.View.design({layout:{top:140,bottom:40,left:60,right:60},classNames:["content-base-view"],childViews:"aboutText aboutTextBase".w(),aboutTextBase:SC.View.design({hasAcceleratedLayer:true,layout:{top:45,bottom:25,left:40,right:40},classNames:["content-text-view"],childViews:"aboutDescription".w(),aboutDescription:SC.LabelView.design({classNames:["content-text"],layout:{top:10,bottom:0,left:10,right:10},escapeHTML:NO,valueBinding:"ScCommunityMarketing.moduleController.description"})}),aboutText:SC.LabelView.design({layout:{top:10,left:25,width:200,height:18},classNames:["content-text-title"],textAlign:SC.ALIGN_LEFT,value:"About The Project:"})}),betaButton:SC.ButtonView.design({layout:{right:30,top:60,height:55,width:268},classNames:["beta-button-large"],target:"ScCommunityMarketing.aboutView.betaButton",action:"this.goToBeta",goToBeta:function(){ScCommunityMarketing.getPath("signupPage.signupPane").append()
}}),demoButton:SC.ButtonView.design({layout:{left:30,top:60,height:55,width:267},classNames:["demo-button-large"],target:"ScCommunityMarketing.aboutView.demoButton",action:"this.goToDemo",goToDemo:function(){ScCommunityMarketing.moduleController.showDemo()
}}),})});ScCommunityMarketing.demoPage=SC.Page.design({demoView:SC.View.design({layout:{left:0,right:0,bottom:0,top:0},childViews:"displayImage demoVideo betaButton".w(),displayImage:SC.ImageView.design({layout:{centerX:0,centerY:0,height:835,width:870},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/displayImage.png",}),demoVideo:SC.LabelView.design({layout:{centerX:0,centerY:-75,width:575,height:350},escapeHTML:NO,value:"<video src= http://thecodeboutique.com/bonjour/SC-Community-App.mov width=575 height=350 controls></video>",}),betaButton:SC.ButtonView.design({layout:{right:30,bottom:60,height:55,width:268},classNames:["beta-button-large"],target:"ScCommunityMarketing.demoView.betaButton",action:"this.goToBeta",goToBeta:function(){ScCommunityMarketing.getPath("signupPage.signupPane").append()
}}),})});ScCommunityMarketing.developersPage=SC.Page.design({developersView:SC.View.design({layout:{left:0,right:0,top:0,bottom:0},childViews:"developersContent betaButton demoButton".w(),developersContent:SC.View.design({layout:{top:140,bottom:40,left:60,right:60},classNames:["content-base-view"],childViews:"developersText developersTextBase".w(),developersTextBase:SC.View.design({layout:{top:45,bottom:25,left:40,right:40},childViews:"developerDescription".w(),developerDescription:SC.ScrollView.design({hasHorizontalScroller:NO,layout:{top:0,bottom:0,left:0,right:0},contentView:SC.ListView.design({classNames:["content-text-view"],contentBinding:"ScCommunityMarketing.membersController.arrangedObjects",selectionBinding:"ScCommunityMarketing.membersController.selection",contentValueKey:"description",contentIconKey:"photo",exampleView:ScCommunityMarketing.developersListViewExtend,hasContentIcon:YES,escapeHTML:NO,rowHeight:250,})})}),developersText:SC.LabelView.design({layout:{top:10,left:25,width:200,height:18},classNames:["content-text-title"],textAlign:SC.ALIGN_LEFT,value:"Developers:"})}),betaButton:SC.ButtonView.design({layout:{right:30,top:60,height:55,width:268},classNames:["beta-button-large"],target:"ScCommunityMarketing.aboutView.betaButton",action:"this.goToBeta",goToBeta:function(){ScCommunityMarketing.getPath("signupPage.signupPane").append()
}}),demoButton:SC.ButtonView.design({layout:{left:30,top:60,height:55,width:267},classNames:["demo-button-large"],target:"ScCommunityMarketing.aboutView.demoButton",action:"this.goToDemo",goToDemo:function(){ScCommunityMarketing.moduleController.showDemo()
}}),})});ScCommunityMarketing.mainPage=SC.Page.design({mainPane:SC.MainPane.design({classNames:["base-view"],childViews:"contentSplit topBar secondBar toolBarLineTop toolBarLineBottom bottomBar ribbonCorner comingSoonText ribbonTail ".w(),ribbonCorner:SC.ImageView.design(SC.Animatable,{classNames:["ribbon-corner"],layout:{right:-32,top:-20,height:100,width:200},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/ribbonCorner.png",}),comingSoonText:SC.ImageView.design(SC.Animatable,{classNames:["coming-soon-text"],layout:{right:-4,top:16,height:22,width:89},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/coming_soon_text.png",}),ribbonTail:SC.ImageView.design(SC.Animatable,{classNames:["ribbon-tail"],layout:{right:125,top:54,height:90,width:150},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/ribbonTail.png",}),toolBarLineTop:SC.ImageView.design(SC.Animatable,{layout:{left:249,top:48,height:25,width:3},classNames:["toolbar-line"],value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/toolBarLine.png",}),toolBarLineBottom:SC.ImageView.design(SC.Animatable,{layout:{left:249,bottom:3,height:25,width:3},classNames:["toolbar-line"],value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/toolBarLine.png",}),topBar:SC.ToolbarView.design(SC.Animatable,{transitions:{transform:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},opacity:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},},classNames:["dark-toolbar"],layout:{top:0,left:0,right:0,height:45},isActive:false,anchorLocation:SC.ANCHOR_TOP,childViews:"cloudText cloudAlone".w(),cloudText:SC.ImageView.design(SC.Animatable,{layout:{left:10,centerY:0,height:100,width:200},transitions:{opacity:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/cloud_text.png",}),cloudAlone:SC.ImageView.design(SC.Animatable,{layout:{left:200,centerY:0,height:50,width:80},transitions:{opacity:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/clouds_alone.png",})}),secondBar:SC.ToolbarView.design({layout:{top:45,left:0,right:0,height:30},classNames:["light-toolbar"],}),bottomBar:SC.ToolbarView.design({layout:{bottom:0,left:0,right:0,height:32},classNames:["light-toolbar"],anchorLocation:SC.ANCHOR_BOTTOM}),contentSplit:SC.SplitView.design({layout:{left:0,top:75,right:0,bottom:32},layoutDirection:SC.LAYOUT_HORIZONTAL,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,defaultThickness:0.8,topLeftView:SC.View.design({layout:{top:75,bottom:32,width:200},childViews:"sign_up_view".w(),sign_up_view:SC.ScrollView.design({classNames:["nav-view"],hasHorizontalScroller:NO,layout:{top:0,bottom:0,left:0,right:0},contentView:SC.ListView.design({contentValueKey:"name",contentBinding:"ScCommunityMarketing.modulesController.arrangedObjects",selectionBinding:"ScCommunityMarketing.modulesController.selection",rowHeight:100,rowSpacing:2,})})}),topLeftMaxThickness:250,dividerView:SC.SplitDividerView.design({layout:{}}),bottomRightView:SC.ContainerView.design({nowShowingBinding:"ScCommunityMarketing.moduleController.nowShowing",layout:{centerX:0,top:0,bottom:0,centerY:0}}),}),})});
ScCommunityMarketing.openingcreditsPage=SC.Page.design({mainPane:SC.MainPane.design({classNames:["base-view"],childViews:"mainLogo iconLogo".w(),mainLogo:SC.ImageView.design(SC.Animatable,{layout:{centerX:0,centerY:0,height:374,width:1248},transitions:{opacity:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/tcb_presents_text.png",}).observes("opacity"),iconLogo:SC.ImageView.design(SC.Animatable,{isVisible:false,layout:{centerX:0,centerY:0,height:486,width:949},transitions:{opacity:{duration:2,timing:SC.Animatable.TRANSITION_CSS_EASE},},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/sc_community_icon.png",}).observes("opacity"),})});
ScCommunityMarketing.progressPage=SC.Page.design({progressView:SC.View.design({layout:{left:0,right:0,top:0,bottom:0},childViews:"progressContent betaButton demoButton".w(),progressContent:SC.View.design({layout:{top:140,bottom:40,left:60,right:60},classNames:["content-base-view"],childViews:"progressText progressTextBase".w(),progressTextBase:SC.View.design({layout:{top:45,bottom:25,left:40,right:40},classNames:["content-text-view"],childViews:"progressDescription".w(),progressDescription:SC.LabelView.design({classNames:["content-text"],layout:{top:10,bottom:0,left:10,right:10},escapeHTML:NO,valueBinding:"ScCommunityMarketing.moduleController.description"})}),progressText:SC.LabelView.design({layout:{top:10,left:25,width:200,height:18},classNames:["content-text-title"],textAlign:SC.ALIGN_LEFT,value:"Progress:"})}),betaButton:SC.ButtonView.design({layout:{right:30,top:60,height:55,width:268},classNames:["beta-button-large"],target:"ScCommunityMarketing.aboutView.betaButton",action:"this.goToBeta",goToBeta:function(){ScCommunityMarketing.getPath("signupPage.signupPane").append()
}}),demoButton:SC.ButtonView.design({layout:{left:30,top:60,height:55,width:267},classNames:["demo-button-large"],target:"ScCommunityMarketing.aboutView.demoButton",action:"this.goToDemo",goToDemo:function(){ScCommunityMarketing.moduleController.showDemo()
}}),})});ScCommunityMarketing.signupPage=SC.Page.design({signupPane:SC.MainPane.design({classNames:["base-view"],childViews:"aboutContentBase".w(),aboutContentBase:SC.View.design({layout:{centerX:0,centerY:0,height:223,width:700},classNames:["signup-base-view"],childViews:"cloudText cloudAlone signupText name email add exit".w(),cloudText:SC.ImageView.design({layout:{left:50,top:10,height:41,width:225},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/cloud_text_signup.png",}),cloudAlone:SC.ImageView.design({layout:{left:290,top:10,height:41,width:65},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/clouds_alone.png",}),signupText:SC.ImageView.design({layout:{left:30,top:50,height:147,width:356},value:"/static/community/en/83ab23c6f54fadab8872b675c36903a8e66a97d4/resources/images/signup_text.png",}),name:SC.TextFieldView.design({layout:{top:65,right:25,width:250,height:20},controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,hint:"name",valueBinding:"ScCommunityMarketing.betaController.newName"}),email:SC.TextFieldView.design({layout:{top:95,right:25,width:250,height:20},controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,hint:"email",valueBinding:"ScCommunityMarketing.betaController.newSignUp"}),add:SC.ButtonView.design({layout:{bottom:40,height:24,right:12,width:100},title:"Submit",target:"ScCommunityMarketing.betaController",action:"addTask",isDefault:YES}),exit:SC.ButtonView.design({layout:{bottom:40,height:24,left:12,width:100},title:"Cancel",target:"ScCommunityMarketing.betaController",action:"exit"})}),})});
ScCommunityMarketing.main=function main(){ScCommunityMarketing.makeFirstResponder(ScCommunityMarketing.PRELOADER);
var a=ScCommunityMarketing.store.find(ScCommunityMarketing.USER_QUERY);ScCommunityMarketing.betaController.set("content",a)
};function main(){ScCommunityMarketing.main()};