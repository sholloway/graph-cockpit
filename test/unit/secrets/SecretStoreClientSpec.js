import { expect } from 'chai';
import sinon from 'sinon';
import SecretStoreClient from '../../../src/secrets/SecretStoreClient';

describe('SecretStoreClient', () => {
	let serviceName = 'test.service'
	let secretName = 'new.secret'
	let size = 64
	let context = {
		secrets: {
			test_secret: null
		}
	}
	let key = 'test_secret'

	it ('should create a new secret when one does not exist', async () =>{
		let fakeSecretStore = {
			getPassword: function(serviceName, secretName){
				return new Promise((fulfill, reject) => {
					reject('Did not find the secret.')
				});
			},
			setPassword: function(serviceName, secretName, secret){
				return new Promise((fulfill, reject) => {
					fulfill(secret)
				});
			}
		}
		let client = new SecretStoreClient(serviceName)
		let spy = sinon.stub(client, '_secretStore').callsFake(function(){return fakeSecretStore});
		client.getOrCreateSecret(secretName, size, context, key)
			.then((secret) => {
				expect(context.secrets.test_secret).to.not.be.null
				sinon.assert.calledTwice(spy)
			})
			.catch(e => {
				expect.fail(0,1, "An unexpected exception was thrown.")
				console.log(e)
			})
	});

	it ('should not create a new secret when one exists', () => {
		let fakeSecretStore = {
			getPassword: function(serviceName, secretName){
				return new Promise((fulfill, reject) => {
					fulfill('The Secret')
				});
			},
			setPassword: function(serviceName, secretName, secret){
				return new Promise((fulfill, reject) => {
					fulfill(secret)
				});
			}
		}
		let client = new SecretStoreClient(serviceName)
		let spy = sinon.stub(client, '_secretStore').callsFake(function(){return fakeSecretStore});
		client.getOrCreateSecret(secretName, size, context, key)
			.then((secret) => {
				expect(context.secrets.test_secret).to.equal('The Secret')
				sinon.assert.calledOnce(spy)
			})
			.catch(e => {
				expect.fail(0,1, "An unexpected exception was thrown.")
				console.log(e)
			})
	})
})
