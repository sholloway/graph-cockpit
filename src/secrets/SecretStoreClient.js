const crypto = require('crypto')
const keytar = require('keytar')


class SecretStoreClient{
	constructor(serviceName){
		this.serviceName = serviceName
	}

	getOrCreateSecret(secretName, size, context, key){
		return new Promise((fulfill, reject) => {
  		this._secretStore().getPassword(this.serviceName, secretName)
				.then(
					(s)=>{
						context.secrets[key] = s;
						fulfill(context.secrets[key])
					},
					(error)=>{
						console.log(error);
						context.secrets[key] = crypto.randomBytes(size).toString('hex')
						this._secretStore().setPassword(this.serviceName, secretName, context.secrets[key])
						.then(() => {
							fulfill(context.secrets[key])
						})
						.catch(
							(error)=>{
								reject(error)
							}
						)
					}
				)
		})
	}

	_secretStore(){
		return keytar
	}
}
module.exports = SecretStoreClient
