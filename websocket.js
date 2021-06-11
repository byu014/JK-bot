const WebSocket = require('ws');
const {serverCheck} = require('./utils/servercheck');

function heartbeat(ws, interval, heartbeatInterval) {
	heartbeatInterval = setInterval(() => {
		ws.send(JSON.stringify({ op: 9 }));
	}, interval);
}

module.exports.connectjpop = function (ops) {
	let ws = new WebSocket('wss://listen.moe/gateway_v2');
	let heartbeatInterval;

	ws.onopen = () => {
		clearInterval(heartbeatInterval);
		heartbeatInterval = null;
	};

	ws.onmessage = message => {
		if (!message.data.length) return;
		let response;
		try {
			response = JSON.parse(message.data);
		} catch (error) {
			return;
		}
		switch (response.op) {
            case 0:
				ws.send(JSON.stringify({ op: 9 }));
				heartbeat(ws, response.d.heartbeat, heartbeatInterval);
				break;
			case 1:
                let imagePath = 'https://cdn.statically.io/img/wallpapercave.com/wp/wp2146217.jpg'
				if (response.t !== 'TRACK_UPDATE' && response.t !== 'TRACK_UPDATE_REQUEST' && response.t !== 'QUEUE_UPDATE' && response.t !== 'NOTIFICATION') break;
				// console.log(response.d); // Do something with the data
                if(response.d.song.albums.length && response.d.song.albums[0].image !== null){
                    imagePath = 'https://cdn.listen.moe/covers/' + response.d.song.albums[0].image;
                }
                ops.currentSong.jpop = response.d.song;
				console.log(response.d.song);
                break;
            default:
                break;
        }
	};

	ws.onclose = error => {
		clearInterval(heartbeatInterval);
		heartbeatInterval = null;
		if (ws) {
			ws.close();
			ws = null;
		}
		// setTimeout(() => connect(), 5000);
	};
}

module.exports.connectkpop = function (ops) {
	let ws = new WebSocket('wss://listen.moe/kpop/gateway_v2');
	let heartbeatInterval;

	ws.onopen = () => {
		clearInterval(heartbeatInterval);
		heartbeatInterval = null;
	};

	ws.onmessage = message => {
		if (!message.data.length) return;
		let response;
		try {
			response = JSON.parse(message.data);
		} catch (error) {
			return;
		}
		switch (response.op) {
            case 0:
				ws.send(JSON.stringify({ op: 9 }));
				heartbeat(ws, response.d.heartbeat, heartbeatInterval);
				break;
			case 1:
                let imagePath = 'https://cdn.statically.io/img/wallpapercave.com/wp/wp2146217.jpg'
				if (response.t !== 'TRACK_UPDATE' && response.t !== 'TRACK_UPDATE_REQUEST' && response.t !== 'QUEUE_UPDATE' && response.t !== 'NOTIFICATION') break;
				// console.log(response.d); // Do something with the data
                if(response.d.song.albums.length && response.d.song.albums[0].image !== null){
                    imagePath = 'https://cdn.listen.moe/covers/' + response.d.song.albums[0].image;
                }
                ops.currentSong.kpop = response.d.song;
				console.log(response.d.song);
                break;
            default:
                break;
        }
	};

	ws.onclose = error => {
		clearInterval(heartbeatInterval);
		heartbeatInterval = null;
		if (ws) {
			ws.close();
			ws = null;
		}
		// setTimeout(() => connect(), 5000);
	};
}

module.exports.connectws = function (ops) {
	for(let mode in ops.modes){
		let ws = new WebSocket(ops.modes[mode].wss);
		let heartbeatInterval;

		ws.onopen = () => {
			clearInterval(heartbeatInterval);
			heartbeatInterval = null;
		};

		ws.onmessage = message => {
			if (!message.data.length) return;
			let response;
			try {
				response = JSON.parse(message.data);
			} catch (error) {
				return;
			}
			switch (response.op) {
				case 0:
					ws.send(JSON.stringify({ op: 9 }));
					heartbeat(ws, response.d.heartbeat, heartbeatInterval);
					break;
				case 1:
					let imagePath = 'https://cdn.statically.io/img/wallpapercave.com/wp/wp2146217.jpg'
					if (response.t !== 'TRACK_UPDATE' && response.t !== 'TRACK_UPDATE_REQUEST' && response.t !== 'QUEUE_UPDATE' && response.t !== 'NOTIFICATION') break;
					// console.log(response.d); // Do something with the data
					if(response.d.song.albums.length && response.d.song.albums[0].image !== null){
						imagePath = 'https://cdn.listen.moe/covers/' + response.d.song.albums[0].image;
					}
					ops.currentSong[mode] = response.d.song;
					// console.log(ops.currentSong[mode])
					break;
				default:
					break;
			}
		};

		ws.onclose = error => {
			clearInterval(heartbeatInterval);
			heartbeatInterval = null;
			if (ws) {
				ws.close();
				ws = null;
			}
			// setTimeout(() => connect(), 5000);
		};
	}
}