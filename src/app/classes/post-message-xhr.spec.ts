import { PostMessageTransportService } from './../services/transport/post-message-transport.service';
import { PostMessageXhr } from './post-message-xhr';

describe('PostMessageXhr', () => {
    let transport: PostMessageTransportService;

    beforeEach(() => {
        transport = new PostMessageTransportService();
    });

    // ================================== Black-box ===================================

    describe('Black-box', () => {
        let instance: PostMessageXhr;

        beforeEach(() => {
            instance = new PostMessageXhr(transport);
        });

        describe('Initialization', () => {
            it('Should create an instance', () => {
                expect(new PostMessageXhr(transport)).toBeTruthy();
            });

            it('Should have valid initial "readyState" value', () => {
                expect(instance.readyState).toBe(0);
            });

            it('Should have valid initial "status" value', () => {
                expect(instance.status).toBe(0);
            });

            it('Should have valid initial "timeout" value', () => {
                expect(instance.timeout).toBe(0);
            });

            it('Should have valid initial "withCredentials"-flag value', () => {
                expect(instance.withCredentials).toBe(false);
            });
        });

        describe('Opening', () => {
            it('Should change "readyState" to "OPENED"', () => {
                instance.open('GET', '');
                expect(instance.readyState).toBe(1);
            });
        });

        describe('Aborting', () => {
            beforeEach(() => {
                instance.open('GET', '');
            });

            it('Should change "readyState" to "UNSENT"', () => {
                expect(instance.readyState).toBe(1);
                instance.abort();
                expect(instance.readyState).toBe(0);
            });
        });

        describe('Setting request headers', () => {
            it('Should raise exception if "readyState" is not "OPENED"', () => {
                expect(() => {
                    instance.setRequestHeader('header-name', 'header-value');
                }).toThrow();
            });

            it('Should raise exception if the request has already been sent', () => {
                instance.open('GET', '');
                instance.send();
                expect(() => {
                    instance.setRequestHeader('header', 'value');
                }).toThrow();
            });
        });

        describe('Sending', () => {
            it('Should raise exception if "readyState" is not "OPENED"', () => {
                expect(instance.send).toThrow();
            });
        });

        describe('Other properties', () => {
            it('"withCredentials". Positive', () => {
                instance.withCredentials = false;
                expect(instance.withCredentials).toBe(false);
                instance.withCredentials = true;
                expect(instance.withCredentials).toBe(true);

                instance.open('GET', '');

                instance.withCredentials = false;
                expect(instance.withCredentials).toBe(false);
                instance.withCredentials = true;
                expect(instance.withCredentials).toBe(true);
            });

            it('"withCredentials". Negative. Should rise error if the request has already been sent', () => {
                instance.open('GET', '');
                instance.send();
                expect(() => {
                    instance.withCredentials = false;
                }).toThrow();
            });
        });
    });

    // ================================== Clear-box ===================================

    describe('Clear-box', () => {
        let instance: PostMessageXhr;

        beforeEach(() => {
            instance = new PostMessageXhr(transport);
        });

        describe('Initialization', () => {
            it('"Sent"-flag should be cleared', () => {
                expect(instance['_sendFlag']).toBe(false);
            });

            it('Listeners list should be empty', () => {
                expect(instance['_listenersList'].length).toBe(0);
            });

            it('Headers list should be empty', () => {
                expect(Object.keys(instance['_config']['headers']).length).toBe(0);
            });
        });

        describe('Aborting', () => {
            beforeEach(() => {
                instance.open('GET', '');
            });

            it('Should change "status" to "0"', () => {
                instance['_state']['status'] = 200;
                expect(instance.status).toBe(200);
                instance.abort();
                expect(instance.readyState).toBe(0);
            });

            it('Should clear "sendFlag"', () => {
                instance.send();
                expect(instance['_sendFlag']).toBe(true);
                instance.abort();
                expect(instance['_sendFlag']).toBe(false);
            });
        });

        describe('Setting request headers', () => {
            it('Should set single header', () => {
                instance.open('GET', '');
                instance.setRequestHeader('header', 'value');
                expect(instance['_config']['headers']['header']).toBe('value');
                expect(Object.keys(instance['_config']['headers']).length).toBe(1);
            });

            it('Should set multiple headers', () => {
                instance.open('GET', '');
                instance.setRequestHeader('header-1', 'value-1');
                instance.setRequestHeader('header-2', 'value-2');
                expect(instance['_config']['headers']['header-1']).toBe('value-1');
                expect(instance['_config']['headers']['header-2']).toBe('value-2');
                expect(Object.keys(instance['_config']['headers']).length).toBe(2);
            });

            it('Should set multiple values for one header', () => {
                instance.open('GET', '');
                instance.setRequestHeader('header-1', 'value-1-1');
                instance.setRequestHeader('header-2', 'value-2');
                instance.setRequestHeader('header-1', 'value-1-2');
                expect(instance['_config']['headers']['header-1']).toBe(
                    'value-1-1, value-1-2'
                );
                expect(instance['_config']['headers']['header-2']).toBe('value-2');
                expect(Object.keys(instance['_config']['headers']).length).toBe(2);
            });

            it('Should raise exception if "sendFlag" is set', () => {
                instance['_sendFlag'] = true;
                expect(() => {
                    instance.setRequestHeader('header', 'value');
                }).toThrow();
            });
        });

        describe('Sending', () => {
            it('Negative. Should raise exception if "_sendFlag" is set', () => {
                instance['_sendFlag'] = true;
                expect(instance.send).toThrow();
            });
        });
    });
});
