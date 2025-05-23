var dronesCount = 0;
const DRONES_MAP = new Map();
const ctx = document.getElementById('sensorChart').getContext('2d');
const sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}); 
var SELECTED_DRONE;
var WORLD_MAP;

google.maps.event.addDomListener(window, 'load', initializeApp);


function initializeApp() {

	WORLD_MAP = new google.maps.Map( document.getElementById('map'), {
		zoom: 2,
		center: { lat: 0, lng: 0 }
	});

	google.maps.event.addListener(WORLD_MAP, 'click', function (event) {
		addMarker(event.latLng);
	});

	document.addEventListener('keyup', function (event) {
		executeKeyboardCommand(event);
	});

	setInterval( updateSystemData, 1000);
}

const updateSystemData = function () {
	$.ajax({
		type: 'GET',
		url: '/updateSystemInfo',
	})
		.done(function (response) {

			loadDronesData(response);

			if (SELECTED_DRONE != undefined) {
				WORLD_MAP.setCenter({ lat: SELECTED_DRONE.lat, lng: SELECTED_DRONE.lng });
			}

		})
		.fail(function (data) {
			loadDronesData('[{}]');
		});
}



const loadDronesData = function (data) {
	var dronesDTOs = JSON.parse(data);
	$("p[id*='onlineStatus']").html('OFFLINE');

	dronesDTOs.forEach(function (droneDTO) {

		if (droneDTO == undefined || droneDTO.id == undefined) {
			return;
		}

		if (DRONES_MAP.has(droneDTO.id)) {
			$('#onlineStatus' + droneDTO.id).html('ONLINE');
			$('#armedStatus' + droneDTO.id).html(droneDTO.state);

			var drone = DRONES_MAP.get(droneDTO.id);
			drone.setPosition(droneDTO.lattitude, droneDTO.longitude, droneDTO.alt);
			drone.updateSensorData(droneDTO.temperature, droneDTO.humidity, droneDTO.mq2, droneDTO.mq135);
			sensorChart.update();
			$('#infoAlt' + droneDTO.id).val(droneDTO.alt);
			$('#infoSpeed' + droneDTO.id).val(droneDTO.speed);
			$('#infoBat' + droneDTO.id).val(droneDTO.battery);
			$('#infoMq135' + droneDTO.id).val(droneDTO.mq135);
			$('#infoMq2' + droneDTO.id).val(droneDTO.mq2);
			$('#infoTemperature' + droneDTO.id).val(droneDTO.temperature)
			$('#infoHumidity' + droneDTO.id).val(droneDTO.humidity)
		}

		else {
			var drone = new Drone(droneDTO.id, droneDTO.lattitude, droneDTO.longitude);
			drone.speed = droneDTO.speed;
			drone.altitude = droneDTO.alt;
			drone.mq135 = droneDTO.mq135;
			drone.mq2 = droneDTO.mq2;
			drone.temperature = droneDTO.temperature;
			drone.humidity = droneDTO.humidity;
			drone.updateSensorData(droneDTO.temperature, droneDTO.humidity, droneDTO.mq2, droneDTO.mq135);
			DRONES_MAP.set(droneDTO.id, drone);

			$('.dronesList').append( renderDroneUIComponent(droneDTO));

			$(".dronesList").on("click", ".dronesList-header", function () {

				if ($(this).hasClass("active")) {
					return;
				}

				$(".dronesList > .active").each(function (index) {
					$(this).removeClass("active").next().slideToggle();

					var drone = DRONES_MAP.get( $(this).attr('droneId'));
					drone.stopVideoFeed();
					drone.hidePoints();
				});
				
				SELECTED_DRONE = DRONES_MAP.get( $(this).attr('droneId'));
				SELECTED_DRONE.showPoints();
				SELECTED_DRONE.startVideoFeed();
				WORLD_MAP.setZoom(18);
								
				activateViewFPV(droneDTO.id);
				sensorChart.data = SELECTED_DRONE.chartData;
    			sensorChart.update();

				$(this).toggleClass("active").next().slideToggle();
			});

			initializeDronesControls(drone.id);
		}
	});
}
