'use strict';
describe('ngActionCable', function(){
  it('exists', function(){
    expect(ngActionCable).toBeObject;
  });
  describe('dependencies', function(){
    it('loads ngWebSocket', function(){
      expect(ngActionCable.requires.indexOf('ngWebSocket')).toBeGreaterThan(-1);
    });
  });
});
