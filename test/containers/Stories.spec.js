import React from 'react';
import sinon from 'sinon';
import * as services from '../../src/services/AxiosServices';

describe('Testing Stories', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(services, 'getArticleList').resolves({
      status: 200,
      data: {
        results: [
          'd1d6470b-d5bb-4671-bb6f-8cb209c8989f',
          'f887dd1a-de09-420d-bca9-12fa952d7de9',
          '9c0be87c-7226-4928-b248-b39561fb12f2',
          '0ecbc7ef-3efd-42a7-96cf-c67a5a2dd47c',
          '38c88223-ea9d-4d0d-940d-99972a5a8d1a',
          '6e2fad27-cd6c-4f62-848c-bd58dc15ff08',
          'da5cf481-a78f-4231-a768-79c309f93336',
          'abea432b-8068-4dd5-a42f-8868505e1e65',
          '81965430-6461-4440-ab97-311e435500a6',
          'aa801230-9d84-479d-abd5-ddce2cf453e2',
        ],
      },
    });
  });

  afterEach(() => sandbox.restore());

  it('should render', () => {
    expect(1).toEqual(1);
  });
});
