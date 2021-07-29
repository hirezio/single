// import {
//   NO_SPEC_FUNCTION_ERROR,
//   NO_STACK_ERROR,
//   CONTEXT_FOR_GWT_ERROR,
// } from '../../../shared/single-core/single-core';

// const root = (1, eval)('this');

// describe('Jasmine Single', () => {


// should handle "done" function in "given | when | then"
// should handle async await in  "given | when | then"



  // describe('Then() should pass an empty string to it() given no label', () => {
  //   beforeEach(() => {
  //     spyOn(root, 'it');
  //     Then(() => {});
  //     const actualLabel = (it as jasmine.Spy).calls.first().args[0];
  //     expect(actualLabel).toBe('');
  //   });
  // });

  // describe('Then() is called with only a label', () => {
  //   it('should throw when called', () => {
  //     function errorThrowingCall() {
  //       (Then as any)('FAKE MESSAGE');
  //     }
  //     expect(errorThrowingCall).toThrowError(NO_SPEC_FUNCTION_ERROR);
  //   });
  // });

  // describe('should share "this" context', () => {
  //   Given(function () {
  //     this.fakeInitialNumber = 2;
  //     this.expectedResult = 4;
  //   });

  //   When(function () {
  //     actualResult = addTwo(this.fakeInitialNumber);
  //   });

  //   Then(function () {
  //     expect(actualResult).toEqual(this.expectedResult);
  //   });
  // });

//   describe('if error is thrown in the "Given" should show a meaningful message', () => {
//     const FAKE_ERROR = 'FAKE ERROR';
//     let actualPromiseFromGiven: Promise<any>;

//     beforeEach(() => {
//       spyOn(root, 'beforeEach').and.callFake((fn: Function) => {
//         actualPromiseFromGiven = fn();
//       });
//     });

//     it('should work with a regular callback', async () => {
//       Given(() => {
//         throw new Error(FAKE_ERROR);
//       });
//       try {
//         await actualPromiseFromGiven;
//       } catch (err) {
//         expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
//         expect(err.message).toContain(FAKE_ERROR);
//       }
//     });

//     it('should work with a done callback', async () => {
//       Given((done) => {
//         throw new Error(FAKE_ERROR);
//       });
//       try {
//         await actualPromiseFromGiven;
//       } catch (err) {
//         expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
//         expect(err.message).toContain(FAKE_ERROR);
//       }
//     });

//     it('should work with a done callback with passed error', async () => {
//       Given((done) => {
//         done(new Error(FAKE_ERROR));
//       });
//       try {
//         await actualPromiseFromGiven;
//       } catch (err) {
//         expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
//         expect(err.message).toContain(FAKE_ERROR);
//       }
//     });

//     it('should work with a done callback with passed error via done.fail()', async () => {
//       Given((done) => {
//         done.fail(new Error(FAKE_ERROR));
//       });
//       try {
//         await actualPromiseFromGiven;
//       } catch (err) {
//         expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
//         expect(err.message).toContain(FAKE_ERROR);
//       }
//     });

//     it('should work with an async callback', async () => {
//       Given(async () => {
//         throw new Error(FAKE_ERROR);
//       });

//       try {
//         await actualPromiseFromGiven;
//       } catch (err) {
//         expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
//         expect(err.message).toContain(FAKE_ERROR);
//       }
//     });
//   });

//   describe('if an error gets thrown in "When" or "Then"', () => {
//     let afterEachCache: Function[];
//     let actualError: any;
//     let actualPromiseReturnedFromIt: Promise<any>;

//     const FAKE_ERROR_MESSAGE = 'FAKE ERROR';

//     beforeEach(() => {
//       actualError = undefined;
//       afterEachCache = [];

//       // make beforeEach run immediately when called inside the next "it" function
//       spyOn(root, 'beforeEach').and.callFake((fn: Function) => fn());

//       // queues up afterEach functions for cleanup purposes inside the next "it" function
//       spyOn(root, 'afterEach').and.callFake((fn: Function) => afterEachCache.push(fn));

//       // Because jasmine queues up these function,
//       // the following line will get called after all the "it" functions in this spec file will get called
//       // The purpose is to enable us to run "it()" immediately inside of another "it callback"
//       // which otherwise throws an error...
//       spyOn(root, 'it').and.callFake((desc: string, fn: Function) => {
//         actualPromiseReturnedFromIt = fn();
//       });
//     });

//     it('should show a meaningful message if it was thrown in "When"', async () => {
//       // without a "done"
//       When(() => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it('should show a meaningful message if it was thrown in "When" with a "done"', async () => {
//       // WITH a "done"
//       When((done) => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it(`should show a meaningful message ONLY ONCE 
//        if thrown in "When" with a "done"
//        after multiple "When's with "done"s`, async () => {
//       When((done) => {
//         done();
//       });

//       When((done) => {
//         done();
//       });

//       When((done) => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       const howManyTimesTheContextMessageAppears = actualError.message.match(
//         /An error was thrown in When\(\):/gm
//       ).length;

//       expect(howManyTimesTheContextMessageAppears).toBe(1);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it(`should show a meaningful message if it was thrown in "When" with a "done"
//         passed as a parameter`, async () => {
//       // WITH a "done"
//       When((done) => {
//         done(new Error(FAKE_ERROR_MESSAGE));
//       });
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it(`should show a meaningful message if it was thrown in "When" with a "done"
//         passed via done.fail()`, async () => {
//       // WITH a "done"
//       When((done) => {
//         done.fail(new Error(FAKE_ERROR_MESSAGE));
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it('should show a meaningful message if thrown as ERROR OBJECT in async "When"', async () => {
//       When(() => {});
//       When(async () => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it('should show a meaningful message if thrown as STRING in async "When"', async () => {
//       When(async () => {
//         throw FAKE_ERROR_MESSAGE;
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//       expect(actualError.message).toContain(NO_STACK_ERROR);
//     });

//     it('should show a meaningful message if thrown as Object without stack in async "When"', async () => {
//       When(async () => {
//         throw { toString: () => FAKE_ERROR_MESSAGE };
//       });
//       // We must call "Then" or else the logic of "When" won't be called
//       Then(() => {});

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it('should show a meaningful message if it was thrown in "Then"', async () => {
//       When(() => {});

//       Then(() => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
//       expect(actualError.message).not.toContain('When():');
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it('should show a meaningful message if it was thrown in "Then" with "done"', async () => {
//       When(() => {});

//       // WITH a "done"
//       Then((done) => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
//       expect(actualError.message).not.toContain('When():');
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it(`should show a meaningful message if it was thrown in "Then" with a "done"
//         passed as a parameter to "done"`, async () => {
//       Then((done) => {
//         done(new Error(FAKE_ERROR_MESSAGE));
//       });

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it(`should show a meaningful message if it was thrown in "Then" with a "done"
//         passed via done.fail()`, async () => {
//       Then((done) => {
//         done.fail(new Error(FAKE_ERROR_MESSAGE));
//       });

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });

//     it('should show a meaningful message if thrown as ERROR OBJECT in async "Then"', async () => {
//       When(() => {});
//       Then(async () => {
//         throw new Error(FAKE_ERROR_MESSAGE);
//       });

//       try {
//         await actualPromiseReturnedFromIt;
//       } catch (err) {
//         actualError = err;
//       } finally {
//         afterEachCache.forEach((fn) => fn());
//       }

//       expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
//       expect(actualError.message).not.toContain('When():');
//       expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
//     });
//   });
// });
