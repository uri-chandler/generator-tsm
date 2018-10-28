import * as chai from 'chai';
import * as sinon from 'sinon';

import { conlog } from '../../src/lib/conlog';


// init "should" assertions
chai.should();

describe('lib/conlog', function() {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => sandbox = sinon.createSandbox());
    afterEach(() => sandbox.restore());

    it('works', async () => {

        // setup
        const fakeConsoleLog = sinon.fake();
        sandbox.replace(console, 'log', fakeConsoleLog);

        // work
        conlog();

        // assertions
        fakeConsoleLog.calledWith('hello').should.be.true;
    });
});