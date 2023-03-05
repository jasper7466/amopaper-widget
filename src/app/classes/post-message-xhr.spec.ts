import { PostMessageXhr } from './post-message-xhr';

describe('PostMessageXhr', () => {
  // ================================== Black-box ===================================

  describe('Black-box', () => {
    let instance: PostMessageXhr;

    beforeEach(() => {
      instance = new PostMessageXhr();
    });

    describe('Initialization', () => {
      it('Should create an instance', () => {
        expect(new PostMessageXhr()).toBeTruthy();
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
      it('Should raise exception if "readyState" in not "OPENED"', () => {
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
      it('Negative. Should raise exception if "readyState" in not "OPENED"', () => {
        expect(instance.send).toThrow();
      });
    });

    describe('Set/get properties', () => {
      it('Positive. "withCredentials"', () => {
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

      it('Negative. Set "withCredentials" should rise error if the request has already been sent', () => {
        instance.open('GET', '');
        instance.send();
        expect(() => {
          instance.withCredentials = false;
        }).toThrow();
      });
    });
  });

  // ================================== Clear-box ===================================

  describe('White-box', () => {
    let instance: PostMessageXhr;

    beforeEach(() => {
      instance = new PostMessageXhr();
    });

    describe('Initialization', () => {
      it('"Sent"-flag should be cleared', () => {
        expect(instance['_sendFlag']).toBe(false);
      });

      it('Listeners list should be empty', () => {
        expect(instance['_listenersList'].length).toBe(0);
      });

      it('Headers list should be empty', () => {
        expect(Object.keys(instance['_headersList']).length).toBe(0);
      });
    });

    describe('Aborting', () => {
      beforeEach(() => {
        instance.open('GET', '');
      });

      it('Should change "status" to "0"', () => {
        instance['_status'] = 200;
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
        expect(instance['_headersList']['header']).toBe('value');
        expect(Object.keys(instance['_headersList']).length).toBe(1);
      });

      it('Should set multiple headers', () => {
        instance.open('GET', '');
        instance.setRequestHeader('header-1', 'value-1');
        instance.setRequestHeader('header-2', 'value-2');
        expect(instance['_headersList']['header-1']).toBe('value-1');
        expect(instance['_headersList']['header-2']).toBe('value-2');
        expect(Object.keys(instance['_headersList']).length).toBe(2);
      });

      it('Should set multiple values for one header', () => {
        instance.open('GET', '');
        instance.setRequestHeader('header-1', 'value-1-1');
        instance.setRequestHeader('header-2', 'value-2');
        instance.setRequestHeader('header-1', 'value-1-2');
        expect(instance['_headersList']['header-1']).toBe(
          'value-1-1, value-1-2'
        );
        expect(instance['_headersList']['header-2']).toBe('value-2');
        expect(Object.keys(instance['_headersList']).length).toBe(2);
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
