const renderMapPointDataComponent = function (pointId, alt, speed) {
    return '<form id="' + pointId + '">' +
        '<input type="text" name="height" value="' + alt + '"/> Height' + '<br />' +
        '<input type="text" name="speed" value="' + speed + '" /> Speed' + '<br />' +
        '<input type="hidden" name="key" value="' + pointId + '"/>' +
        '<select name="action"><option value="0">No Action</option><option value="1">Activate</option></select>' + '<br />' +
        '<input type="submit" value="Save" onClick="updatePointValue(this.form); return false;" />' +
        '<input type="button" value="Remove" onClick="removePoint(this.form); return false;" />' + '<br />' +
        '</form>'
}

const renderDroneUIComponent = function (droneDTO) {
    const videoFeedURL = `'http://${PUBLIC_IP}:${PORT}/video/${droneDTO.id}'`;
    return '<div id="ctrlPanel1'+droneDTO.id+'" droneId="'+droneDTO.id+'" class="dronesList-header" );">Drone: '+droneDTO.id +

        '<span><label>Altitude (m): </label> <input type="text" id="infoAlt'+droneDTO.id+'" size="2" value="'+droneDTO.alt+'" disabled /></span>' +
        '<span><label> Speed (km/h): </label> <input type="text" id="infoSpeed'+droneDTO.id+'" size="2" value="'+droneDTO.speed+'" disabled /></span>' +
        '<span><label> Voltage: </label> <input type="text" id="infoBat'+droneDTO.id+'" size="2" value="'+droneDTO.battery+'" disabled /></span>' +
        '<span><label> MQ-135: </label> <input type="text" id="infoMq135'+droneDTO.id+'" size="2" value="'+droneDTO.mq135+'" disabled /></span>' +
        '<span><label> MQ-2: </label> <input type="text" id="infoMq2'+droneDTO.id+'" size="2" value="'+droneDTO.mq2+'" disabled /></span>' +
        '<span><label> Temperature: </label> <input type="text" id="infoTemperature'+droneDTO.id+'" size="2" value="'+droneDTO.Temperature+'" disabled /></span>' +
        '<span><label> Humidity: </label> <input type="text" id="infoHumidity'+droneDTO.id+'" size="2" value="'+droneDTO.humidity+'" disabled /></span>' +

        '<span><p id="onlineStatus'+droneDTO.id+'" class="drone-status">ONLINE</p>' +
        '<p id="armedStatus'+droneDTO.id+'" class="drone-arm-status">'+droneDTO.state+'</p></span>  </div>' +

        '<div class="dronesList-content" style="position:relative;">' +
        '<img class="'+droneDTO.id+'"  src="video.jpg"  style="width: 100%; border-radius: 15px;" ' +
             'onclick="DRONES_MAP.get(\''+droneDTO.id+'\').startVideoFeed(); activateViewFPV(\''+droneDTO.id+'\')"> <br/>' +

        '<div id="ctrlPanel2'+droneDTO.id+'" style="position: absolute; top: 50%; float: left;">' +
        '<table><tr><td> </td>' +
        '<td> <input class="button" id="btnF'+droneDTO.id+'" type="button" value="▲" /></td>' +
        '<td> </td> </tr>' +
        '<tr> <td><input class="button" id="btnMvL'+droneDTO.id+'" type="button" value="◀" /> </td>' +
        '<td> <input class="button" id="btnCncl'+droneDTO.id+'" type="button" value="■" /></td>' +
        '<td> <input class="button" id="btnMvR'+droneDTO.id+'" type="button" value="▶" /> </td></tr>' +
        '<tr> <td> </td>' +
        '<td><input class="button" id="btnB'+droneDTO.id+'" type="button" value="▼" /></td>' +
        '<td> </td></tr></table>  </div>' +

        '<div id="ctrlPanel3'+droneDTO.id+'" style="position: absolute; top: 30%;left:50px;">' +
        // '<table><tr> <td>' +
        '<input class="button" id="fArm'+droneDTO.id+'" type="button" value="TAKEOFF" />' +
        // '</td></tr> ' +
        // '<tr> <td>' +
        // '<input class="button" id="fDisarm'+droneDTO.id +'" type="button" value="LAND" />' +
        // '</td></tr>' +
        // '</table>' +
        '</div>' +

        '<div id="ctrlPanel8'+droneDTO.id+'" style="position: absolute; top: 30%;right:50px;">' +
        // '<table><tr> <td> <input class="button" id="fArm'+droneDTO.id+'" type="button" value=" ARM " /> </td></tr> ' +
        // '<tr> <td>' + 
        '<input class="button" id="fDisarm'+droneDTO.id+'" type="button" value="LAND" />'+ 
        // '</td></tr>' +
        // '</table>' + 
        '</div>' +

        '<div id="ctrlPanel4'+droneDTO.id+'" style="position: absolute; top: 50%;right:30px;">' +
        '<table><tr> <td></td><td> <input class="button" id="btnU'+droneDTO.id+'" type="button" value="≙" /> </td><td></td></tr> ' +
        '</tr>'+
        '<td> <input class="button" id="btnRLEFT45' + droneDTO.id + '" type="button" value="↶45" /> </td> ' +
        '<td> <input class="button" id="btnStopZ'+droneDTO.id+'" type="button" value="■" /></td> ' +
        '<td> <input class="button" id="btnRRIGHT45'+droneDTO.id+'" type="button" value="↷45" /></td></tr>' +
        '</tr>'+
        '<tr> <td></td><td> <input class="button" id="btnD'+droneDTO.id+'" type="button" value="≚" /> </td><td></td></tr> ' +
        '</table>  </div>' +

        '<div id="ctrlPanel5' + droneDTO.id + '">' +
        '<input class="button" id="mStart'+droneDTO.id+'" type="button" value="START/PAUSE Mission" />'+
        ' <input class="button" id="mCancel'+droneDTO.id+'" type="button" value="CLEAR Mission Data" /> ' +
        '<input class="button" id="mRTL'+droneDTO.id+'" type="button" value="RETURN HOME" />' +
        // '<input class="button" id="fActivate'+droneDTO.id+'" type="button" value="START DETECTION"/>' +
        // '<input class="button" onclick="window.open('+videoFeedURL+')" type="button" value="SHARE VIDEO"/>' +
        '</div>' +
        '<div id="ctrlPanel6'+droneDTO.id+'" style="position:absolute;top:30px;left:30px;">' +
        '<input class="button" onclick="activateViewMAP(\''+droneDTO.id+'\')" type="button" value="VIEW ON MAP" style="width:148px;background-color:green;opacity:0.55;"/>' +
        '</div>' +

        '<div id="ctrlPanel7'+droneDTO.id+'" style="position: absolute; top: 30px;right:30px;">' +
        '<input class="button" id="fKill'+droneDTO.id+'" type="button" value="KILL MOTORS" style="width:133px;background-color:#ff0000;opacity:0.55;"/>' +
        '</div>' +

        '</div>'
}



const activateViewFPV = function (id) {
	$('#map').hide();
    if(window.innerWidth < 768 && screen.orientation && screen.orientation.type.startsWith('portrait')){
        document.documentElement.requestFullscreen();
        screen.orientation.lock('landscape');
        window.addEventListener('popstate', () => {
            gotoListDrone();
          }, {once: true});
    }
    $('.lineGraph').css({"display": "block"});

    $('#drone-head').css({ "display": "inline"});
    $('.dronesList').css({ "width": "90%"});

    $('#ctrlPanel2').attr("style", "");
    $('#ctrlPanel3').attr("style", "");
    $('#ctrlPanel4').attr("style", "");
    $('#ctrlPanel8').attr("style", "");

	$('#ctrlPanel2'+id).css({ "position": "absolute", "top": "50%", "float": "left" });
	$('#ctrlPanel3'+id).css({ "position": "absolute", "top": "30%", "left":"50px"});
	$('#ctrlPanel4'+id).css({ "position": "absolute", "top": "50%", "right":"30px"});
    $('#ctrlPanel8'+id).css({ "position": "absolute", "top": "30%", "right":"50px"});

    $('div[id^="ctrlPanel1"]').show();
	$('#ctrlPanel6'+id).show();
	$('#ctrlPanel5'+id).show();
	$('#ctrlPanel7'+id).show();
}

const activateViewMAP = function (id) { 
        $('#map').show();
	    $('#map').css({ "width": "45%", "height": "750px", "position": "relative", "float": "left", "top": "0px", "left": "0px", "opacity": "1" });
        $('.dronesList').css({"margin" : "auto", "width": "50%"})
        $('#drone-head').css({"display": "none"});
        $('div[id^="ctrlPanel1"]').hide();
        $('#ctrlPanel5'+id).hide();
        $('#ctrlPanel6'+id).hide();
        $('#ctrlPanel7'+id).hide();
        $('#ctrlPanel2'+id).attr("style", "");
        $('#ctrlPanel3'+id).attr("style", "");
        $('#ctrlPanel4'+id).attr("style", "");
        $('#ctrlPanel8'+id).attr("style", "");

        $('droneList-content').css({"display": "flex", "flex-direction": "columnn", "align-items": "center"});
        $('#ctrlPanel2'+id).css({"position": "relative", "float": "left", "margin":"20px", "box-sizing": "border-box"});
        $('#ctrlPanel3'+id).css({"position": "relative", "float": "left", "margin":"10px", "box-sizing": "border-box"});
        $('#ctrlPanel8'+id).css({"position": "relative", "float": "left", "margin":"10px", "box-sizing": "border-box"});
        $('#ctrlPanel4'+id).css({"position": "relative", "float": "left", "margin":"20px", "box-sizing": "border-box"});
}

function gotoListDrone (){
    $(".dronesList > .active").each(function (index) {
        $(this).removeClass("active").next().slideToggle();

        var drone = DRONES_MAP.get( $(this).attr('droneId'));
        drone.stopVideoFeed();
        drone.hidePoints();
    });
} 

