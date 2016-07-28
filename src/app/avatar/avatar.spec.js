'use strict';

describe('Service: AvatarService', function() {

    var AvatarService;

    beforeEach(function() {

        module('sputnikApp');
        inject(function(_AvatarService_) {
            AvatarService = _AvatarService_;
        });

    });

    describe('BlingCity surprises', function() {

        it('should return true for surprise levels when calling levelHasSurprise', function() {
            var levels = [2, 5, 8, 12, 25, 38];
            for(var i = 0; i < levels.length; i+=1) {
                expect(AvatarService.levelHasSurprise(levels[i])).toBe(true);
            }
        });

        it('should return false for non-surprise levels when calling levelHasSurprise', function() {
            var levels = [1, 3, 4, 7, 10, 13, 21, 39];
            for(var i = 0; i < levels.length; i+=1) {
                expect(AvatarService.levelHasSurprise(levels[i])).toBe(false);
            }
        });

    });

});