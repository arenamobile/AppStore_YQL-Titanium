Titanium.UI.setBackgroundColor('#000');
Titanium.include('functions.js');
 
var winYQL = Titanium.UI.createWindow({
    title:'AppStore by Bigola',
    backgroundColor:'#fff',
    modal:true,
    barColor: '#151515',
});

var yql = "select * from apple.itunes where term IN ('Bruno Guidolim','JVitor') and media='software' and entity='software' and attribute='softwareDeveloper' and sort='recent';";
var yqlList = [];
var line = 0;
var objYql = Titanium.Yahoo.yql(yql, function(e){
	for (var j = 0; j < e.data.result.length; j++){
		var result = e.data.result[j];
	
		for (var i = 0; i < parseInt(result.resultCount); i++){
			var appName 	= result.results[i].trackCensoredName;
			var appDev		= result.results[i].artistName;
			var appImg  	= result.results[i].artworkUrl100;
			var appLink 	= result.results[i].trackViewUrl;
			var appCategory = result.results[i].primaryGenreName;
			var appAvgRating= result.results[i].averageUserRating;
			var appTotRating= result.results[i].userRatingCount;
			var appPrice	= result.results[i].formattedPrice;
		
			var appLine = Ti.UI.createTableViewRow({
         		top:0,
         		height: 80,
          		borderColor:'#000',
          		link: appLink
      		});
      		
      		line++;
      
       		if (line % 2 == 0){
        		appLine.backgroundColor='#E6E6E6';
      		} else {
         		appLine.backgroundColor='#F2F2F2';
      		}
      	
      		var lblAppTitle = Ti.UI.createLabel({
         		text: appName,
          		textAlign: 'left',
          		left: 70,
          		height: 20,
          		width: 240,
          		top: 8,
          		color: '#373737',
          		font:{fontSize:'13px', fontWeight: 'bold'}
      		});
      	
      	    var lblAppDev = Ti.UI.createLabel({
      			text: appDev,
      			textAlign: 'left',
      			left: 70,
      			height: 10,
      			width: 150,
      			top: 28,
      			color: '#898989',
      			font:{fontSize:'11px', fontWeight: 'bold'}
      		});
      	
      		var lblAppCategory = Ti.UI.createLabel({
      			text: appCategory,
      			textAlign: 'left',
      			left: 70,
      			height: 10,
      			width: 150,
      			top: 40,
      			color: '#898989',
      			font:{fontSize:'11px'}
      		});
      	
      		var lblAppRating = Ti.UI.createLabel({
      			text: getStars(appAvgRating, appTotRating),
      			textAlign: 'left',
      			left: 70,
      			height: 10,
      			width: 80,
      			top: 58,
      			color: '#898989',
      			font:{fontSize:'11px'}
      		});
      	
      		var lblAppPrice = Ti.UI.createLabel({
      			text: appPrice,
      			textAlign: 'center',
      			left: 250,
      			top: 37,
      			height: 20,
      			width: 55,
      			color: '#fff',
      			borderRadius: 3,
      			backgroundGradient: {
        			type: 'linear',
        			startPoint: { x: '50%', y: '0%' },
       				endPoint: { x: '50%', y: '100%' },
        			colors: [{color: '#74C453', offset: 0.0}, {color: '#408524', offset: 1.0 }]
    			},
    			font:{fontSize:'12px', fontWeight: 'bold'}
      		});
      	
      		var imgApp = Ti.UI.createImageView({
      			image: appImg,
      			left: 4,
      			height: 60,
      			width: 60,
      			borderRadius: 10
      		});
      	
      		appLine.add(lblAppTitle);
      		appLine.add(lblAppDev);
      		appLine.add(lblAppCategory);
      		appLine.add(lblAppRating);
      		appLine.add(lblAppPrice);
      		appLine.add(imgApp);
      	
      		yqlList.push(appLine);
		}
	}
	
	var tableView = Titanium.UI.createTableView({
    	data:yqlList,
       	top:0
   	});
 
   winYQL.add(tableView);
 
   tableView.addEventListener('click',function(e) {
      Titanium.Platform.openURL(e.rowData.link);
   });
});

winYQL.open();
