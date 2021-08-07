import {
  getOnlyOneError,
  getMustBeAChildError
} from '../../../shared/single-core/single-core';

const root = (1, eval)('this');

describe('Jest Single', () => {
  function addTwo(num: number | undefined) {
    if (num) {
      return num + 2;
    }
    return undefined;
  }

  function addTwoAsync(num: number | undefined): Promise<number | void> {
    if (num) {
      return Promise.resolve(num + 2);
    }
    return Promise.resolve();
  }

  describe('A synchronous test', () => {
    given('input is set to 1', () => {
      const fakeNumber = 1;

      when(`adding 2`, () => {
        const actualResult = addTwo(fakeNumber);

        then('result should be 3', () => {
          expect(actualResult).toBe(3);
        });
      });
    });

    given('input is set to 1', () => {
      const fakeNumber = 1;

      when('adding 2', () => {
        const actualResult = addTwo(fakeNumber);

        then('result should be 3', () => {
          expect(actualResult).toBe(3);
        });
      });
    });
  });

  describe('full description', () => {
    it('should combine all 3 descriptions', () => {
      const itSpy = jest.spyOn(root, 'it').mockImplementation();
      given('fake given description', () => {
        when(`fake when description`, () => {
          then('fake then description', () => {});
        });
      });
      const expectedFullDescription = `
    GIVEN fake given description
    WHEN  fake when description
    THEN  fake then description`;

      const actualDescription = itSpy.mock.calls[0][0];
      expect(actualDescription).toEqual(expectedFullDescription);
    });
  });

  describe('focus and exclude', () => {
    it('should be able to focus on 1 given using "fgiven"', () => {
      const fitSpy = jest.spyOn(root, 'fit').mockImplementation();
      fgiven('FAKE DESCRIPTION', function () {});

      expect(fitSpy).toHaveBeenCalled();
    });

    it('should be able to focus on 1 given using "given.only"', () => {
      const fitSpy = jest.spyOn(root, 'fit').mockImplementation();;
      given.only('FAKE DESCRIPTION', function () {});

      expect(fitSpy).toHaveBeenCalled();
    });

    it('should not allow "fgiven" not as a root given', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());

      given('root given', () => {
        try {
          fgiven('another given', () => {});
        } catch (error) {
          expect(error.message).toEqual(getOnlyOneError('given'));
        }
      });
    });

    it('should be able to exclude a given using "xgiven"', () => {
      const xitSpy = jest.spyOn(root, 'xit').mockImplementation();
      xgiven('FAKE DESCRIPTION', function () {});

      expect(xitSpy).toHaveBeenCalled();
    });

    it('should be able to exclude a given using "given.skip"', () => {
      const xitSpy = jest.spyOn(root, 'xit').mockImplementation();
      given.skip('FAKE DESCRIPTION', function () {});

      expect(xitSpy).toHaveBeenCalled();
    });
  });

  describe('Async tests', () => {

    given('a "done" function gets passed', (done) => {
      const fakeNumber = 1;

      when('adding 2 asynchronously', () => {
        const actualResult = addTwo(fakeNumber);

        setTimeout(() => {
          then('result should be 3', () => {
            expect(actualResult).toBe(3);
            done();
          });  
        }, 0);
        
      });
    });

    it('should handle errors passed to "done"', async () => {
      let actualPromiseFromGiven: Promise<any> | undefined = undefined;
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => {
        actualPromiseFromGiven = fn();
      });

      given('given', (done) => {
        when('when', () => {
          then('then', () => {
            done(new Error('FAKE ERROR'));
          });
        });
      });
      try {
        await actualPromiseFromGiven;
        
      } catch (error) {
        expect(error.message).toEqual('FAKE ERROR');
      }
    });

    it('should handle errors passed to "done.fail()"', async () => {
      let actualPromiseFromGiven: Promise<any> | undefined = undefined;
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => {
        actualPromiseFromGiven = fn();
      });

      given('given', (done) => {
          when('when', () => {
            then('then', () => {
              done.fail(new Error('FAKE ERROR'));
            });
          });
      });
      try {
        await actualPromiseFromGiven;
        
      } catch (error) {
        expect(error.message).toEqual('FAKE ERROR');
      }
    });

    given('input is set to 1', () => {
      const fakeNumber = 1;

      when('adding 2 asynchronously', async () => {
        const actualResult = await addTwoAsync(fakeNumber);
        const actualResult2 = await addTwoAsync(fakeNumber);

        then('result should be 3', () => {
          expect(actualResult).toBe(3);
          expect(actualResult2).toBe(3);
        });
      });
    });

    given('input is set to async 1', async () => {
      const fakeNumber = await 1;

      when('adding 2 asynchronously', async () => {
        const actualResult = await addTwoAsync(fakeNumber);

        then('async result should be 3', async () => {
          const expectedResult = await Promise.resolve(3);
          expect(actualResult).toBe(expectedResult);
        });
      });
    });

  });

  describe('wrong order of functions', () => {
    it('should not allow "given" inside of another "given"', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());

      given('root given', () => {
        try {
          given('another given', () => {});
        } catch (error) {
          expect(error.message).toEqual(getOnlyOneError('given'));
        }
      });
    });

    it('should not allow "given" inside of another "when"', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());

      given('root given', () => {
        when('fake when', () => {
          try {
            given('another given', () => {});
          } catch (error) {
            expect(error.message).toEqual(getOnlyOneError('given'));
          }
        });
      });
    });

    it('should not allow "given" inside of another "then"', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());

      given('root given', () => {
        when('fake when', () => {
          then('fake then', () => {
            try {
              given('another given', () => {});
            } catch (error) {
              expect(error.message).toEqual(getOnlyOneError('given'));
            }
          });
        });
      });
    });

    it('should not allow "when" without a "given" parent', () => {
      try {
        when('fake when', () => {});
        fail('The function "when" should have thrown an error');
      } catch (error) {
        expect(error.message).toEqual(getMustBeAChildError('when'));
      }
    });

    it('should not allow "then" without a "when" parent', () => {
      try {
        then('fake then', () => {});
        fail('The function "then" should have thrown an error');
      } catch (error) {
        expect(error.message).toEqual(getMustBeAChildError('then'));
      }
    });
    it('should not allow "then" straight under a "given"', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());
      given('root given', () => {
        try {
          then('fake then', () => {});
          fail('The function "then" should have thrown an error');
        } catch (error) {
          expect(error.message).toEqual(getMustBeAChildError('then'));
        }
      });
    });

    it('should not allow 2 "when" functions under 1 "given"', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());
      given('root given', () => {
        try {
          when('first when', () => {});
          when('second when', () => {});
          fail('The second "when" function should have thrown an error');
        } catch (error) {
          expect(error.message).toEqual(getOnlyOneError('when'));
        }
      });
    });

    it('should not allow 2 "then" functions under 1 "when"', () => {
      jest.spyOn(root, 'it').mockImplementation((desc: any, fn: any) => fn());
      given('root given', () => {
        when('when', () => {
          try {
            then('first then', () => {});
            then('second then', () => {});
            fail('The second "then" function should have thrown an error');
          } catch (error) {
            expect(error.message).toEqual(getOnlyOneError('then'));
          }
        });
      });
    });

  });


});
