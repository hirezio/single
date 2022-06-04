import {
  getOnlyOneError,
  getMustBeAChildError,
} from '../../../shared/single-core/single-core';

const root = (1, eval)('this');

describe('Jasmine Single', () => {
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
      const itSpy = spyOn(root, 'it');
      given('fake given description', () => {
        when(`fake when description`, () => {
          then('fake then description', () => {});
        });
      });
      const expectedFullDescription = `
    GIVEN fake given description
    WHEN  fake when description
    THEN  fake then description`;

      const actualDescription = itSpy.calls.first().args[0];
      expect(actualDescription).toEqual(expectedFullDescription);
    });
  });

  describe('focus and exclude', () => {
    it('should be able to focus on 1 given using "fgiven"', () => {
      const fitSpy = spyOn(root, 'fit');
      fgiven('FAKE DESCRIPTION', function () {});

      expect(fitSpy).toHaveBeenCalled();
    });

    it('should be able to focus on 1 given using "given.only"', () => {
      const fitSpy = spyOn(root, 'fit');
      given.only('FAKE DESCRIPTION', function () {});

      expect(fitSpy).toHaveBeenCalled();
    });

    it('should not allow "fgiven" not as a root given', () => {
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());

      given('root given', () => {
        try {
          fgiven('another given', () => {});
        } catch (error: any) {
          expect(error.message).toEqual(getOnlyOneError('given'));
        }
      });
    });

    it('should combine all 3 descriptions for fgiven as well', () => {
    
      const itSpy = spyOn(root, 'fit');  
      
      fgiven('fake given description', () => {
        when(`fake when description`, () => {
          then('fake then description', () => {});
        });
      });
      const expectedFullDescription = `
    GIVEN fake given description
    WHEN  fake when description
    THEN  fake then description`;

      const actualDescription = itSpy.calls.first().args[0];
      expect(actualDescription).toEqual(expectedFullDescription);
    });


    it('should be able to exclude a given using "xgiven"', () => {
      const xitSpy = spyOn(root, 'xit');
      xgiven('FAKE DESCRIPTION', function () {});

      expect(xitSpy).toHaveBeenCalled();
    });

    it('should be able to exclude a given using "given.skip"', () => {
      const xitSpy = spyOn(root, 'xit');
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
      spyOn(root, 'it').and.callFake((desc: any, fn: any) => {
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
        
      } catch (error: any) {
        expect(error.message).toEqual('FAKE ERROR');
      }
    });

    it('should handle errors passed to "done.fail()"', async () => {
      let actualPromiseFromGiven: Promise<any> | undefined = undefined;
      spyOn(root, 'it').and.callFake((desc: any, fn: any) => {
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
        
      } catch (error: any) {
        expect(error.message).toEqual('FAKE ERROR');
      }
    });

    it('should handle promise errors thrown inside "when"', async () => {
      let actualPromiseFromGiven: Promise<any> | undefined = undefined;
      spyOn(root, 'it').and.callFake((desc: any, fn: any) => {
          actualPromiseFromGiven = fn();
      });

      given('given', async () => {
        when('when', async () => {
          await Promise.resolve().then(() => {
            throw new Error('FAKE ERROR');
          })
           
        })
      });
      try {
        await actualPromiseFromGiven;
        
      } catch (error: any) {
        expect(error.message).toEqual('FAKE ERROR');
      }
    });

    it('should handle promise errors thrown inside "then"', async () => {
      let actualPromiseFromGiven: Promise<any> | undefined = undefined;
      spyOn(root, 'it').and.callFake((desc: any, fn: any) => {
        actualPromiseFromGiven = fn();
      });

      given('given', async () => {
        when('when', async () => {
          then('then', async () => {
            await Promise.resolve().then(() => {
              throw new Error('FAKE ERROR');
            })
            
          })
        })
      });
      try {
        await actualPromiseFromGiven;
        
      } catch (error: any) {
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
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());

      given('root given', () => {
        try {
          given('another given', () => {});
        } catch (error: any) {
          expect(error.message).toEqual(getOnlyOneError('given'));
        }
      });
    });

    it('should not allow "given" inside of another "when"', () => {
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());

      given('root given', () => {
        when('fake when', () => {
          try {
            given('another given', () => {});
          } catch (error: any) {
            expect(error.message).toEqual(getOnlyOneError('given'));
          }
        });
      });
    });

    it('should not allow "given" inside of another "then"', () => {
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());

      given('root given', () => {
        when('fake when', () => {
          then('fake then', () => {
            try {
              given('another given', () => {});
            } catch (error: any) {
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
      } catch (error: any) {
        expect(error.message).toEqual(getMustBeAChildError('when'));
      }
    });

    it('should not allow "then" without a "when" parent', () => {
      try {
        then('fake then', () => {});
        fail('The function "then" should have thrown an error');
      } catch (error: any) {
        expect(error.message).toEqual(getMustBeAChildError('then'));
      }
    });
    it('should not allow "then" straight under a "given"', () => {
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());
      given('root given', () => {
        try {
          then('fake then', () => {});
          fail('The function "then" should have thrown an error');
        } catch (error: any) {
          expect(error.message).toEqual(getMustBeAChildError('then'));
        }
      });
    });

    it('should not allow 2 "when" functions under 1 "given"', () => {
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());
      given('root given', () => {
        try {
          when('first when', () => {});
          when('second when', () => {});
          fail('The second "when" function should have thrown an error');
        } catch (error: any) {
          expect(error.message).toEqual(getOnlyOneError('when'));
        }
      });
    });

    it('should not allow 2 "then" functions under 1 "when"', () => {
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => fn());
      given('root given', () => {
        when('when', () => {
          try {
            then('first then', () => {});
            then('second then', () => {});
            fail('The second "then" function should have thrown an error');
          } catch (error: any) {
            expect(error.message).toEqual(getOnlyOneError('then'));
          }
        });
      });
    });
  });
});
