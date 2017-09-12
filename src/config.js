module.exports = {
  engine:{
		version: '0.1.0',
		entry_point: 'org.machine.engine.Main',
    communication:{
      webserver:{
        host: 'localhost',
        port: '2324',
				user: "engine-websocket-system",
				protocol: 'engine.json.v1',
				session:{
					header: 'X-Session'
				}
      },
			identity_service:{
				host: 'localhost',
        port: '3300',
				user: 'engine-identity-system',
				session:{
					header: 'Set-Authorization'
				}
			}
    },
    graphdb:{
      path: '/Applications/Mod89\ Machine.app/Contents/db'
    },
    logging:{
      level: 'DEBUG'
    }
  }
};
