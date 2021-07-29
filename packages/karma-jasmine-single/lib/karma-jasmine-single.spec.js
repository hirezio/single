describe('Karma Jasmine Single', function(){
  
  let num;

  Given(function () {
    num = 1;
  });
 
  When(function(){
    num++;
  });

  Then(function(){
    expect(num).toBe(2);
  });
  
});